import React, { useState } from 'react';
import { cn } from '../../utils/cn';

/* ─── Types ───────────────────────────────────────────────── */
interface KpiCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  sub?: string;
}

interface Investment {
  startup: string;
  sector: string;
  round: string;
  amount: string;
  investors: string;
  date: string;
}

/* ─── Mock Data ───────────────────────────────────────────── */
const KPIS: KpiCard[] = [
  { label: 'Total Deals', value: '4,218', change: '+3%', positive: true },
  { label: 'Total Funding', value: '$428', change: '+11%', positive: true },
  { label: 'Top Sector', value: 'Fintech', change: '+6%', positive: true, sub: '3% attribution' },
  { label: 'Top City', value: 'Bengaluru', change: '-1%', positive: false, sub: 'Startup Ecosystem' },
];

const SECTOR_DATA = [
  { label: 'Fintech', value: 68, color: '#3525cd' },
  { label: 'Edtech', value: 48, color: '#6366f1' },
  { label: 'AI', value: 32, color: '#8b5cf6' },
  { label: 'IT', value: 28, color: '#a78bfa' },
  { label: 'SaaS', value: 18, color: '#c4b5fd' },
  { label: 'Others', value: 10, color: '#e2dfff' },
];

const ROUND_DATA = [
  { label: 'Seed (63%)', value: 63, color: '#3525cd' },
  { label: 'Series A (20%)', value: 20, color: '#6366f1' },
  { label: 'Series B (11%)', value: 11, color: '#a78bfa' },
  { label: 'Late Stage (6%)', value: 6, color: '#e2dfff' },
];

const TREND_DATA = [
  { year: 'FY18', value: 40 },
  { year: 'FY19', value: 55 },
  { year: 'FY20', value: 48 },
  { year: 'FY21', value: 72 },
  { year: 'FY22', value: 95 },
  { year: 'FY23', value: 85 },
];

const STATE_DATA = [
  { label: 'Karnataka', value: 1249, max: 1249 },
  { label: 'Maharashtra', value: 980, max: 1249 },
  { label: 'Delhi NCR', value: 822, max: 1249 },
  { label: 'Tamil Nadu', value: 441, max: 1249 },
  { label: 'Gujarat', value: 380, max: 1249 },
];

const INVESTMENTS: Investment[] = [
  { startup: 'BluePay', sector: 'Fintech', round: 'Seed', amount: '$500K', investors: 'Sequoia India', date: 'Oct 21, 2024' },
  { startup: 'EduFlow', sector: 'Edtech', round: 'Series A', amount: '$120K', investors: 'Elevation Capital', date: 'Oct 17, 2024' },
  { startup: 'AgriSaathi', sector: 'Agritech', round: 'Seed', amount: '$80K', investors: 'Avaana Capital', date: 'Oct 11, 2024' },
  { startup: 'SwiftVoods', sector: 'Logistics', round: 'Seed', amount: '$600K', investors: 'Tiger Global', date: 'Oct 06, 2024' },
  { startup: 'HealthSignore', sector: 'Healthtech', round: 'Seed', amount: '$900K', investors: 'Omidyar Network', date: 'Oct 02, 2024' },
  { startup: 'NyaAI', sector: 'LegalTech', round: 'Seed', amount: '$1.2M', investors: 'Lightspeed India', date: 'Sep 28, 2024' },
  { startup: 'AgroFarm', sector: 'Agritech', round: 'Bridge', amount: '$700K', investors: 'Blume Ventures', date: 'May 19, 2024' },
];

/* ─── Mini Chart Components ───────────────────────────────── */
const HorizontalBar = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-on-surface-variant w-16 shrink-0 truncate">{label}</span>
      <div className="flex-1 h-3 bg-surface-container rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-semibold text-on-surface w-8 text-right">{typeof value === 'number' && value > 100 ? value.toLocaleString() : `$${value}B`}</span>
    </div>
  );
};

const DonutChart = ({ data }: { data: typeof ROUND_DATA }) => {
  const size = 100;
  const cx = size / 2;
  const cy = size / 2;
  const r = 38;
  const inner = 24;

  let cumulative = 0;
  const slices = data.map(d => {
    const start = cumulative;
    cumulative += d.value;
    return { ...d, start, end: cumulative };
  });

  const polarToCartesian = (pct: number, radius: number) => {
    const angle = (pct / 100) * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  const arcPath = (startPct: number, endPct: number, outerR: number, innerR: number) => {
    if (endPct - startPct >= 100) endPct = 99.99;
    const s1 = polarToCartesian(startPct, outerR);
    const e1 = polarToCartesian(endPct, outerR);
    const s2 = polarToCartesian(endPct, innerR);
    const e2 = polarToCartesian(startPct, innerR);
    const large = endPct - startPct > 50 ? 1 : 0;
    return `M ${s1.x} ${s1.y} A ${outerR} ${outerR} 0 ${large} 1 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${innerR} ${innerR} 0 ${large} 0 ${e2.x} ${e2.y} Z`;
  };

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {slices.map(s => (
        <path key={s.label} d={arcPath(s.start, s.end, r, inner)} fill={s.color} />
      ))}
    </svg>
  );
};

const BarChart = ({ data }: { data: typeof TREND_DATA }) => {
  const max = Math.max(...data.map(d => d.value));
  const height = 80;
  return (
    <div className="flex items-end gap-1.5 h-[80px]">
      {data.map(d => {
        const barH = Math.round((d.value / max) * height);
        return (
          <div key={d.year} className="flex-1 flex flex-col items-center gap-0.5">
            <div
              className="w-full rounded-t-sm bg-primary/80"
              style={{ height: barH }}
            />
            <span className="text-[9px] text-on-surface-variant">{d.year}</span>
          </div>
        );
      })}
    </div>
  );
};

