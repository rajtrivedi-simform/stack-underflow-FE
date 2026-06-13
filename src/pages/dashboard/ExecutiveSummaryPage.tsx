import React, { useState } from "react";
import { cn } from "../../utils/cn";

/* ─── Types ────────────────────────────────────────────────── */
type BadgeVariant = "positive" | "stable" | "warning" | "neutral";
type ComplianceStatus = "ACTIVE" | "PENDING" | "EXPIRED" | "UPCOMING";

/* ─── Helpers ───────────────────────────────────────────────── */
const badgeStyles: Record<BadgeVariant, string> = {
  positive: "bg-green-50 text-green-700 border-green-200",
  stable: "bg-teal-50 text-teal-700 border-teal-200",
  warning: "bg-blue-50 text-blue-700 border-blue-200",
  neutral:
    "bg-surface-container border-outline-variant/60 text-on-surface-variant",
};

const complianceStatusStyles: Record<ComplianceStatus, string> = {
  ACTIVE: "bg-green-50 text-green-700",
  PENDING: "bg-blue-50 text-blue-700",
  EXPIRED: "bg-red-50 text-red-700",
  UPCOMING: "bg-blue-50 text-blue-700",
};

const complianceStatusIcons: Record<ComplianceStatus, string> = {
  ACTIVE: "check_circle",
  PENDING: "hourglass_empty",
  EXPIRED: "error",
  UPCOMING: "warning",
};

/* ─── Sub-components ────────────────────────────────────────── */
interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  badge: string;
  badgeVariant: BadgeVariant;
  iconColor?: string;
  children?: React.ReactNode;
}

const StatCard = ({
  icon,
  label,
  value,
  badge,
  badgeVariant,
  iconColor = "text-primary",
  children,
}: StatCardProps) => (
  <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-md flex flex-col gap-sm shadow-sm">
    <div className="flex items-start justify-between">
      <div
        className={cn(
          "w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center",
          iconColor,
        )}
      >
        <span className="material-symbols-outlined text-[22px]">{icon}</span>
      </div>
      <span
        className={cn(
          "inline-flex items-center px-xs py-[3px] rounded-full text-[11px] font-semibold border",
          badgeStyles[badgeVariant],
        )}
      >
        {badge}
      </span>
    </div>
    <div>
      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
        {label}
      </p>
      <p className="font-display-lg text-[28px] font-bold text-on-surface leading-tight mt-xs">
        {value}
      </p>
    </div>
    {children}
  </div>
);

/* Circular progress ring */
const CircularProgress = ({
  percent,
  size = 64,
  stroke = 6,
}: {
  percent: number;
  size?: number;
  stroke?: number;
}) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#e5eeff"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#22c55e"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
      />
    </svg>
  );
};

interface ComplianceItemProps {
  icon: string;
  label: string;
  status: ComplianceStatus;
}

const ComplianceItem = ({ icon, label, status }: ComplianceItemProps) => (
  <div className="flex items-center justify-between py-xs border-b border-outline-variant/30 last:border-0">
    <div className="flex items-center gap-sm">
      <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
        {icon}
      </span>
      <span className="font-body-md text-body-md text-on-surface">{label}</span>
    </div>
    <span
      className={cn(
        "inline-flex items-center px-xs py-[2px] rounded-full text-[10px] font-bold uppercase tracking-wide",
        complianceStatusStyles[status],
      )}
    >
      <span
        className={cn(
          "material-symbols-outlined text-[14px] mr-[2px]",
          complianceStatusStyles[status],
        )}
      >
        {complianceStatusIcons[status]}
      </span>
      {status}
    </span>
  </div>
);

