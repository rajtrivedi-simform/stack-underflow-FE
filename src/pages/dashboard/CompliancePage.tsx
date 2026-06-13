import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";

/* ─── Types ─────────────────────────────────────────────────── */
type Severity = "critical" | "attention" | "compliant";

interface ComplianceItem {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  severity: Severity;
  penalty?: string;
  risk?: string;
  dueIn?: string;
  scheduledFor?: string;
  description: string;
  missingDocs: string[];
  steps: { title: string; description: string }[];
}

/* ─── Mock Data ─────────────────────────────────────────────── */
const COMPLIANCE_ITEMS: ComplianceItem[] = [
  {
    id: "annual-gst-return",
    title: "Annual GST Return filing",
    badge: "GST",
    badgeColor: "bg-blue-100 text-blue-700",
    severity: "critical",
    penalty: "₹10,000/month",
    description:
      "The Annual GST Return (GSTR-9) is a mandatory filing for registered taxpayers, providing a consolidated summary of all monthly/quarterly returns. Failure to file leads to heavy daily penalties and can result in GST registration cancellation.",
    missingDocs: [
      "Udyam Registration Certificate",
      "GST Return Filing FY2024",
      "Purchase & Sales Ledger Reconciliation",
    ],
    steps: [
      {
        title: "Reconcile Ledgers",
        description:
          "Match your internal sales and purchase books with GSTR-2A/2B data to ensure accuracy.",
      },
      {
        title: "Prepare GSTR-9 Draft",
        description:
          "Consolidate data across all filed monthly returns. Use official utility for verification.",
      },
      {
        title: "Pay Outstanding Tax",
        description:
          "Settle any tax liability discovered during reconciliation using the GST PMT-06 challan.",
      },
      {
        title: "Submit & Verify",
        description:
          "Electronically sign using DSC or EVC and file the return on the GST portal. Download acknowledgement.",
      },
    ],
  },
  {
    id: "epf-monthly-deposit",
    title: "EPF Monthly Deposit",
    badge: "Labour",
    badgeColor: "bg-purple-100 text-purple-700",
    severity: "critical",
    risk: "Legal Prosecution & Interest",
    description:
      "Employers must deposit EPF contributions by the 15th of every month. Non-deposit attracts interest @12% p.a. and can lead to prosecution under EPF & MP Act 1952.",
    missingDocs: ["EPF Challan for Q3 FY2024", "Employee PF Declaration Forms"],
    steps: [
      {
        title: "Calculate Contributions",
        description:
          "Compute employee (12%) and employer (13.61%) contributions for all eligible employees.",
      },
      {
        title: "Generate ECR",
        description:
          "Create Electronic Challan cum Return on the EPFO unified portal.",
      },
      {
        title: "Pay Challan",
        description:
          "Pay via net banking using the generated ECR challan before the 15th.",
      },
      {
        title: "Download Receipt",
        description: "Save the payment receipt and update payroll records.",
      },
    ],
  },
  {
    id: "professional-tax-registration",
    title: "Professional Tax Registration",
    badge: "TAX",
    badgeColor: "bg-red-100 text-red-700",
    severity: "critical",
    penalty: "Late Fee ₹5,000",
    description:
      "Professional Tax is a state-level tax levied on employment income. Registration is mandatory for businesses employing staff in applicable states. Non-registration attracts late fees and interest.",
    missingDocs: ["PT Registration Certificate", "Employee Salary Register"],
    steps: [
      {
        title: "Check Applicability",
        description:
          "Verify if your state levies PT and the applicable threshold.",
      },
      {
        title: "Apply for PTEC",
        description:
          "Apply for Professional Tax Enrollment Certificate on the state commercial tax portal.",
      },
      {
        title: "Apply for PTRC",
        description:
          "Apply for Professional Tax Registration Certificate if you have employees.",
      },
      {
        title: "File Returns",
        description:
          "File monthly/annual PT returns and deposit tax as applicable.",
      },
    ],
  },
  {
    id: "trade-license-renewal",
    title: "Trade License Renewal",
    badge: "Municipal",
    badgeColor: "bg-blue-100 text-blue-700",
    severity: "attention",
    dueIn: "Expires in 14 days",
    description:
      "Your trade license from the municipal corporation expires in 14 days. Late renewal attracts a penalty of ₹500/month.",
    missingDocs: ["Renewed Trade License", "Property Tax Receipt"],
    steps: [
      {
        title: "Gather Documents",
        description:
          "Collect existing license, property tax receipt, and NOC from landlord if applicable.",
      },
      {
        title: "Apply Online",
        description:
          "Visit the municipal corporation portal and apply for renewal with updated details.",
      },
      {
        title: "Pay Fees",
        description: "Pay the prescribed renewal fees online.",
      },
      {
        title: "Collect License",
        description:
          "Download the digital license or collect the physical copy from the municipal office.",
      },
    ],
  },
  {
    id: "fssai-audit-preparation",
    title: "FSSAI Audit Preparation",
    badge: "Food",
    badgeColor: "bg-green-100 text-green-700",
    severity: "attention",
    scheduledFor: "Scheduled for next week",
    description:
      "An FSSAI compliance audit is scheduled for next week. Ensure all food safety records, hygiene certifications, and product labels are up to date.",
    missingDocs: [
      "FSSAI License Copy",
      "Product Label Approval",
      "Hygiene Training Records",
    ],
    steps: [
      {
        title: "Review FSSAI License",
        description:
          "Ensure your FSSAI license is valid and prominently displayed at the premises.",
      },
      {
        title: "Update Food Safety Plan",
        description:
          "Review and update your HACCP or food safety management plan.",
      },
      {
        title: "Check Product Labels",
        description:
          "Verify all product labels comply with FSSAI labelling regulations.",
      },
      {
        title: "Prepare Documents",
        description: "Organise all records for auditor inspection.",
      },
    ],
  },
  {
    id: "udyam-registration",
    title: "Udyam Registration",
    badge: "MSME",
    badgeColor: "bg-teal-100 text-teal-700",
    severity: "compliant",
    description: "Udyam registration is active and up to date.",
    missingDocs: [],
    steps: [],
  },
];

