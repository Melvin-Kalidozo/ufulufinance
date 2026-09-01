import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = rateLimit(`verify-${ip}`, 10, 15 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { message: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { email, code } = await req.json();
    if (!email || !code) {
      return NextResponse.json(
        { message: "Email and code are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return NextResponse.json({ message: "Account not found" }, { status: 404 });
    }

    if (user.emailVerifiedAt) {
      return NextResponse.json({ message: "Email already verified" }, { status: 200 });
    }

    if (!user.verificationCode || user.verificationCode !== code) {
      return NextResponse.json({ message: "Invalid verification code" }, { status: 400 });
    }

    if (!user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
      return NextResponse.json(
        { message: "Code expired. Please request a new one." },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isActive: true,
        emailVerifiedAt: new Date(),
        verificationCode: null,
        verificationCodeExpires: null,
      },
    });

    return NextResponse.json({ message: "Email verified. You can now sign in." }, { status: 200 });
  } catch (error) {
    console.error("VERIFY EMAIL ERROR:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
