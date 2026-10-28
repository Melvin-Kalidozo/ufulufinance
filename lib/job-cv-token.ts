import { createHmac, timingSafeEqual } from "node:crypto";

function signingSecret(): string {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is required to sign CV links.");
  }
  return secret;
}

export type JobDocumentKind = "cv" | "cover-letter";

export function signApplicationDocumentToken(
  applicationId: number,
  kind: JobDocumentKind
): string {
  return createHmac("sha256", signingSecret())
    .update(`job-application-${kind}:${applicationId}`)
    .digest("base64url");
}

export function verifyApplicationDocumentToken(
  applicationId: number,
  kind: JobDocumentKind,
  token: string
): boolean {
  if (!token) return false;
  const expected = Buffer.from(
    signApplicationDocumentToken(applicationId, kind)
  );
  const provided = Buffer.from(token);
  if (expected.length !== provided.length) return false;
  return timingSafeEqual(expected, provided);
}

export function signApplicationCvToken(applicationId: number): string {
  return signApplicationDocumentToken(applicationId, "cv");
}

export function verifyApplicationCvToken(
  applicationId: number,
  token: string
): boolean {
  return verifyApplicationDocumentToken(applicationId, "cv", token);
}

export function signApplicationCoverLetterToken(applicationId: number): string {
  return signApplicationDocumentToken(applicationId, "cover-letter");
}

export function verifyApplicationCoverLetterToken(
  applicationId: number,
  token: string
): boolean {
  return verifyApplicationDocumentToken(applicationId, "cover-letter", token);
}
