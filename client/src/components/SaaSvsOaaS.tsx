"use client";

import { motion } from "framer-motion";
import { BarChart3, Bell, CheckCircle2, FileText, LayoutDashboard, Mail, Settings, Users, Zap } from "lucide-react";

const shifts = [
    {
        number: "01",
        old: "You learn the tools, train your team, manage the dashboards.",
        neu: "Your operators are pre-trained. They execute autonomously from day one.",
        body: "SaaS demands weeks of onboarding and hours of daily management. OaaS deploys a working team in 7 hours — calibrated to your brand, your market, your goals. You never touch a dashboard again.",
    },
    {
        number: "02",
        old: "You scale by hiring more people and buying more seats.",
        neu: "You scale by adding operators. No interviews. No overhead.",
        body: "Every new tool means another subscription, another learning curve, another headcount. With OaaS, scaling is instant — spin up another operator and it's already working. Your growth is no longer bottlenecked by recruitment.",
    },
    {
        number: "03",
        old: "Your business sleeps when you do.",
        neu: "Your operators run 24/7. Results arrive before your morning coffee.",
        body: "Traditional SaaS is only as productive as the humans behind it. OaaS operators never clock out. Leads are generated, designs are created, and reports are compiled while you sleep — delivered to your inbox by sunrise.",
    },
];

/* ────────────────────────────────────────────
   VISUAL: Split-screen dashboard comparison
   Left = Cluttered SaaS chaos
   Right = Clean OaaS result flow
   ──────────────────────────────────────────── */

