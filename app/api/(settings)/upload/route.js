import { NextResponse } from "next/server";
import path, { join } from 'path';
import { readFile, writeFile } from "fs/promises";
import * as XLSX from 'xlsx';
import { prisma } from "@/app/lib/db";


function formatPhoneNumber(input) {
    if (!input || typeof input !== 'string') return '';
    // Hapus semua karakter yang bukan angka (0-9)
    let cleanedInput = input.replace(/\D/g, '');

    // Cek apakah input dimulai dengan '62' atau '+62' dan ubah menjadi '0'
    if (cleanedInput.startsWith('62')) {
        cleanedInput = '0' + cleanedInput.slice(2);
    }

    // Kembalikan input yang sudah diformat
    return cleanedInput;
}


export const POST = async (request) => {
    try {
        const data = await request.formData()
        const file = data.get('file')

        if (!file) {
            return NextResponse.json({"messaage":"No file"}, {status:400})
        }
        
        const bytes = await file.arrayBuffer()
        const bufferFile = Buffer.from(bytes)

        const filePath = join(process.cwd(), 'public/kontak', file.name);
        await writeFile(filePath, bufferFile)

        const fileKontak = await readFile(filePath)
        const workbook = XLSX.read(fileKontak, {type:"buffer"})

        // Ambil data dari sheet pertama
        const worksheet = workbook.Sheets['Sheet1'];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const addData = async (nope) => {
            try {
                await prisma.kontak.create({
                    data:{
                        nope:nope
                    }
                })
            } catch (error) {
                console.log(`gagal add data kontak dari file ${filePath}`, error)
            }
        }

        let kontakExist;
        try {
            // Mendapatkan data kontak yang sudah ada dari database
            kontakExist = await prisma.kontak.findMany();
        } catch (error) {
            console.log("Gagal mengambil semua data kontak", error)
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }

        // Melakukan loop pada data yang diambil dari file (jsonData)
        jsonData.forEach(item => {
            let noKontak;

            // Cek apakah item tidak undefined
            if (item !== undefined) {
                noKontak = item[0];

                // Format nomor kontak menggunakan fungsi formatPhoneNumber
                const cleanKontak = formatPhoneNumber(noKontak);

                // Cek apakah nomor kontak sudah ada di database
                const kontakSudahAda = kontakExist.some(kontak => cleanKontak === kontak.nope);

                if (!kontakSudahAda && cleanKontak !== '') {
                    addData(cleanKontak)
                }
            }
        });


        return NextResponse.json({ message: 'File uploaded and saved successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Error processing the file' }, { status: 500 });
    }
};
