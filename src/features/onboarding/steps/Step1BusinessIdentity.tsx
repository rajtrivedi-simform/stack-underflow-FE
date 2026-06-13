import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema, type Step1Data } from '../../../schemas/onboarding.schema';
import { cn } from '../../../utils/cn';

const inputClass =
  'w-full h-12 px-md rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 text-body-md text-on-surface placeholder:text-on-surface-variant/40';

const selectClass =
  'w-full h-12 px-md rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 text-body-md text-on-surface appearance-none cursor-pointer';

const labelClass = 'block text-label-sm text-on-surface-variant mb-xs';

interface Props {
  defaultValues?: Partial<Step1Data>;
  onNext: (data: Step1Data) => void;
}

export const Step1BusinessIdentity = ({ defaultValues, onNext }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues,
  });

  return (
    <div className="flex gap-8 min-h-0">
      {/* Left: Form */}
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h1 className="text-headline-lg-mobile font-semibold text-on-surface tracking-tight mb-1">
            Let's understand your business
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Tell us a bit about your venture so we can tailor the VyaparSetu experience to your specific industry needs.
          </p>
        </div>

        <form id="step1-form" onSubmit={handleSubmit(onNext)}>
          <div className="bg-white rounded-2xl border border-outline-variant/40 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <span className="material-symbols-outlined text-primary text-[20px]">storefront</span>
              <span className="text-title-md font-semibold text-on-surface">Business Identity</span>
            </div>
            <p className="text-body-md text-on-surface-variant mb-5 -mt-3">Basic details to identify your venture</p>

            <div className="space-y-4">
              {/* Business Name */}
              <div>
                <label className={labelClass} htmlFor="businessName">Business Name</label>
                <input
                  id="businessName"
                  className={cn(inputClass, errors.businessName && 'border-error focus:border-error focus:ring-error/10')}
                  placeholder="e.g. Acme Manufacturing Co."
                  {...register('businessName')}
                />
                {errors.businessName && (
                  <p className="text-error text-xs mt-1 ml-xs">{errors.businessName.message}</p>
                )}
              </div>

              {/* Business Type + Sector */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="businessType">Business Type</label>
                  <div className="relative">
                    <select
                      id="businessType"
                      className={cn(selectClass, errors.businessType && 'border-error')}
                      {...register('businessType')}
                    >
                      <option value="">Select type</option>
                      <option value="manufacturer">Manufacturer</option>
                      <option value="trader">Trader</option>
                      <option value="service">Service Provider</option>
                      <option value="startup">Startup</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none text-[20px]">
                      expand_more
                    </span>
                  </div>
                  {errors.businessType && (
                    <p className="text-error text-xs mt-1 ml-xs">{errors.businessType.message}</p>
                  )}
                </div>

                <div>
                  <label className={labelClass} htmlFor="sector">Sector</label>
                  <div className="relative">
                    <select
                      id="sector"
                      className={cn(selectClass, errors.sector && 'border-error')}
                      {...register('sector')}
                    >
                      <option value="">Select sector</option>
                      <option value="technology">Technology</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="retail">Retail & Commerce</option>
                      <option value="food">Food & Beverage</option>
                      <option value="textile">Textile</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="agriculture">Agriculture</option>
                      <option value="education">Education</option>
                      <option value="finance">Finance & Fintech</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none text-[20px]">
                      expand_more
                    </span>
                  </div>
                  {errors.sector && (
                    <p className="text-error text-xs mt-1 ml-xs">{errors.sector.message}</p>
                  )}
                </div>
              </div>

              {/* Sub-sector */}
              <div>
                <label className={labelClass} htmlFor="subSector">Sub-sector</label>
                <div className="relative">
                  <select
                    id="subSector"
                    className={cn(selectClass, errors.subSector && 'border-error')}
                    {...register('subSector')}
                  >
                    <option value="">Select sub-sector</option>
                    <option value="saas">SaaS</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="fintech">Fintech</option>
                    <option value="edtech">EdTech</option>
                    <option value="healthtech">HealthTech</option>
                    <option value="agritech">AgriTech</option>
                    <option value="manufacturing_auto">Auto Components</option>
                    <option value="manufacturing_pharma">Pharma</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none text-[20px]">
                    expand_more
                  </span>
                </div>
                {errors.subSector && (
                  <p className="text-error text-xs mt-1 ml-xs">{errors.subSector.message}</p>
                )}
              </div>

              {/* Constitution Type + Production Start Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="constitutionType">Constitution Type</label>
                  <div className="relative">
                    <select
                      id="constitutionType"
                      className={cn(selectClass, errors.constitutionType && 'border-error')}
                      {...register('constitutionType')}
                    >
                      <option value="">Select constitution</option>
                      <option value="pvt_ltd">Private Limited</option>
                      <option value="llp">LLP</option>
                      <option value="opc">One Person Company</option>
                      <option value="partnership">Partnership</option>
                      <option value="proprietorship">Sole Proprietorship</option>
                      <option value="section8">Section 8 Company</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none text-[20px]">
                      expand_more
                    </span>
                  </div>
                  {errors.constitutionType && (
                    <p className="text-error text-xs mt-1 ml-xs">{errors.constitutionType.message}</p>
                  )}
                </div>

                <div>
                  <label className={labelClass} htmlFor="productionStartDate">Production Start Date</label>
                  <input
                    id="productionStartDate"
                    className={inputClass}
                    placeholder="MM / YYYY"
                    {...register('productionStartDate')}
                  />
                </div>
              </div>

              {/* Startup Stage */}
              <div>
                <label className={labelClass} htmlFor="startupStage">Startup Stage</label>
                <div className="relative">
                  <select
                    id="startupStage"
                    className={cn(selectClass, errors.startupStage && 'border-error')}
                    {...register('startupStage')}
                  >
                    <option value="">Select stage</option>
                    <option value="ideation">Ideation</option>
                    <option value="validation">Validation</option>
                    <option value="early_traction">Early Traction</option>
                    <option value="scaling">Scaling</option>
                    <option value="growth">Growth</option>
                    <option value="mature">Mature</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none text-[20px]">
                    expand_more
                  </span>
                </div>
                {errors.startupStage && (
                  <p className="text-error text-xs mt-1 ml-xs">{errors.startupStage.message}</p>
                )}
              </div>

              {/* Startup Description */}
              <div>
                <label className={labelClass} htmlFor="startupDescription">Startup Description</label>
                <textarea
                  id="startupDescription"
                  rows={4}
                  className="w-full px-md py-3 rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 text-body-md text-on-surface placeholder:text-on-surface-variant/40 resize-none"
                  placeholder="Describe your startup's core mission and product"
                  {...register('startupDescription')}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Right: Side Panel */}
      <div className="w-72 shrink-0 space-y-3">
        {/* AI Advisor */}
        <div className="bg-primary rounded-2xl p-4 text-white">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
            </div>
            <div>
              <p className="text-sm font-semibold">AI Advisor</p>
              <p className="text-xs text-white/70">Personalizing your setup</p>
            </div>
          </div>
          <p className="text-sm text-white/90 italic leading-relaxed">
            "Hi there! Providing accurate sector data helps me generate tailored market benchmarks and compliance checklists for your specific niche."
          </p>
        </div>

        {/* Pro Tips */}
        <div className="bg-white rounded-2xl border border-outline-variant/40 p-4 shadow-sm">
          <p className="text-label-sm text-on-surface-variant/60 uppercase tracking-wider mb-3">Pro Tips</p>
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="w-7 h-7 bg-surface-container rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-primary text-[16px]">badge</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface">Legally Registered Name</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Use the name mentioned in your PAN/GST registration to simplify future verification.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-7 h-7 bg-surface-container rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-primary text-[16px]">category</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface">Defining your Sector</p>
                <p className="text-xs text-on-surface-variant mt-0.5">The sector determines the default tax configurations and regulatory alerts we provide.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Assessment Insight */}
        <div className="bg-tertiary-container rounded-2xl p-4">
          <p className="text-label-sm text-white/60 uppercase tracking-wider mb-2">Assessment Insight</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-white/70 mb-1">Possible Scheme Matches</p>
              <p className="text-3xl font-bold text-white">12+</p>
            </div>
            <span className="material-symbols-outlined text-white/80 text-[32px]">trending_up</span>
          </div>
        </div>

        {/* Security Badge */}
        <div className="bg-white rounded-xl border border-outline-variant/40 p-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary text-[18px]">verified_user</span>
          <p className="text-xs text-on-surface-variant">Your data is secured with enterprise-grade AES-256 encryption.</p>
        </div>
      </div>
    </div>
  );
};
