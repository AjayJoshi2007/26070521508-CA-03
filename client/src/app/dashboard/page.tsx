"use client";

import { useMemo, useState } from "react";
import { useDashboard } from "./layout";
import { motion } from "framer-motion";
import {
    Check, TrendingUp, TrendingDown, Minus,
    Zap, Shield, Activity, Target,
    RefreshCw, Users,
    Crosshair, CheckCircle2, CircleDot,
    Loader2, Clock3,
} from "lucide-react";

// ─── Helpers ────────────────────────────────────────────────────────────────

function getFormattedDate() {
    const today = new Date();
    return today.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonBlock({ className }: { className: string }) {
    return <div className={`shimmer rounded-2xl ${className}`} />;
}

// ─── Top Metric Card ─────────────────────────────────────────────────────────

function TopMetricCard({ icon: Icon, label, value, sub, accent, iconColor, trend, trendVal, delay }: {
    icon: React.ElementType; label: string; value: string; sub: string;
    accent: string; iconColor: string; trend?: "up" | "down" | "stable"; trendVal?: string; delay?: number;
}) {
    const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
    const trendColor = trend === "up" ? "#171717" : trend === "down" ? "#e5484d" : "#737373";
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay || 0, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="metric-card flex min-h-[160px] flex-col justify-between gap-5 p-6"
        >
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: accent }}>
                        <Icon size={18} style={{ color: iconColor }} />
                    </div>
                    <p className="text-[12px] font-medium uppercase tracking-wide" style={{ color: "#737373" }}>{label}</p>
                </div>
                {trend && trendVal && (
                    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: `${trendColor}12`, color: trendColor }}>
                        <TrendIcon size={12} /> {trendVal}
                    </span>
                )}
            </div>
            <div>
                <p className="text-[32px] font-semibold leading-none tracking-tight" style={{ color: "#0a0a0a" }}>{value}</p>
                <p className="mt-2 text-[12px] font-medium" style={{ color: "#737373" }}>{sub}</p>
            </div>
        </motion.div>
    );
}

// ─── Task Row ────────────────────────────────────────────────────────────────

