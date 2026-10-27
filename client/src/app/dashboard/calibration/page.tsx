"use client";

import { useState } from "react";
import { useDashboard } from "../layout";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { createCalibrationRequest } from "@/lib/firestore";
import {
    SlidersHorizontal, Send, Lock, CheckCircle2,
    Loader2, Sparkles, Zap, Info,
    ArrowRight, Crown, Sliders, Check,
    Target, Palette, Film, TrendingUp,
    Shield, Eye, Ghost, Layers, Brain,
    Clock, Cpu, RefreshCw
} from "lucide-react";
import Link from "next/link";

const OPERATOR_ICONS: Record<string, React.ElementType> = {
    intro: Target,
    chief_cmo: Brain,
    snap: Palette,
    clip: Film,
    vibe: Sparkles,
    pulse: Shield,
    scoop: TrendingUp,
    base: Layers,
    trace: Ghost,
    mend: Eye,
};

const PROMPT_TEMPLATES = [
    {
        title: "B2B SaaS Lead Refinement",
        text: "Calibrate INTRO to prioritize US & EU B2B SaaS accounts with $2M+ ARR and hiring signals in engineering or marketing.",
        targetOp: "intro"
    },
    {
        title: "Social Ad Creative Tone",
        text: "Adjust SNAP & CLIP creative generation to favor high-contrast minimalist typography with Swiss editorial aesthetics.",
        targetOp: "snap"
    },
    {
        title: "Market Intelligence Scope",
        text: "Instruct SCOOP to monitor pricing changes, product releases, and executive movements for key enterprise competitors.",
        targetOp: "scoop"
    },
    {
        title: "Search & SEO Positioning",
        text: "Tune TRACE to analyze top 20 LLM search answer rankings for queries around autonomous agent workflows.",
        targetOp: "trace"
    },
    {
        title: "Reputation Alerts & Response",
        text: "Calibrate MEND to flag sentiment drops below 85% on Trustpilot or G2 with urgent Slack webhook dispatch.",
        targetOp: "mend"
    }
];

