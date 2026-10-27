"use client";

import { motion } from "framer-motion";
import {
  Settings, Shield, Bell, Globe, Wrench,
  ToggleLeft, AlertTriangle, Server,
} from "lucide-react";

function Toggle({ checked, label }: { checked: boolean; label: string }) {
  return (
    <div className="flex items-center justify-between py-3.5" style={{ borderBottom: "1px solid #f2f2f2" }}>
      <span className="text-[13px] font-medium" style={{ color: "#0a0a0a" }}>{label}</span>
      <button className="relative w-[44px] h-[26px] rounded-full transition-colors duration-200" style={{ background: checked ? "#171717" : "#e5e5e5" }}>
        <div className={`absolute top-[3px] w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? "translate-x-[21px]" : "translate-x-[3px]"}`} />
      </button>
    </div>
  );
}

function SectionCard({ icon: Icon, title, children, delay = 0 }: {
  icon: React.ElementType; title: string; children: React.ReactNode; delay?: number;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }} className="metric-card p-6 flex flex-col gap-3">
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

export default function AdminSettingsPage() {
  return (
    <div className="flex-1 flex flex-col px-6 sm:px-10 py-6 sm:py-8 overflow-y-auto dash-scroll gap-8" style={{ background: "#f5f5f5" }}>
      <header>
        <h1 className="text-[28px] font-semibold tracking-tight" style={{ color: "#0a0a0a" }}>Platform Settings</h1>
        <p className="text-[14px] font-normal mt-1" style={{ color: "#737373" }}>Configure platform-wide preferences</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feature Flags */}
        <SectionCard icon={ToggleLeft} title="Feature Flags" delay={0}>
          <Toggle checked={true} label="New User Onboarding Flow" />
          <Toggle checked={true} label="AI Operator V2 Engine" />
          <Toggle checked={false} label="Beta: Advanced Analytics" />
          <Toggle checked={true} label="Email Notifications" />
          <Toggle checked={false} label="Maintenance Mode" />
        </SectionCard>

        {/* Platform Config */}
        <SectionCard icon={Wrench} title="Platform Configuration" delay={0.06}>
          {[
            { label: "Max Users Per Plan (CORE)", value: "1000" },
            { label: "Max Users Per Plan (PRIME)", value: "500" },
            { label: "Max Users Per Plan (APEX)", value: "200" },
            { label: "API Rate Limit (req/min)", value: "60" },
            { label: "Session Timeout (min)", value: "30" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #f2f2f2" }}>
              <span className="text-[13px] font-medium" style={{ color: "#0a0a0a" }}>{item.label}</span>
              <input
                defaultValue={item.value}
                className="w-[72px] px-3 py-1.5 rounded-lg text-[13px] font-medium text-right outline-none transition-all focus:ring-2 focus:ring-[#0a0a0a]/20"
                style={{ background: "#f5f5f5", border: "1px solid #e5e5e5", color: "#0a0a0a" }}
              />
            </div>
          ))}
        </SectionCard>

        {/* Security */}
        <SectionCard icon={Shield} title="Security" delay={0.12}>
          <Toggle checked={true} label="Force HTTPS" />
          <Toggle checked={true} label="CORS Enforcement" />
          <Toggle checked={false} label="IP Whitelisting" />
          <Toggle checked={true} label="Rate Limiting" />
          <Toggle checked={true} label="JWT Token Validation" />
        </SectionCard>

        {/* System Status */}
        <SectionCard icon={Server} title="System Status" delay={0.18}>
          {[
            { label: "API Server", status: "Operational", ok: true },
            { label: "MongoDB", status: "Connected", ok: true },
            { label: "Background Workers", status: "Running", ok: true },
            { label: "Email Service", status: "Active", ok: true },
            { label: "CDN", status: "Operational", ok: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #f2f2f2" }}>
              <span className="text-[13px] font-medium" style={{ color: "#0a0a0a" }}>{item.label}</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full status-pulse`} style={{ background: item.ok ? "#171717" : "#e5484d" }} />
                <span className="text-[12px] font-medium" style={{ color: item.ok ? "#171717" : "#e5484d" }}>{item.status}</span>
              </div>
            </div>
          ))}
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
            <p className="text-[14px] font-medium" style={{ color: "#0a0a0a" }}>Maintenance Mode</p>
            <p className="text-[12px] mt-0.5" style={{ color: "#737373" }}>Temporarily disable all user access to the platform.</p>
          </div>
          <button
            className="px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all hover:opacity-90"
            style={{ background: "#e5484d", color: "#ffffff" }}
          >
            Enable Maintenance
          </button>
        </div>
      </motion.div>
    </div>
  );
}
