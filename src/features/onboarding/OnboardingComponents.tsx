import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

type Option = {
  label: string;
  value: string;
};

type OnboardingShellProps = {
  children: React.ReactNode;
  footer?: React.ReactNode;
  panelBg?: string;
  progress: number;
  rightPanel: React.ReactNode;
  saveExitClassName?: string;
  stepLabel: string;
  title?: string;
  variant?: "compact" | "brand";
};

export const VyaparSetuWordmark = ({
  variant = "compact",
}: {
  variant?: "compact" | "brand";
}): React.ReactElement => {
  if (variant === "brand") {
    return (
      <span className="text-[56px] font-black leading-none tracking-[-0.08em] text-[#3525cd]">
        VyaparSetu
      </span>
    );
  }

  return (
    <svg
      className="h-9 w-[178px]"
      viewBox="0 0 178 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="VyaparSetu"
    >
      <path
        d="M6 5L16 31L27 5"
        stroke="#2378E8"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="44"
        y="25"
        fill="#070C1D"
        fontFamily="Inter, sans-serif"
        fontSize="20"
        fontWeight="700"
      >
        VyaparSetu
      </text>
    </svg>
  );
};

export const OnboardingShell = ({
  children,
  footer,
  panelBg = "#edf3ff",
  progress,
  rightPanel,
  saveExitClassName,
  stepLabel,
  title,
  variant = "compact",
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
                <span className="text-base font-medium text-[#17172c]">
                  {stepLabel}
                </span>
                <span className="text-2xl font-bold leading-none text-[#070C1D]">
                  {title}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="hidden w-[240px] md:block lg:w-[440px]">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#dfeafe]">
            <div
              className="step-transition h-full rounded-full bg-[#3525cd]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Link
          className={cn(
            "rounded-lg px-3 py-2 text-base font-medium text-[#17172c] transition-colors hover:text-primary",
            saveExitClassName,
          )}
          to="/dashboard"
        >
          Save &amp; Exit
        </Link>
      </div>
    </header>

    <main className="mx-auto flex w-full max-w-[1536px] flex-1 flex-col md:flex-row">
      <section className="flex-1 overflow-y-auto px-6 py-16 md:px-[60px] md:py-[103px]">
        {children}
      </section>
      <aside
        className="flex w-full flex-col border-l border-[#dde1ec] px-8 py-16 md:w-[500px] md:px-[60px] md:py-[100px]"
        style={{ backgroundColor: panelBg }}
      >
        {rightPanel}
      </aside>
    </main>

    {footer}
  </div>
);

export const OnboardingTitle = ({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle: React.ReactNode;
}): React.ReactElement => (
  <div className="mb-[63px]">
    <h1 className="mb-2 text-[40px] font-bold leading-tight tracking-[-0.01em] text-[#07142d]">
      {children}
    </h1>
    <p className="max-w-[710px] text-[21px] leading-[1.45] text-[#29283a]">
      {subtitle}
    </p>
  </div>
);

export const Field = ({
  children,
  label,
  htmlFor,
}: {
  children: React.ReactNode;
  label: string;
  htmlFor: string;
}): React.ReactElement => (
  <div className="space-y-2 transition-transform duration-200 focus-within:scale-[1.01]">
    <label
      className="block text-[15px] font-medium text-[#17172c]"
      htmlFor={htmlFor}
    >
      {label}
    </label>
    {children}
  </div>
);

export const TextInput = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>): React.ReactElement => (
  <input
    className={cn(
      "h-[64px] w-full rounded-lg border border-[#bfc0d8] bg-white px-8 text-[20px] outline-none transition-all placeholder:text-[#6f7586]/80 focus:border-primary focus:ring-4 focus:ring-primary/10",
      className,
    )}
    {...props}
  />
);