/* ─── Circular Progress ─────────────────────────────────────── */
const CircularHealthScore = ({ score }: { score: number }) => {
  const size = 180;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;

  const greenPct = 50;
  const orangePct = 25;
  const redPct = 25;

  const greenDash = (greenPct / 100) * circ;
  const orangeDash = (orangePct / 100) * circ;
  const redDash = (redPct / 100) * circ;

  const gap = 4;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#e5eeff"
          strokeWidth={stroke}
        />
        {/* Green segment */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#22c55e"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${greenDash - gap} ${circ - greenDash + gap}`}
          strokeDashoffset={0}
        />
        {/* Orange segment */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#f97316"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${orangeDash - gap} ${circ - orangeDash + gap}`}
          strokeDashoffset={-greenDash}
        />
        {/* Red segment */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#ef4444"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${redDash - gap} ${circ - redDash + gap}`}
          strokeDashoffset={-(greenDash + orangeDash)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-on-surface">{score}%</span>
        <span className="text-[10px] font-semibold text-on-surface-variant/60 uppercase tracking-widest text-center leading-tight mt-0.5">
          Compliance
          <br />
          Health Score
        </span>
      </div>
    </div>
  );
};

/* ─── Critical Issue Row ────────────────────────────────────── */
interface CriticalRowProps {
  item: ComplianceItem;
  onClick: () => void;
}

const CriticalRow = ({ item, onClick }: CriticalRowProps) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 py-3.5 border-l-4 border-l-red-500 bg-white hover:bg-red-50/40 transition-colors text-left"
  >
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-0.5">
        <span className="text-sm font-semibold text-on-surface">
          {item.title}
        </span>
        <span
          className={cn(
            "text-[10px] font-bold px-1.5 py-0.5 rounded",
            item.badgeColor,
          )}
        >
          {item.badge}
        </span>
      </div>
      <p className="text-xs text-red-600">
        {item.penalty ? `⚠ Penalty: ${item.penalty}` : `⚠ Risk: ${item.risk}`}
      </p>
    </div>
    <span className="material-symbols-outlined text-on-surface-variant/50 text-[20px] shrink-0">
      chevron_right
    </span>
  </button>
);

/* ─── Attention Card ────────────────────────────────────────── */
interface AttentionCardProps {
  item: ComplianceItem;
  onClick: () => void;
}

const AttentionCard = ({ item, onClick }: AttentionCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className="flex-1 bg-white rounded-xl border border-outline-variant/40 p-3 text-left hover:border-primary/30 hover:shadow-sm transition-all"
  >
    <p className="text-sm font-semibold text-on-surface mb-1">{item.title}</p>
    <div className="flex items-center justify-between">
      <p className="text-xs text-blue-600">{item.dueIn ?? item.scheduledFor}</p>
      <span className="material-symbols-outlined text-on-surface-variant/50 text-[18px]">
        arrow_forward
      </span>
    </div>
  </button>
);

/* ─── Main Page ─────────────────────────────────────────────── */
const CompliancePage = (): React.ReactElement => {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [compliantExpanded, setCompliantExpanded] = useState(false);

  const criticalItems = COMPLIANCE_ITEMS.filter(
    (i) => i.severity === "critical",
  );
  const attentionItems = COMPLIANCE_ITEMS.filter(
    (i) => i.severity === "attention",
  );
  const compliantItems = COMPLIANCE_ITEMS.filter(
    (i) => i.severity === "compliant",
  );

  const handleRunCheck = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2500);
  };

  const goToDetail = (id: string) => navigate(`/dashboard/compliance/${id}`);

  return (
    <div className="p-md relative min-h-full pb-24">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-md">
        <div>
          <h1 className="font-title-md text-title-md font-bold text-on-surface">
            Compliance Check
          </h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
            Last checked: Jun 13, 2026
          </p>
        </div>
        <div className="flex items-center gap-sm">
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              sync
            </span>
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              settings
            </span>
          </button>
          <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] text-primary">
              account_circle
            </span>
          </button>
        </div>
      </div>

      {/* Health Score Card */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-6 mb-md">
        <div className="flex flex-col items-center">
          <CircularHealthScore score={75} />

          {/* Stats */}
          <div className="flex items-center gap-3 mt-4 mb-4">
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs font-semibold text-green-700">
                {compliantItems.length + 9} Compliant
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs font-semibold text-blue-700">
                {attentionItems.length} Needs Attention
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-xs font-semibold text-red-700">
                {criticalItems.length} Critical Issues
              </span>
            </div>
          </div>

          <button className="h-9 px-5 rounded-xl border border-outline-variant/60 text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">
              download
            </span>
            Download Action Plan
          </button>
        </div>
      </div>

      {/* Critical Issues */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden mb-md">
        <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-sm font-bold text-on-surface">
              Critical Issues
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-1 rounded bg-red-100 text-red-700 uppercase tracking-wider">
            Immediate Action Required
          </span>
        </div>
        <div className="divide-y divide-outline-variant/20">
          {criticalItems.map((item) => (
            <CriticalRow
              key={item.id}
              item={item}
              onClick={() => goToDetail(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Needs Attention */}
      <div className="mb-md">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="text-sm font-bold text-on-surface">
            Needs Attention
          </span>
        </div>
        <div className="flex gap-3">
          {attentionItems.map((item) => (
            <AttentionCard
              key={item.id}
              item={item}
              onClick={() => goToDetail(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Compliant Items */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setCompliantExpanded((e) => !e)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-container-low transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm font-bold text-on-surface">
              Compliant Items ({compliantItems.length + 11})
            </span>
          </div>
          <span
            className={cn(
              "material-symbols-outlined text-[20px] text-on-surface-variant transition-transform",
              compliantExpanded ? "rotate-180" : "",
            )}
          >
            expand_more
          </span>
        </button>
        {compliantExpanded && (
          <div className="border-t border-outline-variant/20 divide-y divide-outline-variant/20">
            {compliantItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToDetail(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-container-low transition-colors text-left"
              >
                <span className="material-symbols-outlined text-green-600 text-[18px]">
                  check_circle
                </span>
                <span className="text-sm text-on-surface flex-1">
                  {item.title}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded",
                    item.badgeColor,
                  )}
                >
                  {item.badge}
                </span>
                <span className="material-symbols-outlined text-on-surface-variant/50 text-[18px]">
                  chevron_right
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Run New Check FAB */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          type="button"
          onClick={handleRunCheck}
          disabled={isRunning}
          className="flex items-center gap-2 h-12 px-5 bg-blue-500 hover:bg-blue-600 active:scale-[0.97] text-white font-semibold text-sm rounded-full shadow-lg shadow-blue-500/30 transition-all disabled:opacity-80"
        >
          <span
            className={cn(
              "material-symbols-outlined text-[18px]",
              isRunning && "animate-spin",
            )}
          >
            {isRunning ? "sync" : "play_circle"}
          </span>
          {isRunning ? "Checking..." : "Run New Check"}
        </button>
      </div>
    </div>
  );
};

export { COMPLIANCE_ITEMS };
export type { ComplianceItem };
export default CompliancePage;
