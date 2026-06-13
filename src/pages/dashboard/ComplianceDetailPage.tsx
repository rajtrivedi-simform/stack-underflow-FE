import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";
import { COMPLIANCE_ITEMS } from "./CompliancePage";

const ComplianceDetailPage = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  const item = COMPLIANCE_ITEMS.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="p-md flex flex-col items-center justify-center h-full gap-3">
        <span className="material-symbols-outlined text-[48px] text-on-surface-variant/30">
          search_off
        </span>
        <p className="text-on-surface-variant">Compliance item not found.</p>
        <button
          type="button"
          onClick={() => navigate("/dashboard/compliance")}
          className="text-primary text-sm font-semibold hover:underline"
        >
          ← Back to Compliance
        </button>
      </div>
    );
  }

  const isCritical = item.severity === "critical";
  const isAttention = item.severity === "attention";

  const statusBg = isCritical
    ? "bg-red-50 border-red-200"
    : isAttention
      ? "bg-blue-50 border-blue-200"
      : "bg-green-50 border-green-200";

  const statusBadgeBg = isCritical
    ? "bg-red-600 text-white"
    : isAttention
      ? "bg-blue-500 text-white"
      : "bg-green-600 text-white";

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2500);
  };

  const effortLabel = isCritical ? "Moderate" : "Low";
  const timeLabel = isCritical ? "7–10 days" : "3–5 days";

  return (
    <div className="p-md pb-28 relative min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/compliance")}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              arrow_back
            </span>
          </button>
          <h1 className="font-title-md text-[17px] font-bold text-on-surface">
            {item.title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Health Score chip */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-200 bg-green-50">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-semibold text-green-700">
              Health Score: 82
            </span>
          </div>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              settings
            </span>
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              notifications
            </span>
          </button>
          <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] text-primary">
              account_circle
            </span>
          </button>
        </div>
      </div>

      {/* Status Banner */}
      <div
        className={cn(
          "rounded-xl border p-4 flex items-center justify-between mb-5",
          statusBg,
        )}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider",
              statusBadgeBg,
            )}
          >
            {isCritical
              ? "Non-Compliant"
              : isAttention
                ? "Needs Attention"
                : "Compliant"}
          </span>
          <p className="text-sm text-on-surface">
            Current: Not Registered &nbsp;→&nbsp; Required: Registered
          </p>
        </div>
        {(isCritical || isAttention) && (
          <button
            className={cn(
              "text-xs font-semibold px-3 py-1.5 rounded-lg text-white",
              isCritical
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-500 hover:bg-blue-600",
            )}
          >
            Action Required Immediately
          </button>
        )}
      </div>

      {/* Two-column layout */}
      <div className="flex gap-5">
        {/* Left: Main content */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Why This Matters */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-[18px]">
                info
              </span>
              <h2 className="text-sm font-bold text-on-surface">
                Why This Matters
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              {item.description}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              <span className="material-symbols-outlined text-[14px]">
                open_in_new
              </span>
              Official GST Portal
            </a>
          </div>

          {/* What's Missing */}
          {item.missingDocs.length > 0 && (
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-blue-500 text-[18px]">
                  search
                </span>
                <h2 className="text-sm font-bold text-on-surface">
                  What's Missing
                </h2>
              </div>
              <div className="space-y-2">
                {item.missingDocs.map((doc) => (
                  <div
                    key={doc}
                    className="flex items-center gap-2 py-2 border-b border-outline-variant/20 last:border-0"
                  >
                    <span className="material-symbols-outlined text-red-500 text-[18px]">
                      cancel
                    </span>
                    <span className="text-sm text-on-surface">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How to Fix */}
          {item.steps.length > 0 && (
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    format_list_numbered
                  </span>
                  <h2 className="text-sm font-bold text-on-surface">
                    How to Fix — Step by Step
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-[14px]">
                      bolt
                    </span>
                    Effort: {effortLabel}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-[14px]">
                      schedule
                    </span>
                    Est: {timeLabel}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {item.steps.map((step, index) => (
                  <div key={step.title} className="flex gap-3">
                    {/* Step number + connector */}
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <span className="text-white text-xs font-bold">
                          {index + 1}
                        </span>
                      </div>
                      {index < item.steps.length - 1 && (
                        <div className="w-0.5 flex-1 bg-outline-variant/40 mt-1 min-h-[16px]" />
                      )}
                    </div>
                    {/* Content */}
                    <div
                      className={cn(
                        "flex-1 pb-3",
                        index < item.steps.length - 1 &&
                          "border-b border-outline-variant/20",
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-on-surface">
                          {step.title}
                        </p>
                        {index === 1 && (
                          <button className="flex items-center gap-1 text-xs text-primary font-semibold hover:underline">
                            <span className="material-symbols-outlined text-[14px]">
                              open_in_new
                            </span>
                            Open Portal
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Side cards */}
        <div className="w-64 shrink-0 space-y-3">
          {/* Penalty Card */}
          {(item.penalty || item.risk) && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-red-600 text-[18px]">
                  warning
                </span>
                <p className="text-xs font-bold text-red-700 uppercase tracking-wider">
                  Penalty for Non-Compliance
                </p>
              </div>
              <p className="text-xl font-bold text-red-700 mb-2">
                {item.penalty ?? item.risk}
              </p>
              {item.penalty && (
                <p className="text-xs text-red-600/80 leading-relaxed">
                  Delay beyond 5 months triggers legal notice and suspension of
                  e-way bill generation.
                </p>
              )}
            </div>
          )}

          {/* AI Advisory Insight */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-[18px]">
                assistant
              </span>
              <p className="text-xs font-bold text-primary uppercase tracking-wider">
                AI Advisory Insight
              </p>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              "Your current sales data suggests high transaction volume.
              Immediate filing will prevent an estimated compounding interest of
              ₹14,000 by end of quarter."
            </p>
          </div>

          {/* Progress tracker */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-4 shadow-sm">
            <p className="text-xs font-bold text-on-surface mb-3">
              Resolution Progress
            </p>
            <div className="space-y-2.5">
              {item.steps.map((step, i) => (
                <div key={step.title} className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                      i === 0
                        ? "border-primary bg-primary"
                        : "border-outline-variant",
                    )}
                  >
                    {i === 0 && (
                      <span className="material-symbols-outlined text-white text-[10px]">
                        check
                      </span>
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-xs",
                      i === 0
                        ? "text-on-surface font-medium"
                        : "text-on-surface-variant/60",
                    )}
                  >
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Generate Action Plan FAB */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 h-12 px-5 bg-blue-500 hover:bg-blue-600 active:scale-[0.97] text-white font-semibold text-sm rounded-full shadow-lg shadow-blue-500/30 transition-all disabled:opacity-80"
        >
          <span
            className={cn(
              "material-symbols-outlined text-[18px]",
              isGenerating && "animate-spin",
            )}
          >
            {isGenerating ? "sync" : "bolt"}
          </span>
          {isGenerating ? "Generating..." : "Generate Compliance Action Plan"}
        </button>
      </div>
    </div>
  );
};

export default ComplianceDetailPage;
