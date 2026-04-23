/**
 * If `url` points to a YouTube video, returns a standard embed URL; otherwise null.
 * Supports watch URLs, youtu.be, shorts, live, and existing /embed/ links.
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  if (!url?.trim()) return null;

  try {
    const u = new URL(url.trim());
    const host = u.hostname.replace(/^www\./i, "").toLowerCase();

    if (host === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "music.youtube.com"
    ) {
      if (u.pathname.startsWith("/embed/")) {
        const id = u.pathname.slice("/embed/".length).split("/")[0];
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }

      const v = u.searchParams.get("v");
      if (v) {
        return `https://www.youtube.com/embed/${v}`;
      }

      const shorts = u.pathname.match(/^\/shorts\/([^/?]+)/);
      if (shorts?.[1]) {
        return `https://www.youtube.com/embed/${shorts[1]}`;
      }

      const live = u.pathname.match(/^\/live\/([^/?]+)/);
      if (live?.[1]) {
        return `https://www.youtube.com/embed/${live[1]}`;
      }
    }
  } catch {
    return null;
  }

  return null;
}
