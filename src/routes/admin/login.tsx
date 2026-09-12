import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth";
import { Lock, Mail, Loader2, TriangleAlert } from "lucide-react";
import logoAsset from "@/assets/maha-binu-logo.png.asset.json";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
  head: () => ({
    meta: [
      { title: "Admin Login | MAHA BINU Fire Fighters" },
      { name: "description", content: "Admin login for MAHA BINU staff." },
    ],
  }),
});

function AdminLoginPage() {
  const { user, isAdmin, loading, adminReady, signIn } = useAuth();
  const navigate = useNavigate();
  const redirected = useRef(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && adminReady && user && isAdmin) {
      if (!redirected.current) {
        redirected.current = true;
        navigate({ to: "/admin" });
      }
    } else {
      redirected.current = false;
    }
  }, [loading, adminReady, user, isAdmin]);

  if (loading || !adminReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <p className="font-sans text-base text-on-surface-variant">Loading...</p>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3">
          <img
            src={logoAsset.url}
            alt="MAHA BINU Fire Fighters logo"
            className="h-16 w-16 object-contain"
          />
          <div className="text-center">
            <h1 className="font-sans text-xl font-extrabold tracking-tight text-primary">
              MAHA BINU FIRE FIGHTERS
            </h1>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-foreground/60">
              Admin Panel
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="h-1.5 w-full bg-primary" aria-hidden="true" />
          <form className="flex flex-col gap-6 p-6 md:p-8" onSubmit={handleSubmit}>
            <h2 className="font-sans text-2xl font-bold text-foreground">Sign In</h2>
            <p className="font-sans text-sm text-on-surface-variant">
              Authorized personnel only. Use your staff credentials to access registrations.
            </p>

            <div>
              <label className="mb-2 block font-label text-[13px] font-bold text-foreground">
                Email Address <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="email"
                  className="w-full rounded-md border-2 border-input bg-card py-3 pl-10 pr-4 font-sans text-base text-foreground placeholder:text-on-surface-variant/60 outline-none transition-colors focus:border-secondary"
                  placeholder="admin@mahabinu.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-label text-[13px] font-bold text-foreground">
                Password <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="password"
                  className="w-full rounded-md border-2 border-input bg-card py-3 pl-10 pr-4 font-sans text-base text-foreground placeholder:text-on-surface-variant/60 outline-none transition-colors focus:border-secondary"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={submitting}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-md border border-primary/30 bg-primary/5 p-3">
                <TriangleAlert className="h-5 w-5 shrink-0 text-primary" />
                <p className="font-sans text-sm text-primary">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-3 rounded-md bg-primary px-6 py-4 font-sans text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="font-sans text-sm text-on-surface-variant transition-colors hover:text-primary"
          >
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
