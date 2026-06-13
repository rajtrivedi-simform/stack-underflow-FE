import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { registerUser } from '../model/authSlice';

const registerSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  businessName: z.string().min(2, 'Please enter your business name'),
  businessType: z.string().min(1, 'Please choose a business type'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    await dispatch(registerUser({ name: data.name, email: data.email, password: data.password }));
  };

  return (
    <form className="space-y-md" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-xs">
        <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider" htmlFor="name">Full Name</label>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary">person</span>
          <input id="name" type="text" className="h-12 w-full rounded-lg border border-outline-variant bg-surface px-10 text-body-md text-on-surface outline-none transition placeholder:text-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10" placeholder="John Doe" {...register('name')} />
        </div>
        {errors.name ? <p className="text-xs text-error">{errors.name.message}</p> : null}
      </div>

      <div className="space-y-xs">
        <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider" htmlFor="email">Email Address</label>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary">mail</span>
          <input id="email" type="email" className="h-12 w-full rounded-lg border border-outline-variant bg-surface px-10 text-body-md text-on-surface outline-none transition placeholder:text-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10" placeholder="name@company.com" {...register('email')} />
        </div>
        {errors.email ? <p className="text-xs text-error">{errors.email.message}</p> : null}
      </div>

      <div className="grid grid-cols-1 gap-md md:grid-cols-2">
        <div className="space-y-xs">
          <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider" htmlFor="businessName">Business Name</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary">domain</span>
            <input id="businessName" type="text" className="h-12 w-full rounded-lg border border-outline-variant bg-surface px-10 text-body-md text-on-surface outline-none transition placeholder:text-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10" placeholder="Acme Inc." {...register('businessName')} />
          </div>
          {errors.businessName ? <p className="text-xs text-error">{errors.businessName.message}</p> : null}
        </div>

        <div className="space-y-xs">
          <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider" htmlFor="businessType">Business Type</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary">category</span>
            <select id="businessType" className="h-12 w-full appearance-none rounded-lg border border-outline-variant bg-surface px-10 text-body-md text-on-surface outline-none transition placeholder:text-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10" {...register('businessType')}>
              <option value="">Select Type</option>
              <option value="retail">Retail</option>
              <option value="saas">SaaS</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="service">Service Provider</option>
              <option value="other">Other</option>
            </select>
          </div>
          {errors.businessType ? <p className="text-xs text-error">{errors.businessType.message}</p> : null}
        </div>
      </div>

      <div className="space-y-xs">
        <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider" htmlFor="password">Password</label>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary">lock</span>
          <input id="password" type={showPassword ? 'text' : 'password'} className="h-12 w-full rounded-lg border border-outline-variant bg-surface px-10 text-body-md text-on-surface outline-none transition placeholder:text-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10" placeholder="••••••••" {...register('password')} />
          <button type="button" className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 text-outline transition-colors hover:text-primary" onClick={() => setShowPassword((value) => !value)}>{showPassword ? 'visibility_off' : 'visibility'}</button>
        </div>
        {errors.password ? <p className="text-xs text-error">{errors.password.message}</p> : null}
      </div>

      <div className="pt-sm space-y-md">
        <button type="submit" disabled={isSubmitting} className="h-12 w-full rounded-lg bg-primary-container px-4 text-title-md font-semibold text-on-primary shadow-lg shadow-primary/20 transition duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70">
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>

        <div className="flex items-center gap-sm">
          <div className="h-px flex-grow bg-outline-variant/30" />
          <span className="font-label-sm text-on-surface-variant">OR</span>
          <div className="h-px flex-grow bg-outline-variant/30" />
        </div>

        <button type="button" className="h-12 w-full rounded-lg border border-transparent bg-surface-container-low text-title-md font-semibold text-primary transition duration-200 hover:bg-primary/5">Continue as Guest</button>
      </div>
    </form>
  );
}
