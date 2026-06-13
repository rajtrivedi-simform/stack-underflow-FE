import React from "react";
import { Link } from "react-router-dom";
import { VyaparSetuWordmark } from "../features/onboarding/OnboardingComponents";

const features = [
  {
    icon: "travel_explore",
    tone: "primary",
    title: "Scheme Discovery",
    body: "Stop scouring government portals manually. Our AI scans central and state-level incentives to find the ones that match your business profile exactly.",
  },
  {
    icon: "key",
    tone: "secondary",
    title: "Unlock Center",
    body: "See exactly what registrations or certifications you need to unlock higher-tier benefits and lower interest rates.",
  },
  {
    icon: "health_and_safety",
    tone: "tertiary",
    title: "Compliance Health",
    body: "Track license renewals, tax deadlines, and regulatory changes before they become liabilities.",
  },
];

const LandingPage = (): React.ReactElement => (
  <div className="min-h-screen bg-[#FAFAFA] text-on-surface">
    <nav className="sticky top-0 z-50 mx-auto flex w-full max-w-container-max items-center justify-between border-b border-outline-variant/30 bg-surface/80 px-md py-sm backdrop-blur-xl md:px-lg">
      <Link className="flex items-center" to="/">
        <VyaparSetuWordmark />
      </Link>

      <div className="hidden items-center gap-xl md:flex">
        <a
          className="border-b-2 border-primary pb-1 font-body-md text-body-md font-bold text-primary"
          href="#features"
        >
          Features
        </a>
        <a
          className="font-body-md text-body-md font-medium text-on-surface-variant transition-colors hover:text-primary"
          href="#solutions"
        >
          Solutions
        </a>
        <a
          className="font-body-md text-body-md font-medium text-on-surface-variant transition-colors hover:text-primary"
          href="#about"
        >
          About
        </a>
      </div>

      <div className="flex items-center gap-sm">
        <Link
          className="px-sm py-xs font-label-sm text-label-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
          to="/auth"
        >
          Sign In
        </Link>
        <Link
          className="rounded-lg bg-primary-container px-md py-xs font-label-sm text-label-sm font-bold text-on-primary shadow-soft transition-transform hover:scale-95"
          to="/register"
        >
          Get Started
        </Link>
      </div>
    </nav>

    <main className="overflow-x-hidden">
      <section className="landing-hero-gradient relative pb-lg pt-xl">
        <div className="mx-auto max-w-container-max px-md text-center">
          <div className="mb-md inline-flex items-center gap-xs rounded-full border border-secondary-container/30 bg-secondary-container/20 px-sm py-1">
            <span className="material-symbols-outlined text-[16px] text-on-secondary-container">
              auto_awesome
            </span>
            <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-on-secondary-container">
              AI-Powered Compliance
            </span>
          </div>

          <h1 className="mx-auto mb-sm max-w-[800px] font-display-lg text-display-lg leading-tight">
            Unlock Government Benefits for Your Business
          </h1>
          <p className="mx-auto mb-lg max-w-[650px] font-body-lg text-body-lg text-on-surface-variant">
            Discover schemes, improve compliance, and uncover growth
            opportunities with AI-powered business guidance tailored for your
            specific industry.
          </p>

          <div className="mb-xl flex flex-col items-center justify-center gap-md sm:flex-row">
            <Link
              className="btn-primary-gradient rounded-lg px-lg py-sm font-bold text-body-lg text-on-primary shadow-soft transition-opacity hover:opacity-90"
              to="/business-basics"
            >
              Analyze My Business
            </Link>
            <a
              className="rounded-lg border border-outline-variant px-lg py-sm font-bold text-body-lg transition-colors hover:bg-surface-container"
              href="#features"
            >
              Explore Schemes
            </a>
          </div>

          <div className="relative mx-auto max-w-[1100px] overflow-hidden rounded-xl border border-outline-variant/30 shadow-2xl">
            <img
              alt="VyaparSetu dashboard mockup"
              className="h-auto w-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH8gumZ7ByDAk_769ulkFFzgYb3MhMYkXRwu4l03tecT5Ml2J0DrhGiYaUGHWU9wB34nDjxrsYwL41cb30R7Gc_hpp7dBXRm5o4eHSdxhzC-aYU4zPIaUHJOsttVSw4Y25MaW6XmIQ80-n3w7B2CSSxI2JBNYYQ2YcC955W6WM5_M4mN1LZ6XiQGtTGKzzkPo76JS9zqq0aH65ZpgUFSvw4GXtDNUQJtEkIqQCLPGEl24_fa6Iz_i0Rx2vfRn_0YjjRemteVEMkae4"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-lg">
        <div className="mx-auto max-w-container-max px-md">
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            <StatCard value="50+" label="Government Schemes" />
            <StatCard value="10+" label="Compliance Checks" tone="secondary" />
            <div className="landing-card-hover rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-md text-center shadow-soft">
              <div className="mb-xs flex justify-center">
                <span className="material-symbols-outlined text-[40px] text-primary">
                  temp_preferences_custom
                </span>
              </div>
              <div className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-on-surface-variant">
                AI Powered Recommendations
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-xl">
        <div className="mx-auto max-w-container-max px-md">
          <div className="mb-xl text-center">
            <h2 className="mb-sm font-display-lg text-headline-lg">
              Precision Engineering for Growth
            </h2>
            <p className="mx-auto max-w-[600px] font-body-lg text-body-lg text-on-surface-variant">
              Our AI-first approach reduces cognitive load during complex
              business analysis, providing editorial clarity for your next move.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="solutions"
        className="relative overflow-hidden bg-on-surface py-xl text-surface"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="grid h-full w-full grid-cols-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="border-r border-surface/20" key={index} />
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-container-max px-md">
          <div className="flex flex-col items-center justify-between gap-lg lg:flex-row">
            <div className="text-left lg:max-w-[600px]">
              <h2 className="mb-md font-display-lg text-headline-lg text-surface-bright">
                Ready to transform your business&apos;s regulatory outlook?
              </h2>
              <p className="mb-lg font-body-lg text-body-lg text-surface-dim">
                Join Indian businesses using VyaparSetu to streamline their
                relationship with government policy and unlock hidden capital.
              </p>
              <div className="flex flex-col gap-md sm:flex-row">
                <Link
                  className="rounded-lg bg-primary-container px-lg py-sm text-center font-bold text-on-primary shadow-lg transition-transform hover:scale-95"
                  to="/business-basics"
                >
                  Start Free Scan
                </Link>
                <Link
                  className="rounded-lg border border-surface/30 px-lg py-sm text-center font-bold transition-colors hover:bg-surface/10"
                  to="/signup"
                >
                  Talk to Advisor
                </Link>
              </div>
            </div>

            <div className="w-full rounded-xl border border-surface/10 bg-surface/5 p-lg backdrop-blur-md lg:w-[400px]">
              <div className="mb-md flex items-center gap-sm">
                <div className="h-3 w-3 animate-pulse rounded-full bg-secondary-fixed-dim" />
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-surface-dim">
                  AI Advisor Online
                </span>
              </div>
              <div className="space-y-sm">
                <div className="rounded-lg bg-surface/10 p-sm text-body-md italic text-surface-bright">
                  &quot;I&apos;ve found 3 new export incentives you qualify
                  for...&quot;
                </div>
                <div className="rounded-lg bg-surface/10 p-sm text-body-md italic text-surface-bright">
                  &quot;MSME certificate renewal due in 12 days.&quot;
                </div>
                <div className="rounded-lg bg-primary/20 p-sm text-body-md font-bold text-secondary-fixed">
                  Analysis complete: +12% potential growth uncovered.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer
      id="about"
      className="w-full border-t border-outline-variant/20 bg-surface"
    >
      <div className="mx-auto flex w-full max-w-container-max flex-col items-center justify-between px-lg py-md md:flex-row">
        <div className="mb-md flex flex-col gap-xs text-center md:mb-0 md:text-left">
          <span className="font-title-md text-title-md font-bold text-on-surface">
            VyaparSetu
          </span>
          <p className="font-body-md text-body-md text-on-surface-variant">
            © 2024 VyaparSetu. The Invisible Architect.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-md">
          {[
            "Features",
            "Solutions",
            "About",
            "Contact",
            "Privacy",
            "Terms",
          ].map((item) => (
            <a
              className="font-label-sm text-label-sm text-on-surface-variant opacity-80 transition-colors hover:text-primary hover:opacity-100"
              href="#"
              key={item}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  </div>
);

const StatCard = ({
  label,
  tone = "primary",
  value,
}: {
  label: string;
  tone?: "primary" | "secondary";
  value: string;
}): React.ReactElement => (
  <div className="landing-card-hover rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-md text-center shadow-soft">
    <div
      className={`mb-xs font-display-lg text-headline-lg ${tone === "secondary" ? "text-secondary" : "text-primary"}`}
    >
      {value}
    </div>
    <div className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-on-surface-variant">
      {label}
    </div>
  </div>
);

const FeatureCard = ({
  body,
  icon,
  title,
  tone,
}: {
  body: string;
  icon: string;
  title: string;
  tone: string;
}): React.ReactElement => {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    tertiary: "bg-tertiary-container/10 text-tertiary-container",
  }[tone];

  return (
    <div className="landing-card-hover landing-insight-border flex flex-col items-start rounded-xl border border-outline-variant/20 bg-white p-lg shadow-soft">
      <div
        className={`mb-md flex h-12 w-12 items-center justify-center rounded-lg ${colorClasses}`}
      >
        <span className="material-symbols-outlined text-[32px]">{icon}</span>
      </div>
      <h3 className="mb-sm font-display-lg text-title-md">{title}</h3>
      <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
        {body}
      </p>
    </div>
  );
};

export default LandingPage;
