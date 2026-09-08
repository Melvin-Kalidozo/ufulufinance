"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { getJson } from "@/lib/content";

type Entry = { body: unknown; expires: number };
const cache = new Map<string, Entry>();
const inflight = new Map<string, Promise<unknown>>();
const TTL = 5 * 60 * 1000;

function getCached<T>(path: string): T | null {
  const entry = cache.get(path);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(path);
    return null;
  }
  return entry.body as T;
}

function store(path: string, body: unknown) {
  cache.set(path, { body, expires: Date.now() + TTL });
}

async function load<T>(path: string): Promise<T> {
  const hit = getCached<T>(path);
  if (hit !== null) return hit;
  let promise = inflight.get(path);
  if (!promise) {
    promise = getJson<unknown>(path)
      .then((body) => {
        store(path, body);
        return body;
      })
      .finally(() => inflight.delete(path));
    inflight.set(path, promise);
  }
  return promise as Promise<T>;
}

/** Warm the store (and network) for a set of public API paths (idle/low-priority use). */
export function prefetchPublic(paths: string[]) {
  for (const path of paths) {
    if (!cache.has(path)) {
      void load(path).catch(() => {});
    }
  }
}

/**
 * Returns the cached body for `path` if present (instant on revisit) or fetches it
 * once; `loading` is true only while the first network fetch is in flight.
 */
export function usePublicData<T = Record<string, unknown>>(path: string): {
  body: T | null;
  loading: boolean;
} {
  const [state, setState] = useState<{ body: T | null; loaded: boolean }>(() => {
    const cached = getCached<T>(path);
    return cached === null
      ? { body: null, loaded: false }
      : { body: cached, loaded: true };
  });

  useEffect(() => {
    let alive = true;
    const cached = getCached<T>(path);
    if (cached !== null) {
      setState({ body: cached, loaded: true });
      return;
    }
    setState({ body: null, loaded: false });
    load<T>(path)
      .then((body) => {
        if (alive) setState({ body, loaded: true });
      })
      .catch(() => {
        if (alive) setState({ body: null, loaded: true });
      });
    return () => {
      alive = false;
    };
  }, [path]);

  return { body: state.body, loading: !state.loaded };
}
