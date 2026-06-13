import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";
import { useAuthContext } from "../context/AuthContext";
import { authService } from "../services/auth.service";

const navItems = [
  { label: "Dashboard", icon: "dashboard", to: "/dashboard" },
  { label: "Compliance", icon: "verified_user", to: "/dashboard/compliance" },
  { label: "Schemes", icon: "grid_view", to: "/dashboard/schemes" },
  { label: "Regulatory Feed", icon: "feed", to: "/dashboard/regulatory-feed" },
  { label: "Growth", icon: "trending_up", to: "/dashboard/growth" },
  { label: "Applications", icon: "assignment", to: "/dashboard/applications" },
];

const DashboardLayout = (): React.ReactElement => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { clearAuth } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-screen bg-surface flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[220px] shrink-0 bg-surface-container-lowest border-r border-outline-variant/40 flex flex-col">
        {/* Brand */}
        <div className="px-md pt-md pb-sm">
          <div className="flex items-center gap-sm">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-white">
                store
              </span>
            </div>
            <div>
              <p className="text-[15px] font-bold text-on-surface leading-none">
                VyaparSetu
              </p>
              <p className="text-[10px] text-on-surface-variant/60 tracking-wider uppercase mt-0.5">
                AI Business Advisor
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-sm py-sm space-y-xs overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/dashboard"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-sm rounded-xl px-sm py-xs transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-surface-container-low text-on-surface-variant",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      "material-symbols-outlined text-[20px]",
                      isActive ? "text-primary" : "text-on-surface-variant",
                    )}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={cn(
                      "text-body-md font-medium",
                      isActive
                        ? "text-primary font-semibold"
                        : "text-on-surface",
                    )}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-sm pb-md space-y-xs">
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-sm rounded-xl px-sm py-xs transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-surface-container-low text-on-surface-variant",
              )
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={cn(
                    "material-symbols-outlined text-[20px]",
                    isActive ? "text-primary" : "text-on-surface-variant",
                  )}
                >
                  settings
                </span>
                <span
                  className={cn(
                    "text-body-md font-medium",
                    isActive ? "text-primary font-semibold" : "text-on-surface",
                  )}
                >
                  Settings
                </span>
              </>
            )}
          </NavLink>
          <NavLink
            to="/dashboard/help"
            className="flex items-center gap-sm rounded-xl px-sm py-xs hover:bg-surface-container-low transition-colors text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[20px]">
              help_outline
            </span>
            <span className="text-body-md font-medium text-on-surface">
              Support
            </span>
          </NavLink>
          {/* PRO PLAN upgrade card */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 px-sm py-sm mt-xs">
            <p className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1 mb-0.5">
              <span className="material-symbols-outlined text-[12px]">
                workspace_premium
              </span>
              Pro Plan
            </p>
            <p className="text-[11px] text-on-surface-variant mb-sm">
              Unlock all AI Insights
            </p>
            <button className="w-full h-8 bg-primary text-white text-[12px] font-semibold rounded-lg flex items-center justify-center gap-xs hover:bg-primary-container transition-colors">
              <span className="material-symbols-outlined text-[14px]">
                arrow_upward
              </span>
              Upgrade to Pro
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Top Header */}
        <header className="h-14 shrink-0 border-b border-outline-variant/40 bg-surface-container-lowest flex items-center px-md gap-md">
          <div className="flex-1 max-w-[480px] relative">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant/50">
              search
            </span>
            <input
              type="text"
              placeholder="Search schemes, compliance docs, or AI commands..."
              className="w-full h-9 pl-9 pr-sm rounded-xl border border-outline-variant/60 bg-surface-container-low text-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          <div className="flex items-center gap-sm ml-auto">
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-sm px-md py-xs bg-primary text-white font-title-md text-[14px] font-semibold rounded-xl hover:bg-primary-container active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <Link to="/onboarding">New Application</Link>
            </button>
            <div className="flex items-center gap-xs px-sm py-xs rounded-full border border-green-200 bg-green-50">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-label-sm text-green-700 font-semibold">
                Health Score: 92
              </span>
            </div>
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
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden hover:bg-primary/20 transition-colors focus:outline-none"
              >
                <span className="material-symbols-outlined text-[20px] text-primary">
                  account_circle
                </span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-xs w-48 bg-surface-container-lowest border border-outline-variant/40 rounded-xl shadow-lg py-xs z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate("/dashboard/settings");
                    }}
                    className="w-full px-md py-xs text-left font-body-md text-body-md text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-sm"
                  >
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                      settings
                    </span>
                    Settings
                  </button>
                  <button
                    onClick={async () => {
                      setShowProfileMenu(false);
                      try {
                        await authService.logout();
                      } catch (err) {
                        // ignore error
                      }
                      clearAuth();
                      navigate("/auth");
                    }}
                    className="w-full px-md py-xs text-left font-body-md text-body-md text-error hover:bg-error/10 transition-colors flex items-center gap-sm border-t border-outline-variant/20"
                  >
                    <span className="material-symbols-outlined text-[18px] text-error">
                      logout
                    </span>
                    Logout
                  </button>
                </div>
              )}
            </div>
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
