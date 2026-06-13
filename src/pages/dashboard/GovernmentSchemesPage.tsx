import React, { useState, useEffect } from "react";
import { cn } from "../../utils/cn";
import { schemeService, type Scheme } from "../../services/scheme.service";
import SchemeDetailModal from "./SchemeDetailModal";

type LevelFilter = "All States" | "Central" | "State";
type CategoryFilter = "All Categories" | "Business" | "Startup" | "Both";

const GovernmentSchemesPage = (): React.ReactElement => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("Central");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("Both");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(null);

  // Fetch schemes from API
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await schemeService.getSchemes({
          page: currentPage,
          limit: 20,
          ...(levelFilter !== "All States" && { level: levelFilter }),
          ...(search && { search }),
        });
        setSchemes(response.data.schemes);
        setTotalPages(
          Math.ceil((response.data.total || 0) / (response.data.limit || 20)),
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch schemes",
        );
        setSchemes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, [currentPage, levelFilter, search]);

  const filtered = schemes.filter((s) => {
    const matchCategory =
      categoryFilter === "All Categories" ||
      categoryFilter === "Both" ||
      s.schemeCategory.some((cat) => cat === categoryFilter);
    return matchCategory;
  });

  const getTagColor = (index: number): string => {
    const colors = [
      "bg-blue-100 text-blue-700",
      "bg-teal-100 text-teal-700",
      "bg-blue-100 text-blue-700",
      "bg-purple-100 text-purple-700",
      "bg-green-100 text-green-700",
      "bg-pink-100 text-pink-700",
      "bg-indigo-100 text-indigo-700",
      "bg-amber-100 text-amber-700",
    ];
    return colors[index % colors.length];
  };

  const levelTabs: LevelFilter[] = ["All States", "Central", "State"];
  const categoryTabs: CategoryFilter[] = [
    "All Categories",
    "Business",
    "Startup",
    "Both",
  ];

  return (
    <div className="p-md min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-md">
        <h1 className="font-title-md text-title-md font-bold text-on-surface">
          Government Schemes
        </h1>
        <div className="flex items-center gap-sm">
          <button className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              notifications
            </span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error border border-white" />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
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

      {/* Search */}
      <div className="relative mb-sm">
        <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant/50">
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search schemes by name, sector..."
          className="w-full h-10 pl-10 pr-sm rounded-xl border border-outline-variant/60 bg-surface-container-low text-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-xs flex-wrap mb-sm">
        {/* Level filters */}
        {levelTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setLevelFilter(tab)}
            className={cn(
              "h-7 px-sm rounded-full text-xs font-semibold transition-colors flex items-center gap-1",
              levelFilter === tab
                ? "bg-on-surface text-surface"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/40",
            )}
          >
            {tab === "All States" && (
              <span className="material-symbols-outlined text-[12px]">
                public
              </span>
            )}
            {tab}
          </button>
        ))}
        <div className="w-px h-5 bg-outline-variant/40 mx-xs" />
        {/* Category filters */}
        {categoryTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setCategoryFilter(tab)}
            className={cn(
              "h-7 px-sm rounded-full text-xs font-semibold transition-colors flex items-center gap-1",
              categoryFilter === tab
                ? "bg-on-surface text-surface"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/40",
            )}
          >
            {tab === "All Categories" && (
              <span className="material-symbols-outlined text-[12px]">
                category
              </span>
            )}
            {tab}
          </button>
        ))}
      </div>

      {/* Results count + sort */}
      <div className="flex items-center justify-between mb-md">
        <p className="text-xs text-on-surface-variant">
          Showing{" "}
          <span className="font-semibold text-on-surface">
            {filtered.length}
          </span>{" "}
          schemes
        </p>
        <button className="flex items-center gap-1 text-xs font-semibold text-on-surface hover:text-primary transition-colors">
          Sort: Relevance
          <span className="material-symbols-outlined text-[14px]">
            expand_more
          </span>
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-outline-variant border-t-primary rounded-full animate-spin" />
            <p className="text-xs text-on-surface-variant">
              Loading schemes...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-error/10 rounded-2xl border border-error/30 p-4 mb-md">
          <p className="text-xs font-semibold text-error mb-1">
            Failed to load schemes
          </p>
          <p className="text-xs text-error/80">{error}</p>
        </div>
      )}

      {/* Scheme Cards */}
      {!loading && (
        <>
          <div className="space-y-3 mb-md">
            {filtered.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xs text-on-surface-variant">
                  No schemes found
                </p>
              </div>
            ) : (
              filtered.map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-4"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-on-surface mb-1">
                        {scheme.schemeName}
                      </h3>
                      <p className="text-xs text-on-surface-variant mb-2">
                        {scheme.targetCategory}
                      </p>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {scheme.level && (
                          <span
                            className={cn(
                              "text-[10px] font-bold px-1.5 py-0.5 rounded",
                              "bg-blue-100 text-blue-700",
                            )}
                          >
                            {scheme.level}
                          </span>
                        )}
                        {scheme.tags &&
                          scheme.tags.map((tag, i) => (
                            <span
                              key={tag}
                              className={cn(
                                "text-[10px] font-bold px-1.5 py-0.5 rounded",
                                getTagColor(i),
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed mb-3 line-clamp-2">
                    {scheme.details}
                  </p>

                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedSchemeId(scheme.id)}
                      className="text-xs font-semibold text-primary flex items-center gap-0.5 hover:underline"
                    >
                      View Details
                      <span className="material-symbols-outlined text-[14px]">
                        arrow_forward
                      </span>
                    </button>
                    {scheme.applicationLink ? (
                      <a
                        href={scheme.applicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-7 px-sm bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                      >
                        Apply
                        <span className="material-symbols-outlined text-[14px]">
                          arrow_forward
                        </span>
                      </a>
                    ) : (
                      <button className="h-7 px-sm bg-gray-400 text-white text-xs font-semibold rounded-lg flex items-center gap-1 cursor-not-allowed opacity-60">
                        Apply
                        <span className="material-symbols-outlined text-[14px]">
                          arrow_forward
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-xs">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-surface-container-low transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                  chevron_left
                </span>
              </button>
              {Array.from(
                { length: Math.min(3, totalPages) },
                (_, i) => i + 1,
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-7 h-7 rounded-lg text-xs font-semibold transition-colors",
                    currentPage === page
                      ? "bg-on-surface text-surface"
                      : "hover:bg-surface-container-low text-on-surface-variant",
                  )}
                >
                  {page}
                </button>
              ))}
              {totalPages > 3 && (
                <>
                  <span className="text-xs text-on-surface-variant px-1">
                    ...
                  </span>
                  <button className="w-7 h-7 rounded-lg text-xs font-semibold hover:bg-surface-container-low text-on-surface-variant transition-colors">
                    {totalPages}
                  </button>
                </>
              )}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-surface-container-low transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                  chevron_right
                </span>
              </button>
            </div>
          )}
        </>
      )}

      {/* Scheme Detail Modal */}
      <SchemeDetailModal
        schemeId={selectedSchemeId}
        onClose={() => setSelectedSchemeId(null)}
      />
    </div>
  );
};

export default GovernmentSchemesPage;
