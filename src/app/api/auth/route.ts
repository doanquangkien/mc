import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pin } = body;

    const adminPin = process.env.ADMIN_PIN;

    if (!adminPin) {
      return NextResponse.json(
        { error: "Admin PIN chưa được cấu hình" },
        { status: 500 }
      );
    }

    if (pin !== adminPin) {
      return NextResponse.json(
        { error: "Mã PIN không đúng" },
        { status: 401 }
      );
    }

    // Set admin cookie (valid for 24 hours)
    const cookieStore = await cookies();
    cookieStore.set("admin", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Đăng nhập thành công" });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Lỗi xác thực" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("admin");
    return NextResponse.json({ success: true, message: "Đã đăng xuất" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Lỗi đăng xuất" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const isAdmin = cookieStore.get("admin")?.value === "true";
    return NextResponse.json({ isAdmin });
  } catch {
    return NextResponse.json({ isAdmin: false });
  }
}
