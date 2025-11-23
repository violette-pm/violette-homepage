"use client";

import { FormEvent, useState } from "react";

type WaitlistState = "idle" | "submitting" | "success" | "error";
type InviteStatus = "idle" | "checking" | "valid" | "invalid";

export default function Home() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [waitlistState, setWaitlistState] = useState<WaitlistState>("idle");
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [inviteStatus, setInviteStatus] = useState<InviteStatus>("idle");

  const handleWaitlistSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!email) {
      setEmailError("Please enter your email to save your spot.");
      return;
    }

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("That doesn’t look like a valid email. Can you check it and try again?");
      return;
    }

    setEmailError("");
    setWaitlistState("submitting");

    // Stubbed waitlist join: replace with POST /api/waitlist/join when backend is ready.
    window.setTimeout(() => {
      const fakeRef = `https://www.violette.com/?ref=example-${Date.now()}`;
      setReferralLink(fakeRef);
      setWaitlistState("success");
    }, 800);
  };

  const handleCopyReferral = async () => {
    if (!referralLink) return;

    setCopyError(false);

    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
      // In a real implementation we might also surface a toast; here we show inline guidance.
    }
  };

  const handleInviteSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!inviteCode.trim()) {
      setInviteStatus("invalid");
      return;
    }

    setInviteStatus("checking");

    // Stubbed invite validation: replace with POST /api/invite/validate when backend is ready.
    window.setTimeout(() => {
      if (inviteCode.toLowerCase().startsWith("violette")) {
        setInviteStatus("valid");
      } else {
        setInviteStatus("invalid");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#261C46] via-[#3B2A51] to-black text-foreground">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <Header onOpenInvite={() => setInviteOpen(true)} />

        <main className="mt-10 flex-1 space-y-20">
          <HeroSection
            email={email}
            setEmail={setEmail}
            emailError={emailError}
            waitlistState={waitlistState}
            referralLink={referralLink}
            copied={copied}
            copyError={copyError}
            onSubmit={handleWaitlistSubmit}
            onCopyReferral={handleCopyReferral}
            onOpenInvite={() => setInviteOpen(true)}
          />

          <WhoItsForSection />
          <BuiltForRealConnectionSection />
          <SocialMediaReimaginedSection />
          <HowItWorksSection />
          <HelpUsBuildSection />
          <VioletteWaySection />
          <HeartBehindVioletteSection />
          <StoriesSection />
          <WaitlistExplainerSection
            email={email}
            setEmail={setEmail}
            emailError={emailError}
            waitlistState={waitlistState}
            referralLink={referralLink}
            copied={copied}
            copyError={copyError}
            onSubmit={handleWaitlistSubmit}
            onCopyReferral={handleCopyReferral}
          />
          <FAQSection />
        </main>

        <Footer />
      </div>

      {inviteOpen && (
        <InviteDialog
          inviteCode={inviteCode}
          setInviteCode={setInviteCode}
          inviteStatus={inviteStatus}
          onClose={() => {
            setInviteOpen(false);
            setInviteStatus("idle");
          }}
          onSubmit={handleInviteSubmit}
          onContinueToSignup={() => {
            // In a real implementation we would carry a validated invite token.
            window.location.href = "/signup";
          }}
        />
      )}
    </div>
  );
}

type WaitlistProps = {
  email: string;
  setEmail: (value: string) => void;
  emailError: string;
  waitlistState: WaitlistState;
  referralLink: string | null;
  copied: boolean;
   copyError: boolean;
  onSubmit: (event: FormEvent) => void;
  onCopyReferral: () => void;
};

type HeroProps = WaitlistProps & {
  onOpenInvite: () => void;
};

type InviteDialogProps = {
  inviteCode: string;
  setInviteCode: (value: string) => void;
  inviteStatus: InviteStatus;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
  onContinueToSignup: () => void;
};

type HeaderProps = {
  onOpenInvite: () => void;
};

function Header({ onOpenInvite }: HeaderProps) {
  return (
    <header className="flex items-center justify-between rounded-full bg-black/20 px-4 py-3 ring-1 ring-white/10 backdrop-blur">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#9259DC] via-[#A774EA] to-[#FF7B54]" />
        <span className="text-sm font-semibold tracking-wide text-white">
          Violette
        </span>
      </div>
      <nav className="hidden items-center gap-6 text-xs font-medium text-white/80 sm:flex">
        <a href="#seekers" className="hover:text-white">
          For Seekers &amp; Healers
        </a>
        <a href="#leaders" className="hover:text-white">
          For Community Leaders
        </a>
        <a href="#violette-way" className="hover:text-white">
          The Violette Way
        </a>
        <a href="#stories" className="hover:text-white">
          Stories
        </a>
        <a href="#faq" className="hover:text-white">
          FAQ
        </a>
      </nav>
      <div className="flex items-center gap-3">
        <a
          href="/login"
          className="hidden text-xs font-medium text-white/80 hover:text-white sm:inline"
        >
          Sign in
        </a>
        <button
          type="button"
          onClick={onOpenInvite}
          className="hidden text-xs font-medium text-white/80 hover:text-white sm:inline"
        >
          Have an invite code?
        </button>
        <a
          href="#waitlist"
          className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#261C46] shadow-sm transition hover:bg-[#FF9B6A] hover:text-[#261C46]"
        >
          Join waitlist
        </a>
      </div>
    </header>
  );
}

function HeroSection({
  email,
  setEmail,
  emailError,
  waitlistState,
  referralLink,
  copied,
  copyError,
  onSubmit,
  onCopyReferral,
  onOpenInvite,
}: HeroProps) {
  const isLoading = waitlistState === "submitting";
  const isSuccess = waitlistState === "success";

  return (
    <section
      aria-labelledby="hero-title"
      className="mt-16 px-4 text-white sm:px-8"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF9B6A]">
          The community-first social network for seekers, healers, and conscious
          creators.
        </p>
        <h1
          id="hero-title"
          className="text-3xl font-semibold leading-tight sm:text-4xl"
        >
          Find the communities that feel like home—and the people who truly see
          you.
        </h1>
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/70">
          Sacred seekers • Healing circles • Conscious collaborations
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <a
            href="#waitlist"
            className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-[#261C46] shadow-sm transition hover:bg-[#FF9B6A] hover:text-[#261C46]"
          >
            Join the waitlist
          </a>
          <button
            type="button"
            onClick={onOpenInvite}
            className="text-white/80 underline-offset-4 hover:text-white hover:underline"
          >
            Have an invite code?
          </button>
          <a
            href="/login"
            className="text-white/70 underline-offset-4 hover:text-white hover:underline"
          >
            Already a member? Sign in
          </a>
        </div>
        <div
          id="waitlist"
          className="mt-4 w-full max-w-xl rounded-2xl bg-white/5 p-5 text-left ring-1 ring-white/10 sm:p-6"
        >
          <div className="space-y-4">
            <div className="space-y-1 text-center">
              <h2 className="text-sm font-semibold">Join the waitlist</h2>
              <p className="text-xs text-white/80">
                Enter your email to save your spot. It takes less than 10 seconds.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-3" noValidate>
              <div className="space-y-1">
                <label
                  htmlFor="hero-email"
                  className="block text-xs font-medium text-white/80"
                >
                  Email
                </label>
                <input
                  id="hero-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="block w-full rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs text-white outline-none ring-0 placeholder:text-white/40 focus:border-[#FF9B6A] focus:ring-1 focus:ring-[#FF9B6A]"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {emailError && (
                  <p className="text-xs text-[#FF7B54]" aria-live="polite">
                    {emailError}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#261C46] shadow-sm transition hover:bg-[#FF9B6A] hover:text-[#261C46] disabled:cursor-not-allowed disabled:bg-white/70"
              >
                {isLoading ? "Joining…" : "Join the waitlist"}
              </button>
              <p className="text-[11px] text-white/60 text-center">
                We’ll only email you when it truly matters. No spam, ever.
              </p>
            </form>
          </div>

          {isSuccess && referralLink && (
            <div className="mt-5 space-y-2 rounded-xl bg-black/40 p-3">
              <p className="text-xs font-semibold text-white">
                You’re on the waitlist.
              </p>
              <p className="text-[11px] text-white/70">
                Welcome to Violette. Share your invite link to move up in line
                with your people.
              </p>
              <div className="mt-2 space-y-2">
                <label
                  htmlFor="hero-referral"
                  className="text-[11px] font-medium text-white/80"
                >
                  Your invite link
                </label>
                <div className="flex gap-2">
                  <input
                    id="hero-referral"
                    className="flex-1 truncate rounded-full border border-white/15 bg-black/60 px-3 py-2 text-[11px] text-white"
                    value={referralLink}
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={onCopyReferral}
                    className="whitespace-nowrap rounded-full bg-white px-3 py-2 text-[11px] font-semibold text-[#261C46] hover:bg-[#FF9B6A]"
                  >
                    {copied ? "Copied" : "Copy link"}
                  </button>
                </div>
                <p className="text-[11px] text-white/60">
                  Each person who joins through your link helps you move up the
                  waitlist.
                </p>
                {copyError && (
                  <p className="text-[11px] text-[#FF7B54]" aria-live="polite">
                    We couldn’t copy the link automatically. Please select and
                    copy it manually.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function WhoItsForSection() {
  return (
    <section id="seekers" className="space-y-4 text-white">
      <div className="space-y-2">
        <h2 className="text-sm font-semibold">Who Violette is for</h2>
        <p className="max-w-2xl text-xs text-white/80">
          For seekers, healers, conscious creators, and community leaders who
          are ready for relationships that feel like a deep exhale—not another
          scroll.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[
          {
            title: "Seekers & explorers",
            body: "You’re walking a path of healing, integration, and awakening—and you don’t want to do it alone.",
          },
          {
            title: "Healers & space-holders",
            body: "Facilitators, guides, and practitioners who hold deep containers and need communities that honor the work.",
          },
          {
            title: "Conscious creators",
            body: "Artists, entrepreneurs, and builders weaving purpose, creativity, and soul into their offerings.",
          },
          {
            title: "Community leaders",
            body: "Organizers and visionaries stewarding circles, festivals, and communities that deserve a safe home.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-2 rounded-2xl bg-black/30 p-4 text-xs ring-1 ring-white/10"
          >
            <h3 className="text-[13px] font-semibold">{item.title}</h3>
            <p className="text-white/80">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BuiltForRealConnectionSection() {
  return (
    <section className="grid gap-10 rounded-3xl bg-black/25 p-8 text-white ring-1 ring-white/10 md:grid-cols-2">
      <div className="space-y-3">
        <h2 className="text-sm font-semibold">Built for Real Connection</h2>
        <p className="text-xs text-white/80">
          Whether you’re seeking communities that feel like home, circles for
          spiritual exploration, or partners to build something meaningful,
          Violette creates space for relationships that matter.
        </p>
      </div>
      <div className="space-y-3 text-xs">
        <ConnectionPillar
          title="Find Your People"
          body="Join communities of conscious seekers who share your values, understand your path, and celebrate both who you are and who you’re becoming."
        />
        <ConnectionPillar
          title="Sacred Exploration"
          body="Connect in circles dedicated to healing, self-discovery, and transformational practices—free from judgment or censorship."
        />
        <ConnectionPillar
          title="Build Together"
          body="Collaborate with visionaries creating businesses and projects that honor both purpose and impact."
        />
      </div>
    </section>
  );
}

function ConnectionPillar({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-black/40 p-4 ring-1 ring-white/10">
      <h3 className="text-[13px] font-semibold">{title}</h3>
      <p className="mt-1 text-white/80">{body}</p>
    </div>
  );
}

function SocialMediaReimaginedSection() {
  return (
    <section className="space-y-4 rounded-3xl bg-[#261C46]/80 p-8 text-white ring-1 ring-white/10">
      <div className="space-y-2">
        <h2 className="text-sm font-semibold">Social Media Reimagined</h2>
        <div className="space-y-2 text-xs text-white/80">
          <p className="max-w-2xl">
            We’re taking social media back to its purpose: connecting humans. No
            ads, no algorithms exploiting your attention, no censorship of your
            truth. Just thoughtful technology that helps you find your people and
            build real relationships.
          </p>
          <p className="max-w-2xl">
            Violette is where authentic relationships live—without algorithms
            manipulating your feed, ads interrupting your flow, or censorship
            silencing your truth. Join intentional communities centered around
            healing, consciousness, and purpose-driven collaboration.
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <TechCard
          title="Ad-Free Environment"
          body="Your attention matters. Connect without interruption in spaces free from advertising, endless distractions, and corporate agendas trying to sell you things you don’t need."
        />
        <TechCard
          title="Human-First Design"
          body="No manipulative algorithms. No engagement-addiction tactics. Just meaningful ways to discover communities and people who align with your values, interests, and journey."
        />
        <TechCard
          title="Expression Freedom"
          body="Share your truth about spiritual practices, healing modalities, and consciousness exploration without fear. Built for those walking the conscious path, by people who understand your journey."
        />
        <TechCard
          title="Simple & Direct Technology"
          body="Built for people who want tech that supports their life and relationships, not one that exploits them. A tool for connection, not consumption."
        />
      </div>
    </section>
  );
}

function TechCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-black/40 p-4 text-xs ring-1 ring-white/10">
      <h3 className="text-[13px] font-semibold">{title}</h3>
      <p className="text-white/80">{body}</p>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <section className="space-y-4 rounded-3xl bg-black/25 p-8 text-white ring-1 ring-white/10">
      <h2 className="text-sm font-semibold">How Violette Works</h2>
      <p className="max-w-2xl text-xs text-white/80">
        One home for your people, whether you’re joining or leading a
        community.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2 text-xs">
          <h3 className="text-[13px] font-semibold">For Members</h3>
          <ol className="space-y-2">
            <li>
              <span className="font-semibold">1. Join aligned communities.</span>{" "}
              Explore intentional communities centered around healing, plant
              medicine, spirituality, and conscious creativity.
            </li>
            <li>
              <span className="font-semibold">
                2. Connect in depth, not noise.
              </span>{" "}
              Share stories, attend events, and meet people who speak your
              language—without feeds engineered to keep you scrolling.
            </li>
            <li>
              <span className="font-semibold">3. Grow together over time.</span>{" "}
              Build friendships, collaborations, and partnerships that evolve
              with you.
            </li>
          </ol>
        </div>
        <div id="leaders" className="space-y-2 text-xs">
          <h3 className="text-[13px] font-semibold">For Community Leaders</h3>
          <ol className="space-y-2">
            <li>
              <span className="font-semibold">1. Bring your people home.</span>{" "}
              Invite your existing audience into a safe, dedicated space that
              can’t be taken away by algorithms or arbitrary takedowns.
            </li>
            <li>
              <span className="font-semibold">
                2. Host everything in one place.
              </span>{" "}
              Hold discussions, share resources, run events, and guide journeys
              without fragmenting across platforms.
            </li>
            <li>
              <span className="font-semibold">3. Build sustainable income.</span>{" "}
              Offer memberships, workshops, and experiences that support your
              work while staying aligned with your values.
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

function HelpUsBuildSection() {
  return (
    <section className="space-y-6 rounded-3xl bg-[#3B2A51]/80 p-8 text-white ring-1 ring-white/10">
      <div className="grid gap-8 md:grid-cols-[3fr,2fr]">
        <div className="space-y-3 text-xs">
          <h2 className="text-sm font-semibold">Help Us Build Something Special</h2>
          <p className="text-white/80">
            Tired of platforms where censorship and algorithm changes threaten
            everything you’ve created? You’ve poured your heart into building
            something meaningful; now give your community a space where
            they&apos;re truly safe.
          </p>
          <p className="text-white/80">
            Bring your people to Violette. No arbitrary takedowns. No censorship
            of spiritual or healing content. No waking up to find it all gone.
            Build on a platform that protects your voice, honors your work, and
            ensures your community stays intact.
          </p>
        </div>
        <div className="space-y-3 text-xs">
          <h3 className="text-[13px] font-semibold">
            Why Build Your Community on Violette?
          </h3>
          <ul className="space-y-2">
            <li>
              <span className="font-semibold">Unified Experience.</span> Host
              discussions, events, resources, and connections all in one place
              instead of fragmenting across platforms.
            </li>
            <li>
              <span className="font-semibold">Direct Access.</span> Own your
              relationship with your community without algorithms controlling who
              sees your content.
            </li>
            <li>
              <span className="font-semibold">Community Tools.</span> Everything
              you need to facilitate connection, growth, and collaboration in one
              space.
            </li>
            <li>
              <span className="font-semibold">Values Alignment.</span> Built by
              consciousness leaders who understand what you&apos;re here to
              create.
            </li>
          </ul>
          <div className="pt-2">
            <button className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-[#261C46] shadow-sm transition hover:bg-[#FF9B6A] hover:text-[#261C46]">
              Apply to build your community
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function VioletteWaySection() {
  return (
    <section
      id="violette-way"
      className="space-y-5 rounded-3xl bg-black/25 p-8 text-white ring-1 ring-white/10"
    >
      <div className="space-y-2">
        <h2 className="text-sm font-semibold">The Violette Way</h2>
        <p className="max-w-2xl text-xs text-white/80">
          The Violette Way is how we choose to show up—with ourselves, with each
          other, and within every community we host.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <ValueItem
          title="Honor Your Sacred Authenticity"
          body="Show up as your whole self in communities that celebrate your truth."
        />
        <ValueItem
          title="Protect Community Safety"
          body="Create spaces where people feel seen, respected, and free to express authentically."
        />
        <ValueItem
          title="Speak with Radical Transparency"
          body="Share honestly, listen deeply, and hold space for genuine dialogue."
        />
        <ValueItem
          title="Lead with Compassion"
          body="Meet others with grace while they’re learning to love themselves."
        />
        <ValueItem
          title="Act from Intuitive Knowing"
          body="Let your inner voice guide decisions from alignment, not fear."
        />
        <ValueItem
          title="Create in Collective Flow"
          body="Build together in sync with grace, purpose, and shared rhythm."
        />
        <ValueItem
          title="Monetize Your Mission"
          body="Build recurring income through memberships, workshops, and experiences—sustainably supporting the work you’re called to do."
        />
      </div>
    </section>
  );
}

function ValueItem({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-black/40 p-4 text-xs ring-1 ring-white/10">
      <h3 className="text-[13px] font-semibold">{title}</h3>
      <p className="mt-1 text-white/80">{body}</p>
    </div>
  );
}

function HeartBehindVioletteSection() {
  return (
    <section className="grid gap-8 rounded-3xl bg-[#261C46]/80 p-8 text-white ring-1 ring-white/10 md:grid-cols-[2fr,3fr]">
      <div className="space-y-3 text-xs">
        <h2 className="text-sm font-semibold">The Heart Behind Violette</h2>
        <h3 className="text-[13px] font-semibold">Our Foundation</h3>
        <p className="text-white/80">
          Plant medicine teaches us that when we let go of our attachment to the
          outcome, we create space for a true connection with our purpose.
        </p>
      </div>
      <article className="space-y-3 rounded-2xl bg-black/40 p-5 text-xs ring-1 ring-white/10">
        <h3 className="text-[13px] font-semibold">About Nikos</h3>
        <p className="text-white/80">
          For as long as I can remember, I’ve been searching for where I belong.
          You know that feeling of almost fitting in, but never fully?
        </p>
        <p className="text-white/80">
          I’ve walked the path of consciousness and transformation for over 20
          years, returning to the work at different stages of my life. Each
          time, I came back changed. And each time, I felt more alone.
        </p>
        <p className="text-white/80">
          Living in central Pennsylvania, not exactly a hub for the conscious
          community, I’d come home from deep spiritual experiences feeling
          completely isolated. That loneliness after transformation is a special
          kind of hard.
        </p>
        <p className="text-white/80">
          So I built Violette for everyone who’s ever felt the same way. A place
          where you can find your people and build communities that can’t be
          taken away. Where leaders can bring their communities home without
          fear of censorship or arbitrary takedowns. Where no one has to feel
          alone just because their physical location doesn’t have a conscious
          community.
        </p>
        <p className="text-white/80">
          When you find your people, everything changes: healing deepens,
          purpose clarifies, and life expands. That’s what I want for you.
        </p>
        <p className="text-white/80">
          Join us. Find your people. Build your community. And never feel alone
          in your journey again.
        </p>
      </article>
    </section>
  );
}

function StoriesSection() {
  return (
    <section id="stories" className="space-y-6 text-white">
      <div className="space-y-2">
        <h2 className="text-sm font-semibold">Stories from Our Community</h2>
        <p className="max-w-2xl text-xs text-white/80">
          Real reflections from people who are building soul connections,
          friendships, and collaborations through Violette.
        </p>
      </div>
      <div className="space-y-4">
        <article className="space-y-3 rounded-3xl bg-black/30 p-6 text-xs ring-1 ring-white/10">
          <p className="text-white/80">
            “Violette – what does it mean? To me, Violette is more than just
            another platform for beings to connect. It’s more than searching for
            your true love match. It’s more than finding a friend to explore the
            world with. It’s more than building your brand.
          </p>
          <p className="text-white/80">
            Violette is a place where we can build soul connections. A place
            where we can grow our communities together. A place where you can
            finally feel like you belong and go beyond something greater than
            you could ever possibly imagine.
          </p>
          <p className="text-white/80">
            So join us, and tell me what Violette means to you. Because as I see
            it, Violette is a beautiful space for everyone to collide. And we
            want to welcome you home.”
          </p>
          <p className="text-[11px] font-semibold text-white/80">
            — Lena Penn, Community Member
          </p>
        </article>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="space-y-2 rounded-3xl bg-black/30 p-5 text-xs ring-1 ring-white/10">
            <p className="text-white/80">
              “Finally found my medicine community in NYC! Violette makes the
              city feel less like a concrete jungle and more like sacred
              ground—connected with people who speak my language and understand
              the path.”
            </p>
            <p className="text-[11px] font-semibold text-white/80">
              — Rob M., Plant Medicine Practitioner
            </p>
          </article>
          <article className="space-y-2 rounded-3xl bg-black/30 p-5 text-xs ring-1 ring-white/10">
            <p className="text-white/80">
              “Connected with amazing retreat facilitators who share my values
              around ethical plant medicine work. We’ve co-created healing
              retreats together, building genuine partnerships rooted in
              service.”
            </p>
            <p className="text-[11px] font-semibold text-white/80">
              — Sofia M., Retreat Facilitator
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function WaitlistExplainerSection({
  email,
  setEmail,
  emailError,
  waitlistState,
  referralLink,
  copied,
  copyError,
  onSubmit,
  onCopyReferral,
}: WaitlistProps) {
  const isLoading = waitlistState === "submitting";
  const isSuccess = waitlistState === "success";

  return (
    <section className="grid gap-8 rounded-3xl bg-black/25 p-8 text-white ring-1 ring-white/10 md:grid-cols-[3fr,2fr]">
      <div className="space-y-3 text-xs">
        <h2 className="text-sm font-semibold">Join the Waitlist</h2>
        <p className="text-white/80">
          Violette is opening in waves to keep the experience intimate and
          grounded. Join the waitlist today and we’ll invite you in as new
          spaces open.
        </p>
        <ul className="space-y-2">
          <li>
            <span className="font-semibold">Step 1 – Save your spot.</span> Enter
            your email to join the waitlist. We’ll keep your information private
            and only email you when it truly matters.
          </li>
          <li>
            <span className="font-semibold">Step 2 – Share with your people.</span>{" "}
            After you join, you’ll receive a personal invite link. Share it with
            friends and community members who are aligned with this work.
          </li>
          <li>
            <span className="font-semibold">
              Step 3 – Move up in line together.
            </span>{" "}
            Each person who joins through your link helps you move up the
            waitlist, bringing you closer to entering Violette with your people
            by your side.
          </li>
        </ul>
      </div>
      <div className="space-y-4 rounded-2xl bg-black/40 p-5 ring-1 ring-white/10">
        <form onSubmit={onSubmit} className="space-y-3" noValidate>
          <div className="space-y-1">
            <label
              htmlFor="secondary-email"
              className="block text-xs font-medium text-white/80"
            >
              Email
            </label>
            <input
              id="secondary-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="block w-full rounded-full border border-white/15 bg-black/60 px-4 py-2 text-xs text-white outline-none placeholder:text-white/40 focus:border-[#FF9B6A] focus:ring-1 focus:ring-[#FF9B6A]"
              placeholder="you@example.com"
              autoComplete="email"
            />
            {emailError && (
              <p className="text-xs text-[#FF7B54]" aria-live="polite">
                {emailError}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#261C46] shadow-sm transition hover:bg-[#FF9B6A] hover:text-[#261C46] disabled:cursor-not-allowed disabled:bg-white/70"
          >
            {isLoading ? "Joining…" : "Join the waitlist"}
          </button>
          <p className="text-[11px] text-white/60">
            It takes less than 10 seconds.
          </p>
        </form>

        {isSuccess && referralLink && (
          <div className="space-y-2 rounded-xl bg-black/60 p-3">
            <p className="text-xs font-semibold text-white">
              You’re on the waitlist.
            </p>
            <p className="text-[11px] text-white/70">
              Share your invite link to move up in line with people who are
              truly aligned.
            </p>
            <div className="mt-2 space-y-2">
              <label
                htmlFor="secondary-referral"
                className="text-[11px] font-medium text-white/80"
              >
                Your invite link
              </label>
              <div className="flex gap-2">
                <input
                  id="secondary-referral"
                  className="flex-1 truncate rounded-full border border-white/15 bg-black/80 px-3 py-2 text-[11px] text-white"
                  value={referralLink}
                  readOnly
                />
                <button
                  type="button"
                  onClick={onCopyReferral}
                  className="whitespace-nowrap rounded-full bg-white px-3 py-2 text-[11px] font-semibold text-[#261C46] hover:bg-[#FF9B6A]"
                >
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
              <p className="text-[11px] text-white/60">
                Each person who joins through your link helps you move up the
                waitlist.
              </p>
              {copyError && (
                <p className="text-[11px] text-[#FF7B54]" aria-live="polite">
                  We couldn’t copy the link automatically. Please select and
                  copy it manually.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section
      id="faq"
      className="space-y-5 rounded-3xl bg-black/25 p-8 text-white ring-1 ring-white/10"
    >
      <div className="space-y-2">
        <h2 className="text-sm font-semibold">Frequently Asked Questions</h2>
        <p className="max-w-2xl text-xs text-white/80">
          A few answers to the questions we hear most often. We’ll keep this
          evolving as the community grows.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FAQItem
          question="What is Violette?"
          answer="Violette is a community-first social network designed for seekers, healers, and conscious creators. It’s a home for intentional communities centered around healing, spirituality, and purpose-driven collaboration—not another endless, ad-driven feed."
        />
        <FAQItem
          question="Who is Violette for?"
          answer="Violette is for people walking a conscious path: plant medicine practitioners and participants, facilitators, space-holders, spiritual explorers, somatic guides, and anyone longing for authentic community and aligned collaboration."
        />
        <FAQItem
          question="How is Violette different from mainstream social media?"
          answer="There are no ads, no manipulative algorithms, and no censorship of aligned spiritual or healing content. Violette is built to protect your energy, not drain it—prioritizing depth, safety, and sovereignty over engagement at all costs."
        />
        <FAQItem
          question="How does the waitlist work?"
          answer="Join with your email to save your spot. You’ll receive a personal invite link to share with aligned friends. As people join through your link, you move up the waitlist and will be invited into the platform sooner."
        />
        <FAQItem
          question="Do I need an invite code to join?"
          answer="No. Anyone can join the waitlist. If you’ve been given an invite code by a community leader, partner, or friend, you’ll be able to enter it and skip the waitlist once we open your cohort."
        />
        <FAQItem
          question="Can I host my community on Violette?"
          answer="Yes. We’re onboarding an initial wave of community leaders, facilitators, and organizations to host their communities on Violette. Apply to build your community, and we’ll reach out when there’s a fit."
        />
        <FAQItem
          question="When will Violette launch?"
          answer="We’re rolling out in phases to ensure we grow in a grounded, sustainable way. Join the waitlist, and we’ll keep you updated with timelines, early access opportunities, and community invitations as we expand."
        />
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-2xl bg-black/40 p-4 text-xs ring-1 ring-white/10">
      <h3 className="text-[13px] font-semibold">{question}</h3>
      <p className="mt-1 text-white/80">{answer}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-12 rounded-3xl bg-black/40 px-6 py-6 text-[11px] text-white/70 ring-1 ring-white/10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>
          Violette — The sacred social network for seekers, healers, and
          conscious creators.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#violette-way" className="hover:text-white">
            The Violette Way
          </a>
          <button type="button" className="hover:text-white">
            Privacy Policy
          </button>
          <button type="button" className="hover:text-white">
            Terms of Use
          </button>
          <button type="button" className="hover:text-white">
            Contact
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>© Violette. All rights reserved. Built with love for the conscious community.</p>
      </div>
    </footer>
  );
}

function InviteDialog({
  inviteCode,
  setInviteCode,
  inviteStatus,
  onClose,
  onSubmit,
  onContinueToSignup,
}: InviteDialogProps) {
  const isChecking = inviteStatus === "checking";
  const isValid = inviteStatus === "valid";
  const isInvalid = inviteStatus === "invalid";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
      <div className="w-full max-w-md rounded-3xl bg-[#261C46] p-6 text-white ring-1 ring-white/10">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold">Enter your invite code</h2>
            <p className="text-xs text-white/80">
              If your code is valid, you’ll skip the waitlist and go straight
              into the sign-up flow.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-white/60 hover:text-white"
          >
            Close
          </button>
        </div>
        <form onSubmit={onSubmit} className="mt-4 space-y-3" noValidate>
          <div className="space-y-1">
            <label
              htmlFor="invite-code"
              className="block text-xs font-medium text-white/80"
            >
              Invite code
            </label>
            <input
              id="invite-code"
              type="text"
              value={inviteCode}
              onChange={(event) => setInviteCode(event.target.value)}
              placeholder="e.g. VIOLETTE-1234"
              className="block w-full rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs text-white outline-none placeholder:text-white/40 focus:border-[#FF9B6A] focus:ring-1 focus:ring-[#FF9B6A]"
            />
          </div>
          <button
            type="submit"
            disabled={isChecking}
            className="flex w-full items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#261C46] shadow-sm transition hover:bg-[#FF9B6A] hover:text-[#261C46] disabled:cursor-not-allowed disabled:bg-white/70"
          >
            {isChecking ? "Checking…" : "Continue"}
          </button>
        </form>
        {isValid && (
          <div className="mt-3 space-y-2 text-xs text-emerald-300" aria-live="polite">
            <p>This invite code looks good.</p>
            <button
              type="button"
              onClick={onContinueToSignup}
              className="inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-semibold text-[#261C46] shadow-sm transition hover:bg-[#FF9B6A] hover:text-[#261C46]"
            >
              Continue to sign up
            </button>
          </div>
        )}
        {isInvalid && (
          <div className="mt-3 space-y-1 text-xs text-[#FF7B54]" aria-live="polite">
            <p>This invite code doesn’t look valid or may have expired.</p>
            <p className="text-white/80">
              You can still{" "}
              <a href="#waitlist" className="underline">
                join the waitlist
              </a>{" "}
              to be invited in future waves.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

