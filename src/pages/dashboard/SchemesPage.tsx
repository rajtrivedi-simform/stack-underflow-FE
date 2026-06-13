import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface DocTypeCard {
  id: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  metaIcon: string;
  metaText: string;
}

const DOC_TYPES: DocTypeCard[] = [
  {
    id: 'scheme-application-letter',
    icon: 'description',
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    title: 'Scheme Application Letter',
    description: 'Formal letter to apply for a specific government scheme. AI pre-fills your details with high precision.',
    metaIcon: 'warning_amber',
    metaText: 'Requires: Select a scheme',
  },
  {
    id: 'compliance-action-plan',
    icon: 'assignment_turned_in',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    title: 'Compliance Action Plan',
    description: 'Prioritised roadmap to fix compliance gaps based on your latest check. Generated automatically.',
    metaIcon: 'check_circle',
    metaText: 'Based on: Last compliance check',
  },
  {
    id: 'business-profile-report',
    icon: 'bar_chart',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    title: 'Business / Startup Profile Report',
    description: 'Comprehensive report summarising your profile, matched schemes, and growth recommendations.',
    metaIcon: 'person',
    metaText: 'Based on: Your full profile',
  },
];

const SchemesPage = (): React.ReactElement => {
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    navigate(`/dashboard/schemes/document/${id}`);
  };

  return (
    <div className="p-md">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">arrow_back</span>
          </button>
          <h1 className="font-title-md text-title-md font-bold text-on-surface">Generate Document</h1>
        </div>
        <div className="flex items-center gap-sm">
          <div className="flex items-center gap-xs px-sm py-xs rounded-full border border-green-200 bg-green-50">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-label-sm text-green-700 font-semibold">Pro Plan</span>
          </div>
          <button className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">notifications</span>
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">settings</span>
          </button>
          <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
            <span className="material-symbols-outlined text-[20px] text-primary">account_circle</span>
          </button>
        </div>
      </div>

      <p className="text-body-md text-on-surface-variant mb-6">
        Choose a document type. Our AI will draft it based on your profile.
      </p>

      {/* Document Type Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {DOC_TYPES.map(doc => (
          <button
            key={doc.id}
            type="button"
            onClick={() => handleSelect(doc.id)}
            className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-5 text-left hover:border-primary/40 hover:shadow-md transition-all duration-200 group"
          >
            {/* Icon */}
            <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', doc.iconBg)}>
              <span className={cn('material-symbols-outlined text-[26px]', doc.iconColor)}>{doc.icon}</span>
            </div>

            {/* Title */}
            <h3 className="text-sm font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
              {doc.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              {doc.description}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant/60 border-t border-outline-variant/30 pt-3">
              <span className="material-symbols-outlined text-[14px]">{doc.metaIcon}</span>
              <span>{doc.metaText}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Proactive Recommendation Banner */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-4 flex items-center gap-4 shadow-sm">
        <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-on-surface mb-0.5">Proactive Recommendation</p>
          <p className="text-xs text-on-surface-variant">
            Based on your recent funding, the{' '}
            <span className="font-semibold text-on-surface">CGTMSE Scheme</span>{' '}
            application is highly recommended. Our AI suggests drafting this first.
          </p>
        </div>
        <button
          type="button"
          onClick={() => handleSelect('scheme-application-letter')}
          className="shrink-0 h-9 px-4 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-xl transition-colors"
        >
          Draft Now
        </button>
      </div>
    </div>
  );
};

export default SchemesPage;
