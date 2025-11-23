 "use client";

import { FormEvent, useState } from "react";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [screenName, setScreenName] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!firstName || !lastName || !email || !screenName || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!termsAccepted) {
      setError("Please accept the Terms & Conditions and Privacy Policy.");
      return;
    }

    setIsSubmitting(true);

    // Stubbed signup: replace with POST /api/auth/signup when backend is ready.
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
            Already a member? Sign in
          </a>
        </header>

        <section className="grid gap-10 text-white md:grid-cols-[2fr,3fr]">
          <div className="space-y-4 text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF9B6A]">
              Invite-based sign-up
            </p>
            <h1 className="text-2xl font-semibold">
              Welcome to Violette. Let&apos;s create your space.
            </h1>
            <p className="text-xs text-white/80">
              You&apos;re here because someone opened a door for you. Violette
              is an invite-based community for seekers, healers, and conscious
              creators. These first details help us keep the space safe and
              grounded.
            </p>
            <div className="mt-4 space-y-2 rounded-2xl bg-black/30 p-4 text-xs ring-1 ring-white/10">
              <p className="font-semibold">Vi · your gentle guide</p>
              <p className="text-white/80">
                Take a breath, then fill this out at your own pace. Use a
                screen name that feels true to you and safe to share in
                community.
              </p>
            </div>
            <div className="pt-4 text-xs text-white/60">
              Don&apos;t have an invite?{" "}
              <a href="/#waitlist" className="underline hover:text-white">
                Join the waitlist instead.
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-black/40 p-6 text-xs text-white ring-1 ring-white/10">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="space-y-1">
                  <label className="block text-[11px] font-medium">
                    First name
                  </label>
                  <input
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className="block w-full rounded-full border border-white/15 bg-black/60 px-4 py-2 text-xs outline-none placeholder:text-white/40 focus:border-[#FF9B6A] focus:ring-1 focus:ring-[#FF9B6A]"
                    placeholder="Vi"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-medium">
                    Last name
                  </label>
                  <input
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    className="block w-full rounded-full border border-white/15 bg-black/60 px-4 py-2 text-xs outline-none placeholder:text-white/40 focus:border-[#FF9B6A] focus:ring-1 focus:ring-[#FF9B6A]"
                    placeholder="Violette"
                  />
                </div>
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
                    Screen name
                  </label>
                  <input
                    value={screenName}
                    onChange={(event) => setScreenName(event.target.value)}
                    className="block w-full rounded-full border border-white/15 bg-black/60 px-4 py-2 text-xs outline-none placeholder:text-white/40 focus:border-[#FF9B6A] focus:ring-1 focus:ring-[#FF9B6A]"
                    placeholder="@your-essence"
                  />
                  <p className="text-[11px] text-white/60">
                    This is how you&apos;ll appear in communities. Choose
                    something respectful and true.
                  </p>
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
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                  />
                </div>
                <div className="flex items-start gap-2 text-[11px]">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(event) => setTermsAccepted(event.target.checked)}
                    className="mt-[2px] h-3 w-3 rounded border border-white/40 bg-black/60"
                  />
                  <label htmlFor="terms" className="text-white/80">
                    I agree to the{" "}
                    <button className="underline">Terms &amp; Conditions</button>{" "}
                    and{" "}
                    <button className="underline">Privacy Policy</button>.
                  </label>
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
                  {isSubmitting ? "Creating your account…" : "Create account"}
                </button>
              </form>
            ) : (
              <div className="space-y-3 text-xs">
                <h2 className="text-sm font-semibold">Check your email</h2>
                <p className="text-white/80">
                  We&apos;ve sent a verification link to <span>{email}</span>.{" "}
                  Once you confirm, you&apos;ll be guided into your first steps
                  inside Violette.
                </p>
                <div className="mt-3 space-y-2 rounded-2xl bg-black/60 p-4">
                  <p className="font-semibold">Vi · thank you for arriving</p>
                  <p className="text-white/80">
                    If you don&apos;t see the email in a few minutes, check your
                    promotions or spam folders. You can safely close this tab
                    once you&apos;ve verified.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}


