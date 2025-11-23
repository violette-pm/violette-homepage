 "use client";

import { FormEvent, useState } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!password || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords don’t match. Please try again.");
      return;
    }

    setIsSubmitting(true);

    // Stubbed confirm: replace with POST /api/auth/password-reset/confirm.
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
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
              Set a new password
            </p>
            <h1 className="text-2xl font-semibold">
              A fresh key for your space.
            </h1>
            <p className="text-xs text-white/80">
              Choose a password that feels strong and trustworthy. This helps
              keep you and your communities safe.
            </p>
            <div className="mt-4 space-y-2 rounded-2xl bg-black/30 p-4 text-xs ring-1 ring-white/10">
              <p className="font-semibold">Vi · a small reset</p>
              <p className="text-white/80">
                This is a good moment to choose something new—different from
                other logins you use. Future-you will be grateful.
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full rounded-3xl bg-black/40 p-6 text-xs text-white ring-1 ring-white/10">
              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium">
                      New password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="block w-full rounded-full border border-white/15 bg-black/60 px-4 py-2 text-xs outline-none placeholder:text-white/40 focus:border-[#FF9B6A] focus:ring-1 focus:ring-[#FF9B6A]"
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      className="block w-full rounded-full border border-white/15 bg-black/60 px-4 py-2 text-xs outline-none placeholder:text-white/40 focus:border-[#FF9B6A] focus:ring-1 focus:ring-[#FF9B6A]"
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                    />
                  </div>
                  {error && (
                    <p
                      className="text-[11px] text-[#FF7B54]"
                      aria-live="polite"
                    >
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 flex w-full items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#261C46] shadow-sm transition hover:bg-[#FF9B6A] hover:text-[#261C46] disabled:cursor-not-allowed disabled:bg-white/70"
                  >
                    {isSubmitting ? "Saving new password…" : "Save new password"}
                  </button>
                </form>
              ) : (
                <div className="space-y-3 text-xs">
                  <h2 className="text-sm font-semibold">
                    Your password has been updated.
                  </h2>
                  <p className="text-white/80">
                    You can now sign in to Violette with your new password.
                  </p>
                  <a
                    href="/login"
                    className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#261C46] shadow-sm transition hover:bg-[#FF9B6A] hover:text-[#261C46]"
                  >
                    Go to sign in
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


