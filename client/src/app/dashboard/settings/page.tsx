"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Settings, Globe, Bell, Shield, CreditCard, Code2,
  Save, Loader2, Moon, Sun, Key, Trash2, Download,
  AlertTriangle, Copy, Check, RefreshCw, Eye, EyeOff,
} from "lucide-react";
import { settingsApi, userApi, authApi, type SettingsData } from "@/lib/api";
import { toast } from "sonner";

// ── Toggle Component ─────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="relative w-[44px] h-[26px] rounded-full transition-colors duration-200"
      style={{ background: checked ? "#171717" : "#e5e5e5" }}
    >
      <motion.div
        animate={{ x: checked ? 21 : 3 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-[3px] w-5 h-5 rounded-full bg-white shadow-sm"
      />
    </button>
  );
}

// ── Section Card ─────────────────────────────────────────

function SectionCard({ icon: Icon, title, children, delay = 0 }: {
  icon: React.ElementType; title: string; children: React.ReactNode; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="metric-card p-6 flex flex-col gap-4"
    >
      <div className="flex items-center gap-2.5 mb-1">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#f5f5f5" }}>
          <Icon size={16} style={{ color: "#737373" }} />
        </div>
        <h3 className="text-[15px] font-semibold" style={{ color: "#0a0a0a" }}>{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

// ── Setting Row ──────────────────────────────────────────

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3.5" style={{ borderBottom: "1px solid #f2f2f2" }}>
      <div>
        <p className="text-[13px] font-medium" style={{ color: "#0a0a0a" }}>{label}</p>
        {description && <p className="text-[11px] mt-0.5" style={{ color: "#737373" }}>{description}</p>}
      </div>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: "", new: "", confirm: "" });
  const [showDanger, setShowDanger] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await settingsApi.get();
        setSettings(res.settings);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (section: string, data: any) => {
    setSaving(true);
    try {
      const res = await settingsApi.update({ [section]: data });
      setSettings(res.settings);
      toast.success("Settings saved!");
    } catch (e: any) {
      toast.error(e.message);
    }
    setSaving(false);
  };

  const handleGenerateApiKey = async () => {
    try {
      const res = await settingsApi.generateApiKey();
      toast.success("API key generated!");
      const updated = await settingsApi.get();
      setSettings(updated.settings);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordForm.new !== passwordForm.confirm) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      await authApi.updatePassword(passwordForm.current, passwordForm.new);
      toast.success("Password updated!");
      setPasswordForm({ current: "", new: "", confirm: "" });
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await userApi.deleteAccount();
      window.location.href = "/";
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const copyApiKey = () => {
    if (settings?.api.apiKey) {
      navigator.clipboard.writeText(settings.api.apiKey);
      setApiKeyCopied(true);
      setTimeout(() => setApiKeyCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col px-6 sm:px-10 py-6 sm:py-8 gap-6" style={{ background: "#f5f5f5" }}>
        <div className="h-[50px] shimmer rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array(4).fill(0).map((_, i) => <div key={i} className="h-[200px] shimmer rounded-2xl" />)}
        </div>
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="flex-1 flex flex-col px-6 sm:px-10 py-6 sm:py-8 overflow-y-auto dash-scroll gap-8" style={{ background: "#f5f5f5" }}>
      {/* Header */}
      <header>
        <h1 className="text-[28px] font-semibold tracking-tight" style={{ color: "#0a0a0a" }}>Settings</h1>
        <p className="text-[14px] font-normal mt-1" style={{ color: "#737373" }}>Manage your account preferences and configuration</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General */}
        <SectionCard icon={Globe} title="General" delay={0}>
          <SettingRow label="Timezone">
            <select
              value={settings.general.timezone}
              onChange={(e) => handleSave("general", { ...settings.general, timezone: e.target.value })}
              className="px-3 py-1.5 rounded-lg text-[13px] font-medium outline-none"
              style={{ background: "#f5f5f5", border: "1px solid #e5e5e5", color: "#0a0a0a" }}
            >
              {["UTC", "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "Europe/London", "Europe/Paris", "Asia/Tokyo", "Asia/Kolkata"].map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </SettingRow>
          <SettingRow label="Language">
            <select
              value={settings.general.language}
              onChange={(e) => handleSave("general", { ...settings.general, language: e.target.value })}
              className="px-3 py-1.5 rounded-lg text-[13px] font-medium outline-none"
              style={{ background: "#f5f5f5", border: "1px solid #e5e5e5", color: "#0a0a0a" }}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </SettingRow>
          <SettingRow label="Theme" description="Switch between light and dark mode">
            <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: "#f5f5f5" }}>
              {["light", "dark", "system"].map((t) => (
                <button
                  key={t}
                  onClick={() => handleSave("general", { ...settings.general, theme: t })}
                  className="px-3 py-1.5 rounded-md text-[12px] font-medium capitalize transition-all"
                  style={settings.general.theme === t
                    ? { background: "#0a0a0a", color: "#ffffff" }
                    : { color: "#737373" }}
                >
                  {t === "light" && <Sun size={11} className="inline mr-1" />}
                  {t === "dark" && <Moon size={11} className="inline mr-1" />}
                  {t}
                </button>
              ))}
            </div>
          </SettingRow>
        </SectionCard>

        {/* Notifications */}
        <SectionCard icon={Bell} title="Notifications" delay={0.06}>
          {Object.entries(settings.notifications).map(([key, val]) => (
            <SettingRow key={key} label={key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}>
              <Toggle
                checked={val as boolean}
                onChange={(v) => handleSave("notifications", { ...settings.notifications, [key]: v })}
              />
            </SettingRow>
          ))}
        </SectionCard>

        {/* Security */}
        <SectionCard icon={Shield} title="Security" delay={0.12}>
          <SettingRow label="Two-Factor Authentication" description="Add an extra layer of security">
            <Toggle
              checked={settings.security.twoFactorEnabled}
              onChange={(v) => handleSave("security", { ...settings.security, twoFactorEnabled: v })}
            />
          </SettingRow>
          <SettingRow label="Session Timeout" description={`Auto-logout after ${settings.security.sessionTimeout} min`}>
            <select
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSave("security", { ...settings.security, sessionTimeout: +e.target.value })}
              className="px-3 py-1.5 rounded-lg text-[13px] font-medium outline-none"
              style={{ background: "#f5f5f5", border: "1px solid #e5e5e5", color: "#0a0a0a" }}
            >
              {[15, 30, 60, 120].map((m) => <option key={m} value={m}>{m} min</option>)}
            </select>
          </SettingRow>

          {/* Change Password */}
          <div className="flex flex-col gap-2.5 pt-3">
            <p className="text-[13px] font-medium" style={{ color: "#0a0a0a" }}>Change Password</p>
            {["current", "new", "confirm"].map((field) => (
              <input
                key={field}
                type="password"
                placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} password`}
                value={(passwordForm as any)[field]}
                onChange={(e) => setPasswordForm((p) => ({ ...p, [field]: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl text-[13px] font-medium outline-none transition-all focus:ring-2 focus:ring-[#0a0a0a]/20"
                style={{ background: "#f5f5f5", border: "1px solid #e5e5e5", color: "#0a0a0a" }}
              />
            ))}
            <button
              onClick={handlePasswordChange}
              disabled={!passwordForm.current || !passwordForm.new}
              className="self-start flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-medium text-white disabled:opacity-40 transition-all hover:opacity-90"
              style={{ background: "#0a0a0a" }}
            >
              <Key size={13} /> Update Password
            </button>
          </div>
        </SectionCard>

        {/* API Access */}
        <SectionCard icon={Code2} title="API Access" delay={0.18}>
          <SettingRow label="API Key" description="Use this key to access the SoloChief API">
            <div className="flex items-center gap-2">
              {settings.api.apiKey ? (
                <>
                  <code className="text-[11px] font-mono px-2.5 py-1.5 rounded-lg" style={{ background: "#f5f5f5", color: "#0a0a0a" }}>
                    {showApiKey ? settings.api.apiKey.slice(0, 24) + "..." : "sc_••••••••••••"}
                  </code>
                  <button onClick={() => setShowApiKey(!showApiKey)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#f5f5f5] transition-colors">
                    {showApiKey ? <EyeOff size={13} style={{ color: "#737373" }} /> : <Eye size={13} style={{ color: "#737373" }} />}
                  </button>
                  <button onClick={copyApiKey} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-[#f5f5f5] transition-colors">
                    {apiKeyCopied ? <Check size={13} style={{ color: "#171717" }} /> : <Copy size={13} style={{ color: "#737373" }} />}
                  </button>
                </>
              ) : (
                <span className="text-[12px]" style={{ color: "#737373" }}>No key generated</span>
              )}
            </div>
          </SettingRow>
          <button
            onClick={handleGenerateApiKey}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-medium text-white transition-all hover:opacity-90"
            style={{ background: "#0a0a0a" }}
          >
            <RefreshCw size={13} /> Generate New Key
          </button>
          <p className="text-[11px]" style={{ color: "#a3a3a3" }}>
            Rate limit: {settings.api.rateLimitPerMinute} requests/min
          </p>
        </SectionCard>
      </div>

      {/* Danger Zone */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="metric-card p-6" style={{ border: "1px solid #ffd4d1" }}>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#fff0f0" }}>
            <AlertTriangle size={16} style={{ color: "#e5484d" }} />
          </div>
          <h3 className="text-[15px] font-semibold" style={{ color: "#e5484d" }}>Danger Zone</h3>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[14px] font-medium" style={{ color: "#0a0a0a" }}>Delete Account</p>
            <p className="text-[12px] mt-0.5" style={{ color: "#737373" }}>Permanently remove your account and all data. This cannot be undone.</p>
          </div>
          <div className="flex items-center gap-2">
            {showDanger ? (
              <>
                <button
                  onClick={() => setShowDanger(false)}
                  className="px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all hover:bg-[#e5e5e5]"
                  style={{ background: "#f5f5f5", color: "#737373" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2.5 rounded-xl text-[13px] font-medium text-white flex items-center gap-1.5 transition-all hover:opacity-90"
                  style={{ background: "#e5484d" }}
                >
                  <Trash2 size={13} /> Confirm Delete
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowDanger(true)}
                className="px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all hover:opacity-90"
                style={{ background: "#e5484d", color: "#ffffff" }}
              >
                Delete Account
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
