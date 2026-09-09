import { NextResponse } from "next/server";

export function ok(data: unknown, init?: { status?: number }) {
  return NextResponse.json({ data }, init);
}

export function okPage(
  data: unknown,
  page: number,
  limit: number,
  total: number
) {
  return NextResponse.json({
    data,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
}

export function fail(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

/** Parses & clamps common pagination query params. */
export function getPagination(searchParams: URLSearchParams) {
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 12));
  return { page, limit, skip: (page - 1) * limit };
}

export function getQuery(searchParams: URLSearchParams) {
  const q = (searchParams.get("q") ?? "").trim();
  return q ? q.toLowerCase() : "";
}

export function jsonParse<T>(value: unknown): T | null {
  if (!value) return null;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }
  return value as T;
}
