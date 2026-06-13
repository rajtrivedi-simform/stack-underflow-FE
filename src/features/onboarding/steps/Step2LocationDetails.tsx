import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step2Schema, type Step2Data } from '../../../schemas/onboarding.schema';
import { cn } from '../../../utils/cn';

const selectClass =
  'w-full h-10 px-3 rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 text-body-md text-on-surface appearance-none cursor-pointer';

const labelClass = 'block text-label-sm text-on-surface-variant/60 uppercase tracking-wider mb-1';

const STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal',
];

interface Props {
  defaultValues?: Partial<Step2Data>;
  onNext: (data: Step2Data) => void;
}

export const Step2LocationDetails = ({ defaultValues, onNext }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues,
  });

  return (
    <div className="flex gap-8 min-h-0">
      {/* Left: Form */}
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h1 className="text-headline-lg-mobile font-semibold text-on-surface tracking-tight mb-1">
            Business Assessment
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Your location helps us identify state-specific schemes and compliance requirements.
          </p>
        </div>

        <form id="step2-form" onSubmit={handleSubmit(onNext)}>
          <div className="bg-white rounded-2xl border border-outline-variant/40 p-6 shadow-sm mb-4">
            <div className="flex items-center gap-2 mb-5">
              <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
              <span className="text-title-md font-semibold text-on-surface">Location Details</span>
            </div>

            {/* State, District, Taluka, City */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              <div>
                <label className={labelClass} htmlFor="state">State</label>
                <div className="relative">
                  <select
                    id="state"
                    className={cn(selectClass, errors.state && 'border-error')}
                    {...register('state')}
                  >
                    <option value="">Select State</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none text-[18px]">
                    expand_more
                  </span>
                </div>
                {errors.state && <p className="text-error text-xs mt-1">{errors.state.message}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="district">District</label>
                <div className="relative">
                  <select
                    id="district"
                    className={cn(selectClass, errors.district && 'border-error')}
                    {...register('district')}
                  >
                    <option value="">Select Distr...</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="pune">Pune</option>
                    <option value="nashik">Nashik</option>
                    <option value="nagpur">Nagpur</option>
                    <option value="bengaluru">Bengaluru Urban</option>
                    <option value="mysuru">Mysuru</option>
                    <option value="chennai">Chennai</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="delhi">New Delhi</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none text-[18px]">
                    expand_more
                  </span>
                </div>
                {errors.district && <p className="text-error text-xs mt-1">{errors.district.message}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="taluka">Taluka</label>
                <div className="relative">
                  <select
                    id="taluka"
                    className={selectClass}
                    {...register('taluka')}
                  >
                    <option value="">Select Taluk...</option>
                    <option value="andheri">Andheri</option>
                    <option value="borivali">Borivali</option>
                    <option value="haveri">Haveri</option>
                    <option value="kolar">Kolar</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none text-[18px]">
                    expand_more
                  </span>
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="city">City</label>
                <div className="relative">
                  <select
                    id="city"
                    className={selectClass}
                    {...register('city')}
                  >
                    <option value="">Select City</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="pune">Pune</option>
                    <option value="bengaluru">Bengaluru</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="chennai">Chennai</option>
                    <option value="delhi">Delhi</option>
                    <option value="ahmedabad">Ahmedabad</option>
                    <option value="surat">Surat</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none text-[18px]">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            {/* Business Address */}
            <div>
              <label className={labelClass} htmlFor="businessAddress">Business Address</label>
              <textarea
                id="businessAddress"
                rows={4}
                className={cn(
                  'w-full px-md py-3 rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 text-body-md text-on-surface placeholder:text-on-surface-variant/40 resize-none',
                  errors.businessAddress && 'border-error focus:border-error'
                )}
                placeholder="House/Office No., Building Name, Street, Area..."
                {...register('businessAddress')}
              />
              {errors.businessAddress && (
                <p className="text-error text-xs mt-1">{errors.businessAddress.message}</p>
              )}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative rounded-2xl overflow-hidden h-48 bg-surface-container border border-outline-variant/40">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='200' fill='%23e5eeff'/%3E%3Ccircle cx='200' cy='100' r='60' fill='none' stroke='%23c7c4d8' stroke-width='1'/%3E%3Ccircle cx='200' cy='100' r='30' fill='none' stroke='%23c7c4d8' stroke-width='1'/%3E%3Cline x1='0' y1='100' x2='400' y2='100' stroke='%23c7c4d8' stroke-width='0.5'/%3E%3Cline x1='200' y1='0' x2='200' y2='200' stroke='%23c7c4d8' stroke-width='0.5'/%3E%3Ccircle cx='200' cy='100' r='5' fill='%233525cd'/%3E%3C/svg%3E")`,
                backgroundSize: 'cover',
              }}
            />
            <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              Auto-detecting precision location
            </div>
          </div>
        </form>
      </div>

      {/* Right: Vyapar AI Panel */}
      <div className="w-72 shrink-0">
        <div className="bg-white rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden h-full flex flex-col">
          {/* AI Header */}
          <div className="p-4 border-b border-outline-variant/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[18px]">smart_toy</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface">Vyapar AI</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <p className="text-xs text-green-600">Online & Proactive</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <div className="bg-surface-container rounded-xl p-3">
              <p className="text-sm text-on-surface">
                Hello! I'm analyzing your <span className="text-primary font-semibold">Regional Insights</span> based on the location data provided.
              </p>
            </div>

            <div className="bg-surface-container-low rounded-xl p-3">
              <p className="text-xs font-semibold text-primary mb-1">Regional Analysis:</p>
              <p className="text-sm text-on-surface">
                Businesses in your district often qualify for specific state-level manufacturing subsidies. I'm cross-referencing current policy updates for you.
              </p>
            </div>

            <div className="border-l-4 border-primary/40 bg-primary/5 rounded-r-xl p-3">
              <p className="text-xs font-semibold text-primary/70 uppercase tracking-wider mb-1">Regional Incentives Detected</p>
              <p className="text-sm text-on-surface">
                Your location qualifies for the 'Udyog Sahayak' scheme. This could reduce your initial setup costs by up to 15%.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-4 pb-3">
            <p className="text-xs text-on-surface-variant mb-2">Quick Actions</p>
            <div className="flex flex-wrap gap-2 mb-3">
              <button className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/5 transition-colors">
                How are taxes calculated?
              </button>
              <button className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/5 transition-colors">
                Find my GST code
              </button>
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 h-9 px-3 rounded-xl border border-outline-variant bg-surface-container-low outline-none text-sm placeholder:text-on-surface-variant/40"
                placeholder="Ask Vyapar AI anything..."
                readOnly
              />
              <button className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-[16px]">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
