import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ["WAITING", "PRIORITY", "DONE", "CANCELED"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Trạng thái không hợp lệ. Các trạng thái hợp lệ: ${VALID_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }

    // Check if queue item exists
    const existing = await prisma.queue.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Không tìm thấy tiết mục này" },
        { status: 404 }
      );
    }

    const updated = await prisma.queue.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update queue item:", error);
    return NextResponse.json(
      { error: "Failed to update queue item" },
      { status: 500 }
    );
  }
}
