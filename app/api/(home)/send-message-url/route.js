import { prisma } from "@/app/lib/db"
import axios from "axios"
import { NextResponse } from "next/server"



export const POST = async (request) => {
    const data = await request.json()
    const stringUrl = data.stringUrl
    const pesan = data.pesan

    const newPesan = `${stringUrl} \n${pesan}`

    // mengambil data nomor kontak dari db
    let kontak;
    try {
        kontak = await prisma.kontak.findMany()
    } catch (error) {
        return NextResponse.json({"message":"Internal server Error"}, {status:500})
    }

    // mengirim pesan broadcast ke semua kontak pada db
    try {
        for (const item of kontak) {
            const dataReady = {
                "sessions": "session_1",
                "target": item.nope,
                "message": newPesan
            }
            const url = process.env.NEXT_PUBLIC_WAPI_URL + '/api/sendtext'
            try {
                await axios.post(url, dataReady, {
                    headers:{
                        'Content-Type': 'application/json',
                    }
                })
            } catch (error) {
                console.log('Gagal hit wa api', error)
            }
        }
        
    } catch (error) {
        return NextResponse.json({"message":"Internal server error"}, {status:500})
    }

    return NextResponse.json({"message":"success"}, {status:200})
}