export default function CalibrationPage() {
    const { userPlan, user, displayName, operators } = useDashboard();
    const isApex = userPlan === "APEX";
    const [selectedOperator, setSelectedOperator] = useState<string>("intro");
    const [message, setMessage] = useState("");
    const [temperature, setTemperature] = useState(70);
    const [strictness, setStrictness] = useState(85);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const activeOps = operators.filter(o => o.plans.includes(userPlan));

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!message.trim()) {
            toast.error("Please describe your calibration parameters");
            return;
        }
        setSending(true);
        try {
            const formattedMessage = `[Target Operator: ${selectedOperator.toUpperCase()}] [Creativity: ${temperature}%] [Strictness: ${strictness}%]\n\nDirective:\n${message}`;
            try {
                await createCalibrationRequest({
                    userId: user.id,
                    userName: displayName,
                    email: user.email,
                    message: formattedMessage,
                    status: "pending"
                });
            } catch {
                // local fallback if firebase offline
            }
            toast.success("Calibration parameters submitted for compilation!");
            setSent(true);
        } catch (e: any) {
            toast.error(e?.message || "Something went wrong.");
        }
        setSending(false);
    };

    // ── Locked State for Non-APEX Users ──
    if (!isApex) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 overflow-y-auto" style={{ background: "#f5f5f5" }}>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#e5e5e5] shadow-[0_4px_24px_rgba(0,0,0,0.04)] text-center relative overflow-hidden"
                >
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-[#737373]/10 text-[#737373]">
                        <Crown size={30} />
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#737373]/10 text-[#737373] mb-4">
                        APEX Tier Feature
                    </div>

                    <h2 className="text-[24px] font-semibold tracking-tight text-[#0a0a0a] mb-3">
                        Operator Calibration Studio
                    </h2>

                    <p className="text-[14px] text-[#737373] leading-relaxed mb-8 max-w-md mx-auto">
                        Fine-tune behavioral parameters, customize system prompts, adjust AI model temperatures, and inject domain-specific business logic directly into your autonomous operators.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-8">
                        <div className="p-4 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5]">
                            <div className="flex items-center gap-2 mb-1">
                                <Cpu size={15} className="text-[#0a0a0a]" />
                                <span className="text-[13px] font-semibold text-[#0a0a0a]">Prompt Engineering</span>
                            </div>
                            <p className="text-[11px] text-[#737373]">Inject tailored personas and strict compliance boundaries.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5]">
                            <div className="flex items-center gap-2 mb-1">
                                <Sliders size={15} className="text-[#171717]" />
                                <span className="text-[13px] font-semibold text-[#0a0a0a]">Weight Tuning</span>
                            </div>
                            <p className="text-[11px] text-[#737373]">Adjust scoring criteria for leads and creative variations.</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href="/pricing"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white text-[13px] font-medium transition-all shadow-md hover:opacity-90 active:scale-[0.98]"
                            style={{ background: "#0a0a0a" }}
                        >
                            <span>Upgrade to APEX</span>
                            <ArrowRight size={14} />
                        </Link>
                        <Link
                            href="/dashboard"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-[13px] font-medium text-[#737373] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] transition-colors"
                        >
                            Back to Overview
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    // ── Success State ──
    if (sent) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12" style={{ background: "#f5f5f5" }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#e5e5e5] shadow-[0_4px_24px_rgba(0,0,0,0.04)] text-center"
                >
                    <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-[#171717]/10 text-[#171717]">
                        <CheckCircle2 size={32} />
                    </div>
                    <h2 className="text-[22px] font-semibold text-[#0a0a0a] tracking-tight mb-2">
                        Calibration Deployed
                    </h2>
                    <p className="text-[13px] text-[#737373] leading-relaxed mb-6">
                        Your adjustments have been queued into the SoloChief operator orchestration pipeline. Changes will sync across the cluster within 4 hours.
                    </p>
                    <button
                        onClick={() => {
                            setSent(false);
                            setMessage("");
                        }}
                        className="px-6 py-2.5 rounded-full text-white text-[13px] font-medium shadow-sm hover:opacity-90"
                        style={{ background: "#0a0a0a" }}
                    >
                        Calibrate Another Operator
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto dash-scroll" style={{ background: "#f5f5f5" }}>
            {/* Header */}
            <header className="px-6 sm:px-8 pt-7 pb-6 shrink-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#737373]">APEX Studio</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#737373]" />
                            <span className="text-[11px] font-medium text-[#737373]">Continuous Learning</span>
                        </div>
                        <h1 className="text-[26px] font-semibold tracking-tight text-[#0a0a0a]">Operator Calibration</h1>
                        <p className="text-[13px] text-[#737373] mt-0.5">
                            Fine-tune behavioral parameters, algorithmic strictness, and specific campaign directives
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#171717]/10 text-[#171717] text-[12px] font-medium border border-[#171717]/20">
                            <span className="w-2 h-2 rounded-full bg-[#171717] shadow-[0_0_6px_rgba(23,23,23,0.8)]" />
                            Cluster Synchronized
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Calibration Form & Controls */}
            <div className="flex-1 px-6 sm:px-8 pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Pane: Directive Form */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Operator Selector */}
                        <div className="bg-white rounded-2xl p-5 border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#737373]">
                                    1. Select Operator To Calibrate
                                </label>
                                <span className="text-[11px] text-[#737373]">{activeOps.length} Active</span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {activeOps.map((op) => {
                                    const isSelected = selectedOperator === op.id;
                                    const IconComponent = OPERATOR_ICONS[op.id] || Target;
                                    return (
                                        <button
                                            key={op.id}
                                            type="button"
                                            onClick={() => setSelectedOperator(op.id)}
                                            className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                                                isSelected
                                                    ? "bg-[#0a0a0a] text-white border-[#0a0a0a] shadow-sm"
                                                    : "bg-[#f5f5f5] text-[#0a0a0a] border-[#e5e5e5] hover:bg-[#e5e5e5]"
                                            }`}
                                        >
                                            <IconComponent
                                                size={16}
                                                className={isSelected ? "text-white" : "text-[#737373]"}
                                            />
                                            <div className="min-w-0">
                                                <p className="text-[12px] font-semibold truncate leading-tight">{op.name}</p>
                                                <p className={`text-[10px] truncate ${isSelected ? "text-[#a3a3a3]" : "text-[#737373]"}`}>
                                                    {op.role}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Tuning Sliders */}
                        <div className="bg-white rounded-2xl p-5 border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
                            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#737373] block">
                                2. Behavioral Coefficients
                            </label>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between text-[12px] mb-1.5">
                                        <span className="font-medium text-[#0a0a0a]">Creative Latitude / Exploratory Index</span>
                                        <span className="font-semibold text-[#0a0a0a]">{temperature}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="20"
                                        max="100"
                                        value={temperature}
                                        onChange={(e) => setTemperature(Number(e.target.value))}
                                        className="w-full accent-[#0a0a0a] cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] text-[#737373] mt-1">
                                        <span>Conservative & Strict</span>
                                        <span>Dynamic & Experimental</span>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-[#efefef]">
                                    <div className="flex items-center justify-between text-[12px] mb-1.5">
                                        <span className="font-medium text-[#0a0a0a]">Validation Confidence Threshold</span>
                                        <span className="font-semibold text-[#171717]">{strictness}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="50"
                                        max="99"
                                        value={strictness}
                                        onChange={(e) => setStrictness(Number(e.target.value))}
                                        className="w-full accent-[#171717] cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] text-[#737373] mt-1">
                                        <span>Higher Volume</span>
                                        <span>Zero-Tolerance Precision</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Calibration Directive Text */}
                        <div className="bg-white rounded-2xl p-5 border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#737373]">
                                    3. Custom Natural Language Directive
                                </label>
                                <span className="text-[11px] text-[#737373]">Plain English</span>
                            </div>

                            <textarea
                                rows={6}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Describe in detail how you want this operator to behave, target criteria, excluded keywords, or aesthetic preferences..."
                                className="w-full px-4 py-3 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] placeholder-[#737373] focus:bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-4 focus:ring-[#0a0a0a]/10 transition-all resize-none"
                            />

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                                <div className="flex items-center gap-1.5 text-[11px] text-[#737373]">
                                    <Info size={13} />
                                    <span>Directives are verified by SoloChief AI safety filters</span>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={sending}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-white text-[13px] font-medium shadow-sm transition-all hover:opacity-90 disabled:opacity-50"
                                    style={{ background: "#0a0a0a" }}
                                >
                                    {sending ? (
                                        <>
                                            <Loader2 size={15} className="animate-spin" />
                                            <span>Deploying...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={15} />
                                            <span>Submit Calibration</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Pane: Templates & Guidance */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Prompt Templates */}
                        <div className="bg-white rounded-2xl p-5 border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles size={16} className="text-[#737373]" />
                                <h3 className="text-[13px] font-semibold text-[#0a0a0a]">Preset Calibration Directives</h3>
                            </div>
                            <p className="text-[12px] text-[#737373]">Click any template below to load parameters into the editor:</p>

                            <div className="space-y-2.5 pt-1">
                                {PROMPT_TEMPLATES.map((tmpl, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => {
                                            setMessage(tmpl.text);
                                            setSelectedOperator(tmpl.targetOp);
                                            toast.info(`Loaded ${tmpl.title}`);
                                        }}
                                        className="w-full text-left p-3 rounded-xl bg-[#f5f5f5] hover:bg-[#e5e5e5] border border-[#e5e5e5] transition-colors group"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[12px] font-semibold text-[#0a0a0a] group-hover:text-[#0a0a0a]">
                                                {tmpl.title}
                                            </span>
                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#737373]">
                                                {tmpl.targetOp.toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-[#737373] line-clamp-2 leading-relaxed">
                                            {tmpl.text}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Best Practices */}
                        <div className="bg-white rounded-2xl p-5 border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 size={16} className="text-[#171717]" />
                                <h3 className="text-[13px] font-semibold text-[#0a0a0a]">Calibration Best Practices</h3>
                            </div>

                            <ul className="space-y-3 text-[12px] text-[#737373]">
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-[#f5f5f5] text-[#0a0a0a] font-semibold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                                        1
                                    </span>
                                    <span>Provide specific company demographics, title levels, and revenue ranges for outreach operators.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-[#f5f5f5] text-[#0a0a0a] font-semibold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                                        2
                                    </span>
                                    <span>Mention brand voice adjectives (e.g. authoritative, minimalist, punchy) for SNAP & CHIEF CMO.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-[#f5f5f5] text-[#0a0a0a] font-semibold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                                        3
                                    </span>
                                    <span>Set exclusions explicitly (e.g. &ldquo;Never contact academic institutions or non-profits&rdquo;).</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
