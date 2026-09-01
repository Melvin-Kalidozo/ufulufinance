import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

export async function getSession() {
  return getServerSession(authOptions);
}

export function isAdmin(session: Awaited<ReturnType<typeof getSession>>) {
  return session?.user?.role === UserRole.ADMIN;
}

export function unauthorized() {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export function forbidden() {
  return NextResponse.json({ message: "Forbidden" }, { status: 403 });
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session || !isAdmin(session)) {
    return { authorized: false as const, response: unauthorized(), session: null };
  }
  return { authorized: true as const, response: null, session };
}

export async function requireCustomer() {
  const session = await getSession();
  if (!session || session.user.role !== UserRole.CUSTOMER) {
    return { authorized: false as const, response: unauthorized(), session: null };
  }
  return { authorized: true as const, response: null, session };
}
