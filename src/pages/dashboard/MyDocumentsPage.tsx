import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";

type DocType = "APPLICATION LETTER" | "ACTION PLAN" | "PROFILE REPORT";
type DocStatus = "PDF Ready" | "Draft" | "Filled";
type FilterTab = "all" | "letters" | "plans" | "reports";

interface Document {
  id: string;
  type: DocType;
  title: string;
  generatedDate: string;
  status: DocStatus;
  icon: string;
  iconBg: string;
  iconColor: string;
}

const DOCUMENTS: Document[] = [
  {
    id: "msme-tech",
    type: "APPLICATION LETTER",
    title: "MSME Technology Upgradation Scheme",
    generatedDate: "12 Jun 2025",
    status: "PDF Ready",
    icon: "description",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "quarterly-compliance",
    type: "ACTION PLAN",
    title: "Quarterly Compliance Strategy",
    generatedDate: "10 Jun 2025",
    status: "Draft",
    icon: "task_alt",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: "annual-health-audit",
    type: "PROFILE REPORT",
    title: "Annual Business Health Audit",
    generatedDate: "08 Jun 2025",
    status: "Filled",
    icon: "bar_chart",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    id: "startup-seed-fund",
    type: "APPLICATION LETTER",
    title: "Startup India Seed Fund Grant",
    generatedDate: "05 Jun 2025",
    status: "Draft",
    icon: "article",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
];

const STATUS_BADGE: Record<DocStatus, string> = {
  "PDF Ready": "bg-green-100 text-green-700 border-green-200",
  Draft:
    "bg-surface-container text-on-surface-variant border-outline-variant/60",
  Filled: "bg-teal-100 text-teal-700 border-teal-200",
};

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "letters", label: "Application Letters" },
  { key: "plans", label: "Action Plans" },
  { key: "reports", label: "Profile Reports" },
];

const TYPE_FILTER: Record<FilterTab, DocType | null> = {
  all: null,
  letters: "APPLICATION LETTER",
  plans: "ACTION PLAN",
  reports: "PROFILE REPORT",
};

const MyDocumentsPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filtered =
    activeTab === "all"
      ? DOCUMENTS
      : DOCUMENTS.filter((d) => d.type === TYPE_FILTER[activeTab]);

  return (
    <div className="p-md min-h-full relative pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-md">
        <h1 className="font-title-md text-title-md font-bold text-on-surface">
          My Documents
        </h1>
        <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
            search
          </span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-sm border-b border-outline-variant/30 mb-md">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "pb-2.5 text-sm font-semibold transition-colors relative",
              activeTab === tab.key
                ? "text-primary"
                : "text-on-surface-variant hover:text-on-surface",
            )}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Document List */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
        {filtered.map((doc, idx) => (
          <div
            key={doc.id}
            className={cn(
              "flex items-center gap-4 px-4 py-4 hover:bg-surface-container-low/50 transition-colors",
              idx < filtered.length - 1 && "border-b border-outline-variant/20",
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                doc.iconBg,
              )}
            >
              <span
                className={cn(
                  "material-symbols-outlined text-[22px]",
                  doc.iconColor,
                )}
              >
                {doc.icon}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-wider mb-0.5">
                {doc.type}
              </p>
              <p className="text-sm font-bold text-on-surface truncate">
                {doc.title}
              </p>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Generated {doc.generatedDate}
              </p>
            </div>

            {/* Status Badge */}
            <span
              className={cn(
                "shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border",
                STATUS_BADGE[doc.status],
              )}
            >
              {doc.status}
            </span>

            {/* Kebab Menu */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() =>
                  setOpenMenuId(openMenuId === doc.id ? null : doc.id)
                }
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                  more_vert
                </span>
              </button>
              {openMenuId === doc.id && (
                <div className="absolute right-0 mt-1 w-36 bg-surface-container-lowest border border-outline-variant/40 rounded-xl shadow-lg py-xs z-10 animate-in fade-in slide-in-from-top-1 duration-150">
                  {["Download", "Preview", "Rename", "Delete"].map((action) => (
                    <button
                      key={action}
                      type="button"
                      onClick={() => setOpenMenuId(null)}
                      className={cn(
                        "w-full px-sm py-xs text-left text-xs font-medium hover:bg-surface-container-low transition-colors",
                        action === "Delete" && "text-error",
                      )}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <span className="material-symbols-outlined text-[40px] text-on-surface-variant/30 mb-3">
              folder_open
            </span>
            <p className="text-sm text-on-surface-variant">
              No documents found
            </p>
          </div>
        )}
      </div>

      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          type="button"
          onClick={() => navigate("/dashboard/schemes/generate")}
          className="flex items-center gap-2 h-12 px-5 bg-blue-500 hover:bg-blue-600 active:scale-[0.97] text-white font-semibold text-sm rounded-full shadow-lg shadow-blue-500/30 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Generate New Document
        </button>
      </div>
    </div>
  );
};

export default MyDocumentsPage;