function TaskRow({ title, sub, done, color, delay }: { title: string; sub: string; done: boolean; color: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className="flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 transition-colors duration-200 hover:bg-[#fafafa]"
            style={{ background: "#ffffff", border: "1px solid #e5e5e5" }}
        >
            <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: `${color}12` }}>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                </div>
                <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium" style={{ color: "#0a0a0a" }}>{title}</p>
                    <p className="mt-0.5 truncate text-[11px]" style={{ color: "#737373" }}>{sub}</p>
                </div>
            </div>
            <div className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-semibold`} style={{ background: done ? "#f0f0f0" : "#f5f5f5", color: done ? "#171717" : "#737373" }}>
                {done ? <CheckCircle2 size={13} /> : <Clock3 size={13} />}
                {done ? "Complete" : "Queued"}
            </div>
        </motion.div>
    );
}

// ─── OP Colors ───────────────────────────────────────────────────────────────

const OP_COLORS: Record<string, string> = {
    INTRO: "#0a0a0a",
    SNAP: "#737373",
    CLIP: "#a3a3a3",
    SCOOP: "#525252",
    MEND: "#e5484d",
    PULSE: "#171717",
    VIBE: "#404040",
    "CHIEF CMO": "#404040",
    TRACE: "#a3a3a3",
    BASE: "#404040",
};

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function DashboardPage() {
    const {
        userPlan, operators, displayName,
        firebaseMetrics, dailyOutputs,
        metricsLoading, outputsLoading,
        systemHealth, efficiencyScores,
    } = useDashboard();

    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1200);
    };

    // Today's date string
    const today = useMemo(() => new Date().toISOString().split("T")[0], []);

    // Active operators for user's plan
    const activeOperators = useMemo(() => operators.filter(op => op.plans.includes(userPlan)), [operators, userPlan]);

    // Merge operator metrics with daily outputs for "Tasks for Today"
    const todayTasks = useMemo(() => {
        return activeOperators.map(op => {
            const fbMetric = firebaseMetrics.find(m => m.operatorId === op.id);
            const todayOutput = dailyOutputs.find(o => o.operatorId === op.id && o.date === today);
            const done = todayOutput?.status === "completed";
            let sub = "";
            if (todayOutput && todayOutput.outputCount > 0) {
                sub = `${todayOutput.outputCount} ${todayOutput.outputType} generated`;
            } else if (fbMetric) {
                sub = `${fbMetric.tasksToday} tasks queued`;
            } else {
                sub = "Awaiting data…";
            }
            return {
                title: `${op.name} — ${op.role}`,
                sub,
                done,
                color: OP_COLORS[op.name] || "#0a0a0a",
            };
        });
    }, [activeOperators, firebaseMetrics, dailyOutputs, today]);

    // Accuracy levels from efficiency scores
    const avgAccuracy = useMemo(() => {
        if (efficiencyScores.length === 0) return 0;
        const relevant = efficiencyScores.filter(e => activeOperators.some(o => o.id === e.operatorId));
        if (relevant.length === 0) return 0;
        return Math.round(relevant.reduce((s, e) => s + e.accuracyScore, 0) / relevant.length);
    }, [efficiencyScores, activeOperators]);

    // Operators active today
    const operatorsActiveToday = useMemo(() => {
        const activeIds = new Set<string>();
        firebaseMetrics.forEach(m => { if (m.status === "active" && m.tasksToday > 0) activeIds.add(m.operatorId); });
        dailyOutputs.filter(o => o.date === today).forEach(o => activeIds.add(o.operatorId));
        return activeIds.size || activeOperators.length;
    }, [firebaseMetrics, dailyOutputs, today, activeOperators]);

    const isLoading = metricsLoading || outputsLoading;

    return (
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto px-6 py-6 dash-scroll sm:gap-8 sm:px-10 sm:py-8" style={{ background: "#f5f5f5" }}>

            {/* ── Header ── */}
            <header className="flex flex-col gap-5 pb-6 sm:flex-row sm:items-end sm:justify-between" style={{ borderBottom: "1px solid #e5e5e5" }}>
                <div>
                    <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide" style={{ color: "#737373" }}>
                        <Activity size={14} /> Operations / Overview
                    </div>
                    <h1 className="text-[28px] font-semibold leading-tight tracking-tight sm:text-[34px]" style={{ color: "#0a0a0a" }}>
                        Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, {displayName.split(" ")[0]}
                    </h1>
                    <p className="mt-1.5 text-[13px] font-normal" style={{ color: "#737373" }}>
                        {getFormattedDate()} <span className="mx-2" style={{ color: "#e5e5e5" }}>|</span> Today&apos;s operator activity
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[12px] font-medium" style={{ borderColor: "#e5e5e5", background: "#ffffff", color: "#737373" }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#525252" }} /> Sample workspace
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[12px] font-semibold" style={{ borderColor: "#e5e5e5", background: "#ffffff", color: "#0a0a0a" }}>
                        {userPlan} plan
                    </span>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleRefresh}
                        aria-label="Refresh dashboard"
                        title="Refresh dashboard"
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium text-white transition-all hover:opacity-90"
                        style={{ background: "#0a0a0a" }}
                    >
                        <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
                        Refresh
                    </motion.button>
                </div>
            </header>

            {/* ── Top 3 Metric Cards ── */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {Array(3).fill(0).map((_, i) => <SkeletonBlock key={i} className="h-[160px]" />)}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <TopMetricCard
                        icon={Crosshair}
                        label="Accuracy Level"
                        value={`${avgAccuracy}%`}
                        sub={`Across ${activeOperators.length} active operators`}
                        accent="#f5f5f5"
                        iconColor="#171717"
                        trend={avgAccuracy >= 90 ? "up" : "stable"}
                        trendVal={avgAccuracy >= 90 ? "Strong" : "Building"}
                        delay={0}
                    />
                    <TopMetricCard
                        icon={Activity}
                        label="Operators Active Today"
                        value={`${operatorsActiveToday}`}
                        sub={`of ${activeOperators.length} total in ${userPlan} plan`}
                        accent="#f5f5f5"
                        iconColor="#0a0a0a"
                        trend="stable"
                        trendVal="Available"
                        delay={0.06}
                    />
                    <TopMetricCard
                        icon={Users}
                        label="Total Operators"
                        value={`${activeOperators.length}`}
                        sub={`${10 - activeOperators.length > 0 ? `${10 - activeOperators.length} locked` : "All unlocked"} · ${userPlan} Plan`}
                        accent="#f5f5f5"
                        iconColor="#525252"
                        trend="stable"
                        delay={0.12}
                    />
                </div>
            )}

            {/* ── Tasks + Performance row ── */}
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-6">

                {/* Tasks for Today */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                    <div className="flex items-end justify-between gap-3">
                        <div>
                            <p className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "#737373" }}>Work queue</p>
                            <h2 className="mt-1 text-[18px] font-semibold" style={{ color: "#0a0a0a" }}>Today&apos;s tasks</h2>
                        </div>
                        <span className="rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold" style={{ borderColor: "#e5e5e5", background: "#ffffff", color: "#737373" }}>
                            {todayTasks.filter(t => t.done).length} / {todayTasks.length} complete
                        </span>
                    </div>
                    {isLoading ? (
                        <div className="flex flex-col gap-3">
                            {Array(4).fill(0).map((_, i) => <SkeletonBlock key={i} className="h-[64px]" />)}
                        </div>
                    ) : todayTasks.length === 0 ? (
                        <div className="metric-card p-10 text-center">
                            <CircleDot size={28} className="mx-auto mb-3" style={{ color: "#a3a3a3" }} />
                            <p className="text-[14px] font-semibold" style={{ color: "#0a0a0a" }}>No tasks scheduled yet</p>
                            <p className="text-[12px] mt-1" style={{ color: "#737373" }}>Operators will populate tasks as they execute</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2.5">
                            {todayTasks.map((task, i) => (
                                <TaskRow key={i} title={task.title} sub={task.sub} done={task.done} color={task.color} delay={0.03 * i} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Operator Performance */}
                <div className="lg:col-span-5 flex flex-col gap-5">
                    <div className="metric-card flex flex-col gap-5 p-6">
                        <div className="w-full flex items-center justify-between">
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "#737373" }}>Quality signals</p>
                                <h3 className="mt-1 text-[16px] font-semibold" style={{ color: "#0a0a0a" }}>Operator Efficiency</h3>
                            </div>
                            <span className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium" style={{ borderColor: "#e5e5e5", color: "#737373" }}>
                                <CircleDot size={10} /> Sample
                            </span>
                        </div>
                        {isLoading ? (
                            <div className="flex flex-col gap-2.5">
                                {Array(3).fill(0).map((_, i) => <SkeletonBlock key={i} className="h-[52px]" />)}
                            </div>
                        ) : efficiencyScores.length === 0 ? (
                            <p className="text-[13px] text-center py-4" style={{ color: "#737373" }}>No efficiency data yet</p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {efficiencyScores
                                    .filter(e => activeOperators.some(o => o.id === e.operatorId))
                                    .map((eff, i) => {
                                        const TIcon = eff.trend === "up" ? TrendingUp : eff.trend === "down" ? TrendingDown : Minus;
                                        const tColor = eff.trend === "up" ? "#171717" : eff.trend === "down" ? "#e5484d" : "#737373";
                                        const barColor = eff.efficiencyScore >= 90 ? "#171717" : eff.efficiencyScore >= 75 ? "#525252" : "#e5484d";
                                        const opColor = OP_COLORS[eff.operatorName] || "#0a0a0a";
                                        return (
                                            <motion.div key={eff.operatorId} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}
                                                className="flex items-center gap-3 rounded-xl px-4 py-3"
                                                style={{ background: "#f5f5f5" }}>
                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${opColor}15` }}>
                                                    <span className="w-2 h-2 rounded-full" style={{ background: opColor }} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <span className="text-[12px] font-medium" style={{ color: "#0a0a0a" }}>{eff.operatorName}</span>
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-[13px] font-semibold" style={{ color: "#0a0a0a" }}>{eff.efficiencyScore}%</span>
                                                            <TIcon size={12} style={{ color: tColor }} />
                                                        </div>
                                                    </div>
                                                    <div className="w-full h-1.5 rounded-full" style={{ background: "#e5e5e5" }}>
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${eff.efficiencyScore}%` }}
                                                            transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                            className="h-full rounded-full"
                                                            style={{ background: barColor }}
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                            </div>
                        )}
                    </div>

                    {/* System health summary */}
                    {!isLoading && systemHealth && (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="metric-card flex flex-col gap-3 p-6"
                        >
                            <div className="mb-1 flex items-end justify-between gap-3">
                                <div>
                                    <p className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "#737373" }}>Infrastructure</p>
                                    <h3 className="mt-1 text-[16px] font-semibold" style={{ color: "#0a0a0a" }}>Platform Health</h3>
                                </div>
                                <span className="text-[11px] font-medium" style={{ color: "#a3a3a3" }}>Sample metrics</span>
                            </div>
                            {[
                                { label: "System Health", val: `${systemHealth.platformHealth}%`, ok: systemHealth.platformHealth >= 95 },
                                { label: "SLA Compliance", val: `${systemHealth.slaCompliance}%`, ok: systemHealth.slaCompliance >= 97 },
                                { label: "Avg Latency", val: `${systemHealth.avgLatencyMs}ms`, ok: systemHealth.avgLatencyMs < 30 },
                                { label: "Incidents (30d)", val: `${systemHealth.incidentsLast30Days}`, ok: systemHealth.incidentsLast30Days === 0 },
                            ].map(row => (
                                <div key={row.label} className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: "#f5f5f5" }}>
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-2 h-2 rounded-full status-pulse`} style={{ background: row.ok ? "#171717" : "#525252" }} />
                                        <span className="text-[12px] font-medium" style={{ color: "#0a0a0a" }}>{row.label}</span>
                                    </div>
                                    <span className="text-[13px] font-semibold" style={{ color: "#0a0a0a" }}>{row.val}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
