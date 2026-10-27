"use client";

import { motion } from "framer-motion";
import {
    Bot,
    Globe,
    Workflow,
    Users,
    Sparkles,
    Zap,
    Target,
    Shield,
    Cpu,
    CheckCircle2,
    ArrowRight,
    Activity,
    TrendingUp,
    Clock,
    Send,
    Mail,
} from "lucide-react";

/* ────────────────────────────────────────────
   VISUAL: OaaS Command Center
   A premium miniature dashboard that shows
   the operator ecosystem in action — live
   activity feed, operator status cards, and
   a real-time metrics bar.
   ──────────────────────────────────────────── */

function OperatorStatusCard({
    name,
    icon: Icon,
    status,
    task,
    metric,
    delay,
}: {
    name: string;
    icon: React.ElementType;
    status: "active" | "processing";
    task: string;
    metric: string;
    delay: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.4 }}
            className="flex items-center gap-2.5 p-2 rounded-xl bg-foreground/[0.02] border border-foreground/[0.05] hover:bg-foreground/[0.04] transition-colors duration-300 group"
        >
            {/* Operator avatar */}
            <div className="relative w-8 h-8 rounded-lg bg-foreground/[0.05] flex items-center justify-center flex-shrink-0 group-hover:bg-foreground/[0.08] transition-colors border border-foreground/[0.06]">
                <Icon size={14} className="text-foreground/50" />
                {/* Status dot */}
                <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-background ${status === "active" ? "bg-green-500" : "bg-amber-400"}`}>
                    {status === "active" && (
                        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-40" />
                    )}
                </div>
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-foreground uppercase tracking-wider">{name}</span>
                    <span className="text-[7px] font-bold text-foreground/30">{metric}</span>
                </div>
                <div className="text-[8px] font-medium text-foreground/35 truncate mt-0.5">{task}</div>
            </div>
        </motion.div>
    );
}

function OutputDeliveryLog() {
    const deliveries = [
        { text: "Sales report sent to you@company.com", time: "Just now", icon: Mail },
        { text: "Design assets delivered to inbox", time: "4m ago", icon: Mail },
        { text: "Reputation summary emailed", time: "12m ago", icon: Mail },
        { text: "Competitor intel report delivered", time: "28m ago", icon: Mail },
        { text: "Weekly performance digest sent", time: "1h ago", icon: Send },
    ];

    return (
        <div className="flex flex-col gap-1">
            {deliveries.map((delivery, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.35 }}
                    className="flex items-start gap-1.5 py-1"
                >
                    <div className="w-3.5 h-3.5 rounded flex items-center justify-center bg-foreground/[0.04] flex-shrink-0 mt-0.5">
                        <delivery.icon size={7} className="text-foreground/30" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <span className="text-[7.5px] font-medium text-foreground/50 leading-tight block truncate">{delivery.text}</span>
                    </div>
                    <span className="text-[6.5px] font-bold text-foreground/20 flex-shrink-0 whitespace-nowrap">{delivery.time}</span>
                </motion.div>
            ))}
        </div>
    );
}

function OaaSCommandCenter() {
    return (
        <div className="relative w-full h-full">
            {/* Glow effect behind the card */}
            <div className="absolute -inset-4 bg-foreground/[0.02] rounded-3xl blur-2xl pointer-events-none" />

            {/* Main card */}
            <div className="clay-card relative w-full h-full rounded-2xl overflow-hidden border border-foreground/[0.06] flex flex-col">
                {/* ── Top bar ── */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/[0.05]">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-400/40" />
                        <div className="w-2 h-2 rounded-full bg-yellow-400/40" />
                        <div className="w-2 h-2 rounded-full bg-green-400/40" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[7px] font-black text-foreground/30 uppercase tracking-wider">Live</span>
                        </div>
                        <div className="px-2 py-0.5 rounded bg-foreground/[0.04] border border-foreground/[0.06]">
                            <span className="text-[7px] font-black text-foreground/40 uppercase tracking-wider">Command Center</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={8} className="text-foreground/20" />
                        <span className="text-[7px] font-medium text-foreground/20">24/7</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row flex-1 min-h-0">
                    {/* ── Left panel: Operator statuses ── */}
                    <div className="w-full md:w-[55%] p-3 flex flex-col border-b md:border-b-0 md:border-r border-foreground/[0.04] overflow-hidden">
                        {/* Mini heading */}
                        <div className="flex items-center justify-between mb-2.5">
                            <div className="flex items-center gap-1.5">
                                <Activity size={9} className="text-foreground/30" />
                                <span className="text-[8px] font-black text-foreground/40 uppercase tracking-wider">Active Operators</span>
                            </div>
                            <span className="text-[7px] font-bold text-foreground/40 bg-foreground/[0.04] px-1.5 py-0.5 rounded-full">4 online</span>
                        </div>

                        {/* Operator cards */}
                        <div className="flex flex-col gap-1.5 flex-1">
                            <OperatorStatusCard
                                name="Sales"
                                icon={Target}
                                status="active"
                                task="Prospecting B2B SaaS leads in US market"
                                metric="96.2% acc."
                                delay={0.3}
                            />
                            <OperatorStatusCard
                                name="Design"
                                icon={Sparkles}
                                status="active"
                                task="Generating social media ad creatives"
                                metric="94.8% acc."
                                delay={0.38}
                            />
                            <OperatorStatusCard
                                name="Guard"
                                icon={Shield}
                                status="processing"
                                task="Monitoring and responding to reviews"
                                metric="98.1% acc."
                                delay={0.46}
                            />
                            <OperatorStatusCard
                                name="Intel"
                                icon={Cpu}
                                status="active"
                                task="Tracking competitor pricing changes"
                                metric="97.5% acc."
                                delay={0.54}
                            />
                        </div>

                        {/* Metrics strip at bottom */}
                        <div className="mt-2.5 pt-2 border-t border-foreground/[0.04]">
                            <div className="grid grid-cols-3 gap-2">
                                <div className="text-center">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.7, duration: 0.3 }}
                                    >
                                        <div className="text-[11px] font-black text-foreground">96.7%</div>
                                        <div className="text-[6.5px] font-bold text-foreground/25 uppercase tracking-wider">Avg Accuracy</div>
                                    </motion.div>
                                </div>
                                <div className="text-center">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.75, duration: 0.3 }}
                                    >
                                        <div className="text-[11px] font-black text-foreground">99.8%</div>
                                        <div className="text-[6.5px] font-bold text-foreground/25 uppercase tracking-wider">Uptime</div>
                                    </motion.div>
                                </div>
                                <div className="text-center">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.8, duration: 0.3 }}
                                    >
                                        <div className="text-[11px] font-black text-foreground flex items-center justify-center gap-0.5">
                                            <Mail size={8} className="text-foreground/40" />
                                            847
                                        </div>
                                        <div className="text-[6.5px] font-bold text-foreground/25 uppercase tracking-wider">Delivered</div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Right panel: Activity feed ── */}
                    <div className="w-full md:w-[45%] p-3 flex flex-col bg-foreground/[0.01]">
                        <div className="flex items-center gap-1.5 mb-2.5">
                            <Mail size={9} className="text-foreground/30" />
                            <span className="text-[8px] font-black text-foreground/40 uppercase tracking-wider">Output Delivery</span>
                        </div>

                        <OutputDeliveryLog />

                        {/* Mini progress visualization */}
                        <div className="mt-auto pt-2.5 border-t border-foreground/[0.04]">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[7px] font-bold text-foreground/25">Overall Accuracy</span>
                                <span className="text-[7px] font-black text-foreground/50">96.7%</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-foreground/[0.04] overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "96.7%" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                                    className="h-full rounded-full bg-gradient-to-r from-foreground/20 to-foreground/50"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Floating badges around the dashboard ── */}

            {/* Top-right: live notification */}
            <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-2 z-20"
            >
                <div className="flex items-center gap-1.5 bg-background/95 backdrop-blur-sm border border-foreground/[0.06] rounded-full px-2.5 py-1.5 shadow-lg">
                    <CheckCircle2 size={10} className="text-green-500" />
                    <span className="text-[8px] font-black text-foreground/60">All systems operational</span>
                </div>
            </motion.div>

            {/* Bottom-left: time saved badge */}
            <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute -bottom-2 -left-2 z-20"
            >
                <div className="flex items-center gap-1.5 bg-foreground text-background rounded-full px-3 py-1.5 shadow-xl border border-foreground/80">
                    <Mail size={10} />
                    <span className="text-[8px] font-black uppercase tracking-wider">Results → your inbox</span>
                </div>
            </motion.div>

            {/* Left side: zero employees badge */}
            <motion.div
                animate={{ x: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute top-1/2 -translate-y-1/2 -left-4 z-20 hidden lg:block"
            >
                <div className="flex items-center gap-1.5 bg-background/95 backdrop-blur-sm border border-foreground/[0.06] rounded-full px-2.5 py-1.5 shadow-md">
                    <Users size={10} className="text-foreground/40" />
                    <span className="text-[8px] font-bold text-foreground/40">0 employees needed</span>
                </div>
            </motion.div>
        </div>
    );
}

export function WhatIsOaaS() {
    return (
        <section className="relative w-full overflow-hidden scroll-mt-24 py-20" id="what-is-oaas">
            {/* Background handled globally */}

            <div className="relative z-10 mx-auto grid w-full items-center gap-12 px-4 sm:px-6 lg:gap-16 lg:grid-cols-2 max-w-7xl lg:px-8">
                {/* Visual - Left Side: OaaS Command Center Dashboard */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="order-2 flex w-full items-center justify-center lg:order-1 py-4 sm:py-8"
                >
                    <div className="relative w-full max-w-lg aspect-[4/3] sm:aspect-auto sm:h-[420px]">
                        <OaaSCommandCenter />
                    </div>
                </motion.div>

                {/* Text Content - Right Side */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.15 }}
                    className="order-1 flex flex-col items-start text-left lg:order-2"
                >
                    {/* Sticky Note */}
                    <motion.div
                        initial={{ opacity: 0, rotate: 8 }}
                        whileInView={{ opacity: 1, rotate: 3 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.02, duration: 0.1 }}
                        className="rotate-3 bg-foreground px-4 py-2 shadow-lg text-sm font-bold text-background mb-6 transform hover:rotate-0 transition-transform cursor-default inline-block"
                        style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.15)" }}
                    >
                        Revolutionary Model
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05, duration: 0.15 }}
                        className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-foreground mb-6 leading-tight"
                    >
                        What is <span className="text-gradient-premium">OaaS</span>
                        <span className="text-foreground/40">?</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08, duration: 0.15 }}
                        className="max-w-xl text-lg leading-relaxed text-foreground/70 font-medium"
                    >
                        <span className="font-bold text-foreground">Operations-as-a-Service (OaaS)</span> is a paradigm shift from traditional SaaS. Instead of giving you software you must learn and operate yourself, OaaS deploys <span className="font-bold text-foreground">autonomous AI operators</span> that actually <em>execute</em> your daily operations for you — 24/7, with zero management overhead.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.15 }}
                        className="mt-8 space-y-4"
                    >
                        <h3 className="text-lg font-bold text-foreground">HOW IT WORKS:</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <Users size={24} className="text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-foreground font-bold">You Define the Mission</p>
                                    <p className="text-foreground/60 text-sm font-medium">Tell us your business goals. We calibrate specialized operators to match.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <Bot size={24} className="text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-foreground font-bold">We Deploy Operators</p>
                                    <p className="text-foreground/60 text-sm font-medium">AI agents—your Sales, Design, and Reputation operators—start executing immediately.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <Workflow size={24} className="text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-foreground font-bold">They Operate Autonomously</p>
                                    <p className="text-foreground/60 text-sm font-medium">No babysitting. No dashboards to check. They do the work and deliver results daily.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <Globe size={24} className="text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-foreground font-bold">You Scale Without Headcount</p>
                                    <p className="text-foreground/60 text-sm font-medium">Grow your output 10x without hiring a single employee. That&apos;s the OaaS promise.</p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.12, duration: 0.15 }}
                        className="mt-8"
                    >
                        <div className="flex items-start gap-4">
                            <Sparkles size={24} className="text-primary flex-shrink-0" />
                            <div>
                                <p className="text-sm font-bold text-primary">SoloChief is the world&apos;s first OaaS platform</p>
                                <p className="text-xs text-primary/70 font-medium mt-0.5">We don&apos;t sell software. We deploy a workforce. Your workforce.</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
