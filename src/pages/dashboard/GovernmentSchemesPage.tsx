import React, { useState } from 'react';
import { cn } from '../../utils/cn';

interface Scheme {
  id: string;
  title: string;
  issuingBody: string;
  description: string;
  level: 'Central' | 'State';
  category: string;
  tags: string[];
  tagColors: string[];
  highlight?: boolean;
  highlightIcon?: string;
}

const SCHEMES: Scheme[] = [
  {
    id: 'cgtmse',
    title: 'Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)',
    issuingBody: 'Ministry of MSME, Govt. of India',
    description: 'Provides collateral-free credit to MSMEs through various banks and financial institutions, helping businesses access funds without physical security.',
    level: 'Central',
    category: 'Business',
    tags: ['Central', 'Credit Support'],
    tagColors: ['bg-blue-100 text-blue-700', 'bg-teal-100 text-teal-700'],
  },
  {
    id: 'pmegp',
    title: "Prime Minister's Employment Generation Programme (PMEGP)",
    issuingBody: 'Khadi and Village Industries Commission (KVIC)',
    description: 'Credit-linked subsidy scheme for setting up new micro-enterprises and generating employment opportunities in rural and urban areas.',
    level: 'Central',
    category: 'Business',
    tags: ['Central', 'Subsidy'],
    tagColors: ['bg-blue-100 text-blue-700', 'bg-orange-100 text-orange-700'],
  },
  {
    id: 'sisfs',
    title: 'Startup India Seed Fund Scheme (SISFS)',
    issuingBody: 'DPIIT, Ministry of Commerce and Industry',
    description: 'Financial assistance to startups for proof of concept, prototype development, product trials, and market entry.',
    level: 'Central',
    category: 'Startup',
    tags: ['Central', 'Seed Funding'],
    tagColors: ['bg-blue-100 text-blue-700', 'bg-purple-100 text-purple-700'],
    highlight: true,
    highlightIcon: 'eco',
  },
  {
    id: 'handloom-weavers',
    title: 'Self Employment Scheme for Handloom Weavers',
    issuingBody: 'Government of Maharashtra',
    description: 'Specialized credit and training support for traditional weavers in Maharashtra to modernize their equipment and scale production.',
    level: 'State',
    category: 'Business',
    tags: ['State', 'Artisans'],
    tagColors: ['bg-green-100 text-green-700', 'bg-amber-100 text-amber-700'],
  },
  {
    id: 'mudra',
    title: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    issuingBody: 'Ministry of Finance, Govt. of India',
    description: 'Provides loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises for income-generating activities.',
    level: 'Central',
    category: 'Business',
    tags: ['Central', 'Loan'],
    tagColors: ['bg-blue-100 text-blue-700', 'bg-indigo-100 text-indigo-700'],
  },
  {
    id: 'stand-up-india',
    title: 'Stand-Up India Scheme',
    issuingBody: 'Department of Financial Services, MoF',
    description: 'Facilitates bank loans between ₹10 lakh and ₹1 crore for at least one SC/ST borrower and one woman borrower per bank branch.',
    level: 'Central',
    category: 'Startup',
    tags: ['Central', 'Inclusion'],
    tagColors: ['bg-blue-100 text-blue-700', 'bg-pink-100 text-pink-700'],
  },
];

type LevelFilter = 'All States' | 'Central' | 'State';
type CategoryFilter = 'All Categories' | 'Business' | 'Startup' | 'Both';

const GovernmentSchemesPage = (): React.ReactElement => {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('Central');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('Both');

  const filtered = SCHEMES.filter(s => {
    const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.issuingBody.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === 'All States' || s.level === levelFilter;
    const matchCategory = categoryFilter === 'All Categories' || categoryFilter === 'Both' || s.category === categoryFilter;
    return matchSearch && matchLevel && matchCategory;
  });

  const levelTabs: LevelFilter[] = ['All States', 'Central', 'State'];
  const categoryTabs: CategoryFilter[] = ['All Categories', 'Business', 'Startup', 'Both'];

  return (
    <div className="p-md min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-md">
        <h1 className="font-title-md text-title-md font-bold text-on-surface">Government Schemes</h1>
        <div className="flex items-center gap-sm">
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

      {/* Search */}
      <div className="relative mb-sm">
        <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant/50">search</span>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search schemes by name, sector..."
          className="w-full h-10 pl-10 pr-sm rounded-xl border border-outline-variant/60 bg-surface-container-low text-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-xs flex-wrap mb-sm">
        {/* Level filters */}
        {levelTabs.map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setLevelFilter(tab)}
            className={cn(
              'h-7 px-sm rounded-full text-xs font-semibold transition-colors flex items-center gap-1',
              levelFilter === tab
                ? 'bg-on-surface text-surface'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/40'
            )}
          >
            {tab === 'All States' && (
              <span className="material-symbols-outlined text-[12px]">public</span>
            )}
            {tab}
          </button>
        ))}
        <div className="w-px h-5 bg-outline-variant/40 mx-xs" />
        {/* Category filters */}
        {categoryTabs.map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setCategoryFilter(tab)}
            className={cn(
              'h-7 px-sm rounded-full text-xs font-semibold transition-colors flex items-center gap-1',
              categoryFilter === tab
                ? 'bg-on-surface text-surface'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/40'
            )}
          >
            {tab === 'All Categories' && (
              <span className="material-symbols-outlined text-[12px]">category</span>
            )}
            {tab}
          </button>
        ))}
      </div>

      {/* Results count + sort */}
      <div className="flex items-center justify-between mb-md">
        <p className="text-xs text-on-surface-variant">
          Showing <span className="font-semibold text-on-surface">{filtered.length}</span> schemes
        </p>
        <button className="flex items-center gap-1 text-xs font-semibold text-on-surface hover:text-primary transition-colors">
          Sort: Relevance
          <span className="material-symbols-outlined text-[14px]">expand_more</span>
        </button>
      </div>

      {/* Scheme Cards */}
      <div className="space-y-3 mb-md">
        {filtered.map(scheme => (
          <div
            key={scheme.id}
            className={cn(
              'bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-4',
              scheme.highlight && 'border-l-4 border-l-primary'
            )}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {scheme.highlight && scheme.highlightIcon && (
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      {scheme.highlightIcon}
                    </span>
                  )}
                  <h3 className="text-sm font-bold text-on-surface">{scheme.title}</h3>
                </div>
                <p className="text-xs text-on-surface-variant mb-2">{scheme.issuingBody}</p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {scheme.tags.map((tag, i) => (
                    <span
                      key={tag}
                      className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded', scheme.tagColors[i])}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
              {scheme.description}
            </p>

            <div className="flex items-center justify-between">
              <button className="text-xs font-semibold text-primary flex items-center gap-0.5 hover:underline">
                Eligibility
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
              <button className="h-7 px-sm bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors">
                Apply
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-xs">
        <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-surface-container-low transition-colors">
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">chevron_left</span>
        </button>
        {[1, 2, 3].map(page => (
          <button
            key={page}
            className={cn(
              'w-7 h-7 rounded-lg text-xs font-semibold transition-colors',
              page === 1 ? 'bg-on-surface text-surface' : 'hover:bg-surface-container-low text-on-surface-variant'
            )}
          >
            {page}
          </button>
        ))}
        <span className="text-xs text-on-surface-variant px-1">...</span>
        <button className="w-7 h-7 rounded-lg text-xs font-semibold hover:bg-surface-container-low text-on-surface-variant transition-colors">
          15
        </button>
        <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-surface-container-low transition-colors">
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default GovernmentSchemesPage;
