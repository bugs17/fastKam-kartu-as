import { prisma } from "@/app/lib/db"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    const jumlahKontak = await prisma.kontak.findMany()

    return NextResponse.json({"jumlah":jumlahKontak.length}, {status:200})
}