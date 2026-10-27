"use client";

import { useState, useEffect, useMemo } from "react";
import { useDashboard } from "../layout";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { userApi } from "@/lib/api";
import {
    User, Building2, Globe, Mail,
    Save, Loader2, CheckCircle2,
    Linkedin, Instagram, Facebook,
    Shield, Crown, Zap, Rocket,
    ArrowRight, Check, Sparkles,
    FileText, AtSign
} from "lucide-react";
import Link from "next/link";

const PLAN_EMAIL_LIMITS: Record<string, number> = { CORE: 3, PRIME: 5, APEX: 7 };

export default function ProfilePage() {
    const { user, userBooking, userPlan, displayName } = useDashboard();
    const emailLimit = PLAN_EMAIL_LIMITS[userPlan] || 3;

    const [form, setForm] = useState({
        companyName: "",
        companyInfo: "",
        domainName: "",
        linkedin: "",
        instagram: "",
        facebook: "",
        outputEmails: [""] as string[],
    });
    const [saving, setSaving] = useState(false);
    const [initial, setInitial] = useState("");

    useEffect(() => {
        if (userBooking) {
            const emails: string[] = [];
            for (let i = 1; i <= emailLimit; i++) {
                const key = `outputEmail${i}` as keyof typeof userBooking;
                emails.push((userBooking as any)[key] || "");
            }
            const d = {
                companyName: userBooking.companyName || "",
                companyInfo: userBooking.companyInfo || "",
                domainName: userBooking.domainName || "",
                linkedin: userBooking.linkedin || "",
                instagram: userBooking.instagram || "",
                facebook: userBooking.facebook || "",
                outputEmails: emails,
            };
            setForm(d);
            setInitial(JSON.stringify(d));
        } else if (user) {
            const emails: string[] = [user.email];
            while (emails.length < emailLimit) {
                emails.push("");
            }
            const d = {
                companyName: user.companyName || "",
                companyInfo: user.companyInfo || "",
                domainName: user.domainName || "",
                linkedin: user.linkedin || "",
                instagram: user.instagram || "",
                facebook: user.facebook || "",
                outputEmails: emails,
            };
            setForm(d);
            setInitial(JSON.stringify(d));
        }
    }, [userBooking, user, emailLimit]);

    const hasChanged = useMemo(() => JSON.stringify(form) !== initial, [form, initial]);

    const handleSave = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setSaving(true);
        try {
            const updates = {
                companyName: form.companyName,
                companyInfo: form.companyInfo,
                domainName: form.domainName,
                linkedin: form.linkedin,
                instagram: form.instagram,
                facebook: form.facebook,
                outputEmails: form.outputEmails.filter(Boolean),
            };
            await userApi.updateProfile(updates);
            toast.success("Profile saved and synced successfully!");
            setInitial(JSON.stringify(form));
        } catch (e: any) {
            toast.error(e?.message || "Failed to save profile changes.");
        }
        setSaving(false);
    };

    const getInitials = (n: string) =>
        n
            .split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

    const PlanIcon = userPlan === "APEX" ? Rocket : userPlan === "PRIME" ? Crown : Zap;
    const planColor = userPlan === "APEX" ? "#171717" : userPlan === "PRIME" ? "#525252" : "#0a0a0a";

    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto dash-scroll" style={{ background: "#f5f5f5" }}>
            {/* Top Header */}
            <header className="px-6 sm:px-8 pt-7 pb-6 shrink-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span className="text-[11px] font-semibold tracking-wider uppercase text-[#737373]">Account & Preferences</span>
                        <h1 className="text-[26px] font-semibold tracking-tight text-[#0a0a0a] mt-0.5">Company Profile</h1>
                        <p className="text-[13px] text-[#737373] mt-0.5">
                            Manage your organization details, automated dispatch recipients, and social channels
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <AnimatePresence>
                            {hasChanged && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[13px] font-medium shadow-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                                    style={{ background: "#0a0a0a" }}
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 size={15} className="animate-spin" />
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save size={15} />
                                            <span>Save Changes</span>
                                        </>
                                    )}
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>

            {/* Profile Content Body */}
            <div className="flex-1 px-6 sm:px-8 pb-12 space-y-6">
                {/* Hero Profile Banner (Apple ID Card Style) */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e5e5e5] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-white text-[22px] sm:text-[26px] font-semibold tracking-tight shrink-0 shadow-sm"
                            style={{ background: "#0a0a0a" }}
                        >
                            {getInitials(displayName)}
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#0a0a0a] tracking-tight">
                                {displayName}
                            </h2>
                            <p className="text-[13px] text-[#737373] flex items-center gap-1.5">
                                <AtSign size={13} /> {user.email}
                            </p>
                            <div className="flex items-center gap-2 pt-1">
                                <span
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider"
                                    style={{ background: `${planColor}15`, color: planColor }}
                                >
                                    <PlanIcon size={12} />
                                    <span>{userPlan} Tier</span>
                                </span>
                                <span className="inline-flex items-center gap-1 text-[11px] text-[#171717] font-medium bg-[#171717]/10 px-2.5 py-0.5 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
                                    Active Account
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="sm:text-right border-t sm:border-t-0 pt-4 sm:pt-0 border-[#efefef]">
                        <p className="text-[11px] text-[#737373] font-medium uppercase tracking-wider">Account ID</p>
                        <p className="text-[13px] font-mono text-[#0a0a0a] mt-0.5 font-medium">
                            {user.id ? user.id.slice(0, 14) : "SOLO-USR-01"}
                        </p>
                        <p className="text-[11px] text-[#737373] mt-1">Autonomous Cluster #4</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Organization & Social Info */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Company Details */}
                        <div className="bg-white rounded-2xl p-6 border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
                            <div className="flex items-center gap-2.5 pb-2 border-b border-[#efefef]">
                                <div className="w-8 h-8 rounded-xl bg-[#0a0a0a]/10 text-[#0a0a0a] flex items-center justify-center">
                                    <Building2 size={16} />
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-semibold text-[#0a0a0a]">Organization Details</h3>
                                    <p className="text-[11px] text-[#737373]">Public branding and contextual company profile</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1.5">
                                        Company / Brand Name
                                    </label>
                                    <input
                                        type="text"
                                        value={form.companyName}
                                        onChange={(e) => setForm(p => ({ ...p, companyName: e.target.value }))}
                                        placeholder="e.g. Acme Technologies"
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-4 focus:ring-[#0a0a0a]/10 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1.5">
                                        Primary Website Domain
                                    </label>
                                    <div className="relative">
                                        <Globe size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373]" />
                                        <input
                                            type="text"
                                            value={form.domainName}
                                            onChange={(e) => setForm(p => ({ ...p, domainName: e.target.value }))}
                                            placeholder="acme.com"
                                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-4 focus:ring-[#0a0a0a]/10 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1.5">
                                    Company Mission & Offering Summary
                                </label>
                                <textarea
                                    rows={4}
                                    value={form.companyInfo}
                                    onChange={(e) => setForm(p => ({ ...p, companyInfo: e.target.value }))}
                                    placeholder="Provide a clear description of your product, value proposition, and customer target. Operators consult this when generating sales copy and outreach..."
                                    className="w-full px-4 py-3 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-4 focus:ring-[#0a0a0a]/10 transition-all resize-none"
                                />
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-white rounded-2xl p-6 border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
                            <div className="flex items-center gap-2.5 pb-2 border-b border-[#efefef]">
                                <div className="w-8 h-8 rounded-xl bg-[#737373]/10 text-[#737373] flex items-center justify-center">
                                    <Sparkles size={16} />
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-semibold text-[#0a0a0a]">Social Media Channels</h3>
                                    <p className="text-[11px] text-[#737373]">Operators monitor these channels for engagement and competitor intelligence</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1.5">
                                        <Linkedin size={13} className="text-[#404040]" /> LinkedIn Company URL
                                    </label>
                                    <input
                                        type="text"
                                        value={form.linkedin}
                                        onChange={(e) => setForm(p => ({ ...p, linkedin: e.target.value }))}
                                        placeholder="https://linkedin.com/company/your-brand"
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-4 focus:ring-[#0a0a0a]/10 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1.5">
                                        <Instagram size={13} className="text-[#404040]" /> Instagram Profile URL
                                    </label>
                                    <input
                                        type="text"
                                        value={form.instagram}
                                        onChange={(e) => setForm(p => ({ ...p, instagram: e.target.value }))}
                                        placeholder="https://instagram.com/your-brand"
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-4 focus:ring-[#0a0a0a]/10 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1.5">
                                        <Facebook size={13} className="text-[#404040]" /> Facebook Page URL
                                    </label>
                                    <input
                                        type="text"
                                        value={form.facebook}
                                        onChange={(e) => setForm(p => ({ ...p, facebook: e.target.value }))}
                                        placeholder="https://facebook.com/your-brand"
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-4 focus:ring-[#0a0a0a]/10 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Output Dispatch & Plan Status */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Output Recipient Emails */}
                        <div className="bg-white rounded-2xl p-6 border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b border-[#efefef]">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-xl bg-[#171717]/10 text-[#171717] flex items-center justify-center">
                                        <Mail size={16} />
                                    </div>
                                    <div>
                                        <h3 className="text-[14px] font-semibold text-[#0a0a0a]">Dispatch Recipients</h3>
                                        <p className="text-[11px] text-[#737373]">Where daily leads & briefings are sent</p>
                                    </div>
                                </div>

                                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f5f5f5] text-[#737373] border border-[#e5e5e5]">
                                    {emailLimit} Max ({userPlan})
                                </span>
                            </div>

                            <p className="text-[12px] text-[#737373] leading-relaxed">
                                SoloChief automated operators will email daily lead lists, weekly creative briefs, and performance dashboards to these recipients.
                            </p>

                            <div className="space-y-3">
                                {form.outputEmails.map((email, i) => (
                                    <div key={i}>
                                        <div className="flex items-center justify-between text-[11px] font-medium text-[#737373] mb-1">
                                            <span>Recipient {i + 1} {i === 0 && "(Primary Dispatch)"}</span>
                                            {i === 0 && <span className="text-[#0a0a0a] font-semibold text-[10px]">REQUIRED</span>}
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                const updated = [...form.outputEmails];
                                                updated[i] = e.target.value;
                                                setForm(p => ({ ...p, outputEmails: updated }));
                                            }}
                                            placeholder={`recipient-${i + 1}@yourcompany.com`}
                                            className="w-full px-4 py-2 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-4 focus:ring-[#0a0a0a]/10 transition-all"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Plan & Subscription Card */}
                        <div className="bg-white rounded-2xl p-6 border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#737373]">
                                    Subscription Tier
                                </span>
                                <span
                                    className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                                    style={{ background: `${planColor}15`, color: planColor }}
                                >
                                    {userPlan} Active
                                </span>
                            </div>

                            <div className="flex items-baseline gap-2">
                                <span className="text-[28px] font-bold text-[#0a0a0a] tracking-tight">{userPlan}</span>
                                <span className="text-[13px] text-[#737373]">Plan Membership</span>
                            </div>

                            <p className="text-[12px] text-[#737373] leading-relaxed">
                                {userPlan === "APEX"
                                    ? "Full autonomous deployment. All 10 operators active with real-time tuning, custom integrations, and SLA guarantees."
                                    : userPlan === "PRIME"
                                    ? "8 automated operators including SCOOP market intelligence and BASE custom automations."
                                    : "6 core operators active for lead generation, content design, and infrastructure monitoring."}
                            </p>

                            {userPlan !== "APEX" ? (
                                <Link
                                    href="/pricing"
                                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-white text-[13px] font-medium transition-all hover:opacity-90 shadow-sm"
                                    style={{ background: "#0a0a0a" }}
                                >
                                    <span>Upgrade to APEX</span>
                                    <ArrowRight size={14} />
                                </Link>
                            ) : (
                                <div className="p-3 rounded-xl bg-[#171717]/10 border border-[#171717]/20 flex items-center gap-2 text-[12px] text-[#171717] font-medium">
                                    <CheckCircle2 size={16} />
                                    <span>Highest tier unlocked with maximum throughput</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
