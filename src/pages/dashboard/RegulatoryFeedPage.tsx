import React, { useState } from "react";
import { cn } from "../../utils/cn";

type Severity = "critical" | "high" | "medium" | "low";

interface RegulatoryUpdate {
  id: string;
  severity: Severity;
  effectiveDate: string;
  title: string;
  description: string;
  actionRequired: string;
  saved?: boolean;
}

const UPDATES: RegulatoryUpdate[] = [
  {
    id: "gst-e-invoicing",
    severity: "critical",
    effectiveDate: "1 Jul 2024",
    title:
      "GST Notification No. 12/2024: Mandatory E-Invoicing for Businesses with ₹5Cr+ Turnover",
    description:
      "The Central Board of Indirect Taxes and Customs (CBIC) has announced that all registered taxpayers having an aggregate turnover exceeding ₹5 Crore in any preceding financial year from 2017-18 onwards are now mandated to generate e-invoices for B2B supply of goods or services.",
    actionRequired:
      "Upgrade GST integrations to support IRN generation via GST portal APIs before the compliance deadline.",
  },
  {
    id: "new-labor-code",
    severity: "high",
    effectiveDate: "15 Aug 2025",
    title:
      "New Labor Code Implementation: Changes to Gratuity and Working Hour Calculations",
    description:
      "The Ministry of Labour & Employment has finalized the rules for the Code on Social Security. This will impact the take-home salary as the definition of 'Wages' definition is being standardized to 50% of the gross compensation.",
    actionRequired:
      "Review and adjust your payroll structure to ensure the basic pay is at least 50% of the total CTC.",
  },
  {
    id: "dpdp-consent",
    severity: "high",
    effectiveDate: "1 Mar 2025",
    title: "Data Privacy (DPDP) Act: Mandatory Consent Manager Deployment",
    description:
      "The Digital Personal Data Protection Act requires data fiduciaries to implement granular consent management systems. Businesses must now allow users to withdraw consent as easily as it was given.",
    actionRequired:
      "Audit customer-facing web applications for DPDP compliance and update privacy policy links.",
  },
  {
    id: "msme-definition",
    severity: "low",
    effectiveDate: "Effective immediately",
    title: "Revised MSME Definition for Tax Rebates",
    description:
      "Small updates to the turnover threshold calculations for MSMEs seeking certain state-level subsidies in the Maharashtra Industrial corridor.",
    actionRequired:
      "Check your Udyam registration details for threshold eligibility.",
  },
];

const SEVERITY_CONFIG: Record<
  Severity,
  { label: string; className: string; dot: string; border: string }
> = {
  critical: {
    label: "CRITICAL",
    className: "bg-red-100 text-red-700 border-red-200",
    dot: "bg-red-500",
    border: "border-l-red-500",
  },
  high: {
    label: "HIGH",
    className: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    border: "border-l-blue-500",
  },
  medium: {
    label: "MEDIUM",
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
    dot: "bg-yellow-500",
    border: "border-l-yellow-500",
  },
  low: {
    label: "LOW",
    className: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    border: "border-l-surface-container",
  },
};

type FilterTab = "all" | Severity;

