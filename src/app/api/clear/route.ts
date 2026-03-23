import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pin } = body;

    // Verify PIN
    const clearPin = process.env.CLEAR_PIN || "000000";
    console.log("Clear PIN check:", { received: pin, expected: clearPin, match: pin === clearPin });
    if (pin !== clearPin) {
      return NextResponse.json(
        { error: "Mã PIN không đúng" },
        { status: 401 }
      );
    }

    // Clear all queue data
    await prisma.queue.deleteMany();

    return NextResponse.json({ message: "Đã xóa toàn bộ dữ liệu" });
  } catch (error) {
    console.error("Failed to clear data:", error);
    return NextResponse.json(
      { error: "Không thể xóa dữ liệu" },
      { status: 500 }
    );
  }
}
