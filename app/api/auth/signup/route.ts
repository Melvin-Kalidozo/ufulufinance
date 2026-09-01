import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  generateVerificationCode,
  sendMail,
  verificationEmailHtml,
} from "@/lib/mailer";

const CODE_TTL_MS = 15 * 60 * 1000;

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      if (existing.emailVerifiedAt) {
        return NextResponse.json(
          { message: "An account with this email already exists" },
          { status: 409 }
        );
      }

      // Unverified account → re-send a fresh code
      const code = generateVerificationCode();
      await prisma.user.update({
        where: { id: existing.id },
        data: {
          name: existing.name || name,
          phone: phone || existing.phone,
          verificationCode: code,
          verificationCodeExpires: new Date(Date.now() + CODE_TTL_MS),
        },
      });
      await sendMail(normalizedEmail, "Verify your email", verificationEmailHtml(code));
      return NextResponse.json(
        { message: "Verification code re-sent. Please check your inbox.", id: existing.id },
        { status: 200 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const code = generateVerificationCode();

    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        phone: phone || null,
        passwordHash,
        role: "CUSTOMER",
        isActive: false,
        verificationCode: code,
        verificationCodeExpires: new Date(Date.now() + CODE_TTL_MS),
      },
    });

    await sendMail(normalizedEmail, "Verify your email", verificationEmailHtml(code));

    return NextResponse.json(
      { message: "Verification code sent to your email.", id: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
