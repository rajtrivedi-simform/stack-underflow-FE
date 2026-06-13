import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VyaparSetuWordmark } from '../features/onboarding/OnboardingComponents';

const OnboardingPage = (): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-[#fbfbfc] font-body-md text-[#070C1D] antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#dde1ec] bg-[#fbfbff] px-6 py-5 md:px-[60px]">
        <div className="mx-auto flex max-w-[1536px] items-center justify-between">
          <VyaparSetuWordmark />
          <button
            type="button"
            onClick={() => navigate('/auth')}
            className="rounded-lg px-3 py-2 text-base font-medium text-[#17172c] transition-colors hover:text-[#3525cd]"
          >
            Save &amp; Exit
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 md:py-24">
        <div className="w-full max-w-[760px] text-center">
          {/* Eyebrow */}
          <p className="mb-4 text-[13px] font-bold uppercase tracking-widest text-[#3525cd]/60">
            Step 1 of 1
          </p>

          <h1 className="mb-4 text-[40px] font-bold leading-tight tracking-[-0.01em] text-[#07142d]">
            Which best describes you?
          </h1>
          <p className="mx-auto mb-12 max-w-[520px] text-[19px] leading-relaxed text-[#29283a]">
            We'll personalise your onboarding, scheme matches, and compliance checklist based on your profile type.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Business Card */}
            <button
              type="button"
              onClick={() => navigate('/onboarding/business')}
              className="group relative flex flex-col items-start rounded-2xl border-2 border-[#dde1ec] bg-white p-8 text-left transition-all duration-200 hover:border-[#3525cd] hover:shadow-xl hover:shadow-[#3525cd]/10 focus:outline-none focus:ring-4 focus:ring-[#3525cd]/20"
            >
              {/* Icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3525cd]/10 transition-colors group-hover:bg-[#3525cd]/15">
                <span className="material-symbols-outlined text-[34px] text-[#3525cd]">storefront</span>
              </div>

              <h2 className="mb-2 text-[24px] font-bold text-[#070C1D]">Business</h2>
              <p className="mb-6 text-[16px] leading-relaxed text-[#6f7586]">
                For established MSMEs, traders, manufacturers, and service providers looking for schemes, loans, and compliance support.
              </p>

              <div className="mt-auto flex flex-wrap gap-2">
                {['MSME', 'Udyam', 'GST Filing', 'Subsidies'].map(tag => (
                  <span key={tag} className="rounded-full bg-[#edf3ff] px-3 py-1 text-[13px] font-semibold text-[#3525cd]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex w-full items-center justify-between border-t border-[#dde1ec] pt-5">
                <span className="text-[15px] font-semibold text-[#3525cd]">Set up Business profile</span>
                <span className="material-symbols-outlined text-[22px] text-[#3525cd] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </div>
            </button>

            {/* Startup Card */}
            <button
              type="button"
              onClick={() => navigate('/onboarding/startup')}
              className="group relative flex flex-col items-start rounded-2xl border-2 border-[#dde1ec] bg-white p-8 text-left transition-all duration-200 hover:border-[#f97316] hover:shadow-xl hover:shadow-[#f97316]/10 focus:outline-none focus:ring-4 focus:ring-[#f97316]/20"
            >
              {/* Icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 transition-colors group-hover:bg-orange-100">
                <span className="material-symbols-outlined text-[34px] text-orange-500">rocket_launch</span>
              </div>

              <h2 className="mb-2 text-[24px] font-bold text-[#070C1D]">Startup</h2>
              <p className="mb-6 text-[16px] leading-relaxed text-[#6f7586]">
                For early-stage ventures, innovators, and founders seeking seed funding, DPIIT recognition, and startup-specific grants.
              </p>

              <div className="mt-auto flex flex-wrap gap-2">
                {['DPIIT', 'Seed Fund', 'Angel / VC', 'Incubation'].map(tag => (
                  <span key={tag} className="rounded-full bg-orange-50 px-3 py-1 text-[13px] font-semibold text-orange-600">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex w-full items-center justify-between border-t border-[#dde1ec] pt-5">
                <span className="text-[15px] font-semibold text-orange-500">Set up Startup profile</span>
                <span className="material-symbols-outlined text-[22px] text-orange-500 transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </div>
            </button>
          </div>

          <p className="mt-10 text-[14px] text-[#6f7586]">
            Not sure?{' '}
            <button
              type="button"
              onClick={() => navigate('/onboarding/business')}
              className="font-semibold text-[#3525cd] hover:underline"
            >
              Start with Business
            </button>{' '}
            — you can update your profile anytime.
          </p>
        </div>
      </main>
    </div>
  );
};

export default OnboardingPage;
