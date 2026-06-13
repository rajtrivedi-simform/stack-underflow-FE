import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step4Schema, type Step4Data } from '../../../schemas/onboarding.schema';
import { cn } from '../../../utils/cn';

const inputClass =
  'w-full h-12 px-md rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 text-body-md text-on-surface placeholder:text-on-surface-variant/40';

const selectClass =
  'w-full h-12 px-md rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 text-body-md text-on-surface appearance-none cursor-pointer';

const labelClass = 'block text-label-sm text-on-surface-variant mb-xs';

interface ToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
}

const Toggle = ({ checked, onChange }: ToggleProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={cn(
      'relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none',
      checked ? 'bg-primary' : 'bg-outline-variant'
    )}
  >
    <span
      className={cn(
        'pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-md transform transition-transform duration-200',
        checked ? 'translate-x-5' : 'translate-x-0'
      )}
    />
  </button>
);

interface ToggleRowProps {
  icon: string;
  title: string;
  description: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  highlighted?: boolean;
}

const ToggleRow = ({ icon, title, description, checked, onChange, highlighted }: ToggleRowProps) => (
  <div className={cn(
    'flex items-center gap-3 p-4 rounded-xl transition-colors',
    highlighted ? 'bg-primary/5 border border-primary/20' : 'border border-outline-variant/20'
  )}>
    <div className={cn(
      'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
      highlighted ? 'bg-primary/10' : 'bg-surface-container'
    )}>
      <span className={cn('material-symbols-outlined text-[20px]', highlighted ? 'text-primary' : 'text-on-surface-variant')}>
        {icon}
      </span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-on-surface">{title}</p>
      <p className="text-xs text-on-surface-variant">{description}</p>
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

interface Props {
  defaultValues?: Partial<Step4Data>;
  onNext: (data: Step4Data) => void;
}

export const Step4FounderDetails = ({ defaultValues, onNext }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      coFounders: 0,
      isWomenLed: false,
      isStartupRecognized: false,
      isDpiitRegistered: false,
      isBplHolder: false,
      ...defaultValues,
    },
  });

  const isWomenLed = useWatch({ control, name: 'isWomenLed' });
  const isStartupRecognized = useWatch({ control, name: 'isStartupRecognized' });
  const isDpiitRegistered = useWatch({ control, name: 'isDpiitRegistered' });
  const isBplHolder = useWatch({ control, name: 'isBplHolder' });

  return (
    <div className="flex gap-8 min-h-0">
      {/* Left: Form */}
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h1 className="text-headline-lg-mobile font-semibold text-on-surface tracking-tight mb-1">
            Founder Details
          </h1>
          <p className="text-body-md text-on-surface-variant">
            We use this information to match you with specific government grants, diversity incentives, and startup tax exemptions.
          </p>
        </div>

        <form id="step4-form" onSubmit={handleSubmit(onNext)} className="space-y-4">
          {/* Leadership & Recognition */}
          <div className="bg-white rounded-2xl border border-outline-variant/40 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <span className="material-symbols-outlined text-primary text-[20px]">person_pin</span>
              <span className="text-title-md font-semibold text-on-surface">Leadership & Recognition</span>
            </div>

            <div className="space-y-4">
              {/* Founder Name */}
              <div>
                <label className={labelClass} htmlFor="founderName">Primary Founder Name</label>
                <div className="relative">
                  <input
                    id="founderName"
                    className={cn(inputClass, 'pl-10', errors.founderName && 'border-error focus:border-error')}
                    placeholder="Enter full legal name"
                    {...register('founderName')}
                  />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-[20px]">
                    person
                  </span>
                </div>
                {errors.founderName && (
                  <p className="text-error text-xs mt-1 ml-xs">{errors.founderName.message}</p>
                )}
              </div>

              {/* Gender + Age Group */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="gender">Gender</label>
                  <div className="relative">
                    <select id="gender" className={selectClass} {...register('gender')}>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="transgender">Transgender</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>
                <div>
                  <label className={labelClass} htmlFor="ageGroup">Age Group</label>
                  <div className="relative">
                    <select id="ageGroup" className={selectClass} {...register('ageGroup')}>
                      <option value="">Select Age Group</option>
                      <option value="18_25">18–25</option>
                      <option value="26_35">26–35</option>
                      <option value="36_45">36–45</option>
                      <option value="46_55">46–55</option>
                      <option value="56_plus">56+</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Category + Education */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="socialCategory">Social Category</label>
                  <div className="relative">
                    <select id="socialCategory" className={selectClass} {...register('socialCategory')}>
                      <option value="">Select Category</option>
                      <option value="general">General</option>
                      <option value="obc">OBC</option>
                      <option value="sc">SC</option>
                      <option value="st">ST</option>
                      <option value="ews">EWS</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>
                <div>
                  <label className={labelClass} htmlFor="education">Education</label>
                  <div className="relative">
                    <select id="education" className={selectClass} {...register('education')}>
                      <option value="">Select Education</option>
                      <option value="below_10th">Below 10th</option>
                      <option value="10th">10th Pass</option>
                      <option value="12th">12th Pass</option>
                      <option value="diploma">Diploma</option>
                      <option value="graduate">Graduate</option>
                      <option value="postgraduate">Post Graduate</option>
                      <option value="phd">PhD</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ownership & Funding */}
          <div className="bg-white rounded-2xl border border-outline-variant/40 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <span className="material-symbols-outlined text-primary text-[20px]">account_balance</span>
              <span className="text-title-md font-semibold text-on-surface">Ownership & Funding</span>
            </div>

            <div className="space-y-4">
              {/* Investor Details */}
              <div>
                <label className={labelClass} htmlFor="investors">Investor Details</label>
                <div className="relative">
                  <textarea
                    id="investors"
                    rows={3}
                    className="w-full px-md py-3 pl-10 rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 text-body-md text-on-surface placeholder:text-on-surface-variant/40 resize-none"
                    placeholder="List your current investors and funding rounds..."
                    {...register('investors')}
                  />
                  <span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant/40 text-[20px]">
                    payments
                  </span>
                </div>
              </div>

              {/* Co-founders + DPIIT */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="coFounders">Number of Co-founders</label>
                  <div className="relative">
                    <input
                      id="coFounders"
                      type="number"
                      min="0"
                      className={cn(inputClass, 'pl-10')}
                      placeholder="0"
                      {...register('coFounders')}
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-[20px]">
                      group
                    </span>
                  </div>
                </div>
                <div>
                  <label className={labelClass} htmlFor="dpiitNumber">DPIIT Registration Number</label>
                  <div className="relative">
                    <input
                      id="dpiitNumber"
                      className={cn(inputClass, 'pl-10')}
                      placeholder="Enter registration number"
                      {...register('dpiitNumber')}
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-[20px]">
                      badge
                    </span>
                  </div>
                </div>
              </div>

              {/* Toggle Rows */}
              <div className="space-y-2 pt-1">
                <ToggleRow
                  icon="female"
                  title="Women-led Business"
                  description="At least 51% ownership by women founders."
                  checked={isWomenLed}
                  onChange={v => setValue('isWomenLed', v)}
                />
                <ToggleRow
                  icon="rocket_launch"
                  title="Startup Recognition"
                  description="Recognized as a startup by the Govt. of India."
                  checked={isStartupRecognized}
                  onChange={v => setValue('isStartupRecognized', v)}
                  highlighted={isStartupRecognized}
                />
                <ToggleRow
                  icon="verified"
                  title="DPIIT Registered"
                  description="Possess a valid Certificate of Recognition."
                  checked={isDpiitRegistered}
                  onChange={v => setValue('isDpiitRegistered', v)}
                />
                <ToggleRow
                  icon="credit_card"
                  title="BPL Card Holder"
                  description="Possession of a valid Below Poverty Line card."
                  checked={isBplHolder}
                  onChange={v => setValue('isBplHolder', v)}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Right: Info Cards */}
      <div className="w-72 shrink-0 space-y-3">
        {/* Profile Finalization */}
        <div className="bg-primary rounded-2xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            <p className="text-sm font-semibold">Profile Finalization</p>
          </div>
          <p className="text-sm text-white/80">
            Founders of businesses similar to yours unlock an average of 6 schemes through startup recognition.
          </p>
        </div>

        {/* Eligibility Card */}
        <div className="bg-white rounded-2xl border border-outline-variant/40 p-4 shadow-sm">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-green-600 text-[18px] mt-0.5">check_box</span>
            <div>
              <p className="text-sm font-semibold text-on-surface">Eligibility: Startup India Incentives</p>
              <p className="text-xs text-on-surface-variant mt-1">
                Based on your profile, you are likely eligible for the Startup India Seed Fund Scheme (SISFS).
              </p>
            </div>
          </div>
        </div>

        {/* Diversity Impact */}
        <div className="bg-white rounded-2xl border border-outline-variant/40 p-4 shadow-sm">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">volunteer_activism</span>
            <div>
              <p className="text-sm font-semibold text-on-surface">Diversity Impact</p>
              <p className="text-xs text-on-surface-variant mt-1">
                Women-owned businesses in India qualify for exclusive micro-finance schemes like{' '}
                <a href="#" className="text-primary hover:underline">Mahila Coir Yojana</a>{' '}
                and special credit guarantee trust benefits.
              </p>
            </div>
          </div>
        </div>

        {/* Startup Recognition */}
        <div className="bg-white rounded-2xl border border-outline-variant/40 p-4 shadow-sm">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">rocket_launch</span>
            <div>
              <p className="text-sm font-semibold text-on-surface">Startup Recognition</p>
              <p className="text-xs text-on-surface-variant mt-1">
                DPIIT registration unlocks Section 80-IAC tax holidays and relaxation in public procurement norms.
                We'll automatically fetch your eligibility.
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Illustration */}
        <div className="bg-surface-container rounded-2xl h-32 flex items-center justify-center relative overflow-hidden">
          <span className="material-symbols-outlined text-primary/20 text-[80px]">dashboard</span>
          <div className="absolute bottom-2 left-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Fetching Schemes...
          </div>
        </div>

        {/* Tip */}
        <div className="bg-white rounded-xl border border-outline-variant/40 p-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-on-surface-variant/50 text-[18px]">help_outline</span>
          <p className="text-xs text-on-surface-variant">Tip: Use the name exactly as it appears on your Aadhaar/PAN card.</p>
        </div>
      </div>
    </div>
  );
};
