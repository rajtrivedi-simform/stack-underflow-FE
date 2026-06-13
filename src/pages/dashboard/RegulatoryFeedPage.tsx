import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { useRegulatoryUpdates } from '../../hooks/useRegulatoryUpdates';
import type { ApiSeverity } from '../../services/regulatory.service';

type FilterTab = 'all' | ApiSeverity;

const SEVERITY_CONFIG: Record<ApiSeverity, { label: string; className: string; border: string }> = {
  CRITICAL: {
    label: 'CRITICAL',
    className: 'bg-red-100 text-red-700 border-red-200',
    border: 'border-l-red-500',
  },
  HIGH: {
    label: 'HIGH',
    className: 'bg-orange-100 text-orange-700 border-orange-200',
    border: 'border-l-orange-500',
  },
  MEDIUM: {
    label: 'MEDIUM',
    className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    border: 'border-l-yellow-500',
  },
  LOW: {
    label: 'LOW',
    className: 'bg-blue-100 text-blue-700 border-blue-200',
    border: 'border-l-surface-container',
  },
};

const PAGE_LIMIT = 10;

const formatDate = (isoString: string): string =>
  new Date(isoString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const buildPageRange = (current: number, total: number): (number | '…')[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '…')[] = [1];
  if (current > 3) pages.push('…');
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) pages.push(p);
  if (current < total - 2) pages.push('…');
  pages.push(total);
  return pages;
};

