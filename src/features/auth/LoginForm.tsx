import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import { loginSchema, type LoginFormValues } from "../../schemas/auth.schema";
import { useLogin } from "../../hooks/useAuthMutations";
import { useAuthContext } from "../../context/AuthContext";
import { cn } from "../../utils/cn";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthContext();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues): Promise<void> => {
    loginMutation.mutate(
      { identifier: data.identifier, password: data.password },
      {
        onSuccess: (res) => {
          const { accessToken, refreshToken, user } = res.data;
          setAuth(user, accessToken, refreshToken);
          navigate("/dashboard");
        },
      },
    );
  };

  const apiError = loginMutation.error
    ? ((loginMutation.error as any)?.response?.data?.message ??
      "Login failed. Please try again.")
    : null;

  const stateError = location.state?.error as string | undefined;
  const displayError = apiError || stateError;

  return (
    <form className="space-y-md" onSubmit={handleSubmit(onSubmit)}>
      {/* Error Alert */}
      {displayError && (
        <div className="p-md rounded-xl bg-error/10 border border-error/20 flex items-start gap-md">
          <span className="material-symbols-outlined text-error flex-shrink-0">
            error
          </span>
          <div className="flex-1">
            <p className="text-error font-body-md">{displayError}</p>
          </div>
        </div>
      )}

      {/* Identifier Field */}
      <div className="space-y-xs focus-within:scale-[1.01] transition-transform duration-200">
        <label
          className="font-label-sm text-label-sm text-on-surface-variant ml-xs"
          htmlFor="identifier"
        >
          Email or Phone
        </label>
        <div className="relative group">
          <input
            className={cn(
              "w-full h-12 px-md rounded-xl border border-outline-variant bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200 font-body-md",
              errors.identifier &&
                "border-error focus:border-error focus:ring-error/10",
            )}
            id="identifier"
            placeholder="Email or phone number"
            type="text"
            {...register("identifier")}
          />
          <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors">
            person
          </span>
        </div>
        {errors.identifier && (
          <p className="text-error text-xs ml-xs">
            {errors.identifier.message}
          </p>
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

      {/* Primary CTA */}
      <button
        className="w-full h-12 bg-primary text-white font-title-md text-title-md rounded-xl hover:bg-primary-container active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/20 flex items-center justify-center gap-base disabled:opacity-70 disabled:cursor-not-allowed"
        type="submit"
        disabled={isSubmitting || loginMutation.isPending}
      >
        {loginMutation.isPending ? "Signing in..." : "Sign In"}
        {!loginMutation.isPending && (
          <span className="material-symbols-outlined text-[20px]">
            arrow_forward
          </span>
        )}
      </button>
    </form>
  );
};
