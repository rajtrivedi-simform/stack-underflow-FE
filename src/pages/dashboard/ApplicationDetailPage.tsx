import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '../../utils/cn';

const APPLICATION_DATA: Record<string, {
  title: string;
  status: string;
  submittedOn: string;
  schemeName: string;
  issuingBody: string;
  level: string;
  portalName: string;
  portalUrl: string;
  formData: { label: string; value: string; isLink?: boolean }[];
  documents: string[];
  aiSuggestion: string;
}> = {
  'cgtmse-credit-guarantee': {
    title: 'CGTMSE Credit Guarantee',
    status: 'SUBMITTED',
    submittedOn: '14 June 2025 - 3:42 PM',
    schemeName: 'CGTMSE',
    issuingBody: 'Ministry of MSME',
    level: 'NATIONAL',
    portalName: 'Udyam Registration Portal',
    portalUrl: 'udyamregistration.gov.in',
    formData: [
      { label: 'Business Name', value: 'Acme Textiles' },
      { label: 'Udyam No', value: 'UDYAR-GJ-01-12345', isLink: true },
      { label: 'Total Investment', value: '₹23,00,000' },
    ],
    documents: ['GST Registration.pdf', 'Aadhar Card.pdf'],
    aiSuggestion: 'Based on current Ministry timelines, expect an initial response by 22nd June. Ensure your bank account is linked to Udyam for direct benefit transfer.',
  },
  'pmegp-loan-scheme': {
    title: 'PMEGP Loan Scheme',
    status: 'SUBMITTED',
    submittedOn: '12 June 2025 - 10:15 AM',
    schemeName: 'PMEGP',
    issuingBody: 'Khadi & Village Industries Commission',
    level: 'NATIONAL',
    portalName: 'KVIC Online Portal',
    portalUrl: 'kviconline.gov.in',
    formData: [
      { label: 'Business Name', value: 'Acme Textiles' },
      { label: 'Project Cost', value: '₹15,00,000' },
      { label: 'Employment Generated', value: '12 Persons' },
    ],
    documents: ['Business Plan.pdf', 'Aadhar Card.pdf', 'Bank Statement.pdf'],
    aiSuggestion: 'KVIC typically processes applications within 30-45 days. Track your application status weekly on the KVIC portal.',
  },
};

const ApplicationDetailPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showFullSnapshot, setShowFullSnapshot] = useState(false);

  const data = id ? APPLICATION_DATA[id] : null;

  if (!data) {
    return (
      <div className="p-md flex flex-col items-center justify-center min-h-[60vh]">
        <span className="material-symbols-outlined text-[48px] text-on-surface-variant/30 mb-4">description</span>
        <p className="text-on-surface-variant">Application not found.</p>
        <button onClick={() => navigate('/dashboard/applications')} className="mt-4 text-primary text-sm font-semibold hover:underline">
          Back to Applications
        </button>
      </div>
    );
  }

  return (
    <div className="p-md min-h-full pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-md">
        <div className="flex items-center gap-sm">
          <button
            type="button"
            onClick={() => navigate('/dashboard/applications')}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">arrow_back</span>
          </button>
          <h1 className="font-title-md text-title-md font-bold text-on-surface">{data.title}</h1>
        </div>
        <div className="flex items-center gap-sm">
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">edit</span>
          </button>
          <button className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error border border-white" />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">help_outline</span>
          </button>
          <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] text-primary">account_circle</span>
          </button>
        </div>
      </div>

      {/* Status Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-primary-container p-5 mb-md flex items-center justify-between">
        <div>
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white border border-white/30 mb-2">
            {data.status}
          </span>
          <h2 className="text-xl font-bold text-white mb-1">Application In Review</h2>
          <p className="text-xs text-white/70">Submitted on {data.submittedOn}</p>
        </div>
        <div className="flex items-center gap-2">
          {['person', 'description', 'attach_file'].map(icon => (
            <div key={icon} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-white">{icon}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-[1fr_280px] gap-md">
        {/* Left column */}
        <div className="space-y-4">
          {/* Scheme Information */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-4">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
              Scheme Information
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-on-surface-variant mb-0.5">Scheme Name</p>
                <p className="text-sm font-bold text-on-surface">{data.schemeName}</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant mb-0.5">Issuing Body</p>
                <p className="text-sm font-semibold text-on-surface">{data.issuingBody}</p>
              </div>
            </div>
            <div className="mb-3">
              <p className="text-xs text-on-surface-variant mb-1">Level</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 border border-green-200">
                {data.level}
              </span>
            </div>
            <button className="text-xs font-semibold text-primary flex items-center gap-0.5 hover:underline">
              View Scheme Details
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>

          {/* Application Portal */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-4">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
              Application Portal
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-on-surface">{data.portalName}</p>
              <a
                href={`https://${data.portalUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 h-7 px-sm bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary/20 transition-colors"
              >
                {data.portalUrl}
                <span className="material-symbols-outlined text-[13px]">open_in_new</span>
              </a>
            </div>
            <p className="text-xs text-on-surface-variant/60 mt-1">External Link</p>
          </div>

          {/* Form Data Snapshot */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-4">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
              Form Data Snapshot
            </h3>
            <div className="space-y-2.5">
              {data.formData.map(row => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant">{row.label}</span>
                  <span className={cn(
                    'text-xs font-semibold',
                    row.isLink ? 'text-primary' : 'text-on-surface'
                  )}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowFullSnapshot(v => !v)}
              className="mt-3 text-xs font-semibold text-primary flex items-center gap-0.5 hover:underline"
            >
              View full snapshot
              <span className={cn(
                'material-symbols-outlined text-[14px] transition-transform',
                showFullSnapshot && 'rotate-180'
              )}>expand_more</span>
            </button>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Attached Documents */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-4">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
              Attached Documents
            </h3>
            <div className="space-y-2">
              {data.documents.map(doc => (
                <div key={doc} className="flex items-center justify-between py-1.5 border-b border-outline-variant/20 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-red-500">picture_as_pdf</span>
                    <span className="text-xs font-medium text-on-surface">{doc}</span>
                  </div>
                  <button className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-surface-container-low transition-colors">
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Generated PDF */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-4">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
              Generated PDF
            </h3>
            {/* PDF Preview Placeholder */}
            <div className="w-full h-28 bg-surface-container rounded-xl mb-3 flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 flex flex-col gap-1.5 p-3 opacity-30">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={cn('h-2 rounded bg-on-surface-variant', i === 0 ? 'w-2/3' : i % 3 === 0 ? 'w-1/2' : 'w-full')} />
                ))}
              </div>
              <span className="material-symbols-outlined text-[32px] text-on-surface-variant/30 z-10">description</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex-1 h-8 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[14px]">download</span>
                Download
              </button>
              <button className="flex-1 h-8 border border-outline-variant/60 text-on-surface text-xs font-semibold rounded-xl hover:bg-surface-container-low transition-colors">
                Re-print
              </button>
            </div>
          </div>

          {/* AI Suggestion */}
          <div className="bg-blue-50 rounded-2xl border border-blue-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px] text-blue-600">auto_awesome</span>
              </div>
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">AI Suggestion</span>
            </div>
            <p className="text-xs text-blue-800/80 leading-relaxed">{data.aiSuggestion}</p>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-[220px] right-0 bg-surface-container-lowest border-t border-outline-variant/40 px-md py-3 flex items-center justify-end gap-sm z-20">
        <button className="h-9 px-5 border border-outline-variant/60 text-on-surface text-sm font-semibold rounded-xl hover:bg-surface-container-low transition-colors flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          Open Portal
        </button>
        <button className="h-9 px-5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px]">sync</span>
          Update Status
        </button>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;
