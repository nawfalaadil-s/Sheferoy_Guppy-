"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldAlert,
  Loader2,
  ArrowLeft,
  KeyRound,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("from") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!username.trim() || !password.trim()) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
          rememberMe,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Authentication failed. Please verify credentials.");
        setIsLoading(false);
        return;
      }

      // Success: redirect to target
      router.push(redirectTarget);
      router.refresh();
    } catch {
      setErrorMessage("Network or server connection error. Please try again.");
      setIsLoading(false);
    }
  };

  const handleFillDefaults = () => {
    setUsername("admin");
    setPassword("Sheferoy@2026");
  };

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-3xl border border-border bg-white p-7 sm:p-9 shadow-card">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto relative h-14 w-14 overflow-hidden rounded-2xl border border-border bg-white shadow-subtle p-1 mb-3">
            <Image
              src="/logo.png"
              alt="Sheferoy Guppy"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="inline-block font-sans text-[11px] font-bold uppercase tracking-wider text-brand bg-brand/10 px-3 py-1 rounded-full mb-2">
            Staff Portal
          </span>
          <h1 className="font-display text-2xl font-bold tracking-tight text-heading">
            Admin Sign In
          </h1>
          <p className="mt-1.5 text-xs text-body leading-relaxed">
            Enter your credentials to manage homepage CMS, farm photography, reels, and enquiries.
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/70 p-3.5 text-xs text-red-700 animate-fadeIn">
            <ShieldAlert className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block font-sans text-xs font-bold uppercase tracking-wider text-heading mb-1.5"
            >
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm text-heading placeholder:text-muted focus:border-brand focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand shadow-sm transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block font-sans text-xs font-bold uppercase tracking-wider text-heading"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-border bg-page text-xs sm:text-sm text-heading placeholder:text-muted focus:border-brand focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand shadow-sm transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-heading p-1 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Remember me & default hint */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-body select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-border text-brand focus:ring-brand accent-brand cursor-pointer"
              />
              <span>Remember for 14 days</span>
            </label>

            <button
              type="button"
              onClick={handleFillDefaults}
              className="text-[11px] font-semibold text-brand hover:underline inline-flex items-center gap-1"
              title="Click to prefill demo credentials"
            >
              <KeyRound className="h-3 w-3" />
              <span>Use default</span>
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full justify-center py-3 text-xs sm:text-sm shadow-teal mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Admin</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Credentials Info Helper */}
        <div className="mt-6 pt-5 border-t border-border bg-page/60 -mx-7 -mb-7 sm:-mx-9 sm:-mb-9 p-5 text-center">
          <p className="text-[11px] text-muted leading-relaxed">
            Default credentials: <strong className="text-charcoal font-semibold">admin</strong> /{" "}
            <strong className="text-charcoal font-semibold">Sheferoy@2026</strong>
          </p>
        </div>
      </div>

      {/* Back to site link */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-body hover:text-brand transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Sheferoy Guppy website</span>
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-page flex flex-col justify-center items-center px-4 py-12">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-brand animate-spin" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
