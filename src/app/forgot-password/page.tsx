 "use client";

import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!email) return;

    setIsSubmitting(true);

    // Stubbed reset request: replace with POST /api/auth/password-reset/request.
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
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
          <a href="/login" className="hover:text-white">
            Back to sign in
          </a>
        </header>

        <section className="grid gap-10 text-white md:grid-cols-[2fr,3fr]">
          <div className="space-y-4 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF9B6A]">
              Reset password
            </p>
            <h1 className="text-2xl font-semibold">
              Let&apos;s help you find your way back in.
            </h1>
            <p className="text-xs text-white/80">
              Enter the email you used for Violette. If there&apos;s an account
              associated with it, we&apos;ll send instructions to reset your
              password.
            </p>
            <div className="mt-4 space-y-2 rounded-2xl bg-black/30 p-4 text-xs ring-1 ring-white/10">
              <p className="font-semibold">Vi · you&apos;re not alone</p>
              <p className="text-white/80">
                Forgetting happens. We&apos;ll quietly send the next step to
                your inbox without revealing anything about your account here.
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full rounded-3xl bg-black/40 p-6 text-xs text-white ring-1 ring-white/10">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="block w-full rounded-full border border-white/15 bg-black/60 px-4 py-2 text-xs outline-none placeholder:text-white/40 focus:border-[#FF9B6A] focus:ring-1 focus:ring-[#FF9B6A]"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 flex w-full items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#261C46] shadow-sm transition hover:bg-[#FF9B6A] hover:text-[#261C46] disabled:cursor-not-allowed disabled:bg-white/70"
                  >
                    {isSubmitting ? "Sending instructions…" : "Send reset link"}
                  </button>
                </form>
              ) : (
                <div className="space-y-3 text-xs">
                  <h2 className="text-sm font-semibold">
                    If there&apos;s an account with that email…
                  </h2>
                  <p className="text-white/80">
                    We&apos;ve sent instructions to reset your password. Check
                    your inbox—if nothing arrives in a few minutes, look in
                    promotions or spam.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


