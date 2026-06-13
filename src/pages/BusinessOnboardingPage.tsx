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
  computeMsmeCategory,
} from '../features/onboarding/onboarding-options';

const TOTAL_STEPS = 5;

const STEP_TITLES = [
  'Business Identity',
  'Location',
  'Operations & Workforce',
  'Registrations & Compliance',
  'Owner Profile',
];

/* ─── Right panels ──────────────────────────────────────── */
const RightPanels: Record<number, React.ReactElement> = {
  1: (
    <div className="flex flex-col gap-7">
      <div>
        <p className="mb-2 text-[13px] font-bold uppercase tracking-widest text-[#3525cd]/60">Why this matters</p>
        <p className="text-[17px] leading-relaxed text-[#29283a]">
          Your business name, sector and constitution determine which central and state-level MSME schemes you qualify for.
        </p>
      </div>
      <div className="space-y-4">
        {[
          { icon: 'verified', text: 'Constitution unlocks credit guarantee schemes' },
          { icon: 'category', text: 'Sector maps you to 200+ targeted subsidies' },
          { icon: 'history', text: 'Year of establishment affects eligibility windows' },
        ].map(item => (
          <div key={item.text} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3525cd]/10">
              <span className="material-symbols-outlined text-[18px] text-[#3525cd]">{item.icon}</span>
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
        <p className="mb-2 text-[13px] font-bold uppercase tracking-widest text-[#3525cd]/60">State schemes</p>
        <p className="text-[17px] leading-relaxed text-[#29283a]">
          Every state has its own MSME incentive package — Maharashtra, Gujarat, and Tamil Nadu alone have 80+ exclusive schemes.
        </p>
      </div>
      <div className="rounded-2xl border border-[#3525cd]/20 bg-[#3525cd]/5 p-5">
        <p className="mb-2 text-[13px] font-bold text-[#3525cd]">Tip</p>
        <p className="text-[14px] leading-relaxed text-[#29283a]">
          District and taluka data help us match Block-level schemes like PM-Vishwakarma and Cluster Development programmes.
        </p>
      </div>
    </div>
  ),
  3: (
    <div className="flex flex-col gap-7">
      <div>
        <p className="mb-2 text-[13px] font-bold uppercase tracking-widest text-[#3525cd]/60">MSME classification</p>
        <p className="text-[17px] leading-relaxed text-[#29283a]">
          Your MSME category is auto-computed from investment and turnover as per the revised 2020 definition.
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
        <p className="mb-2 text-[13px] font-bold uppercase tracking-widest text-[#3525cd]/60">Registrations unlock benefits</p>
        <p className="text-[17px] leading-relaxed text-[#29283a]">
          Each registration you have opens additional scheme eligibility — Udyam alone unlocks 40+ exclusive schemes.
        </p>
      </div>
      <div className="rounded-2xl border border-[#3525cd]/20 bg-[#3525cd]/5 p-5">
        <p className="mb-2 text-[13px] font-bold text-[#3525cd]">Don't have Udyam yet?</p>
        <p className="text-[14px] leading-relaxed text-[#29283a]">
          We'll guide you to udyamregistration.gov.in after setup — it's free and takes under 10 minutes.
        </p>
      </div>
    </div>
  ),
  5: (
    <div className="flex flex-col gap-7">
      <div>
        <p className="mb-2 text-[13px] font-bold uppercase tracking-widest text-[#3525cd]/60">Priority schemes</p>
        <p className="text-[17px] leading-relaxed text-[#29283a]">
          Social category, gender, and education unlock reserved quotas in PM-Vishwakarma, Stand-Up India, PMEGP, and Mudra Yojana.
        </p>
      </div>
      <div className="space-y-3">
        {[
          { scheme: 'Stand-Up India', note: 'SC/ST & Women entrepreneurs' },
          { scheme: 'PMEGP', note: 'Special weight for rural & BPL' },
          { scheme: 'PM-Vishwakarma', note: 'Traditional artisan communities' },
        ].map(s => (
          <div key={s.scheme} className="rounded-lg border border-[#dde1ec] bg-white px-4 py-3">
            <p className="text-[14px] font-bold text-[#070C1D]">{s.scheme}</p>
            <p className="text-[13px] text-[#6f7586]">{s.note}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ─── Form state ─────────────────────────────────────────── */
interface BusinessForm {
  business_name: string;
  sector: string;
  constitution: string;
  year_established: string;
  state: string;
  district: string;
  taluka: string;
  annual_turnover_range: string;
  investment_plant_machinery: string;
  gst_status: string;
  production_start: string;
  total_employees: string;
  male_employees: string;
  female_employees: string;
  existing_registrations: string[];
  udyam_number: string;
  gstin: string;
  pending_notices: string;
  owner_gender: string;
  owner_age_group: string;
  social_category: string;
  education: string;
  women_led: string;
  bpl_card: string;
  known_schemes: string;
}

const EMPTY: BusinessForm = {
  business_name: '', sector: '', constitution: '', year_established: '',
  state: '', district: '', taluka: '',
  annual_turnover_range: '', investment_plant_machinery: '', gst_status: '',
  production_start: '', total_employees: '', male_employees: '', female_employees: '',
  existing_registrations: [], udyam_number: '', gstin: '', pending_notices: '',
  owner_gender: '', owner_age_group: '', social_category: '', education: '',
  women_led: '', bpl_card: '', known_schemes: '',
};

/* ─── Component ──────────────────────────────────────────── */
const BusinessOnboardingPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BusinessForm>(EMPTY);

  const set = (field: keyof BusinessForm, value: string | string[]) =>
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

  return (
    <OnboardingShell
      progress={progress}
      stepLabel={`Step ${step} of ${TOTAL_STEPS}`}
      title={STEP_TITLES[step - 1]}
      rightPanel={RightPanels[step]}
      panelBg="#edf3ff"
    >
      {/* ── Step 1: Business Identity ── */}
      {step === 1 && (
        <>
          <OnboardingTitle subtitle="Tell us about your business so we can find the right schemes, loans, and compliance support.">
            Business Identity
          </OnboardingTitle>
          <div className="flex max-w-[620px] flex-col gap-7">
            <Field label="Business / Entity Name" htmlFor="business_name">
              <TextInput id="business_name" placeholder="e.g. Acme Textiles Pvt. Ltd." value={form.business_name} onChange={e => set('business_name', e.target.value)} />
            </Field>
            <Field label="Business Type (Sector)" htmlFor="sector">
              <SelectInput id="sector" placeholder="Select sector" options={SECTOR_OPTIONS} value={form.sector} onChange={e => set('sector', e.target.value)} />
            </Field>
            <Field label="Business Constitution" htmlFor="constitution">
              <SelectInput id="constitution" placeholder="Select constitution" options={CONSTITUTION_OPTIONS} value={form.constitution} onChange={e => set('constitution', e.target.value)} />
            </Field>
            <Field label="Year Established" htmlFor="year_established">
              <NumberInput id="year_established" placeholder="e.g. 2015" min={1900} max={new Date().getFullYear()} value={form.year_established} onChange={e => set('year_established', e.target.value)} />
            </Field>
            <div className="flex gap-4 pt-2">
              <PrimaryAction onClick={next}>Continue <span className="material-symbols-outlined text-[22px]">arrow_forward</span></PrimaryAction>
              <BackBtn />
            </div>
          </div>
        </>
      )}

      {/* ── Step 2: Location ── */}
      {step === 2 && (
        <>
          <OnboardingTitle subtitle="Your state, district, and taluka determine which block-level and state-specific schemes apply to you.">
            Location Details
          </OnboardingTitle>
          <div className="flex max-w-[620px] flex-col gap-7">
            <Field label="Operational State" htmlFor="state">
              <SelectInput id="state" placeholder="Select state / UT" options={STATE_OPTIONS} value={form.state} onChange={e => set('state', e.target.value)} />
            </Field>
            <Field label="District" htmlFor="district">
              <TextInput id="district" placeholder="e.g. Pune, Surat, Coimbatore" value={form.district} onChange={e => set('district', e.target.value)} />
            </Field>
            <Field label="Taluka" htmlFor="taluka">
              <TextInput id="taluka" placeholder="e.g. Haveli, Maval, Khed" value={form.taluka} onChange={e => set('taluka', e.target.value)} />
            </Field>
            <div className="flex gap-4 pt-2">
              <PrimaryAction onClick={next}>Continue <span className="material-symbols-outlined text-[22px]">arrow_forward</span></PrimaryAction>
              <BackBtn />
            </div>
          </div>
        </>
      )}

      {/* ── Step 3: Operations & Workforce ── */}
      {step === 3 && (
        <>
          <OnboardingTitle subtitle="Financial and workforce details let us auto-classify your MSME category and match relevant credit schemes.">
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
            <Field label="Production Start Date" htmlFor="production_start">
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
              <PrimaryAction onClick={next}>Continue <span className="material-symbols-outlined text-[22px]">arrow_forward</span></PrimaryAction>
              <BackBtn />
            </div>
          </div>
        </>
      )}

      {/* ── Step 4: Registrations & Compliance ── */}
      {step === 4 && (
        <>
          <OnboardingTitle subtitle="Select all existing registrations — each one unlocks additional scheme eligibility and faster approvals.">
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
            <Field label="Pending Legal Notices" htmlFor="pending_notices">
              <SelectInput id="pending_notices" placeholder="Select if any" options={NOTICE_OPTIONS} value={form.pending_notices} onChange={e => set('pending_notices', e.target.value)} />
            </Field>
            <div className="flex gap-4 pt-2">
              <PrimaryAction onClick={next}>Continue <span className="material-symbols-outlined text-[22px]">arrow_forward</span></PrimaryAction>
              <BackBtn />
            </div>
          </div>
        </>
      )}

      {/* ── Step 5: Owner Profile ── */}
      {step === 5 && (
        <>
          <OnboardingTitle subtitle="Owner details determine priority access to reserved quotas in PMEGP, Stand-Up India, and other inclusive schemes.">
            Owner Profile
          </OnboardingTitle>
          <div className="flex max-w-[620px] flex-col gap-7">
            <div className="grid grid-cols-2 gap-5">
              <Field label="Owner Gender" htmlFor="owner_gender">
                <SelectInput id="owner_gender" placeholder="Select gender" options={GENDER_OPTIONS} value={form.owner_gender} onChange={e => set('owner_gender', e.target.value)} />
              </Field>
              <Field label="Owner Age Group" htmlFor="owner_age_group">
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
            <Field label="Women-led Enterprise?" htmlFor="women_led">
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
              <TextArea id="known_schemes" placeholder="e.g. PMEGP, CGTMSE, MUDRA..." value={form.known_schemes} onChange={e => set('known_schemes', e.target.value)} />
            </Field>
            <div className="flex gap-4 pt-2">
              <PrimaryAction onClick={next}>
                Complete Setup <span className="material-symbols-outlined text-[22px]">check</span>
              </PrimaryAction>
              <BackBtn />
            </div>
          </div>
        </>
      )}
    </OnboardingShell>
  );
};

export default BusinessOnboardingPage;
