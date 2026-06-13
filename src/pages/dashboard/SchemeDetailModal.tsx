import React, { useState, useEffect } from "react";
import { schemeService, type Scheme } from "../../services/scheme.service";

interface SchemeDetailModalProps {
  schemeId: string | null;
  onClose: () => void;
}

const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  schemeId,
  onClose,
}) => {
  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!schemeId) return;

    const fetchSchemeDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await schemeService.getSchemeById(schemeId);
        setScheme(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch scheme details",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSchemeDetails();
  }, [schemeId]);

  if (!schemeId) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-outline-variant/40 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-on-surface">
              Scheme Details
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                close
              </span>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-outline-variant border-t-primary rounded-full animate-spin" />
                  <p className="text-xs text-on-surface-variant">
                    Loading scheme details...
                  </p>
                </div>
              </div>
            )}

            {error && !loading && (
              <div className="bg-error/10 rounded-lg border border-error/30 p-4">
                <p className="text-xs font-semibold text-error mb-1">
                  Failed to load details
                </p>
                <p className="text-xs text-error/80">{error}</p>
              </div>
            )}

            {scheme && !loading && (
              <div className="space-y-6">
                {/* Title and Category */}
                <div>
                  <h1 className="text-2xl font-bold text-on-surface mb-2">
                    {scheme.schemeName}
                  </h1>
                  <p className="text-sm text-on-surface-variant mb-3">
                    {scheme.targetCategory}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-blue-100 text-orange-700">
                      {scheme.level}
                    </span>
                    {scheme.schemeCategory.map((cat) => (
                      <span
                        key={cat}
                        className="text-[10px] font-bold px-2 py-1 rounded bg-purple-100 text-purple-700"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                {scheme.tags && scheme.tags.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-on-surface mb-2">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {scheme.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium px-2.5 py-1 rounded bg-surface-container text-on-surface"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Details */}
                <div>
                  <p className="text-xs font-semibold text-on-surface mb-2">
                    Overview
                  </p>
                  <p className="text-xs leading-relaxed text-on-surface-variant whitespace-pre-wrap">
                    {scheme.details}
                  </p>
                </div>

                {/* Benefits */}
                <div>
                  <p className="text-xs font-semibold text-on-surface mb-2">
                    Benefits
                  </p>
                  <p className="text-xs leading-relaxed text-on-surface-variant whitespace-pre-wrap">
                    {scheme.benefits}
                  </p>
                </div>

                {/* Eligibility */}
                <div>
                  <p className="text-xs font-semibold text-on-surface mb-2">
                    Eligibility
                  </p>
                  <p className="text-xs leading-relaxed text-on-surface-variant whitespace-pre-wrap">
                    {scheme.eligibility}
                  </p>
                </div>

                {/* Application Process */}
                <div>
                  <p className="text-xs font-semibold text-on-surface mb-2">
                    How to Apply
                  </p>
                  <p className="text-xs leading-relaxed text-on-surface-variant whitespace-pre-wrap">
                    {scheme.application}
                  </p>
                </div>

                {/* Required Documents */}
                {scheme.documents && scheme.documents.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-on-surface mb-2">
                      Required Documents
                    </p>
                    <ul className="space-y-2">
                      {scheme.documents.map((doc, i) => (
                        <li
                          key={i}
                          className="text-xs text-on-surface-variant flex gap-2"
                        >
                          <span className="shrink-0">•</span>
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Applicable States */}
                {scheme.applicableStates &&
                  scheme.applicableStates.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-on-surface mb-2">
                        Applicable States/UTs
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {scheme.applicableStates.map((state) => (
                          <span
                            key={state}
                            className="text-[10px] font-medium px-2.5 py-1 rounded bg-green-100 text-green-700"
                          >
                            {state}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Action Button */}
                <div className="pt-4 border-t border-outline-variant/40">
                  {scheme.applicationLink ? (
                    <a
                      href={scheme.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      Open Application Link
                      <span className="material-symbols-outlined text-[16px]">
                        open_in_new
                      </span>
                    </a>
                  ) : (
                    <button className="w-full h-10 bg-gray-300 text-gray-600 font-semibold rounded-lg cursor-not-allowed">
                      Application Link Not Available
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SchemeDetailModal;
