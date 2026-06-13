import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { cn } from '../utils/cn';

const navItems = [
  { label: 'Overview', icon: 'dashboard', to: '/dashboard' },
  { label: 'Opportunities', icon: 'lightbulb', to: '/dashboard/opportunities' },
  { label: 'Unlock Center', icon: 'lock_open', to: '/dashboard/unlock-center' },
  { label: 'Compliance', icon: 'verified_user', to: '/dashboard/compliance' },
  { label: 'Applications', icon: 'description', to: '/dashboard/applications' },
];

const DashboardLayout = (): React.ReactElement => {
  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-[240px] shrink-0 bg-surface-container-lowest border-r border-outline-variant/40 flex flex-col">
        {/* Brand */}
        <div className="px-md pt-lg pb-md">
          <div className="flex items-center gap-sm">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-white">store</span>
            </div>
            <div>
              <p className="font-title-md text-[15px] font-bold text-on-surface leading-none">VyaparSetu</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant/70 tracking-widest uppercase mt-0.5">Executive Suite</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-sm py-xs space-y-xs overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              className={({ isActive }) =>
                cn(
                  'flex flex-col rounded-xl px-sm py-xs transition-all duration-200 border border-transparent group',
                  isActive
                    ? 'bg-primary/8 border-l-[3px] border-l-primary border-r-transparent border-t-transparent border-b-transparent rounded-l-none'
                    : 'hover:bg-surface-container-low'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-sm">
                    <span
                      className={cn(
                        'material-symbols-outlined text-[20px] transition-colors',
                        isActive ? 'text-primary' : 'text-on-surface-variant'
                      )}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={cn(
                        'font-body-md text-body-md font-medium transition-colors',
                        isActive ? 'text-primary' : 'text-on-surface'
                      )}
                    >
                      {item.label}
                    </span>
                  </div>
                  <div className="ml-[28px] mt-0.5">
                    <span className="inline-flex items-center gap-0.5 px-xs py-[1px] rounded-full text-[10px] font-semibold text-primary bg-primary/8 border border-dashed border-primary/40 leading-none">
                      <span className="w-1 h-1 rounded-full bg-primary/70 inline-block" />
                      Connected
                    </span>
                  </div>
                </>
              )}
            </NavLink>
          ))}

          <div className="pt-sm">
            <NavLink
              to="/dashboard/ai-advisor"
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-sm rounded-xl px-sm py-xs transition-all duration-200',
                  isActive ? 'bg-primary/8 text-primary' : 'hover:bg-surface-container-low text-on-surface-variant'
                )
              }
            >
              <span className="material-symbols-outlined text-[20px]">assistant</span>
              <span className="font-body-md text-body-md font-medium text-on-surface">AI Advisor</span>
            </NavLink>
          </div>
        </nav>

        {/* Bottom */}
        <div className="px-sm pb-md space-y-xs">
          <NavLink
            to="/dashboard/settings"
            className="flex items-center gap-sm rounded-xl px-sm py-xs hover:bg-surface-container-low transition-all duration-200 text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span className="font-body-md text-body-md font-medium text-on-surface">Settings</span>
          </NavLink>
          <button className="w-full h-10 bg-primary text-white font-title-md text-[14px] rounded-xl flex items-center justify-center gap-xs shadow-lg shadow-primary/20 hover:bg-primary-container transition-colors">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            Upgrade to Pro
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-14 shrink-0 border-b border-outline-variant/40 bg-surface-container-lowest flex items-center px-md gap-md">
          {/* Search */}
          <div className="flex-1 max-w-[480px] relative">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant/50">search</span>
            <input
              type="text"
              placeholder="Search schemes, compliance docs, or AI commands..."
              className="w-full h-9 pl-9 pr-sm rounded-xl border border-outline-variant/60 bg-surface-container-low text-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          <div className="flex items-center gap-sm ml-auto">
            {/* Health Score */}
            <div className="flex items-center gap-xs px-sm py-xs rounded-full border border-green-200 bg-green-50">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-label-sm text-label-sm text-green-700 font-semibold">Health Score: 92</span>
            </div>
            {/* Icons */}
            <button className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error border border-white" />
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">help_outline</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-[20px] text-primary">account_circle</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