const RegulatoryFeedPage = (): React.ReactElement => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useRegulatoryUpdates({
    severity: activeFilter === 'all' ? undefined : activeFilter,
    page: currentPage,
    limit: PAGE_LIMIT,
  });

  const { data: criticalData } = useRegulatoryUpdates({ severity: 'CRITICAL', page: 1, limit: 1 });

  const criticalCount = criticalData?.pagination?.total ?? 0;
  const updates = data?.updates ?? [];
  const totalPages = data?.pagination?.pages ?? 1;

  const handleFilterChange = (filter: FilterTab) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'CRITICAL', label: 'Critical' },
    { key: 'HIGH', label: 'High' },
    { key: 'MEDIUM', label: 'Medium' },
    { key: 'LOW', label: 'Low' },
  ];

  return (
    <div className="p-md min-h-full pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-md">
        <div>
          <h1 className="font-title-md text-title-md font-bold text-on-surface">Regulatory Updates</h1>
          <p className="text-xs text-on-surface-variant mt-0.5">Stay ahead of compliance changes</p>
        </div>
        <div className="flex items-center gap-sm">
          <div className="relative max-w-[220px] w-full">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant/50">search</span>
            <input
              type="text"
              placeholder="Search regulations..."
              className="w-full h-8 pl-8 pr-sm rounded-xl border border-outline-variant/60 bg-surface-container-low text-xs text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:border-primary/50 transition-all"
            />
          </div>
          <button className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error border border-white" />
          </button>
          <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] text-primary">account_circle</span>
          </button>
        </div>
      </div>

      {/* Critical Alert Banner */}
      {!alertDismissed && criticalCount > 0 && (
        <div className="bg-red-500 rounded-2xl p-3 mb-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-white">warning</span>
            <p className="text-sm font-semibold text-white">
              {criticalCount} Critical update{criticalCount !== 1 ? 's' : ''} this month — Review Immediately
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAlertDismissed(true)}
            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-white">close</span>
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-xs mb-md">
        {tabs.map(tab => (
          <button
            key={tab.key}
            type="button"
            onClick={() => handleFilterChange(tab.key)}
            className={cn(
              'h-7 px-sm rounded-full text-xs font-semibold transition-colors',
              activeFilter === tab.key
                ? 'bg-on-surface text-surface'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/40',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Error state */}
      {isError && (
        <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant">
          <span className="material-symbols-outlined text-[40px] mb-2">error_outline</span>
          <p className="text-sm font-medium">Failed to load regulatory updates</p>
          <p className="text-xs mt-1">Please try again later</p>
        </div>
      )}

      {/* Update Cards */}
      {!isError && (
        <div className="space-y-3 mb-md">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 border-l-4 border-l-outline-variant p-4 animate-pulse"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-4 w-16 bg-surface-container rounded" />
                    <div className="h-3 w-28 bg-surface-container rounded" />
                  </div>
                  <div className="h-4 w-3/4 bg-surface-container rounded mb-2" />
                  <div className="h-3 w-full bg-surface-container rounded mb-1" />
                  <div className="h-3 w-2/3 bg-surface-container rounded mb-3" />
                  <div className="h-8 bg-surface-container rounded-lg" />
                </div>
              ))
            : updates.length === 0
              ? (
                  <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[40px] mb-2">check_circle</span>
                    <p className="text-sm font-medium">No updates found</p>
                    <p className="text-xs mt-1">Check back later for new regulatory updates</p>
                  </div>
                )
              : updates.map(update => {
                  const config = SEVERITY_CONFIG[update.severity];
                  const affectsLabel = [
                    update.affectsComplianceIds.length > 0 && `${update.affectsComplianceIds.length} compliance`,
                    update.affectsSchemeIds.length > 0 && `${update.affectsSchemeIds.length} scheme`,
                  ].filter(Boolean).join(' · ');

                  return (
                    <div
                      key={update.id}
                      className={cn(
                        'bg-surface-container-lowest rounded-2xl border border-outline-variant/40 border-l-4 shadow-sm p-4',
                        config.border,
                      )}
                    >
                      {/* Badges row */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded border', config.className)}>
                          {config.label}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-on-surface-variant/60">
                          <span className="material-symbols-outlined text-[11px]">schedule</span>
                          Effective {formatDate(update.effectiveDate)}
                        </span>
                        {affectsLabel && (
                          <span className="flex items-center gap-1 text-[10px] text-on-surface-variant/60">
                            <span className="material-symbols-outlined text-[11px]">link</span>
                            {affectsLabel}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-on-surface mb-2 leading-snug">{update.title}</h3>
                      <p className="text-xs text-on-surface-variant leading-relaxed mb-2">{update.summary}</p>

                      {/* Action Required */}
                      <div className="bg-surface-container rounded-lg px-3 py-2 mb-2">
                        <p className="text-xs text-on-surface-variant">
                          <span className="font-semibold text-on-surface">Action Required:</span>{' '}
                          {update.actionRequired}
                        </p>
                      </div>

                      {/* Source link */}
                      {update.sourceUrl && (
                        <a
                          href={update.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-primary flex items-center gap-0.5 hover:underline w-fit"
                        >
                          View Source
                          <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                        </a>
                      )}
                    </div>
                  );
                })}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !isError && totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 mb-md">
          <button
            type="button"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-outline-variant/40 text-on-surface-variant disabled:opacity-30 hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          {buildPageRange(currentPage, totalPages).map((page, i) =>
            page === '…'
              ? (
                  <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-on-surface-variant">
                    …
                  </span>
                )
              : (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      'w-8 h-8 rounded-lg text-xs font-semibold transition-colors',
                      currentPage === page
                        ? 'bg-on-surface text-surface'
                        : 'border border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-low',
                    )}
                  >
                    {page}
                  </button>
                ),
          )}
          <button
            type="button"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-outline-variant/40 text-on-surface-variant disabled:opacity-30 hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      )}

      {/* AI Advisory Perspective */}
      <div className="bg-blue-50 rounded-2xl border border-blue-200 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-xl bg-blue-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px] text-blue-600">auto_awesome</span>
          </div>
          <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">AI Advisory Perspective</span>
        </div>
        <p className="text-xs text-blue-800/80 leading-relaxed mb-3">
          Based on your company's HUG turnover profile, the{' '}
          <span className="font-semibold">GST-Invoicing mandate</span>{' '}
          is your highest priority risk. Failure to comply could block credit for your B2B customers. I recommend initiating the API upgrade task in your JIRA workspace immediately.
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
