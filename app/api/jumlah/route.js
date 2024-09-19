import { prisma } from "@/app/lib/db"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        const jumlahKontak = await prisma.kontak.count()
        return NextResponse.json({"jumlah":jumlahKontak}, {status:200})
    } catch (error) {
        return NextResponse.json({"jumlah":"tidak ada data"}, {status:500})
    }
    
}