const RegulatoryFeedPage = (): React.ReactElement => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [alertVisible, setAlertVisible] = useState(true);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const filtered =
    activeFilter === "all"
      ? UPDATES
      : UPDATES.filter((u) => u.severity === activeFilter);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "critical", label: "Critical" },
    { key: "high", label: "High" },
    { key: "medium", label: "Medium" },
    { key: "low", label: "Low" },
  ];

  return (
    <div className="p-md min-h-full pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-md">
        <div>
          <h1 className="font-title-md text-title-md font-bold text-on-surface">
            Regulatory Updates
          </h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Stay ahead of compliance changes
          </p>
        </div>
        <div className="flex items-center gap-sm">
          <div className="relative max-w-[220px] w-full">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant/50">
              search
            </span>
            <input
              type="text"
              placeholder="Search regulations..."
              className="w-full h-8 pl-8 pr-sm rounded-xl border border-outline-variant/60 bg-surface-container-low text-xs text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:border-primary/50 transition-all"
            />
          </div>
          <button className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              notifications
            </span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error border border-white" />
          </button>
          <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] text-primary">
              account_circle
            </span>
          </button>
        </div>
      </div>

      {/* Critical Alert Banner */}
      {alertVisible && (
        <div className="bg-red-500 rounded-2xl p-3 mb-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-white">
              warning
            </span>
            <p className="text-sm font-semibold text-white">
              2 Critical updates this month — Review Immediately
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAlertVisible(false)}
            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-white">
              close
            </span>
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-xs mb-md">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveFilter(tab.key)}
            className={cn(
              "h-7 px-sm rounded-full text-xs font-semibold transition-colors",
              activeFilter === tab.key
                ? "bg-on-surface text-surface"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/40",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Update Cards */}
      <div className="space-y-3 mb-md">
        {filtered.map((update) => {
          const config = SEVERITY_CONFIG[update.severity];
          const isExpanded = expandedIds.has(update.id);
          const isSaved = savedIds.has(update.id);
          return (
            <div
              key={update.id}
              className={cn(
                "bg-surface-container-lowest rounded-2xl border border-outline-variant/40 border-l-4 shadow-sm p-4",
                config.border,
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {/* Badges row */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded border",
                        config.className,
                      )}
                    >
                      {config.label}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-on-surface-variant/60">
                      <span className="material-symbols-outlined text-[11px]">
                        schedule
                      </span>
                      Effective {update.effectiveDate}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-on-surface mb-2 leading-snug">
                    {update.title}
                  </h3>
                  <p
                    className={cn(
                      "text-xs text-on-surface-variant leading-relaxed mb-2",
                      !isExpanded && "line-clamp-2",
                    )}
                  >
                    {update.description}
                  </p>

                  {/* Action Required */}
                  <div className="bg-surface-container rounded-lg px-3 py-2 mb-2">
                    <p className="text-xs text-on-surface-variant mb-0.5">
                      <span className="font-semibold text-on-surface">
                        Action Required:
                      </span>{" "}
                      {update.actionRequired}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleExpand(update.id)}
                    className="text-xs font-semibold text-primary flex items-center gap-0.5 hover:underline"
                  >
                    {isExpanded ? "Read less" : "Read more"}
                    <span
                      className={cn(
                        "material-symbols-outlined text-[14px] transition-transform",
                        isExpanded && "rotate-180",
                      )}
                    >
                      expand_more
                    </span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSave(update.id)}
                  className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-container transition-colors"
                >
                  <span
                    className={cn(
                      "material-symbols-outlined text-[20px]",
                      isSaved ? "text-primary" : "text-on-surface-variant/50",
                    )}
                  >
                    {isSaved ? "bookmark" : "bookmark_border"}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Advisory Perspective */}
      <div className="bg-blue-50 rounded-2xl border border-blue-200 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-xl bg-blue-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px] text-blue-600">
              auto_awesome
            </span>
          </div>
          <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
            AI Advisory Perspective
          </span>
        </div>
        <p className="text-xs text-blue-800/80 leading-relaxed mb-3">
          Based on your company's HUG turnover profile, the{" "}
          <span className="font-semibold">GST-Invoicing mandate</span> is your
          highest priority risk. Failure to comply could block credit for your
          B2B customers. I recommend initiating the API upgrade task in your
          JIRA workspace immediately.
        </p>
        <div className="flex items-center gap-2">
          <button className="h-8 px-sm bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors">
            Connect BDI
          </button>
          <button className="h-8 px-sm border border-blue-300 text-blue-700 text-xs font-semibold rounded-xl hover:bg-blue-100 transition-colors">
            View Impact Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegulatoryFeedPage;
