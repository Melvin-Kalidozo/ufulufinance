import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import {
  generateVerificationCode,
  sendMail,
  verificationEmailHtml,
} from "@/lib/mailer";

const CODE_TTL_MS = 15 * 60 * 1000;

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = rateLimit(`resend-${ip}`, 5, 60 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
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

    const code = generateVerificationCode();
    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationCode: code,
        verificationCodeExpires: new Date(Date.now() + CODE_TTL_MS),
      },
    });

    await sendMail(user.email, "Verify your email", verificationEmailHtml(code));

    return NextResponse.json(
      { message: "New code sent. Please check your inbox." },
      { status: 200 }
    );
  } catch (error) {
    console.error("RESEND CODE ERROR:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
