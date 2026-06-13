import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "../../utils/cn";

const DocumentReadyPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const { docType } = useParams<{ docType: string }>();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-md py-3 border-b border-outline-variant/30 bg-surface-container-lowest shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(`/dashboard/schemes/document/${docType}`)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              arrow_back
            </span>
          </button>
          <h1 className="text-[16px] font-bold text-on-surface">
            Document Ready
          </h1>
        </div>
        <div className="flex items-center gap-sm">
          <button className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              notifications
            </span>
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              help_outline
            </span>
          </button>
          <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] text-primary">
              account_circle
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-surface-container-low flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Success */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-green-600 text-[32px]">
                check_circle
              </span>
            </div>
            <h2 className="text-xl font-bold text-on-surface mb-1">
              Your document is ready!
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-on-surface-variant">
                Scheme Application Letter
              </span>
              <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                CGTMSE
              </span>
            </div>
          </div>

          {/* Document Preview Thumbnail */}
          <div className="bg-white rounded-2xl border border-outline-variant/40 shadow-md p-5 mb-5 relative overflow-hidden">
            {/* Page count badge */}
            <div className="absolute top-3 right-3 bg-on-surface/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              3 pages
            </div>

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <p className="text-[28px] font-black text-on-surface/5 rotate-[-35deg] tracking-widest">
                VYAPARSETU
              </p>
            </div>

            {/* Skeleton lines mimicking a document */}
            <div className="relative space-y-2.5 py-4">
              {[80, 100, 60, 90, 75, 55, 85, 70, 40, 65, 90, 50].map((w, i) => (
                <div
                  key={i}
                  className="h-2 rounded bg-on-surface/8"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          </div>

          {/* Download Button */}
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className={cn(
              "w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 mb-3",
              isDownloading && "opacity-80",
            )}
          >
            <span
              className={cn(
                "material-symbols-outlined text-[18px]",
                isDownloading && "animate-bounce",
              )}
            >
              {isDownloading ? "downloading" : "download"}
            </span>
            {isDownloading ? "Downloading..." : "Download PDF"}
          </button>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              type="button"
              className="h-10 rounded-xl border border-outline-variant text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">
                print
              </span>
              Print
            </button>
            <button
              type="button"
              className="h-10 rounded-xl border border-outline-variant text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">
                share
              </span>
              Share
            </button>
          </div>

          {/* Next Step Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-blue-500 text-[16px] mt-0.5">
                info
              </span>
              <div>
                <p className="text-xs text-blue-800 leading-relaxed">
                  Next step: Visit the scheme portal, attach this letter and
                  required documents.
                </p>
                <a
                  href="#"
                  className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-0.5 mt-1"
                >
                  Open Portal
                  <span className="material-symbols-outlined text-[12px]">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Edit link */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate(`/dashboard/schemes/document/${docType}`)}
              className="text-xs text-on-surface-variant/60 hover:text-on-surface-variant transition-colors"
            >
              Edit document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentReadyPage;
