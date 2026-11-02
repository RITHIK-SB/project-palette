export const RATE_LIMIT_MAX_ATTEMPTS = 10;
export const RATE_LIMIT_WINDOW_SECONDS = 900;

export type RpcResult = PromiseLike<{ data: unknown; error: { message: string; code?: string } | null }>;

export type RpcClient = {
  rpc: (fn: string, args: Record<string, unknown>) => RpcResult;
};

const IP_PATTERN = /^[0-9a-fA-F:.]{2,45}$/;

// Uses only the last X-Forwarded-For hop, which is appended by the platform
// proxy in front of the function. Earlier hops are client-controlled.
export function clientIpFromRequest(req: Request): string | null {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (!forwardedFor) return null;
  const hops = forwardedFor.split(",").map((hop) => hop.trim());
  const last = hops[hops.length - 1];
  return last && IP_PATTERN.test(last) ? last : null;
}

export async function hashIp(ip: string | null): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip ?? "unknown"));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function consumeRateLimit(db: RpcClient, ipHash: string): Promise<boolean> {
  const { data, error } = await db.rpc("consume_registration_rate_limit", {
    p_ip_hash: ipHash,
    p_limit: RATE_LIMIT_MAX_ATTEMPTS,
    p_window_seconds: RATE_LIMIT_WINDOW_SECONDS,
  });
  if (error) {
    throw new Error(error.message);
  }
  if (typeof data !== "boolean") {
    throw new Error("Unexpected rate limit response");
  }
  return data;
}
