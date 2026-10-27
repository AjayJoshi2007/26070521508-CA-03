"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users, DollarSign, TrendingUp, Activity,
  Zap, Crown, Rocket, Clock, UserPlus, BarChart3,
} from "lucide-react";
import { adminApi } from "@/lib/api";

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`shimmer rounded-2xl ${className}`} />;
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);
}

// ── KPI Card ─────────────────────────────────────────────

function KPICard({ icon: Icon, label, value, sub, accent, delay }: {
  icon: React.ElementType; label: string; value: string; sub: string; accent: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="metric-card p-5 flex flex-col justify-between gap-4"
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: accent }}>
          <Icon size={18} style={{ color: "#0a0a0a" }} />
        </div>
      </div>
      <div>
        <p className="text-[28px] font-semibold leading-none tracking-tight" style={{ color: "#0a0a0a" }}>{value}</p>
        <p className="text-[12px] font-medium mt-1.5 uppercase tracking-wide" style={{ color: "#737373" }}>{label}</p>
        <p className="text-[11px] mt-0.5" style={{ color: "#a3a3a3" }}>{sub}</p>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// ADMIN OVERVIEW PAGE
// ═══════════════════════════════════════════════════════════

export default function AdminOverviewPage() {
  const [overview, setOverview] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await adminApi.getOverview();
        setOverview(res.overview);
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, []);

  const PLAN_ICONS: Record<string, React.ElementType> = { CORE: Zap, PRIME: Crown, APEX: Rocket };
  const PLAN_COLORS: Record<string, string> = {
    CORE: "#0a0a0a",
    PRIME: "#525252",
    APEX: "#171717",
  };

  return (
    <div className="flex-1 flex flex-col px-6 sm:px-10 py-6 sm:py-8 overflow-y-auto dash-scroll gap-8" style={{ background: "#f5f5f5" }}>
      {/* Header */}
      <header>
        <h1 className="text-[28px] font-semibold tracking-tight" style={{ color: "#0a0a0a" }}>Admin Overview</h1>
        <p className="text-[14px] font-normal mt-1" style={{ color: "#737373" }}>Platform-wide KPIs and recent activity</p>
      </header>

      {/* KPI Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array(4).fill(0).map((_, i) => <SkeletonBlock key={i} className="h-[140px]" />)}
        </div>
      ) : overview && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <KPICard icon={Users} label="Total Users" value={overview.totalUsers.toString()} sub={`${overview.activeUsers} active subscriptions`} accent="#f5f5f5" delay={0} />
          <KPICard icon={DollarSign} label="Total Revenue" value={formatCurrency(overview.totalRevenue)} sub="All-time platform revenue" accent="#f5f5f5" delay={0.05} />
          <KPICard icon={BarChart3} label="Current MRR" value={formatCurrency(overview.currentMRR)} sub="This month" accent="#f5f5f5" delay={0.1} />
          <KPICard icon={Activity} label="Active Users" value={overview.activeUsers.toString()} sub="With active subscriptions" accent="#f5f5f5" delay={0.15} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Plan Distribution */}
        {overview && (
          <div className="lg:col-span-5 metric-card p-6 flex flex-col gap-5">
            <h2 className="text-[16px] font-semibold" style={{ color: "#0a0a0a" }}>Customers by Plan</h2>
            {overview.customersByPlan.length === 0 ? (
              <p className="text-[13px]" style={{ color: "#737373" }}>No data yet</p>
            ) : (
              <div className="flex flex-col gap-4">
                {overview.customersByPlan.map((p: any, i: number) => {
                  const maxCount = Math.max(...overview.customersByPlan.map((x: any) => x.count), 1);
                  const PlanIcon = PLAN_ICONS[p.plan] || Zap;
                  const color = PLAN_COLORS[p.plan] || "#0a0a0a";
                  return (
                    <motion.div key={p.plan} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 * i }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                            <PlanIcon size={14} style={{ color }} />
                          </div>
                          <span className="text-[13px] font-medium" style={{ color: "#0a0a0a" }}>{p.plan}</span>
                        </div>
                        <span className="text-[14px] font-semibold" style={{ color: "#0a0a0a" }}>{p.count}</span>
                      </div>
                      <div className="w-full h-2 rounded-full" style={{ background: "#f2f2f2" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(p.count / maxCount) * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.12 * i, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="h-full rounded-full"
                          style={{ background: color }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Recent Signups */}
        {overview && (
          <div className="lg:col-span-7 metric-card p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-semibold" style={{ color: "#0a0a0a" }}>Recent Signups</h2>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#f5f5f5" }}>
                <UserPlus size={15} style={{ color: "#737373" }} />
              </div>
            </div>
            {overview.recentSignups.length === 0 ? (
              <p className="text-[13px]" style={{ color: "#737373" }}>No recent signups</p>
            ) : (
              <div className="flex flex-col gap-1">
                {overview.recentSignups.map((u: any, i: number) => (
                  <motion.div
                    key={u._id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i }}
                    className="rounded-[12px] px-4 py-3 flex items-center justify-between hover:bg-[#f5f5f5] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-semibold"
                        style={{ background: "#0a0a0a" }}
                      >
                        {u.fullName?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-[13px] font-medium" style={{ color: "#0a0a0a" }}>{u.fullName}</p>
                        <p className="text-[11px]" style={{ color: "#737373" }}>{u.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {u.plan && (
                        <span
                          className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                          style={{ background: "#f5f5f5", color: "#737373" }}
                        >
                          {u.plan}
                        </span>
                      )}
                      <span className="text-[11px] font-medium flex items-center gap-1" style={{ color: "#a3a3a3" }}>
                        <Clock size={11} />
                        {new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
