import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step3Schema, type Step3Data } from '../../../schemas/onboarding.schema';
import { cn } from '../../../utils/cn';

const labelClass = 'block text-body-md text-on-surface-variant mb-1';

const inputClass =
  'w-full h-12 pl-8 pr-md rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 text-body-md text-on-surface placeholder:text-on-surface-variant/40';

const plainInputClass =
  'w-full h-12 px-md rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 text-body-md text-on-surface placeholder:text-on-surface-variant/40';

const selectClass =
  'w-full h-12 px-md rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 text-body-md text-on-surface appearance-none cursor-pointer';

function getMsmeCategory(turnover: string): { label: string; color: string } {
  const val = parseFloat(turnover || '0');
  if (val <= 5) return { label: 'Micro Enterprise', color: 'text-primary' };
  if (val <= 50) return { label: 'Small Enterprise', color: 'text-secondary' };
  return { label: 'Medium Enterprise', color: 'text-tertiary' };
}

interface Props {
  defaultValues?: Partial<Step3Data>;
  onNext: (data: Step3Data) => void;
}

export const Step3BusinessScale = ({ defaultValues, onNext }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      maleEmployees: 0,
      femaleEmployees: 0,
      investmentType: 'bootstrap',
      ...defaultValues,
    },
  });

  const turnover = useWatch({ control, name: 'annualTurnover' });
  const msme = getMsmeCategory(turnover ?? '');

  return (
    <div className="flex gap-8 min-h-0">
      {/* Left: Form */}
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h1 className="text-headline-lg-mobile font-semibold text-on-surface tracking-tight mb-1">
            Tell us about your business scale
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Accurate data helps us tailor your financial compliance and tax strategies.
          </p>
        </div>

        <form id="step3-form" onSubmit={handleSubmit(onNext)}>
          <div className="bg-white rounded-2xl border border-outline-variant/40 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <span className="material-symbols-outlined text-primary text-[20px]">bar_chart</span>
              <span className="text-title-md font-semibold text-on-surface">Operations & Scale</span>
            </div>

            <div className="space-y-4">
              {/* Annual Turnover */}
              <div>
                <label className={labelClass} htmlFor="annualTurnover">Annual Turnover Range (INR Crores)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium text-sm">₹</span>
                  <input
                    id="annualTurnover"
                    className={inputClass}
                    placeholder="e.g. 2.5"
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('annualTurnover')}
                  />
                </div>
              </div>

              {/* Plant Investment */}
              <div>
                <label className={labelClass} htmlFor="plantInvestment">Investment in Plant & Machinery (INR Crores)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium text-sm">₹</span>
                  <input
                    id="plantInvestment"
                    className={inputClass}
                    placeholder="e.g. 0.5"
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('plantInvestment')}
                  />
                </div>
              </div>

              {/* Investment Raised */}
              <div>
                <label className={labelClass} htmlFor="investmentRaised">Investment Raised</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium text-sm">₹</span>
                  <input
                    id="investmentRaised"
                    className={inputClass}
                    placeholder="e.g. 50 Lakhs"
                    {...register('investmentRaised')}
                  />
                </div>
              </div>

              {/* Investment Type */}
              <div>
                <label className={labelClass} htmlFor="investmentType">Investment Type</label>
                <div className="relative">
                  <select
                    id="investmentType"
                    className={cn(selectClass, errors.investmentType && 'border-error')}
                    {...register('investmentType')}
                  >
                    <option value="bootstrap">Bootstrap</option>
                    <option value="angel">Angel Investment</option>
                    <option value="vc">Venture Capital</option>
                    <option value="bank_loan">Bank Loan</option>
                    <option value="government_grant">Government Grant</option>
                    <option value="crowdfunding">Crowdfunding</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none text-[20px]">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Calculated MSME Category */}
              <div className={cn('rounded-xl border-2 border-primary/20 bg-primary/5 p-3 flex items-center gap-2')}>
                <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
                <div>
                  <p className="text-xs text-on-surface-variant">Calculated MSME Category</p>
                  <p className={cn('text-sm font-semibold', msme.color)}>{msme.label}</p>
                </div>
                <p className="text-xs text-on-surface-variant ml-1">Based on current turnover and investment inputs.</p>
              </div>

              {/* Employee + Year */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="totalEmployees">Total Employee Count</label>
                  <input
                    id="totalEmployees"
                    className={plainInputClass}
                    placeholder="e.g. 15"
                    type="number"
                    min="0"
                    {...register('totalEmployees')}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="yearEstablished">Year Established</label>
                  <input
                    id="yearEstablished"
                    className={plainInputClass}
                    placeholder="YYYY"
                    maxLength={4}
                    {...register('yearEstablished')}
                  />
                </div>
              </div>

              {/* Male + Female Employees */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="maleEmployees">Male</label>
                  <input
                    id="maleEmployees"
                    className={plainInputClass}
                    type="number"
                    min="0"
                    {...register('maleEmployees')}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="femaleEmployees">Female</label>
                  <input
                    id="femaleEmployees"
                    className={plainInputClass}
                    type="number"
                    min="0"
                    {...register('femaleEmployees')}
                  />
                </div>
              </div>
              <p className="text-xs text-on-surface-variant/60">
                Employee counts help determine eligibility for certain government schemes.
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Right: Scale Intelligence Panel */}
      <div className="w-72 shrink-0 space-y-3">
        {/* Header Card */}
        <div className="bg-white rounded-2xl border border-outline-variant/40 p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[18px]">smart_toy</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">Scale Intelligence</p>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">ACTIVE INSIGHT</span>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant">
            Your turnover and investment figures determine your MSME classification (Micro, Small, or Medium), unlocking different tiers of benefits.
          </p>
        </div>

        {/* Potential MSME Category */}
        <div className="bg-white rounded-2xl border border-outline-variant/40 p-4 shadow-sm">
          <p className="text-xs text-on-surface-variant/60 mb-2">Potential MSME Category</p>
          <p className="text-xl font-bold text-on-surface mb-3">Small Enterprise</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-surface-container rounded-lg">
              <span className="material-symbols-outlined text-primary/60 text-[16px]">info</span>
              <p className="text-xs text-on-surface-variant">Micro: Turnover ≤ ₹5 Cr</p>
            </div>
            <div className="flex items-center gap-2 p-2 bg-surface-container rounded-lg">
              <span className="material-symbols-outlined text-primary/60 text-[16px]">info</span>
              <p className="text-xs text-on-surface-variant">Small: Turnover ≤ ₹50 Cr</p>
            </div>
          </div>
        </div>

        {/* Why This Matters */}
        <div className="bg-white rounded-2xl border border-outline-variant/40 p-4 shadow-sm">
          <p className="text-label-sm text-on-surface-variant/60 uppercase tracking-wider mb-3">Why This Matters</p>
          <div className="space-y-2">
            {[
              'Priority Sector Lending benefits',
              'Protection against delayed payments',
              'Market support for export/tenders',
            ].map(item => (
              <div key={item} className="flex items-start gap-2">
                <span className="material-symbols-outlined text-green-600 text-[16px] mt-0.5">check_circle</span>
                <p className="text-sm text-on-surface">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Illustration */}
        <div className="bg-surface-container rounded-2xl h-32 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary/30 text-[64px]">tablet_mac</span>
        </div>
      </div>
    </div>
  );
};