export const SelectInput = ({
  options,
  placeholder,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  placeholder: string;
}): React.ReactElement => (
  <div className="relative">
    <select
      className="h-[64px] w-full cursor-pointer appearance-none rounded-lg border border-[#bfc0d8] bg-white px-8 pr-12 text-[20px] text-[#070C1D] outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
      defaultValue=""
      {...props}
    >
      <option disabled value="">
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[28px] text-[#29283a]">
      expand_more
    </span>
  </div>
);

export const TextArea = ({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>): React.ReactElement => (
  <textarea
    className={cn(
      "min-h-[120px] w-full rounded-lg border border-[#bfc0d8] bg-white px-8 py-4 text-[18px] outline-none transition-all placeholder:text-[#6f7586]/80 focus:border-primary focus:ring-4 focus:ring-primary/10 resize-none",
      className,
    )}
    {...props}
  />
);

export const NumberInput = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>): React.ReactElement => (
  <input
    type="number"
    min={0}
    className={cn(
      "h-[64px] w-full rounded-lg border border-[#bfc0d8] bg-white px-8 text-[20px] outline-none transition-all placeholder:text-[#6f7586]/80 focus:border-primary focus:ring-4 focus:ring-primary/10",
      className,
    )}
    {...props}
  />
);

interface CheckboxGroupProps {
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  columns?: 2 | 3;
}

export const CheckboxGroup = ({
  options,
  selected,
  onChange,
  columns = 2,
}: CheckboxGroupProps): React.ReactElement => {
  const toggle = (val: string) => {
    onChange(
      selected.includes(val)
        ? selected.filter((s) => s !== val)
        : [...selected, val],
    );
  };
  return (
    <div
      className={cn(
        "grid gap-3",
        columns === 3 ? "grid-cols-3" : "grid-cols-2",
      )}
    >
      {options.map((opt) => {
        const checked = selected.includes(opt);
        return (
          <label
            key={opt}
            onClick={() => toggle(opt)}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-[15px] font-medium transition-all",
              checked
                ? "border-[#3525cd] bg-[#3525cd]/5 text-[#3525cd]"
                : "border-[#bfc0d8] bg-white text-[#29283a] hover:border-[#3525cd]/40",
            )}
          >
            <div
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                checked ? "border-[#3525cd] bg-[#3525cd]" : "border-[#bfc0d8]",
              )}
            >
              {checked && (
                <span className="material-symbols-outlined text-[14px] text-white">
                  check
                </span>
              )}
            </div>
            {opt}
          </label>
        );
      })}
    </div>
  );
};

interface RadioGroupProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (val: string) => void;
  inline?: boolean;
}

export const RadioGroup = ({
  options,
  value,
  onChange,
  inline = false,
}: RadioGroupProps): React.ReactElement => (
  <div className={cn("flex gap-3", inline ? "flex-row flex-wrap" : "flex-col")}>
    {options.map((opt) => {
      const active = value === opt.value;
      return (
        <label
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "flex cursor-pointer items-center gap-3 rounded-lg border px-5 py-3 text-[15px] font-medium transition-all",
            active
              ? "border-[#3525cd] bg-[#3525cd]/5 text-[#3525cd]"
              : "border-[#bfc0d8] bg-white text-[#29283a] hover:border-[#3525cd]/40",
          )}
        >
          <div
            className={cn(
              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
              active ? "border-[#3525cd]" : "border-[#bfc0d8]",
            )}
          >
            {active && (
              <div className="h-2.5 w-2.5 rounded-full bg-[#3525cd]" />
            )}
          </div>
          {opt.label}
        </label>
      );
    })}
  </div>
);

export const MsmeBadge = ({
  category,
}: {
  category: string;
}): React.ReactElement => {
  const colorMap: Record<string, string> = {
    "Micro Enterprise": "bg-green-50 text-green-700 border-green-200",
    "Small Enterprise": "bg-blue-50 text-blue-700 border-blue-200",
    "Medium Enterprise": "bg-purple-50 text-purple-700 border-purple-200",
    "Non-MSME": "bg-blue-50 text-blue-700 border-blue-200",
  };
  const style =
    colorMap[category] ??
    "bg-surface-container text-on-surface-variant border-outline-variant";
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#bfc0d8] bg-[#f8f9ff] px-6 py-4">
      <span className="material-symbols-outlined text-[22px] text-[#3525cd]">
        auto_awesome
      </span>
      <div>
        <p className="text-[13px] font-medium text-[#6f7586]">
          MSME Category (auto-computed)
        </p>
        <p
          className={cn(
            "mt-0.5 inline-flex rounded-full border px-3 py-0.5 text-[14px] font-bold",
            style,
          )}
        >
          {category || "—"}
        </p>
      </div>
    </div>
  );
};

export const PrimaryAction = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}): React.ReactElement => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "flex h-[66px] w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-14 text-[23px] font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-95 md:w-[265px]",
      className,
    )}
  >
    {children}
  </button>
);

export const SecondaryLinkAction = ({
  children,
  className,
  to,
}: {
  children: React.ReactNode;
  className?: string;
  to: string;
}): React.ReactElement => (
  <Link
    className={cn(
      "flex h-[66px] w-full items-center justify-center gap-2 rounded-lg border border-[#bfc0d8] bg-white px-14 text-[22px] font-bold text-[#29283a] transition-all hover:bg-[#f8f9ff] md:w-[285px]",
      className,
    )}
    to={to}
  >
    {children}
  </Link>
);
