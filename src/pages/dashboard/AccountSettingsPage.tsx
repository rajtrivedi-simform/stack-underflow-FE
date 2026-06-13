import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { authService } from "../../services/auth.service";
import { cn } from "../../utils/cn";

const AccountSettingsPage = (): React.ReactElement => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthContext();

  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [email, setEmail] = useState("john.smith@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // ignore
    }
    clearAuth();
    navigate("/auth");
  };

  return (
    <div className="p-md min-h-full pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-md">
        <div className="flex items-center gap-sm">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              arrow_back
            </span>
          </button>
          <h1 className="font-title-md text-title-md font-bold text-on-surface">
            Account Settings
          </h1>
        </div>
        <div className="flex items-center gap-sm">
          <button className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
              notifications
            </span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error border border-white" />
          </button>
          <div className="flex items-center gap-1 px-sm py-xs rounded-xl border border-outline-variant/40 bg-surface-container-low">
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
              assignment
            </span>
            <span className="text-xs font-semibold text-on-surface">_✳RK</span>
          </div>
        </div>
      </div>

      <div className="max-w-[600px]">
        {/* Profile Card */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-5 mb-md">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-full bg-blue-400 flex items-center justify-center">
                <span className="text-xl font-bold text-white">JS</span>
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-surface-container-lowest border border-outline-variant/60 flex items-center justify-center hover:bg-surface-container-low transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[13px] text-on-surface-variant">
                  edit
                </span>
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-base font-bold text-on-surface">
                  John Smith
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                  BUSINESS OWNER
                </span>
              </div>
              <div className="space-y-0.5">
                <p className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">
                    mail
                  </span>
                  john.smith@example.com
                </p>
                <p className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">
                    phone
                  </span>
                  +91 98765 43210
                </p>
                <p className="flex items-center gap-1.5 text-xs text-on-surface-variant/60">
                  <span className="material-symbols-outlined text-[14px]">
                    calendar_today
                  </span>
                  Member since: Jan 2024
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Update Credentials */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-5 mb-4">
          <h3 className="text-sm font-bold text-on-surface mb-4">
            Update Credentials
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Email */}
            <div>
              <p className="text-xs text-on-surface-variant mb-1.5">
                Email Address
              </p>
              <div className="flex items-center justify-between h-10 px-sm rounded-xl border border-outline-variant/50 bg-surface-container-low">
                {editingEmail ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEditingEmail(false)}
                    autoFocus
                    className="flex-1 bg-transparent text-xs text-on-surface outline-none"
                  />
                ) : (
                  <span className="flex-1 text-xs text-on-surface truncate">
                    {email}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setEditingEmail(true)}
                  className="shrink-0 ml-2 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                    edit
                  </span>
                </button>
              </div>
            </div>

            {/* Phone */}
            <div>
              <p className="text-xs text-on-surface-variant mb-1.5">
                Phone Number
              </p>
              <div className="flex items-center justify-between h-10 px-sm rounded-xl border border-outline-variant/50 bg-surface-container-low">
                {editingPhone ? (
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => setEditingPhone(false)}
                    autoFocus
                    className="flex-1 bg-transparent text-xs text-on-surface outline-none"
                  />
                ) : (
                  <span className="flex-1 text-xs text-on-surface truncate">
                    {phone}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setEditingPhone(true)}
                  className="shrink-0 ml-2 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                    edit
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <p className="text-xs text-on-surface-variant mb-1.5">Password</p>
            <div className="flex items-center justify-between h-10 px-sm rounded-xl border border-outline-variant/50 bg-surface-container-low">
              <span className="text-sm text-on-surface tracking-[0.2em]">
                ••••••••••••
              </span>
              <button className="text-xs font-semibold text-primary hover:underline">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-on-surface">Preferences</h3>
            <span className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-wider">
              Coming Soon
            </span>
          </div>

          <div className="flex items-center gap-3 py-2">
            <div className="w-9 h-9 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                notifications
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">
                Notification Settings
              </p>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Manage how and when you receive updates from your AI advisor.
              </p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-red-200 overflow-hidden mb-md">
          <div className="bg-red-50 px-5 py-3 border-b border-red-200">
            <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider">
              Danger Zone
            </h3>
          </div>
          <div className="bg-surface-container-lowest p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-on-surface mb-1">
                  Delete Account
                </p>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Permanently deletes your profile and all data after 90 days.{" "}
                  <span className="text-error font-semibold">
                    This action is irreversible
                  </span>{" "}
                  once the grace period ends.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="shrink-0 h-9 px-4 border-2 border-error text-error text-sm font-bold rounded-xl hover:bg-error hover:text-white transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3 text-xs text-on-surface-variant/60">
            <button className="hover:text-on-surface transition-colors">
              Terms of Service
            </button>
            <span>•</span>
            <button className="hover:text-on-surface transition-colors">
              Privacy Policy
            </button>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm font-semibold text-error hover:text-error/80 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">
              logout
            </span>
            Sign Out
          </button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-md">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xl p-6 max-w-sm w-full animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[26px] text-error">
                warning
              </span>
            </div>
            <h3 className="text-base font-bold text-on-surface text-center mb-2">
              Delete Account?
            </h3>
            <p className="text-xs text-on-surface-variant text-center leading-relaxed mb-5">
              This will permanently delete your account and all associated data
              after 90 days. This action cannot be undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 h-10 rounded-xl border border-outline-variant/60 text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 h-10 rounded-xl bg-error text-white text-sm font-semibold hover:bg-error/90 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettingsPage;
