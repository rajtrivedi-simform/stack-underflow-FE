import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { loginUser } from '../model/authSlice';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    await dispatch(loginUser(data));
  };

  return (
    <form className="space-y-md" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-xs">
        <label className="font-label-sm text-label-sm text-on-surface-variant ml-xs" htmlFor="email">Email</label>
        <div className="relative group">
          <input
            id="email"
            type="email"
            className="h-12 w-full rounded-xl border border-outline-variant bg-white px-md text-body-md text-on-surface shadow-sm outline-none transition duration-200 placeholder:text-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10"
            placeholder="name@company.com"
            {...register('email')}
          />
          <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant/40 transition-colors group-focus-within:text-primary">mail</span>
        </div>
        {errors.email ? <p className="text-xs text-error">{errors.email.message}</p> : null}
      </div>

      <div className="space-y-xs">
        <div className="flex items-center justify-between px-xs">
          <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="password">Password</label>
          <a className="font-label-sm text-label-sm text-primary transition-all hover:underline" href="#">Forgot Password?</a>
        </div>
        <div className="relative group">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            className="h-12 w-full rounded-xl border border-outline-variant bg-white px-md text-body-md text-on-surface shadow-sm outline-none transition duration-200 placeholder:text-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10"
            placeholder="••••••••"
            {...register('password')}
          />
          <button
            type="button"
            className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant/40 transition-colors hover:text-on-surface-variant"
            onClick={() => setShowPassword((value) => !value)}
          >
            {showPassword ? 'visibility_off' : 'visibility'}
          </button>
        </div>
        {errors.password ? <p className="text-xs text-error">{errors.password.message}</p> : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-12 w-full items-center justify-center gap-base rounded-xl bg-primary text-title-md font-semibold text-on-primary shadow-lg shadow-primary/20 transition duration-200 hover:bg-primary-container active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      >
        Sign In
        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
      </button>

      <div className="relative py-xs">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-outline-variant/50" />
        </div>
        <div className="relative flex justify-center text-label-sm uppercase tracking-widest">
          <span className="bg-surface-container-lowest px-md text-on-surface-variant/60">OR</span>
        </div>
      </div>

      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-base rounded-xl border border-outline-variant bg-white text-title-md font-semibold text-on-surface transition duration-200 hover:bg-surface-container-low"
      >
        <span className="material-symbols-outlined text-[20px]">person_outline</span>
        Continue as Guest
      </button>
    </form>
  );
}
