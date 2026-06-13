import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

type Option = {
  label: string;
  value: string;
};

type OnboardingShellProps = {
  children: React.ReactNode;
  footer?: React.ReactNode;
  progress: number;
  rightPanel: React.ReactNode;
  saveExitClassName?: string;
  stepLabel: string;
  title?: string;
  variant?: 'compact' | 'brand';
};

export const VyaparSetuWordmark = ({ variant = 'compact' }: { variant?: 'compact' | 'brand' }): React.ReactElement => {
  if (variant === 'brand') {
    return <span className="text-[56px] font-black leading-none tracking-[-0.08em] text-[#3525cd]">VyaparSetu</span>;
  }

  return (
    <svg className="h-9 w-[178px]" viewBox="0 0 178 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="VyaparSetu">
      <path d="M6 5L16 31L27 5" stroke="#2378E8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="44" y="25" fill="#070C1D" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="700">
        VyaparSetu
      </text>
    </svg>
  );
};

export const OnboardingShell = ({
  children,
  footer,
  progress,
  rightPanel,
  saveExitClassName,
  stepLabel,
  title,
  variant = 'compact',
}: OnboardingShellProps): React.ReactElement => (
  <div className="flex min-h-screen flex-col bg-[#fbfbfc] font-body-md text-body-md text-[#070C1D] antialiased">
    <header className="sticky top-0 z-50 border-b border-[#dde1ec] bg-[#fbfbff] px-6 py-5 md:px-[60px]">
      <div className="mx-auto flex max-w-[1536px] items-center justify-between">
        <div className="flex items-center gap-[30px]">
          <VyaparSetuWordmark variant={variant} />
          {title && (
            <>
              <div className="hidden h-8 w-px bg-[#dce0ea] md:flex" />
              <div className="hidden flex-col gap-1 md:flex">
                <span className="text-base font-medium text-[#17172c]">{stepLabel}</span>
                <span className="text-2xl font-bold leading-none text-[#070C1D]">{title}</span>
              </div>
            </>
          )}
        </div>

        <div className="hidden w-[240px] md:block lg:w-[440px]">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#dfeafe]">
            <div className="step-transition h-full rounded-full bg-[#3525cd]" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <Link
          className={cn('rounded-lg px-3 py-2 text-base font-medium text-[#17172c] transition-colors hover:text-primary', saveExitClassName)}
          to="/auth"
        >
          Save &amp; Exit
        </Link>
      </div>
    </header>

    <main className="mx-auto flex w-full max-w-[1536px] flex-1 flex-col md:flex-row">
      <section className="flex-1 overflow-y-auto px-6 py-16 md:px-[60px] md:py-[103px]">{children}</section>
      <aside className="flex w-full flex-col border-l border-[#dde1ec] bg-[#edf3ff] px-8 py-16 md:w-[500px] md:px-[60px] md:py-[100px]">
        {rightPanel}
      </aside>
    </main>

    {footer}
  </div>
);

export const OnboardingTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle: React.ReactNode }): React.ReactElement => (
  <div className="mb-[63px]">
    <h1 className="mb-2 text-[40px] font-bold leading-tight tracking-[-0.01em] text-[#07142d]">{children}</h1>
    <p className="max-w-[710px] text-[21px] leading-[1.45] text-[#29283a]">{subtitle}</p>
  </div>
);

export const Field = ({ children, label, htmlFor }: { children: React.ReactNode; label: string; htmlFor: string }): React.ReactElement => (
  <div className="space-y-2 transition-transform duration-200 focus-within:scale-[1.01]">
    <label className="block text-[15px] font-medium text-[#17172c]" htmlFor={htmlFor}>
      {label}
    </label>
    {children}
  </div>
);

export const TextInput = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>): React.ReactElement => (
  <input
    className={cn(
      'h-[64px] w-full rounded-lg border border-[#bfc0d8] bg-white px-8 text-[20px] outline-none transition-all placeholder:text-[#6f7586]/80 focus:border-primary focus:ring-4 focus:ring-primary/10',
      className
    )}
    {...props}
  />
);

export const SelectInput = ({ options, placeholder, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { options: Option[]; placeholder: string }): React.ReactElement => (
  <div className="relative">
    <select
      className="h-[64px] w-full cursor-pointer appearance-none rounded-lg border border-[#bfc0d8] bg-white px-8 pr-12 text-[20px] text-[#070C1D] outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
      defaultValue=""
      {...props}
    >
      <option disabled value="">{placeholder}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
    <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[28px] text-[#29283a]">
      expand_more
    </span>
  </div>
);

export const PrimaryAction = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement => (
  <button
    className={cn(
      'primary-cta-gradient flex h-[66px] w-full items-center justify-center gap-2 rounded-lg px-14 text-[23px] font-bold text-white shadow-lg shadow-primary/20 transition-all hover:brightness-110 active:scale-95 md:w-[265px]',
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export const SecondaryLinkAction = ({ children, className, to }: { children: React.ReactNode; className?: string; to: string }): React.ReactElement => (
  <Link
    className={cn(
      'flex h-[66px] w-full items-center justify-center gap-2 rounded-lg border border-[#bfc0d8] bg-white px-14 text-[22px] font-bold text-[#29283a] transition-all hover:bg-[#f8f9ff] md:w-[285px]',
      className
    )}
    to={to}
  >
    {children}
  </Link>
);

