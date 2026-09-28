export type EmbedProvider = "youtube" | "facebook" | "vimeo";

export type ResolvedEmbed = {
  provider: EmbedProvider;
  src: string;
};

const TRUSTED_HOSTS = [
  "youtube.com",
  "youtube-nocookie.com",
  "youtu.be",
  "facebook.com",
  "fb.watch",
  "vimeo.com",
];

function isTrustedHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^www\./, "");
  return TRUSTED_HOSTS.some((t) => host === t || host.endsWith(`.${t}`));
}

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#38;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function classify(url: URL): ResolvedEmbed | null {
  const host = url.hostname.toLowerCase().replace(/^www\./, "");

  // ── YouTube ────────────────────────────────────────────────
  if (host === "youtu.be" || host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
    const embedMatch = url.pathname.match(/^\/embed\/([\w-]+)/);
    if (embedMatch) {
      return { provider: "youtube", src: `https://www.youtube-nocookie.com/embed/${embedMatch[1]}` };
    }
    let id = "";
    if (host === "youtu.be") id = url.pathname.slice(1);
    else if (url.pathname === "/watch") id = url.searchParams.get("v") ?? "";
    else if (url.pathname.startsWith("/shorts/")) id = url.pathname.slice("/shorts/".length);
    else if (url.pathname.startsWith("/live/")) id = url.pathname.slice("/live/".length);
    id = id.split(/[/?&]/)[0];
    return id
      ? { provider: "youtube", src: `https://www.youtube-nocookie.com/embed/${id}` }
      : null;
  }

  // ── Facebook ───────────────────────────────────────────────
  if (host === "fb.watch" || host.endsWith("facebook.com")) {
    // Already a plugin embed URL → use as-is.
    if (url.pathname.startsWith("/plugins/")) {
      return { provider: "facebook", src: url.toString() };
    }
    const isVideo =
      host === "fb.watch" ||
      /(\/videos\/|\/reel\/|\/share\/v\/|\/watch\/?$)/.test(url.pathname);
    if (!isVideo) return null;
    return {
      provider: "facebook",
      src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        url.toString()
      )}&show_text=false`,
    };
  }

  // ── Vimeo ──────────────────────────────────────────────────
  if (host.endsWith("vimeo.com")) {
    const m = url.pathname.match(/(\d+)/);
    return m ? { provider: "vimeo", src: `https://player.vimeo.com/video/${m[1]}` } : null;
  }

  return null;
}

/**
 * Resolves an admin-provided value (YouTube/Facebook/Vimeo link or a full
 * `<iframe>` embed code) into a safe embed src. Only trusted hosts are accepted;
 * raw HTML is never rendered — we rebuild our own iframe from the validated src.
 */
export function resolveEmbed(value?: string | null): ResolvedEmbed | null {
  if (!value) return null;
  const raw = decodeEntities(value.trim());
  if (!raw) return null;

  // Full iframe code → extract the src attribute.
  if (/<iframe/i.test(raw)) {
    const match = raw.match(/<iframe[^>]*\bsrc\s*=\s*["']([^"']+)["']/i);
    if (!match) return null;
    return resolveEmbed(match[1]);
  }

  // Protocol-relative URLs.
  const normalized = raw.startsWith("//") ? `https:${raw}` : raw;

  let url: URL;
  try {
    url = new URL(normalized);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  if (!isTrustedHost(url.hostname)) return null;

  return classify(url);
}
