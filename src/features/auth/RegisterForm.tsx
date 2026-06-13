import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  registerSchema,
  type RegisterFormValues,
} from "../../schemas/auth.schema";
import { useRegister } from "../../hooks/useAuthMutations";
import { useAuthContext } from "../../context/AuthContext";
import { cn } from "../../utils/cn";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password", "");

  const onSubmit = async (data: RegisterFormValues): Promise<void> => {
    registerMutation.mutate(
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      },
      {
        onSuccess: (res) => {
          const { accessToken, refreshToken, user } = res.data;
          setAuth(user, accessToken, refreshToken);
          navigate("/dashboard");
        },
      },
    );
  };

  const apiError = registerMutation.error
    ? ((registerMutation.error as any)?.response?.data?.message ??
      "Registration failed. Please try again.")
    : null;

  const passwordRequirements = {
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasMinLength: password.length >= 8,
  };

  return (
    <form className="space-y-md" onSubmit={handleSubmit(onSubmit)}>
      {/* Error Alert */}
      {apiError && (
        <div className="p-md rounded-xl bg-error/10 border border-error/20 flex items-start gap-md">
          <span className="material-symbols-outlined text-error flex-shrink-0">
            error
          </span>
          <div className="flex-1">
            <p className="text-error font-body-md text-sm">{apiError}</p>
          </div>
        </div>
      )}

      {/* Full Name Field */}
      <div className="space-y-xs">
        <label
          className="font-label-sm text-label-sm text-on-surface-variant ml-xs block"
          htmlFor="name"
        >
          Full Name
        </label>
        <div className="relative group">
          <input
            className={cn(
              "w-full h-12 px-md rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 font-body-md",
              errors.name &&
                "border-error focus:border-error focus:ring-error/10",
            )}
            id="name"
            placeholder="John Doe"
            type="text"
            {...register("name")}
          />
          <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors">
            person
          </span>
        </div>
        {errors.name && (
          <p className="text-error text-xs ml-xs">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-xs">
        <label
          className="font-label-sm text-label-sm text-on-surface-variant ml-xs block"
          htmlFor="email"
        >
          Email Address
        </label>
        <div className="relative group">
          <input
            className={cn(
              "w-full h-12 px-md rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 font-body-md",
              errors.email &&
                "border-error focus:border-error focus:ring-error/10",
            )}
            id="email"
            placeholder="name@company.com"
            type="email"
            {...register("email")}
          />
          <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors">
            mail
          </span>
        </div>
        {errors.email && (
          <p className="text-error text-xs ml-xs">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div className="space-y-xs">
        <label
          className="font-label-sm text-label-sm text-on-surface-variant ml-xs block"
          htmlFor="phone"
        >
          Mobile Number
        </label>
        <div className="relative group">
          <input
            className={cn(
              "w-full h-12 px-md rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 font-body-md",
              errors.phone &&
                "border-error focus:border-error focus:ring-error/10",
            )}
            id="phone"
            placeholder="+1 234 567 8900"
            type="tel"
            {...register("phone")}
          />
          <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors">
            phone
          </span>
        </div>
        {errors.phone && (
          <p className="text-error text-xs ml-xs">{errors.phone.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-xs">
        <label
          className="font-label-sm text-label-sm text-on-surface-variant ml-xs block"
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative group">
          <input
            className={cn(
              "w-full h-12 px-md rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 font-body-md",
              errors.password &&
                "border-error focus:border-error focus:ring-error/10",
            )}
            id="password"
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />
          <button
            className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-on-surface-variant transition-colors"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "visibility_off" : "visibility"}
          </button>
        </div>
        {errors.password && (
          <p className="text-error text-xs ml-xs">{errors.password.message}</p>
        )}
      </div>

      {/* Password Requirements */}
      <div className="text-xs text-on-surface-variant bg-surface-container/50 rounded-lg p-md space-y-xs">
        <p className="font-semibold text-on-surface">Password must contain:</p>
        <ul className="space-y-xs">
          <li
            className={cn(
              "flex items-center gap-xs",
              passwordRequirements.hasUppercase && "text-success",
            )}
          >
            <span className="material-symbols-outlined text-[16px]">
              {passwordRequirements.hasUppercase
                ? "check_circle"
                : "radio_button_unchecked"}
            </span>
            At least one uppercase letter
          </li>
          <li
            className={cn(
              "flex items-center gap-xs",
              passwordRequirements.hasLowercase && "text-success",
            )}
          >
            <span className="material-symbols-outlined text-[16px]">
              {passwordRequirements.hasLowercase
                ? "check_circle"
                : "radio_button_unchecked"}
            </span>
            At least one lowercase letter
          </li>
          <li
            className={cn(
              "flex items-center gap-xs",
              passwordRequirements.hasNumber && "text-success",
            )}
          >
            <span className="material-symbols-outlined text-[16px]">
              {passwordRequirements.hasNumber
                ? "check_circle"
                : "radio_button_unchecked"}
            </span>
            At least one number
          </li>
          <li
            className={cn(
              "flex items-center gap-xs",
              passwordRequirements.hasMinLength && "text-success",
            )}
          >
            <span className="material-symbols-outlined text-[16px]">
              {passwordRequirements.hasMinLength
                ? "check_circle"
                : "radio_button_unchecked"}
            </span>
            At least 8 characters
          </li>
        </ul>
      </div>

      {/* Primary CTA */}
      <button
        className="w-full h-12 bg-primary text-white font-title-md text-title-md rounded-xl hover:bg-primary-container active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/20 flex items-center justify-center gap-base disabled:opacity-70 disabled:cursor-not-allowed"
        type="submit"
        disabled={isSubmitting || registerMutation.isPending}
      >
        {registerMutation.isPending ? "Creating Account..." : "Create Account"}
        {!registerMutation.isPending && (
          <span className="material-symbols-outlined text-[20px]">
            arrow_forward
          </span>
        )}
      </button>
    </form>
  );
};
