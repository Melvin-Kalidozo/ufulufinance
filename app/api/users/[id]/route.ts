import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { UserRole } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  try {
    const { id } = await params;
    const userId = Number(id);
    if (!Number.isInteger(userId)) {
      return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
    }

    const body = await req.json();
    const data: {
      name?: string;
      phone?: string | null;
      role?: UserRole;
      isActive?: boolean;
      passwordHash?: string;
    } = {};

    if (typeof body.name === "string" && body.name.trim()) data.name = body.name.trim();
    if (typeof body.phone === "string") data.phone = body.phone || null;
    if (body.role === UserRole.ADMIN || body.role === UserRole.CUSTOMER) {
      data.role = body.role;
    }
    if (typeof body.isActive === "boolean") data.isActive = body.isActive;
    if (typeof body.password === "string" && body.password.length >= 8) {
      data.passwordHash = await bcrypt.hash(body.password, 10);
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ message: "Nothing to update" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ user, message: "User updated" }, { status: 200 });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    return NextResponse.json({ message: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  try {
    const { id } = await params;
    const userId = Number(id);
    if (!Number.isInteger(userId)) {
      return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
    }

    if (auth.session?.user.id && Number(auth.session.user.id) === userId) {
      return NextResponse.json(
        { message: "You cannot delete your own account" },
        { status: 400 }
      );
    }

    await prisma.user.delete({ where: { id: userId } });
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
  }
}
