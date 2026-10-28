import { createHmac, timingSafeEqual } from "node:crypto";

function signingSecret(): string {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is required to sign CV links.");
  }
  return secret;
}

export function signApplicationCvToken(applicationId: number): string {
  return createHmac("sha256", signingSecret())
    .update(`job-application-cv:${applicationId}`)
    .digest("base64url");
}

export function verifyApplicationCvToken(
  applicationId: number,
  token: string
): boolean {
  if (!token) return false;
  const expected = Buffer.from(signApplicationCvToken(applicationId));
  const provided = Buffer.from(token);
  if (expected.length !== provided.length) return false;
  return timingSafeEqual(expected, provided);
}
