import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  OnboardingShell,
  OnboardingTitle,
  Field,
  TextInput,
  NumberInput,
  SelectInput,
  TextArea,
  CheckboxGroup,
  RadioGroup,
  MsmeBadge,
  PrimaryAction,
} from '../features/onboarding/OnboardingComponents';
import {
  SECTOR_OPTIONS,
  CONSTITUTION_OPTIONS,
  STATE_OPTIONS,
  TURNOVER_OPTIONS,
  INVESTMENT_OPTIONS,
  GST_STATUS_OPTIONS,
  REGISTRATION_OPTIONS,
  NOTICE_OPTIONS,
  GENDER_OPTIONS,
  AGE_GROUP_OPTIONS,
  SOCIAL_CATEGORY_OPTIONS,
  EDUCATION_OPTIONS,
  STARTUP_STAGE_OPTIONS,
  INVESTMENT_RAISED_OPTIONS,
  INVESTMENT_TYPE_OPTIONS,
  computeMsmeCategory,
} from '../features/onboarding/onboarding-options';

const TOTAL_STEPS = 6;

const STEP_TITLES = [
  'Startup Identity',
  'Location & Presence',
  'Operations & Workforce',
  'Funding & Team',
  'Registrations & Compliance',
  'Founder Profile',
];

/* ─── Right panels ──────────────────────────────────────── */
const RightPanels: Record<number, React.ReactElement> = {
  1: (
    <div className="flex flex-col gap-7">
      <div>
        <p className="mb-2 text-[13px] font-bold uppercase tracking-widest text-orange-500/80">Why this matters</p>
        <p className="text-[17px] leading-relaxed text-[#29283a]">
          Your startup's sector and current stage determine which seed funds, incubation programmes, and government grants you can access.
        </p>
      </div>
      <div className="space-y-4">
        {[
          { icon: 'rocket_launch', text: 'Stage unlocks SISFS, AIM, and incubator grants' },
          { icon: 'category', text: 'Sector maps to 150+ startup-specific schemes' },
          { icon: 'verified', text: 'Constitution needed for DPIIT recognition' },
        ].map(item => (
          <div key={item.text} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50">
              <span className="material-symbols-outlined text-[18px] text-orange-500">{item.icon}</span>
            </div>
            <p className="text-[15px] leading-snug text-[#29283a]">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  ),
  2: (
    <div className="flex flex-col gap-7">
      <div>
        <p className="mb-2 text-[13px] font-bold uppercase tracking-widest text-orange-500/80">Location advantages</p>
        <p className="text-[17px] leading-relaxed text-[#29283a]">
          States like Karnataka, Maharashtra, and Telangana have dedicated startup missions with exclusive funding and mentorship programmes.
        </p>
      </div>
      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
        <p className="mb-2 text-[13px] font-bold text-orange-700">Startup Hubs</p>
        <div className="space-y-1.5 text-[14px] text-[#29283a]">
          {['Bengaluru — Electronics City, Koramangala', 'Mumbai — BKC, Powai', 'Hyderabad — HITEC City', 'Pune — Hinjewadi, Baner'].map(h => (
            <p key={h}>• {h}</p>
          ))}
        </div>
      </div>
    </div>
  ),
  3: (
    <div className="flex flex-col gap-7">
      <div>
        <p className="mb-2 text-[13px] font-bold uppercase tracking-widest text-orange-500/80">MSME classification</p>
        <p className="text-[17px] leading-relaxed text-[#29283a]">
          Even startups can qualify as Micro or Small enterprises — unlocking CGTMSE collateral-free loans and MSME procurement benefits.
        </p>
      </div>
      <div className="space-y-3">
        {[
          { cat: 'Micro', inv: '≤ ₹1 Cr', turn: '≤ ₹5 Cr', color: 'text-green-700' },
          { cat: 'Small', inv: '≤ ₹10 Cr', turn: '≤ ₹50 Cr', color: 'text-blue-700' },
          { cat: 'Medium', inv: '≤ ₹50 Cr', turn: '≤ ₹250 Cr', color: 'text-purple-700' },
        ].map(row => (
          <div key={row.cat} className="flex items-center justify-between rounded-lg border border-[#dde1ec] bg-white px-4 py-2.5 text-[14px]">
            <span className={`font-bold ${row.color}`}>{row.cat}</span>
            <span className="text-[#6f7586]">Invest {row.inv} · Turnover {row.turn}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  4: (
    <div className="flex flex-col gap-7">
      <div>
        <p className="mb-2 text-[13px] font-bold uppercase tracking-widest text-orange-500/80">Funding ecosystem</p>
        <p className="text-[17px] leading-relaxed text-[#29283a]">
          Your funding stage and investor type help us suggest the right next round — angels, VCs, or government grants like BIRAC and DST-NIDHI.
        </p>
      </div>
      <div className="space-y-3">
        {[
          { scheme: 'Startup India Seed Fund', note: 'Up to ₹20 Lakh — Idea & MVP stage' },
          { scheme: 'BIRAC BIG Grant', note: 'Up to ₹50 Lakh — Biotech startups' },
          { scheme: 'DST NIDHI PRAYAS', note: 'Up to ₹10 Lakh — Prototype building' },
        ].map(s => (
          <div key={s.scheme} className="rounded-lg border border-orange-100 bg-white px-4 py-3">
            <p className="text-[14px] font-bold text-[#070C1D]">{s.scheme}</p>
            <p className="text-[13px] text-[#6f7586]">{s.note}</p>
          </div>
        ))}
      </div>
    </div>
  ),
  5: (
    <div className="flex flex-col gap-7">
      <div>
        <p className="mb-2 text-[13px] font-bold uppercase tracking-widest text-orange-500/80">DPIIT recognition</p>
        <p className="text-[17px] leading-relaxed text-[#29283a]">
          DPIIT-recognised startups get tax exemptions under Section 80-IAC, fast-track patent filing, and access to 40+ exclusive government benefits.
        </p>
      </div>
      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
        <p className="mb-2 text-[13px] font-bold text-orange-700">Not yet recognised?</p>
        <p className="text-[14px] leading-relaxed text-[#29283a]">
          We'll guide you through the DPIIT application on startupindia.gov.in — it takes under 2 hours and is completely free.
        </p>
      </div>
    </div>
  ),
  6: (
    <div className="flex flex-col gap-7">
      <div>
        <p className="mb-2 text-[13px] font-bold uppercase tracking-widest text-orange-500/80">Inclusive schemes</p>
        <p className="text-[17px] leading-relaxed text-[#29283a]">
          Women-led, SC/ST, and first-generation entrepreneur startups get priority access in government accelerators and grant programmes.
        </p>
      </div>
      <div className="space-y-3">
        {[
          { scheme: 'WEP — Women Entrepreneurship', note: 'Mentorship + funding for women founders' },
          { scheme: 'NAARI — Nasscom', note: 'Tech accelerator for women-led startups' },
          { scheme: 'SC/ST Hub', note: 'Procurement & market access support' },
        ].map(s => (
          <div key={s.scheme} className="rounded-lg border border-orange-100 bg-white px-4 py-3">
            <p className="text-[14px] font-bold text-[#070C1D]">{s.scheme}</p>
            <p className="text-[13px] text-[#6f7586]">{s.note}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ─── Form state ─────────────────────────────────────────── */
interface StartupForm {
  business_name: string;
  sector: string;
  constitution: string;
  year_established: string;
  startup_stage: string;
  startup_description: string;
  state: string;
  district: string;
  taluka: string;
  city: string;
  annual_turnover_range: string;
  investment_plant_machinery: string;
  gst_status: string;
  production_start: string;
  total_employees: string;
  male_employees: string;
  female_employees: string;
  investment_raised: string;
  investment_type: string;
  investors: string;
  co_founders: string;
  existing_registrations: string[];
  udyam_number: string;
  gstin: string;
  dpiit_number: string;
  pending_notices: string;
  owner_gender: string;
  owner_age_group: string;
  social_category: string;
  education: string;
  women_led: string;
  bpl_card: string;
  known_schemes: string;
}

const EMPTY: StartupForm = {
  business_name: '', sector: '', constitution: '', year_established: '',
  startup_stage: '', startup_description: '',
  state: '', district: '', taluka: '', city: '',
  annual_turnover_range: '', investment_plant_machinery: '', gst_status: '',
  production_start: '', total_employees: '', male_employees: '', female_employees: '',
  investment_raised: '', investment_type: '', investors: '', co_founders: '',
  existing_registrations: [], udyam_number: '', gstin: '', dpiit_number: '', pending_notices: '',
  owner_gender: '', owner_age_group: '', social_category: '', education: '',
  women_led: '', bpl_card: '', known_schemes: '',
};

/* ─── Component ──────────────────────────────────────────── */
const StartupOnboardingPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<StartupForm>(EMPTY);

  const set = (field: keyof StartupForm, value: string | string[]) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const progress = Math.round((step / TOTAL_STEPS) * 100);
  const msmeCategory = computeMsmeCategory(form.investment_plant_machinery, form.annual_turnover_range);

  const next = () => step < TOTAL_STEPS ? setStep(s => s + 1) : navigate('/dashboard');
  const back = () => step > 1 ? setStep(s => s - 1) : navigate('/onboarding');

  const BackBtn = () => (
    <button
      type="button"
      onClick={back}
      className="flex h-[66px] w-full items-center justify-center gap-2 rounded-lg border border-[#bfc0d8] bg-white px-14 text-[22px] font-bold text-[#29283a] transition-all hover:bg-[#f8f9ff] md:w-[200px]"
    >
      <span className="material-symbols-outlined text-[22px]">arrow_back</span>
      Back
    </button>
  );

  const OrangePrimaryAction = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[66px] w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-14 text-[23px] font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-600 active:scale-95 md:w-[265px]"
    >
      {children}
    </button>
  );

  return (
    <OnboardingShell
      progress={progress}
      stepLabel={`Step ${step} of ${TOTAL_STEPS}`}
      title={STEP_TITLES[step - 1]}
      rightPanel={RightPanels[step]}
      panelBg="#fff7ed"
    >
      {/* ── Step 1: Startup Identity ── */}
      {step === 1 && (
        <>
          <OnboardingTitle subtitle="Tell us about your startup so we can match the best seed funds, government grants, and accelerator programmes.">
            Startup Identity
          </OnboardingTitle>
          <div className="flex max-w-[620px] flex-col gap-7">
            <Field label="Startup / Entity Name" htmlFor="business_name">
              <TextInput id="business_name" placeholder="e.g. FinFlow Technologies Pvt. Ltd." value={form.business_name} onChange={e => set('business_name', e.target.value)} />
            </Field>
            <Field label="Business Type (Sector)" htmlFor="sector">
              <SelectInput id="sector" placeholder="Select sector" options={SECTOR_OPTIONS} value={form.sector} onChange={e => set('sector', e.target.value)} />
            </Field>
            <Field label="Business Constitution" htmlFor="constitution">
              <SelectInput id="constitution" placeholder="Select constitution" options={CONSTITUTION_OPTIONS} value={form.constitution} onChange={e => set('constitution', e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-5">
              <Field label="Year Established" htmlFor="year_established">
                <NumberInput id="year_established" placeholder="e.g. 2022" min={1900} max={new Date().getFullYear()} value={form.year_established} onChange={e => set('year_established', e.target.value)} />
              </Field>
              <Field label="Current Stage" htmlFor="startup_stage">
                <SelectInput id="startup_stage" placeholder="Select stage" options={STARTUP_STAGE_OPTIONS} value={form.startup_stage} onChange={e => set('startup_stage', e.target.value)} />
              </Field>
            </div>
            <Field label="Startup Description" htmlFor="startup_description">
              <TextArea id="startup_description" placeholder="Briefly describe what your startup does, the problem it solves, and your target market..." value={form.startup_description} onChange={e => set('startup_description', e.target.value)} />
            </Field>
            <div className="flex gap-4 pt-2">
              <OrangePrimaryAction onClick={next}>Continue <span className="material-symbols-outlined text-[22px]">arrow_forward</span></OrangePrimaryAction>
              <BackBtn />
            </div>
          </div>
        </>
      )}

      {/* ── Step 2: Location & Presence ── */}
      {step === 2 && (
        <>
          <OnboardingTitle subtitle="Your location helps us surface state startup missions, local incubators, and city-specific accelerator programmes.">
            Location &amp; Presence
          </OnboardingTitle>
          <div className="flex max-w-[620px] flex-col gap-7">
            <Field label="Operational State" htmlFor="state">
              <SelectInput id="state" placeholder="Select state / UT" options={STATE_OPTIONS} value={form.state} onChange={e => set('state', e.target.value)} />
            </Field>
            <Field label="City of Operation" htmlFor="city">
              <TextInput id="city" placeholder="e.g. Bengaluru, Mumbai, Hyderabad" value={form.city} onChange={e => set('city', e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-5">
              <Field label="District" htmlFor="district">
                <TextInput id="district" placeholder="e.g. Bengaluru Urban" value={form.district} onChange={e => set('district', e.target.value)} />
              </Field>
              <Field label="Taluka" htmlFor="taluka">
                <TextInput id="taluka" placeholder="e.g. Bangalore North" value={form.taluka} onChange={e => set('taluka', e.target.value)} />
              </Field>
            </div>
            <div className="flex gap-4 pt-2">
              <OrangePrimaryAction onClick={next}>Continue <span className="material-symbols-outlined text-[22px]">arrow_forward</span></OrangePrimaryAction>
              <BackBtn />
            </div>
          </div>
        </>
      )}

      {/* ── Step 3: Operations & Workforce ── */}
      {step === 3 && (
        <>
          <OnboardingTitle subtitle="Revenue and workforce details help classify your MSME tier and match credit guarantee and procurement schemes.">
            Operations &amp; Workforce
          </OnboardingTitle>
          <div className="flex max-w-[620px] flex-col gap-7">
            <Field label="Annual Turnover Range" htmlFor="annual_turnover_range">
              <SelectInput id="annual_turnover_range" placeholder="Select turnover range" options={TURNOVER_OPTIONS} value={form.annual_turnover_range} onChange={e => set('annual_turnover_range', e.target.value)} />
            </Field>
            <Field label="Investment in Plant &amp; Machinery" htmlFor="investment_plant_machinery">
              <SelectInput id="investment_plant_machinery" placeholder="Select investment range" options={INVESTMENT_OPTIONS} value={form.investment_plant_machinery} onChange={e => set('investment_plant_machinery', e.target.value)} />
            </Field>
            {(form.annual_turnover_range || form.investment_plant_machinery) && (
              <MsmeBadge category={msmeCategory} />
            )}
            <Field label="GST Filing Status" htmlFor="gst_status">
              <SelectInput id="gst_status" placeholder="Select GST status" options={GST_STATUS_OPTIONS} value={form.gst_status} onChange={e => set('gst_status', e.target.value)} />
            </Field>
            <Field label="Production / Service Start Date" htmlFor="production_start">
              <TextInput id="production_start" type="date" value={form.production_start} onChange={e => set('production_start', e.target.value)} />
            </Field>
            <div className="grid grid-cols-3 gap-4">
              <Field label="Total Employees" htmlFor="total_employees">
                <NumberInput id="total_employees" placeholder="0" value={form.total_employees} onChange={e => set('total_employees', e.target.value)} />
              </Field>
              <Field label="Male Employees" htmlFor="male_employees">
                <NumberInput id="male_employees" placeholder="0" value={form.male_employees} onChange={e => set('male_employees', e.target.value)} />
              </Field>
              <Field label="Female Employees" htmlFor="female_employees">
                <NumberInput id="female_employees" placeholder="0" value={form.female_employees} onChange={e => set('female_employees', e.target.value)} />
              </Field>
            </div>
            <div className="flex gap-4 pt-2">
              <OrangePrimaryAction onClick={next}>Continue <span className="material-symbols-outlined text-[22px]">arrow_forward</span></OrangePrimaryAction>
              <BackBtn />
            </div>
          </div>
        </>
      )}

      {/* ── Step 4: Funding & Team ── */}
      {step === 4 && (
        <>
          <OnboardingTitle subtitle="Funding history and co-founder count help us surface the right next-stage grants, VC-match programmes, and ESOPs guidance.">
            Funding &amp; Team
          </OnboardingTitle>
          <div className="flex max-w-[620px] flex-col gap-7">
            <Field label="Investment Raised (Total)" htmlFor="investment_raised">
              <SelectInput id="investment_raised" placeholder="Select raised amount" options={INVESTMENT_RAISED_OPTIONS} value={form.investment_raised} onChange={e => set('investment_raised', e.target.value)} />
            </Field>
            <Field label="Investment Type" htmlFor="investment_type">
              <SelectInput id="investment_type" placeholder="Select investment type" options={INVESTMENT_TYPE_OPTIONS} value={form.investment_type} onChange={e => set('investment_type', e.target.value)} />
            </Field>
            <Field label="Investors / Partners (optional)" htmlFor="investors">
              <TextInput id="investors" placeholder="e.g. Sequoia India, Y Combinator, Accel…" value={form.investors} onChange={e => set('investors', e.target.value)} />
            </Field>
            <Field label="Number of Co-founders" htmlFor="co_founders">
              <NumberInput id="co_founders" placeholder="0" min={0} max={20} value={form.co_founders} onChange={e => set('co_founders', e.target.value)} />
            </Field>
            <div className="flex gap-4 pt-2">
              <OrangePrimaryAction onClick={next}>Continue <span className="material-symbols-outlined text-[22px]">arrow_forward</span></OrangePrimaryAction>
              <BackBtn />
            </div>
          </div>
        </>
      )}

      {/* ── Step 5: Registrations & Compliance ── */}
      {step === 5 && (
        <>
          <OnboardingTitle subtitle="Your existing registrations determine fast-track access — DPIIT recognition alone unlocks 40+ exclusive startup benefits.">
            Registrations &amp; Compliance
          </OnboardingTitle>
          <div className="flex max-w-[680px] flex-col gap-7">
            <Field label="Existing Registrations (select all that apply)" htmlFor="existing_registrations">
              <CheckboxGroup
                options={REGISTRATION_OPTIONS}
                selected={form.existing_registrations}
                onChange={v => set('existing_registrations', v)}
                columns={2}
              />
            </Field>
            <div className="grid grid-cols-2 gap-5">
              <Field label="Udyam Registration Number (optional)" htmlFor="udyam_number">
                <TextInput id="udyam_number" placeholder="UDYAM-MH-00-0000001" value={form.udyam_number} onChange={e => set('udyam_number', e.target.value)} />
              </Field>
              <Field label="GSTIN (optional)" htmlFor="gstin">
                <TextInput id="gstin" placeholder="27AAAAA0000A1Z5" value={form.gstin} onChange={e => set('gstin', e.target.value)} />
              </Field>
            </div>
            <Field label="DPIIT Certificate Number (optional)" htmlFor="dpiit_number">
              <TextInput id="dpiit_number" placeholder="DIPP12345" value={form.dpiit_number} onChange={e => set('dpiit_number', e.target.value)} />
            </Field>
            <Field label="Pending Legal Notices" htmlFor="pending_notices">
              <SelectInput id="pending_notices" placeholder="Select if any" options={NOTICE_OPTIONS} value={form.pending_notices} onChange={e => set('pending_notices', e.target.value)} />
            </Field>
            <div className="flex gap-4 pt-2">
              <OrangePrimaryAction onClick={next}>Continue <span className="material-symbols-outlined text-[22px]">arrow_forward</span></OrangePrimaryAction>
              <BackBtn />
            </div>
          </div>
        </>
      )}

      {/* ── Step 6: Founder Profile ── */}
      {step === 6 && (
        <>
          <OnboardingTitle subtitle="Founder demographics help match reserved-quota programmes for women, SC/ST, and first-generation entrepreneurs.">
            Founder Profile
          </OnboardingTitle>
          <div className="flex max-w-[620px] flex-col gap-7">
            <div className="grid grid-cols-2 gap-5">
              <Field label="Founder Gender" htmlFor="owner_gender">
                <SelectInput id="owner_gender" placeholder="Select gender" options={GENDER_OPTIONS} value={form.owner_gender} onChange={e => set('owner_gender', e.target.value)} />
              </Field>
              <Field label="Founder Age Group" htmlFor="owner_age_group">
                <SelectInput id="owner_age_group" placeholder="Select age group" options={AGE_GROUP_OPTIONS} value={form.owner_age_group} onChange={e => set('owner_age_group', e.target.value)} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Field label="Social Category" htmlFor="social_category">
                <SelectInput id="social_category" placeholder="Select category" options={SOCIAL_CATEGORY_OPTIONS} value={form.social_category} onChange={e => set('social_category', e.target.value)} />
              </Field>
              <Field label="Highest Education" htmlFor="education">
                <SelectInput id="education" placeholder="Select qualification" options={EDUCATION_OPTIONS} value={form.education} onChange={e => set('education', e.target.value)} />
              </Field>
            </div>
            <Field label="Women-led Startup?" htmlFor="women_led">
              <RadioGroup
                options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                value={form.women_led}
                onChange={v => set('women_led', v)}
                inline
              />
            </Field>
            <Field label="BPL / Antyodaya Card Holder?" htmlFor="bpl_card">
              <RadioGroup
                options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                value={form.bpl_card}
                onChange={v => set('bpl_card', v)}
                inline
              />
            </Field>
            <Field label="Government Schemes Already Known (optional)" htmlFor="known_schemes">
              <TextArea id="known_schemes" placeholder="e.g. Startup India Seed Fund, BIRAC BIG, DST NIDHI..." value={form.known_schemes} onChange={e => set('known_schemes', e.target.value)} />
            </Field>
            <div className="flex gap-4 pt-2">
              <OrangePrimaryAction onClick={next}>
                Complete Setup <span className="material-symbols-outlined text-[22px]">check</span>
              </OrangePrimaryAction>
              <BackBtn />
            </div>
          </div>
        </>
      )}
    </OnboardingShell>
  );
};

export default StartupOnboardingPage;
