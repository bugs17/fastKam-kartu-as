import { prisma } from "@/app/lib/db"
import axios from "axios"
import { NextResponse } from "next/server"

export const POST = async (request) => {
    
    const dataFromUi = await request.formData()
    const pesan = dataFromUi.get('pesan')
    const gambar = dataFromUi.get('gambar')


    let kontak;

    try {
        kontak = await prisma.kontak.findMany()
    } catch (error) {
        console.log("Gagal mengambil semua data kontak", error)
        return NextResponse.json({"message":"Internal server error"}, {status:500})
    }

    try {
        for (const item of kontak) {
            const form = new FormData();
            form.append('file', gambar);
            form.append('sessions', 'session_1');
            form.append('message', pesan);
            form.append('target', item.nope);

            try {
                const url= process.env.NEXT_PUBLIC_WAPI_URL + '/api/sendmedia'
                await axios.post(url, form, {
                    headers:{
                        'Content-Type': 'multipart/form-data',
                    }
                })
            } catch (error) {
                console.log('Gagal hit wa api', error)
            }
        }
        
    } catch (error) {
        return NextResponse.json({"message":"Internal server error"}, {status:500})
    }

    return  NextResponse.json({"message":`success`},{status:200})
}