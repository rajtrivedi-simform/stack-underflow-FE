import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { MatchedScheme } from '../services/match.service';

interface MatchSchemesModalProps {
  isOpen: boolean;
  schemes: MatchedScheme[];
  totalMatches: number;
  isLoading?: boolean;
  onClose: () => void;
}

const MatchSchemesModal: React.FC<MatchSchemesModalProps> = ({
  isOpen,
  schemes,
  totalMatches,
  isLoading = false,
  onClose,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleViewScheme = (schemeId: string) => {
    navigate(`/dashboard/schemes`, { state: { selectedSchemeId: schemeId } });
    onClose();
  };

  const handleExploreMore = () => {
    navigate('/dashboard/schemes');
    onClose();
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
    onClose();
  };

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
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[28px] text-green-600">
                check_circle
              </span>
              <div>
                <h2 className="text-lg font-bold text-on-surface">Profile Saved Successfully!</h2>
                <p className="text-sm text-on-surface-variant">Matching schemes based on your profile</p>
              </div>
            </div>
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
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-outline-variant border-t-primary rounded-full animate-spin" />
                  <p className="text-sm text-on-surface-variant">
                    Finding the best schemes for you...
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Results Summary */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm font-semibold text-blue-700">
                    ✨ We found {totalMatches} government schemes that match your profile!
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Here are the top matched schemes below. You can explore all schemes in your dashboard.
                  </p>
                </div>

                {/* Matched Schemes List */}
                <div className="space-y-3">
                  {schemes.length > 0 ? (
                    schemes.map((scheme, index) => (
                      <div
                        key={scheme.id}
                        className="border border-outline-variant/40 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">
                                #{index + 1} Match
                              </span>
                              <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                {scheme.level}
                              </span>
                              {scheme.matchScore && (
                                <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                  {Math.round(scheme.matchScore)}% Match
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-bold text-on-surface mb-1">
                              {scheme.schemeName}
                            </h4>
                            <p className="text-xs text-on-surface-variant line-clamp-2">
                              {scheme.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-3 border-t border-outline-variant/20">
                          <button
                            onClick={() => handleViewScheme(scheme.id)}
                            className="flex-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors py-2"
                          >
                            View Details →
                          </button>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleViewScheme(scheme.id);
                            }}
                            className="flex-1 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded px-3 py-2 text-center transition-colors"
                          >
                            Apply Now
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-sm text-on-surface-variant">
                        No matching schemes found at the moment.
                      </p>
                      <p className="text-xs text-on-surface-variant mt-1">
                        Check back later as new schemes are added regularly.
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-outline-variant/40">
                  <button
                    onClick={handleExploreMore}
                    className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    Explore All Schemes
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </button>
                  <button
                    onClick={handleGoToDashboard}
                    className="w-full h-10 bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold rounded-lg transition-colors"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchSchemesModal;
