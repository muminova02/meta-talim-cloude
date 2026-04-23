import { getAccessToken } from "@/lib/authStorage";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export class ApiHttpError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiHttpError";
    this.status = status;
  }
}

const FORCE_FAKE_API = String(import.meta.env.VITE_USE_FAKE_API ?? "").toLowerCase() === "true";

export function resolveApiUrl(maybeRelative: string): string {
  if (!maybeRelative) return maybeRelative;
  if (maybeRelative.startsWith("http://") || maybeRelative.startsWith("https://")) {
    return maybeRelative;
  }
  if (maybeRelative.startsWith("/")) {
    return `${API_BASE_URL}${maybeRelative}`;
  }
  return maybeRelative;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    // FastAPI ko'pincha { detail: "..." } formatda yuboradi.
    try {
      const data = JSON.parse(text);
      const detail = data?.detail ?? data?.message;
      throw new ApiHttpError(
        detail || `Request failed with status ${res.status}`,
        res.status,
      );
    } catch {
      throw new ApiHttpError(
        text || `Request failed with status ${res.status}`,
        res.status,
      );
    }
  }
  return (await res.json()) as T;
}

export function shouldUseFakeApi(error: unknown): boolean {
  if (FORCE_FAKE_API) return true;
  if (error instanceof ApiHttpError) {
    // backend unavailable / unstable
    if (!error.status) return true;
    return error.status >= 500 || error.status === 404;
  }
  // Network failures in browser fetch are typically TypeError("Failed to fetch")
  if (error instanceof TypeError) return true;
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  return (
    message.includes("failed to fetch") ||
    message.includes("networkerror") ||
    message.includes("network error") ||
    message.includes("err_connection_refused")
  );
}

export async function apiGet<T>(path: string): Promise<T> {
  const token = getAccessToken();
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  return handleResponse<T>(res);
}

export async function apiPost<T, B = unknown>(path: string, body: B): Promise<T> {
  const token = getAccessToken();
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(res);
}

