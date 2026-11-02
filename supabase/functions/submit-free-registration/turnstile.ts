const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const MAX_TOKEN_LENGTH = 2048;

export type TurnstileResult =
  | { ok: true }
  | { ok: false; reason: "missing" | "rejected" | "unavailable" };

export type FetchFn = (input: string, init: RequestInit) => Promise<Response>;

export async function verifyTurnstileToken(
  token: unknown,
  secret: string,
  remoteIp: string | null,
  fetchFn: FetchFn = (input, init) => fetch(input, init),
): Promise<TurnstileResult> {
  if (typeof token !== "string" || token.length === 0 || token.length > MAX_TOKEN_LENGTH) {
    return { ok: false, reason: "missing" };
  }

  const form = new URLSearchParams({ secret, response: token });
  if (remoteIp) {
    form.set("remoteip", remoteIp);
  }

  let response: Response;
  try {
    response = await fetchFn(SITEVERIFY_URL, { method: "POST", body: form });
  } catch {
    return { ok: false, reason: "unavailable" };
  }

  if (!response.ok) {
    console.error(`Turnstile siteverify returned HTTP ${response.status}`);
    return { ok: false, reason: "unavailable" };
  }

  let data: { success?: unknown };
  try {
    data = await response.json();
  } catch {
    return { ok: false, reason: "unavailable" };
  }

  return data.success === true ? { ok: true } : { ok: false, reason: "rejected" };
}