function SaaSClutter() {
    return (
        <div className="absolute inset-0 p-3 overflow-hidden">
            {/* Fake top bar */}
            <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2 h-2 rounded-full bg-red-400/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                <div className="w-2 h-2 rounded-full bg-green-400/50" />
                <div className="ml-auto flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-4 rounded bg-foreground/[0.04] flex items-center justify-center">
                            {i === 0 && <Bell size={7} className="text-foreground/20" />}
                            {i === 1 && <Settings size={7} className="text-foreground/20" />}
                            {i === 2 && <Mail size={7} className="text-foreground/20" />}
                            {i === 3 && <Users size={7} className="text-foreground/20" />}
                            {i === 4 && <BarChart3 size={7} className="text-foreground/20" />}
                        </div>
                    ))}
                </div>
            </div>
            {/* Sidebar + cluttered panels */}
            <div className="flex gap-2 h-[calc(100%-28px)]">
                {/* Mini sidebar */}
                <div className="w-6 flex flex-col gap-2 flex-shrink-0">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-full aspect-square rounded bg-foreground/[0.04]" />
                    ))}
                </div>
                {/* Dashboard panels */}
                <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-1.5 overflow-hidden">
                    {/* Mini chart */}
                    <div className="rounded bg-foreground/[0.03] p-1.5 flex flex-col justify-end">
                        <div className="flex items-end gap-px h-full">
                            {[40, 65, 30, 80, 55, 70, 45].map((h, i) => (
                                <div key={i} className="flex-1 bg-foreground/[0.06] rounded-t-sm" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                    </div>
                    {/* Notifications stack */}
                    <div className="rounded bg-foreground/[0.03] p-1.5 flex flex-col gap-1 overflow-hidden">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400/30 flex-shrink-0" />
                                <div className="h-1.5 rounded-full bg-foreground/[0.06] flex-1" />
                            </div>
                        ))}
                    </div>
                    {/* Table */}
                    <div className="rounded bg-foreground/[0.03] p-1.5 flex flex-col gap-1">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex gap-1">
                                <div className="h-1.5 w-1/3 bg-foreground/[0.06] rounded-full" />
                                <div className="h-1.5 w-1/4 bg-foreground/[0.04] rounded-full" />
                                <div className="h-1.5 w-1/5 bg-foreground/[0.04] rounded-full" />
                            </div>
                        ))}
                    </div>
                    {/* Settings */}
                    <div className="rounded bg-foreground/[0.03] p-1.5 flex flex-col gap-1">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center gap-1">
                                <div className="h-1.5 flex-1 bg-foreground/[0.06] rounded-full" />
                                <div className="w-5 h-2.5 rounded-full bg-foreground/[0.05] relative">
                                    <div className="absolute left-0.5 top-0.5 w-1.5 h-1.5 bg-foreground/10 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* More stuff */}
                    <div className="col-span-2 rounded bg-foreground/[0.03] p-1.5">
                        <div className="flex gap-1 mb-1">
                            <div className="h-1 w-8 bg-foreground/[0.06] rounded-full" />
                            <div className="h-1 w-4 bg-foreground/[0.04] rounded-full" />
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-3 bg-foreground/[0.04] rounded" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function OaaSResults() {
    const operators = [
        { title: "Sales Operator", accuracy: "96.2%", status: "active" },
        { title: "Design Operator", accuracy: "94.8%", status: "active" },
        { title: "Guard Operator", accuracy: "98.1%", status: "active" },
        { title: "Intel Operator", accuracy: "97.5%", status: "active" },
    ];

    return (
        <div className="absolute inset-0 p-4 flex flex-col">
            {/* Clean top bar */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg bg-foreground/[0.06] flex items-center justify-center">
                        <Zap size={10} className="text-foreground/40" />
                    </div>
                    <span className="text-[9px] font-black text-foreground uppercase tracking-wider">Operator Status</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-bold text-foreground/40">All operators active</span>
                </div>
            </div>

            {/* Operator accuracy items */}
            <div className="flex-1 flex flex-col gap-2.5">
                {operators.map((item, i) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.12, duration: 0.4 }}
                        className="flex items-center gap-2.5 py-2 px-2.5 rounded-xl bg-foreground/[0.02] border border-foreground/[0.05]"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <div className="text-[9px] font-bold text-foreground truncate">{item.title}</div>
                            <div className="text-[7px] font-medium text-foreground/30">Accuracy: {item.accuracy}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom summary */}
            <div className="mt-3 pt-2.5 border-t border-foreground/[0.05]">
                <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold text-foreground/30">Results → delivered to inbox</span>
                    <div className="flex items-center gap-1">
                        <Mail size={8} className="text-foreground/25" />
                        <span className="text-[7px] font-black text-foreground/30 uppercase tracking-wider">847 sent</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SaaSvsOaaS() {
    return (
        <section className="relative w-full overflow-hidden scroll-mt-24 py-28 md:py-36" id="saas-vs-oaas">
            <div className="relative z-10 mx-auto w-full px-4 sm:px-6 max-w-6xl lg:px-8">

                {/* ── Editorial Header ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 md:mb-24"
                >
                    {/* Sticky Note Badge */}
                    <motion.div
                        initial={{ opacity: 0, rotate: -8 }}
                        whileInView={{ opacity: 1, rotate: -3 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="inline-block -rotate-3 bg-primary px-4 py-2 shadow-lg text-sm font-bold text-primary-foreground mb-8 transform hover:rotate-0 transition-transform cursor-default"
                        style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.15)" }}
                    >
                        The Evolution
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="font-heading font-black tracking-tight text-foreground leading-[1.05]"
                        style={{ fontSize: "clamp(1.8rem, 5.5vw, 4.2rem)" }}
                    >
                        SaaS gave you a dashboard
                        <br />
                        and said{" "}
                        <span className="relative inline-block">
                            <span className="italic text-foreground/30">&quot;figure it out.&quot;</span>
                            <motion.span
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                                className="absolute left-0 right-0 top-1/2 h-[3px] bg-destructive/40 origin-left"
                                style={{ transform: "rotate(-1deg)" }}
                            />
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="mt-6 text-xl md:text-2xl font-heading font-black text-gradient-premium"
                    >
                        OaaS hands you results.
                    </motion.p>
                </motion.div>

                {/* ── Visual: Split Dashboard ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="mb-24 md:mb-32"
                >
                    <div className="relative max-w-4xl mx-auto">
                        {/* The visual frame */}
                        <div className="grid grid-cols-1 md:grid-cols-2 relative">

                            {/* ── LEFT: SaaS Clutter ── */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative"
                            >
                                {/* Label */}
                                <div className="flex items-center gap-2 mb-4">
                                    <LayoutDashboard size={14} className="text-foreground/20" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/20">SaaS Experience</span>
                                </div>
                                {/* SaaS "Screen" */}
                                <div
                                    className="relative h-52 md:h-64 rounded-2xl md:rounded-r-none overflow-hidden border border-foreground/[0.06]"
                                    style={{
                                        background: "rgba(0,0,0,0.015)",
                                    }}
                                >
                                    <SaaSClutter />
                                    {/* Fade overlay — feels old/obsolete */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
                                </div>
                                {/* "You" indicator */}
                                <motion.div
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute bottom-6 left-4 md:left-6 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm border border-foreground/[0.06] rounded-full px-2.5 py-1 shadow-sm"
                                >
                                    <div className="w-4 h-4 rounded-full bg-foreground/10 flex items-center justify-center">
                                        <Users size={8} className="text-foreground/40" />
                                    </div>
                                    <span className="text-[8px] font-bold text-foreground/40">You + 3 employees managing this</span>
                                </motion.div>
                            </motion.div>

                            {/* ── CENTER DIVIDER ── */}
                            <div className="hidden md:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-20 flex-col items-center justify-center">
                                {/* Vertical line */}
                                <div className="absolute top-8 bottom-8 w-px bg-foreground/[0.08]" />
                                {/* Arrow / transformation indicator */}
                                <div
                                    className="relative w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-heading font-black text-xs z-10"
                                    style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
                                >
                                    →
                                </div>
                            </div>

                            {/* Mobile divider */}
                            <div className="flex md:hidden items-center justify-center py-4">
                                <div className="h-px flex-1 bg-foreground/[0.06]" />
                                <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-heading font-black text-xs mx-3 rotate-90">
                                    →
                                </div>
                                <div className="h-px flex-1 bg-foreground/[0.06]" />
                            </div>

                            {/* ── RIGHT: OaaS Results ── */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.35 }}
                                className="relative"
                            >
                                {/* Label */}
                                <div className="flex items-center gap-2 mb-4">
                                    <FileText size={14} className="text-foreground/30" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">OaaS Experience</span>
                                </div>
                                {/* Glow behind */}
                                <div className="absolute -inset-3 bg-foreground/[0.02] rounded-3xl blur-xl pointer-events-none" />
                                {/* OaaS "Screen" */}
                                <div
                                    className="clay-card relative h-52 md:h-64 rounded-2xl md:rounded-l-none overflow-hidden border border-foreground/[0.06]"
                                >
                                    <OaaSResults />
                                </div>
                                {/* "You" indicator */}
                                <motion.div
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-6 right-4 md:right-6 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm border border-foreground/[0.06] rounded-full px-2.5 py-1 shadow-sm"
                                >
                                    <div className="w-4 h-4 rounded-full bg-green-500/10 flex items-center justify-center">
                                        <CheckCircle2 size={8} className="text-green-500" />
                                    </div>
                                    <span className="text-[8px] font-bold text-foreground/60">Results delivered to inbox</span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Paradigm Shifts ── */}
                <div className="space-y-20 md:space-y-28">
                    {shifts.map((shift, index) => (
                        <motion.div
                            key={shift.number}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.6, delay: index * 0.08 }}
                            className={`relative ${index % 2 === 1 ? "md:pl-24" : "md:pr-24"}`}
                        >
                            {/* Large background number */}
                            <span
                                className="absolute -top-4 font-heading font-black text-foreground/[0.03] select-none pointer-events-none leading-none"
                                style={{
                                    fontSize: "clamp(6rem, 12vw, 10rem)",
                                    ...(index % 2 === 1 ? { right: 0 } : { left: 0 }),
                                }}
                                aria-hidden="true"
                            >
                                {shift.number}
                            </span>

                            <div className={`relative z-10 max-w-2xl ${index % 2 === 1 ? "ml-auto" : ""} ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                                {/* The "old way" — struck through */}
                                <p className="text-foreground/25 text-lg md:text-xl font-medium mb-3 relative inline">
                                    <span className="line-through decoration-destructive/30 decoration-2">{shift.old}</span>
                                </p>

                                {/* The "new way" — bold and clear */}
                                <motion.h3
                                    initial={{ opacity: 0, x: index % 2 === 0 ? 10 : -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + index * 0.08, duration: 0.5 }}
                                    className="text-2xl md:text-3xl font-heading font-black text-foreground mt-4 mb-5 leading-snug"
                                >
                                    {shift.neu}
                                </motion.h3>

                                {/* Supporting paragraph */}
                                <p className="text-foreground/50 text-base md:text-lg font-medium leading-relaxed">
                                    {shift.body}
                                </p>

                                {/* Subtle divider after each block */}
                                {index < shifts.length - 1 && (
                                    <div className="mt-16 md:mt-20 h-px bg-foreground/[0.05]" />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ── Bottom Signature ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mt-24 md:mt-32 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
                >
                    <div className="max-w-lg">
                        <p className="text-2xl md:text-3xl font-heading font-black text-foreground leading-snug">
                            OaaS doesn&apos;t replace your tools.
                            <br />
                            <span className="text-gradient-premium">It replaces the need for a team to use them.</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-bold text-foreground/40 uppercase tracking-[0.15em]">
                            Fully autonomous · 24/7
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
