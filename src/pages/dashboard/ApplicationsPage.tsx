import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

type AppStatus = 'approved' | 'submitted' | 'draft' | 'rejected';

interface Application {
  id: string;
  title: string;
  website: string;
  status: AppStatus;
  appliedDate?: string;
  statusDate?: string;
  statusLabel?: string;
  lastEdited?: string;
  actionLabel: string;
  statusIcon: string;
  statusIconBg: string;
  statusIconColor: string;
}

const APPLICATIONS: Application[] = [
  {
    id: 'cgtmse-credit-guarantee',
    title: 'CGTMSE Credit Guarantee',
    website: 'cgtmse.in',
    status: 'approved',
    appliedDate: '12 May 2025',
    statusDate: '01 Jun 2025',
    statusLabel: 'Approved',
    actionLabel: 'View Details',
    statusIcon: 'check_circle',
    statusIconBg: 'bg-green-50',
    statusIconColor: 'text-green-600',
  },
  {
    id: 'pmegp-loan-scheme',
    title: 'PMEGP Loan Scheme',
    website: 'kviconline.gov.in',
    status: 'submitted',
    appliedDate: '10 Jun 2025',
    statusDate: '12 Jun 2025',
    statusLabel: 'Submitted',
    actionLabel: 'Track Status',
    statusIcon: 'pending',
    statusIconBg: 'bg-blue-50',
    statusIconColor: 'text-blue-500',
  },
  {
    id: 'clss-technology-upgradation',
    title: 'CLSS for Technology Upgradation',
    website: 'dcmsme.gov.in',
    status: 'draft',
    lastEdited: '14 Jun 2025',
    actionLabel: 'Continue',
    statusIcon: 'draft',
    statusIconBg: 'bg-surface-container',
    statusIconColor: 'text-on-surface-variant',
  },
  {
    id: 'sfurti-cluster-development',
    title: 'SFURTI Cluster Development',
    website: 'msme.gov.in',
    status: 'rejected',
    statusDate: '01 May 2025',
    statusLabel: 'Submitted',
    actionLabel: 'View Feedback',
    statusIcon: 'cancel',
    statusIconBg: 'bg-red-50',
    statusIconColor: 'text-red-500',
  },
];

const STATUS_BADGE: Record<AppStatus, { label: string; className: string }> = {
  approved: { label: 'APPROVED', className: 'bg-green-700 text-white' },
  submitted: { label: 'SUBMITTED', className: 'bg-blue-500 text-white' },
  draft: { label: 'DRAFT', className: 'bg-on-surface-variant/20 text-on-surface-variant' },
  rejected: { label: 'REJECTED', className: 'bg-red-500 text-white' },
};

const STATUS_BORDER: Record<AppStatus, string> = {
  approved: 'border-l-green-500',
  submitted: 'border-l-blue-500',
  draft: 'border-l-outline-variant',
  rejected: 'border-l-red-500',
};

type FilterTab = 'all' | AppStatus;

const ApplicationsPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const counts = {
    draft: APPLICATIONS.filter(a => a.status === 'draft').length,
    submitted: APPLICATIONS.filter(a => a.status === 'submitted').length,
    approved: APPLICATIONS.filter(a => a.status === 'approved').length,
    rejected: APPLICATIONS.filter(a => a.status === 'rejected').length,
  };

  const filtered = activeFilter === 'all'
    ? APPLICATIONS
    : APPLICATIONS.filter(a => a.status === activeFilter);

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All Applications' },
    { key: 'draft', label: 'Draft' },
    { key: 'submitted', label: 'Submitted' },
    { key: 'approved', label: 'Approved' },
  ];

  const handleAction = (app: Application) => {
    if (app.status === 'approved' || app.status === 'submitted') {
      navigate(`/dashboard/applications/${app.id}`);
    }
  };

  return (
    <div className="p-md relative min-h-full pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-md">
        <h1 className="font-title-md text-title-md font-bold text-on-surface">My Applications</h1>
        <div className="flex items-center gap-sm">
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">tune</span>
          </button>
          <button className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error border border-white" />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">history</span>
          </button>
          <button className="h-8 px-sm bg-primary text-white text-xs font-semibold rounded-xl flex items-center gap-xs hover:bg-primary-container transition-colors">
            <span className="material-symbols-outlined text-[14px]">add</span>
            New Advisory
          </button>
        </div>
      </div>

      {/* Status Filters + Tabs */}
      <div className="flex items-start justify-between mb-md gap-md">
        {/* Filter Tabs */}
        <div>
          <p className="text-[10px] font-semibold text-on-surface-variant/60 uppercase tracking-wider mb-2">Status Filters</p>
          <div className="flex items-center gap-xs">
            {tabs.map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={cn(
                  'h-8 px-sm rounded-full text-xs font-semibold transition-colors',
                  activeFilter === tab.key
                    ? 'bg-on-surface text-surface'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status count badges */}
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-xs">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container border border-outline-variant/40 text-[11px] font-semibold text-on-surface-variant">
              <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/50" />
              {counts.draft} Draft
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 border border-green-200 text-[11px] font-semibold text-green-700">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              {counts.submitted} Submitted
            </span>
          </div>
          <div className="flex items-center gap-xs">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-semibold text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {counts.approved} Approved
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-[11px] font-semibold text-red-700">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {counts.rejected} Rejected
            </span>
          </div>
        </div>
      </div>

      {/* Application Cards */}
      <div className="space-y-3">
        {filtered.map(app => {
          const badge = STATUS_BADGE[app.status];
          return (
            <div
              key={app.id}
              className={cn(
                'bg-surface-container-lowest rounded-2xl border border-outline-variant/40 border-l-4 shadow-sm overflow-hidden',
                STATUS_BORDER[app.status]
              )}
            >
              <div className="flex items-center gap-4 px-4 py-4">
                {/* Icon */}
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', app.statusIconBg)}>
                  <span className={cn('material-symbols-outlined text-[22px]', app.statusIconColor)}>
                    {app.statusIcon}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-bold text-on-surface">{app.title}</h3>
                    <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded', badge.className)}>
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-1">{app.website}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    {app.appliedDate && (
                      <span className="flex items-center gap-1 text-xs text-on-surface-variant/70">
                        <span className="material-symbols-outlined text-[12px]">calendar_today</span>
                        Applied: {app.appliedDate}
                      </span>
                    )}
                    {app.statusDate && app.status === 'approved' && (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <span className="material-symbols-outlined text-[12px]">check_circle</span>
                        Approved: {app.statusDate}
                      </span>
                    )}
                    {app.statusDate && app.status === 'submitted' && (
                      <span className="flex items-center gap-1 text-xs text-blue-600">
                        <span className="material-symbols-outlined text-[12px]">send</span>
                        Submitted: {app.statusDate}
                      </span>
                    )}
                    {app.statusDate && app.status === 'rejected' && (
                      <span className="flex items-center gap-1 text-xs text-red-600">
                        <span className="material-symbols-outlined text-[12px]">schedule</span>
                        Submitted: {app.statusDate}
                      </span>
                    )}
                    {app.lastEdited && (
                      <span className="flex items-center gap-1 text-xs text-on-surface-variant/70">
                        <span className="material-symbols-outlined text-[12px]">edit</span>
                        Last edited: {app.lastEdited}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action */}
                <button
                  type="button"
                  onClick={() => handleAction(app)}
                  className="shrink-0 flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-container transition-colors"
                >
                  {app.actionLabel}
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          type="button"
          className="flex items-center gap-2 h-12 px-5 bg-orange-500 hover:bg-orange-600 active:scale-[0.97] text-white font-semibold text-sm rounded-full shadow-lg shadow-orange-500/30 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Track New Application
        </button>
      </div>
    </div>
  );
};

export default ApplicationsPage;
