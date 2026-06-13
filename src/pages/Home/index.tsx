import { Link } from 'react-router-dom';

export default function HomePage() {
  const featureCards = [
    {
      icon: 'search_insights',
      title: 'Scheme Discovery',
      copy: 'Intelligent scanning across thousands of central and state incentives to match your unique business profile with precision.',
      accent: 'text-primary bg-primary/5',
    },
    {
      icon: 'verified_user',
      title: 'Unlock Center',
      copy: 'Identify the exact certifications and registrations needed to access premium credit facilities and government benefits.',
      accent: 'text-secondary bg-secondary/5',
    },
    {
      icon: 'health_metrics',
      title: 'Compliance Intelligence',
      copy: 'Pro-active health monitoring for your licenses, tax filings, and regulatory updates, ensuring you stay ahead of every deadline.',
      accent: 'text-tertiary bg-tertiary-container/10',
    },
    {
      icon: 'smart_toy',
      title: 'AI Advisor',
      copy: 'Personalized guidance that translates complex policy changes into actionable business intelligence for your specific industry.',
      accent: 'text-primary bg-primary/5',
    },
    {
      icon: 'map',
      title: 'Growth Roadmap',
      copy: 'A strategic, long-term view of incentives and expansions available to your business as you scale through different tiers of compliance.',
      accent: 'text-secondary bg-secondary/5',
      span: 'lg:col-span-2',
    },
  ];

  return (
    <main className="overflow-x-hidden bg-surface text-on-surface">
      <nav className="sticky top-0 z-50 w-full border-b border-outline-variant/30 bg-surface/90 backdrop-blur-md px-6 py-3 md:px-12">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              alt="VyaparSetu Logo"
              className="h-8 w-auto"
              src="https://lh3.googleusercontent.com/aida/AP1WRLthRO3OR_dC3Lz8GuNXhLyHeOjd2Fq4rmvA6cuXmv5HDDzj2iTuCc-8MlwbjjX95L50b3o2ZAXzXgYVJgvV6fS-m5RidPrNZkg4u8YaLSESietAQpY80dmaHLjjWdXWP99sr-dfWpEfwFPiCABbCdKuXNptEwyjj20EzolUKDrd-bHkzxP3_ibc_j2ptOihltcSvhPBD60EfJPnP7cz6aHAjxt43fncbt7mcjlC035pTVfeLTmIL907AUs"
            />
            <span className="text-xl font-semibold tracking-tight text-primary">VyaparSetu</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a className="text-sm font-semibold text-primary" href="#features">Features</a>
            <a className="text-sm text-on-surface-variant transition hover:text-primary" href="#solutions">Solutions</a>
            <a className="text-sm text-on-surface-variant transition hover:text-primary" href="#about">About</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth?mode=login" className="rounded-full px-4 py-2 text-sm font-semibold text-on-surface-variant transition hover:text-primary">Sign In</Link>
            <Link to="/auth?mode=register" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-on-primary shadow-lg shadow-primary/20 transition hover:scale-[1.02]">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="overflow-x-hidden">
        <section className="relative overflow-hidden pb-24 pt-16 md:pt-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.08),transparent_60%)]" />
          <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center md:px-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">AI-Powered Compliance</div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-on-surface md:text-6xl">Unlock Government Benefits for Your Business</h1>
            <p className="mt-6 max-w-3xl text-lg text-on-surface-variant md:text-xl">Discover thousands of schemes and incentives tailored for your industry. Our intelligence engine simplifies complex regulations into a clear growth roadmap.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-on-surface-variant md:gap-6">
              {['Find Schemes', 'Unlock Benefits', 'Stay Compliant', 'Grow Faster'].map((item) => (
                <span key={item} className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm ring-1 ring-outline-variant/30">✓ {item}</span>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Link to="/auth?mode=register" className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-on-primary shadow-lg shadow-primary/20 transition hover:scale-[1.02]">Analyze My Business</Link>
              <Link to="/auth?mode=login" className="rounded-full border border-outline-variant/40 bg-surface-container-low px-6 py-3 text-base font-semibold text-on-surface transition hover:bg-surface-container">Explore Opportunities</Link>
            </div>
            <div className="mt-14 w-full max-w-6xl rounded-3xl border border-outline-variant/30 bg-white p-3 shadow-2xl shadow-primary/10">
              <img
                alt="VyaparSetu dashboard mockup"
                className="h-auto w-full rounded-2xl object-cover"
                src="https://lh3.googleusercontent.com/aida/AP1WRLtOcqv6HKb34oxAlNgRZrE6Wk9G5RbWfoUto4p33sg2--5dA4KNcxGx_pFKidLESDsNsPdaJJmWFwaHYIBhHWRWz1ynFUsuiX8cmMXJ8ROs2nkcby3NAsLFbydQUIZux5SMOHq364FPvKu3DziJE7cSjBbzCysp9-NWnzvDdDNl_9N131egOSIro2YqpllPBz91tuGXsiVTl9bY0LSIzW2ds4q9dDl8_dzCnSv3ZwkbusLg6OXZfuhevxY"
              />
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3 md:px-12">
            {[
              ['50+', 'Government Schemes'],
              ['10+', 'Compliance Checks'],
              ['AI Recommendations', 'AI Recommendations'],
            ].map(([value, label]) => (
              <article key={label} className="rounded-3xl border border-outline-variant/30 bg-white p-8 text-center shadow-sm">
                <div className="text-4xl font-semibold text-primary md:text-5xl">{value}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.2em] text-on-surface-variant">{label}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="features" className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-on-surface md:text-4xl">Intelligence for Modern Enterprise</h2>
              <p className="mt-4 text-lg text-on-surface-variant">Precision-engineered tools to navigate the regulatory landscape with confidence and speed.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {featureCards.map((card) => (
                <article key={card.title} className={`rounded-3xl border border-outline-variant/20 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${card.span ?? ''}`}>
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${card.accent}`}>
                    <span className="material-symbols-outlined">{card.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-on-surface">{card.title}</h3>
                  <p className="mt-3 text-on-surface-variant">{card.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="solutions" className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl rounded-4xl bg-on-surface px-6 py-14 text-surface md:px-12">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px]">
              <div>
                <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-4xl">Ready to transform your business's regulatory outlook?</h2>
                <p className="mt-5 max-w-2xl text-lg text-surface-dim">Join over 5,000 Indian businesses using VyaparSetu to streamline their relationship with government policy and unlock hidden capital.</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/auth?mode=register" className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-on-primary shadow-lg shadow-primary/20">Start Free Scan</Link>
                  <Link to="/auth?mode=login" className="rounded-full border border-surface/30 px-6 py-3 text-base font-semibold text-surface transition hover:bg-surface/5">Talk to Advisor</Link>
                </div>
              </div>
              <aside className="rounded-3xl border border-surface/10 bg-surface/5 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-surface-dim">AI Advisor Online</div>
                <div className="space-y-4">
                  {[
                    'I\'ve found 3 new export incentives you qualify for...',
                    'MSME certificate renewal due in 12 days.',
                    'Analysis complete: +12% potential growth uncovered.',
                  ].map((item, index) => (
                    <div key={item} className={`rounded-2xl p-4 text-sm ${index === 2 ? 'bg-primary/20 text-secondary-fixed' : 'bg-surface/5 text-surface-bright'}`}>
                      {item}
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <footer id="about" className="border-t border-outline-variant/20 bg-surface py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-12">
          <div>
            <div className="flex items-center gap-3">
              <img alt="VyaparSetu Logo" className="h-6 w-auto grayscale opacity-70" src="https://lh3.googleusercontent.com/aida/AP1WRLthRO3OR_dC3Lz8GuNXhLyHeOjd2Fq4rmvA6cuXmv5HDDzj2iTuCc-8MlwbjjX95L50b3o2ZAXzXgYVJgvV6fS-m5RidPrNZkg4u8YaLSESietAQpY80dmaHLjjWdXWP99sr-dfWpEfwFPiCABbCdKuXNptEwyjj20EzolUKDrd-bHkzxP3_ibc_j2ptOihltcSvhPBD60EfJPnP7cz6aHAjxt43fncbt7mcjlC035pTVfeLTmIL907AUs" />
              <span className="text-lg font-semibold text-on-surface">VyaparSetu</span>
            </div>
            <p className="mt-2 text-sm text-on-surface-variant">© 2024 VyaparSetu. The Invisible Architect.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-on-surface-variant">
            {['Features', 'Solutions', 'About', 'Contact', 'Privacy', 'Terms'].map((item) => (
              <a key={item} className="transition hover:text-primary" href="#">{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
