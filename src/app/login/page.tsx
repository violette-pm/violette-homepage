 "use client";

import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsSubmitting(true);

    // Stubbed login: replace with POST /api/auth/login when backend is ready.
    window.setTimeout(() => {
      setIsSubmitting(false);
      setError("We couldn’t sign you in with those details. Please try again or reset your password.");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#261C46] via-[#3B2A51] to-black text-foreground">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-4 pb-16 pt-10 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between text-xs text-white/80">
          <a href="/" className="flex items-center gap-2 font-semibold">
            <span className="h-7 w-7 rounded-full bg-gradient-to-br from-[#9259DC] via-[#A774EA] to-[#FF7B54]" />
            <span>Violette</span>
          </a>
          <a href="/signup" className="hover:text-white">
            Have an invite? Create an account
          </a>
        </header>

        <section className="grid gap-10 text-white md:grid-cols-[2fr,3fr]">
          <div className="space-y-4 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF9B6A]">
              Sign in
            </p>
            <h1 className="text-2xl font-semibold">
              Drop back into your communities.
            </h1>
            <p className="text-xs text-white/80">
              From medicine circles to conscious collaborations, your spaces are
              waiting. Use the email and password you created when you first
              joined Violette.
            </p>
            <div className="mt-4 space-y-2 rounded-2xl bg-black/30 p-4 text-xs ring-1 ring-white/10">
              <p className="font-semibold">Vi · a gentle reminder</p>
              <p className="text-white/80">
                If you&apos;re feeling stuck, it&apos;s okay. You can always
                reset your password—your communities will still be here.
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full rounded-3xl bg-black/40 p-6 text-xs text-white ring-1 ring-white/10">
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="space-y-1">
                  <label className="block text-[11px] font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="block w-full rounded-full border border-white/15 bg-black/60 px-4 py-2 text-xs outline-none placeholder:text-white/40 focus:border-[#FF9B6A] focus:ring-1 focus:ring-[#FF9B6A]"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="block w-full rounded-full border border-white/15 bg-black/60 px-4 py-2 text-xs outline-none placeholder:text-white/40 focus:border-[#FF9B6A] focus:ring-1 focus:ring-[#FF9B6A]"
                    placeholder="Your password"
                    autoComplete="current-password"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-white/70">
                  <div />
                  <a
                    href="/forgot-password"
                    className="underline underline-offset-2 hover:text-white"
                  >
                    Forgot password?
                  </a>
                </div>
                {error && (
                  <p className="text-[11px] text-[#FF7B54]" aria-live="polite">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 flex w-full items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#261C46] shadow-sm transition hover:bg-[#FF9B6A] hover:text-[#261C46] disabled:cursor-not-allowed disabled:bg-white/70"
                >
                  {isSubmitting ? "Signing you in…" : "Sign in"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