/* ─── Page ──────────────────────────────────────────────────── */
const ExecutiveSummaryPage = (): React.ReactElement => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-md space-y-md">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">
            Executive Summary
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Real-time overview of your business assets and eligibility.
          </p>
        </div>
        <div className="flex flex-col items-end gap-md shrink-0">
          <div className="text-right">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
              Last Updated
            </p>
            <p className="font-body-md text-body-md font-semibold text-on-surface">
              Today, 10:45 AM
            </p>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-md">
        <StatCard
          icon="credit_card"
          label="Available Benefits"
          value="₹4.2 Lakhs"
          badge="+12%"
          badgeVariant="positive"
          iconColor="text-primary"
        />
        <StatCard
          icon="grid_view"
          label="Eligible Schemes"
          value="8"
          badge="Stable"
          badgeVariant="stable"
          iconColor="text-secondary"
        />
        <StatCard
          icon="auto_awesome"
          label="Unlock Opportunities"
          value="5"
          badge="Action Required"
          badgeVariant="warning"
          iconColor="text-blue-600"
        />
        <StatCard
          icon="shield"
          label="Compliance Score"
          value="82%"
          badge=""
          badgeVariant="neutral"
          iconColor="text-error"
        >
          {/* Mini score bar */}
          <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: "82%" }}
            />
          </div>
        </StatCard>
      </div>

      {/* Bottom section: Opportunity card + Compliance panel */}
      <div className="grid grid-cols-[1fr_320px] gap-md">
        {/* Biggest Opportunity card */}
        <div
          className="rounded-2xl p-md relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0d1535 0%, #1a2550 40%, #1e2d60 100%)",
          }}
        >
          {/* Background orb decoration */}
          <div
            className="absolute -right-8 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-white/5"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
            }}
          />
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white/10 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/8 flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px] text-yellow-300">
                  workspace_premium
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-[65%]">
            {/* Badge */}
            <span className="inline-flex items-center px-sm py-[3px] rounded-full text-[11px] font-bold uppercase tracking-widest bg-primary/60 text-white border border-primary/40 mb-md">
              Biggest Opportunity
            </span>

            {/* Heading */}
            <h2 className="font-headline-lg text-[28px] font-bold text-white leading-tight mb-sm">
              Get Udyam Registration
            </h2>
            <p className="font-body-md text-body-md text-white/60 mb-md">
              Complete this single action to massively expand your business
              support ecosystem.
            </p>

            {/* Stat boxes */}
            <div className="flex gap-sm mb-md">
              <div className="bg-white/8 border border-white/15 rounded-xl px-sm py-xs">
                <p className="font-label-sm text-[10px] text-white/50 uppercase tracking-widest mb-xs">
                  Unlock Potential
                </p>
                <p className="font-body-md text-[13px] font-bold text-white">
                  5
                </p>
                <p className="font-body-md text-[12px] text-white/70">
                  Additional Schemes
                </p>
              </div>
              <div className="bg-white/8 border border-white/15 rounded-xl px-sm py-xs">
                <p className="font-label-sm text-[10px] text-white/50 uppercase tracking-widest mb-xs">
                  Benefit Estimate
                </p>
                <p className="font-body-md text-[13px] font-bold text-white">
                  ₹2.8
                </p>
                <p className="font-body-md text-[12px] text-white/70">Lakhs</p>
              </div>
            </div>

            {/* Connected badge + CTA */}
            <div className="flex items-center gap-sm">
              <span className="inline-flex items-center gap-[3px] px-xs py-[3px] rounded-full text-[10px] font-semibold text-primary bg-primary/15 border border-dashed border-primary/50">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/80 inline-block" />
                Connected
              </span>
              <button className="flex items-center gap-xs px-md py-xs rounded-xl border border-white/30 text-white font-title-md text-[14px] font-semibold hover:bg-white/10 transition-colors">
                Unlock Now
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-md">
          {/* Compliance Health */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-md shadow-sm">
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-title-md text-[16px] font-semibold text-on-surface">
                Compliance Health
              </h3>
              <div className="relative flex items-center justify-center">
                <CircularProgress percent={82} size={52} stroke={5} />
                <span className="absolute font-label-sm text-[11px] font-bold text-on-surface">
                  82%
                </span>
              </div>
            </div>

            <div className="space-y-[2px]">
              <ComplianceItem
                icon="receipt_long"
                label="GST Registration"
                status="ACTIVE"
              />
              <ComplianceItem
                icon="business_center"
                label="Udyam Registration"
                status="PENDING"
              />
              <ComplianceItem
                icon="restaurant"
                label="FSSAI License"
                status="EXPIRED"
              />
              <ComplianceItem
                icon="local_fire_department"
                label="Fire NOC"
                status="UPCOMING"
              />
              <ComplianceItem
                icon="groups"
                label="EPF Registration"
                status="ACTIVE"
              />
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-md shadow-sm">
            <h3 className="font-title-md text-[16px] font-semibold text-on-surface mb-sm">
              Recommended Actions
            </h3>

            <div className="flex items-start gap-sm p-sm rounded-xl bg-surface-container-low border border-outline-variant/40">
              <div className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center shrink-0 mt-[2px]">
                <span className="material-symbols-outlined text-[16px] text-error">
                  priority_high
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-body-md text-[13px] font-semibold text-on-surface">
                  Apply for Udyam Registration
                </p>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-[2px]">
                  Estimated: 15 mins
                </p>
                <button className="font-label-sm text-label-sm text-primary font-semibold mt-xs hover:underline">
                  Unlocks 5 Schemes →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scheme highlights row (partially visible at the bottom per design) */}
      <div className="grid grid-cols-3 gap-md">
        {[
          {
            name: "MSME Credit Guarantee",
            amount: "₹1.2 Lakhs",
            tag: "Eligible",
          },
          { name: "Stand-Up India Scheme", amount: "₹80,000", tag: "Eligible" },
          { name: "PMEGP Subsidy", amount: "₹60,000", tag: "Review" },
        ].map((s) => (
          <div
            key={s.name}
            className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-md flex items-center justify-between shadow-sm"
          >
            <div>
              <p className="font-body-md text-[13px] font-semibold text-on-surface">
                {s.name}
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">
                {s.amount}
              </p>
            </div>
            <span
              className={cn(
                "px-xs py-[3px] rounded-full text-[11px] font-bold",
                s.tag === "Eligible"
                  ? "bg-green-50 text-green-700"
                  : "bg-blue-50 text-blue-700",
              )}
            >
              {s.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExecutiveSummaryPage;
