import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeHistory = searchParams.get("history") === "true";

    // Determine which statuses to fetch
    const statusFilter = includeHistory
      ? ["WAITING", "PRIORITY", "DONE", "CANCELED"]
      : ["WAITING", "PRIORITY"];

    const queueItems = await prisma.queue.findMany({
      where: {
        status: { in: statusFilter },
      },
      orderBy: [
        { createdAt: "asc" },
      ],
    });

    const statusOrder: Record<string, number> = {
      PRIORITY: 0,
      WAITING: 1,
      DONE: 2,
      CANCELED: 3,
    };

    queueItems.sort((a: { status: string; createdAt: Date }, b: { status: string; createdAt: Date }) => {
      const orderA = statusOrder[a.status] ?? 99;
      const orderB = statusOrder[b.status] ?? 99;
      if (orderA !== orderB) return orderA - orderB;
      return a.createdAt.getTime() - b.createdAt.getTime();
    });

    return NextResponse.json(queueItems);
  } catch (error) {
    console.error("Failed to fetch queue:", error);
    return NextResponse.json(
      { error: "Failed to fetch queue" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { guestName, role, songName, note } = body;

    // Validate required fields
    if (!guestName || !role || !songName) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin: Tên, Vai trò, Tên bài hát" },
        { status: 400 }
      );
    }

    const queueItem = await prisma.queue.create({
      data: {
        guestName: guestName.trim(),
        role: role.trim(),
        songName: songName.trim(),
        note: note?.trim() || null,
      },
    });

    return NextResponse.json(queueItem, { status: 201 });
  } catch (error) {
    console.error("Failed to create queue item:", error);
    return NextResponse.json(
      { error: "Failed to create queue item" },
      { status: 500 }
    );
  }
}
