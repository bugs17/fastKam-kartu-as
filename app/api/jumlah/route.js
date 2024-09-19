import { prisma } from "@/app/lib/db"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    const jumlahKontak = await prisma.kontak.findMany()
    console.log("Jumlah kontak", jumlahKontak.length)
    const jumlah = jumlahKontak.length
    return NextResponse.json({"jumlah":jumlah}, {status:200})
}