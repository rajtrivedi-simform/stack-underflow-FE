import React from "react";
import { RegisterForm } from "../features/auth/RegisterForm";
import { Link } from "react-router-dom";

const RegisterPage = (): React.ReactElement => {
  return (
    <div className="bg-mesh font-body-md text-on-background min-h-screen flex items-center justify-center p-md">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-64 h-32 border border-outline-variant/20 rounded-xl rotate-12 opacity-40" />
        <div className="absolute bottom-1/3 left-10 w-48 h-48 border border-outline-variant/10 rounded-full opacity-30" />
      </div>

      <main className="w-full max-w-[560px] z-10">
        <div className="bg-surface-container-lowest rounded-[32px] p-xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-outline-variant/30">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-lg">
            <div className="mb-md">
              <span className="material-symbols-outlined text-[48px] text-primary">
                store
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-xs">
              Get Started
            </h1>
            <p className="font-body-md text-on-surface-variant max-w-[280px]">
              Join VyaparSetu to unlock your business potential.
            </p>
          </div>

          <RegisterForm />

          {/* Footer */}
          <div className="mt-lg text-center">
            <p className="font-body-md text-on-surface-variant">
              Already have an account?{" "}
              <Link
                className="text-primary font-bold hover:underline decoration-2 underline-offset-4"
                to="/auth"
              >
                Sign In
              </Link>
            </p>
          </div>

          {/* Trust badges */}
          <div className="mt-md flex justify-center gap-lg opacity-60">
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">
                verified_user
              </span>
              <span className="font-label-sm text-label-sm">Secure Login</span>
            </div>
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">
                lock
              </span>
              <span className="font-label-sm text-label-sm">
                Privacy Protected
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