/* ─── Main Page ──────────────────────────────────────────── */
const FundingInsightsPage = (): React.ReactElement => {
  const [fyRange] = useState('FY 18/19 → FY 22/23');

  return (
    <div className="p-md min-h-full pb-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-md">
        <div>
          <h1 className="font-title-md text-title-md font-bold text-on-surface">Funding Insights</h1>
          <p className="text-xs text-on-surface-variant">India Startup Funding Season 2020–2023</p>
        </div>
        <div className="flex items-center gap-sm">
          <button className="h-8 px-sm text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-colors">
            Support
          </button>
          <button className="h-8 px-sm text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-colors">
            Help Center
          </button>
          <button className="h-8 px-sm bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors">
            <span className="material-symbols-outlined text-[14px]">add</span>
            BDI
          </button>
          <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] text-primary">account_circle</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-xs flex-wrap mb-md">
        <button className="h-7 px-sm rounded-full text-xs font-semibold bg-surface-container border border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-low transition-colors flex items-center gap-1">
          {fyRange}
          <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
        </button>
        {['All Sectors', 'All Stages', 'All States', 'Pending Round'].map(f => (
          <button
            key={f}
            className="h-7 px-sm rounded-full text-xs font-semibold bg-surface-container border border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-low transition-colors flex items-center gap-1"
          >
            {f}
            <span className="material-symbols-outlined text-[12px]">expand_more</span>
          </button>
        ))}
        <button className="h-7 px-sm rounded-full text-xs font-semibold text-primary hover:underline transition-colors">
          Reset All
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-md">
        {KPIS.map(kpi => (
          <div key={kpi.label} className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-4">
            <p className="text-xs text-on-surface-variant mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold text-on-surface leading-tight">{kpi.value}</p>
            {kpi.sub && <p className="text-[10px] text-on-surface-variant/60 mt-0.5">{kpi.sub}</p>}
            <div className={cn(
              'inline-flex items-center gap-0.5 mt-1.5 text-[11px] font-semibold px-1.5 py-0.5 rounded-full',
              kpi.positive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            )}>
              <span className="material-symbols-outlined text-[12px]">
                {kpi.positive ? 'trending_up' : 'trending_down'}
              </span>
              {kpi.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Funding by Sector */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-4">
          <p className="text-xs font-bold text-on-surface mb-3">Funding by Sector</p>
          <div className="space-y-2.5">
            {SECTOR_DATA.map(s => (
              <HorizontalBar key={s.label} label={s.label} value={s.value} max={SECTOR_DATA[0].value} color={s.color} />
            ))}
          </div>
        </div>

        {/* Funding Round Distribution */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-4">
          <p className="text-xs font-bold text-on-surface mb-3">Funding Round Distribution</p>
          <div className="flex items-center gap-4">
            <DonutChart data={ROUND_DATA} />
            <div className="space-y-2 flex-1">
              {ROUND_DATA.map(r => (
                <div key={r.label} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                  <span className="text-xs text-on-surface-variant">{r.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Funding Trend */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-on-surface">Funding Trend Over Time</p>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] text-on-surface-variant">USD ($)</span>
              <span className="w-2 h-2 rounded-full bg-primary/30 ml-2" />
              <span className="text-[10px] text-on-surface-variant">INR (₹)</span>
            </div>
          </div>
          <BarChart data={TREND_DATA} />
        </div>

        {/* Top States */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-4">
          <p className="text-xs font-bold text-on-surface mb-3">Top States by Deal Count</p>
          <div className="space-y-2.5">
            {STATE_DATA.map(s => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="text-xs text-on-surface-variant w-20 shrink-0">{s.label}</span>
                <div className="flex-1 h-3 bg-surface-container rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${Math.round((s.value / s.max) * 100)}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-on-surface w-10 text-right">{s.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Investment Activity */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-4 flex-1">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-on-surface">Recent Investment Activity</p>
          <button className="h-7 px-sm border border-outline-variant/60 text-xs font-semibold text-on-surface hover:bg-surface-container-low rounded-xl transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">download</span>
            Export Dataset
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-outline-variant/30">
                {['Startup Name', 'Sector', 'Round', 'Amount', 'Investors', 'Date'].map(col => (
                  <th key={col} className="text-left pb-2 pr-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {INVESTMENTS.map(inv => (
                <tr key={inv.startup} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-2 pr-4 font-semibold text-on-surface">{inv.startup}</td>
                  <td className="py-2 pr-4 text-on-surface-variant">{inv.sector}</td>
                  <td className="py-2 pr-4">
                    <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold text-[10px]">
                      {inv.round}
                    </span>
                  </td>
                  <td className="py-2 pr-4 font-semibold text-on-surface">{inv.amount}</td>
                  <td className="py-2 pr-4 text-on-surface-variant">{inv.investors}</td>
                  <td className="py-2 text-on-surface-variant">{inv.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-[11px] text-white">store</span>
          </div>
          <div>
            <p className="text-[11px] font-bold text-on-surface leading-none">VyaparSetu AI</p>
            <p className="text-[9px] text-on-surface-variant/60">India Startup Funding Season 2020–2023</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-on-surface-variant/60">
          <span>Privacy Policy</span>
          <span>Terms</span>
          <span>Contact</span>
          <span>© 2024 VyaparSetu Private Limited</span>
        </div>
      </div>
    </div>
  );
};

export default FundingInsightsPage;
