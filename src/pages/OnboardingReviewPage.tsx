import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { OnboardingFormData } from '../schemas/onboarding.schema';

interface ReviewSectionProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

const ReviewSection = ({ icon, title, children }: ReviewSectionProps) => (
  <div className="bg-white rounded-2xl border border-outline-variant/40 p-6 shadow-sm">
    <div className="flex items-center gap-2 mb-4">
      <span className="material-symbols-outlined text-primary text-[20px]">{icon}</span>
      <h2 className="text-title-md font-semibold text-on-surface">{title}</h2>
    </div>
    <div className="grid grid-cols-2 gap-x-6 gap-y-3">{children}</div>
  </div>
);

interface FieldProps {
  label: string;
  value?: string | number | boolean | null;
  fullWidth?: boolean;
}

const Field = ({ label, value, fullWidth }: FieldProps) => {
  const display =
    value === undefined || value === null || value === ''
      ? '—'
      : typeof value === 'boolean'
      ? value ? 'Yes' : 'No'
      : String(value);

  return (
    <div className={fullWidth ? 'col-span-2' : ''}>
      <p className="text-label-sm text-on-surface-variant/60 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-body-md text-on-surface font-medium">{display}</p>
    </div>
  );
};

const OnboardingReviewPage = (): React.ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = (location.state?.data ?? {}) as OnboardingFormData;

  const s1 = data.step1;
  const s2 = data.step2;
  const s3 = data.step3;
  const s4 = data.step4;

  const handleSubmit = () => {
    // TODO: send to API
    console.log('Submitting onboarding data', data);
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-outline-variant/30 sticky top-0 z-20">
        <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">store</span>
            <span className="font-bold text-on-surface text-sm tracking-tight">VyaparSetu</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-green-600 text-[18px]">check_circle</span>
            <span className="text-sm font-semibold text-on-surface">Assessment Complete • 100%</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left: Review Details */}
          <div className="flex-1 min-w-0 space-y-4">
            <div className="mb-2">
              <h1 className="text-headline-lg-mobile font-semibold text-on-surface tracking-tight mb-1">
                Review Your Profile
              </h1>
              <p className="text-body-md text-on-surface-variant">
                Please confirm your details before we generate your personalised scheme matches.
              </p>
            </div>

            {/* Step 1 */}
            <ReviewSection icon="storefront" title="Business Identity">
              <Field label="Business Name" value={s1?.businessName} />
              <Field label="Business Type" value={s1?.businessType} />
              <Field label="Sector" value={s1?.sector} />
              <Field label="Sub-sector" value={s1?.subSector} />
              <Field label="Constitution Type" value={s1?.constitutionType} />
              <Field label="Production Start" value={s1?.productionStartDate} />
              <Field label="Startup Stage" value={s1?.startupStage} />
              <Field label="Description" value={s1?.startupDescription} fullWidth />
            </ReviewSection>

            {/* Step 2 */}
            <ReviewSection icon="location_on" title="Location Details">
              <Field label="State" value={s2?.state} />
              <Field label="District" value={s2?.district} />
              <Field label="Taluka" value={s2?.taluka} />
              <Field label="City" value={s2?.city} />
              <Field label="Business Address" value={s2?.businessAddress} fullWidth />
            </ReviewSection>

            {/* Step 3 */}
            <ReviewSection icon="bar_chart" title="Business Scale">
              <Field label="Annual Turnover (₹ Cr)" value={s3?.annualTurnover} />
              <Field label="Plant & Machinery (₹ Cr)" value={s3?.plantInvestment} />
              <Field label="Investment Raised" value={s3?.investmentRaised} />
              <Field label="Investment Type" value={s3?.investmentType} />
              <Field label="Total Employees" value={s3?.totalEmployees} />
              <Field label="Year Established" value={s3?.yearEstablished} />
              <Field label="Male Employees" value={s3?.maleEmployees} />
              <Field label="Female Employees" value={s3?.femaleEmployees} />
            </ReviewSection>

            {/* Step 4 */}
            <ReviewSection icon="person_pin" title="Founder Details">
              <Field label="Founder Name" value={s4?.founderName} />
              <Field label="Gender" value={s4?.gender} />
              <Field label="Age Group" value={s4?.ageGroup} />
              <Field label="Social Category" value={s4?.socialCategory} />
              <Field label="Education" value={s4?.education} />
              <Field label="Co-founders" value={s4?.coFounders} />
              <Field label="DPIIT Number" value={s4?.dpiitNumber} />
              <Field label="Women-led Business" value={s4?.isWomenLed} />
              <Field label="Startup Recognition" value={s4?.isStartupRecognized} />
              <Field label="DPIIT Registered" value={s4?.isDpiitRegistered} />
              <Field label="BPL Card Holder" value={s4?.isBplHolder} />
              <Field label="Investors" value={s4?.investors} fullWidth />
            </ReviewSection>
          </div>

          {/* Right: Summary Panel */}
          <div className="w-72 shrink-0 space-y-3">
            {/* Completion Banner */}
            <div className="bg-primary rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
                <p className="font-semibold">Profile Complete!</p>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                Your business profile is ready. We've identified schemes that match your profile.
              </p>
              <div className="mt-4 bg-white/15 rounded-xl p-3 text-center">
                <p className="text-3xl font-bold">12+</p>
                <p className="text-xs text-white/70 mt-0.5">Schemes Matched</p>
              </div>
            </div>

            {/* What happens next */}
            <div className="bg-white rounded-2xl border border-outline-variant/40 p-4 shadow-sm">
              <p className="text-label-sm text-on-surface-variant/60 uppercase tracking-wider mb-3">What Happens Next</p>
              <div className="space-y-3">
                {[
                  { icon: 'verified', text: 'Your profile is verified against govt. databases' },
                  { icon: 'search', text: 'We scan 500+ active MSME schemes for your eligibility' },
                  { icon: 'send', text: 'Personalised scheme list delivered to your dashboard' },
                ].map(({ icon, text }) => (
                  <div key={icon} className="flex gap-2 items-start">
                    <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">{icon}</span>
                    <p className="text-xs text-on-surface-variant">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Security */}
            <div className="bg-white rounded-xl border border-outline-variant/40 p-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-[18px]">verified_user</span>
              <p className="text-xs text-on-surface-variant">All data encrypted with AES-256. Never shared without consent.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-outline-variant/30 sticky bottom-0 z-20">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 h-11 px-5 rounded-xl border border-outline-variant text-on-surface font-semibold text-sm hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-1.5 h-11 px-6 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-primary-container active:scale-[0.98] transition-all shadow-md shadow-primary/20"
          >
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Submit & View Schemes
          </button>
        </div>
      </footer>
    </div>
  );
};

export default OnboardingReviewPage;
