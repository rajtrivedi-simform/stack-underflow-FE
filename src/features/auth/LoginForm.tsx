import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginForm as LoginFormData } from '../../schemas/auth.schema';
import { cn } from '../../utils/cn';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    console.log('Login data', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <form className="space-y-md" onSubmit={handleSubmit(onSubmit)}>
      {/* Email Field */}
      <div className="space-y-xs focus-within:scale-[1.01] transition-transform duration-200">
        <label
          className="font-label-sm text-label-sm text-on-surface-variant ml-xs"
          htmlFor="email"
        >
          Email
        </label>
        <div className="relative group">
          <input
            className={cn(
              "w-full h-12 px-md rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 font-body-md",
              errors.email && "border-error focus:border-error focus:ring-error/10"
            )}
            id="email"
            placeholder="name@company.com"
            type="email"
            {...register('email')}
          />
          <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors">
            mail
          </span>
        </div>
        {errors.email && (
          <p className="text-error text-xs ml-xs">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-xs focus-within:scale-[1.01] transition-transform duration-200">
        <div className="flex justify-between items-center px-xs">
          <label
            className="font-label-sm text-label-sm text-on-surface-variant"
            htmlFor="password"
          >
            Password
          </label>
          <a
            className="font-label-sm text-label-sm text-primary hover:underline transition-all"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <div className="relative group">
          <input
            className={cn(
              "w-full h-12 px-md rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 font-body-md",
              errors.password && "border-error focus:border-error focus:ring-error/10"
            )}
            id="password"
            placeholder="••••••••"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
          />
          <button
            className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-on-surface-variant transition-colors"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'visibility_off' : 'visibility'}
          </button>
        </div>
        {errors.password && (
          <p className="text-error text-xs ml-xs">{errors.password.message}</p>
        )}
      </div>

      {/* Primary CTA */}
      <button
        className="w-full h-12 bg-primary text-white font-title-md text-title-md rounded-xl hover:bg-primary-container active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/20 flex items-center justify-center gap-base disabled:opacity-70 disabled:cursor-not-allowed"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing in...' : 'Sign In'}
        {!isSubmitting && (
          <span className="material-symbols-outlined text-[20px]">
            arrow_forward
          </span>
        )}
      </button>

      {/* Divider */}
      <div className="relative py-xs">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-outline-variant/50"></div>
        </div>
        <div className="relative flex justify-center text-label-sm uppercase tracking-widest">
          <span className="bg-surface-container-lowest px-md text-on-surface-variant/60">
            OR
          </span>
        </div>
      </div>

      {/* Secondary CTA */}
      <button
        className="w-full h-12 border border-outline-variant bg-white text-on-surface font-title-md text-title-md rounded-xl hover:bg-surface-container-low transition-all duration-200 flex items-center justify-center gap-base"
        type="button"
      >
        <span className="material-symbols-outlined text-[20px]">
          person_outline
        </span>
        Continue as Guest
      </button>
    </form>
  );
};
