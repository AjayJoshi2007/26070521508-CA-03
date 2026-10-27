"use client";

import { SoloChiefLogo } from "@/components/SoloChiefLogo";
import { AnimatedSoloChiefLogo } from "@/components/AnimatedSoloChiefLogo";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import type { User as AppUser } from "@/contexts/AuthContext";
import type {
    BookingData,
    OperatorMetrics,
    DailyOutput,
    SystemHealthMetrics,
    OperatorEfficiencyScore,
} from "@/lib/firestore";
import { motion } from "framer-motion";
import {
    Activity,
    MessageSquarePlus,
    SlidersHorizontal,
    LogOut,
    User,
    Target,
    Palette,
    Film,
    TrendingUp,
    Eye,
    Shield,
    Loader2,
    Zap,
    Crown,
    Rocket,
    Clock,
    CheckCircle2,
    Sparkles,
    ArrowRight,
    Cog,
    Radio,
    Lock,
    Music,
    Brain,
    Ghost,
    Layers,
    X,
    Menu,
} from "lucide-react";
import Link from "next/link";

// ============================================
// OPERATOR DEFINITIONS PER PLAN
// ============================================

const ALL_OPERATORS = [
    { id: "intro", name: "INTRO", role: "Lead Generation", icon: Target, frequency: "Daily", plans: ["CORE", "PRIME", "APEX"] },
    { id: "chief_cmo", name: "CHIEF CMO", role: "Social Content Strategist", icon: Brain, frequency: "Weekly", plans: ["CORE", "PRIME", "APEX"] },
    { id: "snap", name: "SNAP", role: "Ad Design", icon: Palette, frequency: "Daily", plans: ["CORE", "PRIME", "APEX"] },
    { id: "clip", name: "CLIP", role: "Video Production", icon: Film, frequency: "Weekly", plans: ["CORE", "PRIME", "APEX"] },
    { id: "vibe", name: "VIBE", role: "Poetics & Audio Ads", icon: Music, frequency: "Weekly", plans: ["CORE", "PRIME", "APEX"] },
    { id: "pulse", name: "PULSE", role: "Domain Infrastructure", icon: Shield, frequency: "24/7", plans: ["CORE", "PRIME", "APEX"] },
    { id: "scoop", name: "SCOOP", role: "Market Intelligence", icon: TrendingUp, frequency: "24/7", plans: ["PRIME", "APEX"] },
    { id: "base", name: "BASE", role: "Automated Routine", icon: Layers, frequency: "Scheduled", plans: ["PRIME", "APEX"] },
    { id: "trace", name: "TRACE", role: "SEO & AI Search", icon: Ghost, frequency: "24/7", plans: ["APEX"] },
    { id: "mend", name: "MEND", role: "Reputation Management", icon: Eye, frequency: "Real-Time", plans: ["APEX"] },
];

const PLAN_ICONS: Record<string, React.ElementType> = { CORE: Zap, PRIME: Crown, APEX: Rocket };
const PLAN_COLORS: Record<string, string> = { CORE: "#0a0a0a", PRIME: "#525252", APEX: "#171717" };

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, loading: authLoading, signOut } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Derive plan and booking status from the MongoDB-backed user object
    const userPlan = (user?.plan || "CORE") as "CORE" | "PRIME" | "APEX";
    const planLoading = authLoading;
    const isSetupComplete = (user?.bookingStatus ?? "active") === "active";

    useEffect(() => {
        if (!authLoading && !user) router.replace("/login");
    }, [user, authLoading, router]);

    const handleSignOut = async () => { try { await signOut(); } catch (e) { console.error(e); } };

    const userBooking: BookingData | null = user ? {
        id: user.id,
        userId: user.id,
        fullName: user.fullName || "User",
        email: user.email,
        companyName: user.companyName || "SoloChief Co",
        sector: user.sector || "Technology",
        companyInfo: user.companyInfo || "Autonomous AI operations",
        domainName: user.domainName || "solochief.com",
        linkedin: user.linkedin || "",
        instagram: user.instagram || "",
        facebook: user.facebook || "",
        plan: userPlan,
        outputEmail1: user.outputEmails?.[0] || user.email,
        outputEmail2: user.outputEmails?.[1] || "",
        outputEmail3: user.outputEmails?.[2] || "",
        outputEmail4: user.outputEmails?.[3] || "",
        outputEmail5: user.outputEmails?.[4] || "",
        status: isSetupComplete ? "active" : "pending",
    } : null;

    const displayName = user?.fullName || user?.user_metadata?.full_name || "User";

    const [firebaseMetrics] = useState<OperatorMetrics[]>([
        { operatorId: 'intro', operatorName: 'INTRO', role: 'Lead Generation', frequency: 'Daily', tasksToday: 67, successRate: 94, uptime: 99.9, status: 'active', userId: user?.id || "" },
        { operatorId: 'snap', operatorName: 'SNAP', role: 'Ad Design', frequency: 'Daily', tasksToday: 5, successRate: 98, uptime: 99.8, status: 'active', userId: user?.id || "" },
        { operatorId: 'clip', operatorName: 'CLIP', role: 'Video Production', frequency: 'Weekly', tasksToday: 1, successRate: 96, uptime: 99.7, status: 'active', userId: user?.id || "" },
        { operatorId: 'scoop', operatorName: 'SCOOP', role: 'Market Intelligence', frequency: '24/7', tasksToday: 12, successRate: 91, uptime: 99.9, status: 'active', userId: user?.id || "" },
        { operatorId: 'mend', operatorName: 'MEND', role: 'Reputation Management', frequency: 'Real-Time', tasksToday: 3, successRate: 97, uptime: 99.6, status: 'active', userId: user?.id || "" },
        { operatorId: 'pulse', operatorName: 'PULSE', role: 'Domain Infrastructure', frequency: '24/7', tasksToday: 8, successRate: 99, uptime: 99.99, status: 'active', userId: user?.id || "" },
    ]);
    const [dailyOutputs] = useState<DailyOutput[]>([
        { id: "1", userId: user?.id || "", date: new Date().toISOString().split("T")[0], operatorId: "intro", operatorName: "INTRO", outputType: "leads", outputCount: 42, accuracy: 96, status: "completed", items: [{ label: "Email Leads", count: 42, detail: "Verified email contacts sourced" }] },
        { id: "2", userId: user?.id || "", date: new Date().toISOString().split("T")[0], operatorId: "snap", operatorName: "SNAP", outputType: "ad creatives", outputCount: 8, accuracy: 98, status: "completed", items: [{ label: "Static Banners", count: 8, detail: "Banner variations generated" }] },
        { id: "3", userId: user?.id || "", date: new Date().toISOString().split("T")[0], operatorId: "pulse", operatorName: "PULSE", outputType: "health checks", outputCount: 14, accuracy: 99, status: "completed", items: [{ label: "Uptime Checks", count: 14, detail: "Endpoint health checks passed" }] },
    ]);
    const metricsLoading = false;
    const outputsLoading = false;
    const [systemHealth] = useState<SystemHealthMetrics>({
        userId: user?.id || "",
        platformHealth: 99.2,
        combinedUptime: 99.95,
        totalTasksToday: 96,
        totalTasksWeek: 438,
        operatorsOnline: 6,
        incidentsLast30Days: 0,
        avgLatencyMs: 124,
        slaCompliance: 99.95,
        weeklyTrend: "up",
        weeklyTrendPercent: 4.2,
    });
    const [efficiencyScores] = useState<OperatorEfficiencyScore[]>([
        { userId: user?.id || "", operatorId: "intro", operatorName: "INTRO", efficiencyScore: 95, speedScore: 91, accuracyScore: 96, volumeScore: 98, trend: "up", trendDelta: 3, lastCalculated: new Date().toISOString() },
        { userId: user?.id || "", operatorId: "snap", operatorName: "SNAP", efficiencyScore: 98, speedScore: 97, accuracyScore: 98, volumeScore: 99, trend: "up", trendDelta: 2, lastCalculated: new Date().toISOString() },
        { userId: user?.id || "", operatorId: "pulse", operatorName: "PULSE", efficiencyScore: 99, speedScore: 99, accuracyScore: 99, volumeScore: 98, trend: "stable", trendDelta: 0, lastCalculated: new Date().toISOString() },
    ]);

    const navItems = [
        // Overview
        { label: "System Status", href: "/dashboard", icon: Activity, section: "Overview" },
        { label: "Queries", href: "/dashboard/queries", icon: MessageSquarePlus, section: "Overview" },
        { label: "Automations (BASE)", href: "/dashboard/base", icon: Layers, primeAndApexOnly: true, section: "Overview" },
        { label: "Calibration", href: "/dashboard/calibration", icon: SlidersHorizontal, apexOnly: true, section: "Overview" },
        // Business
        { label: "Revenue", href: "/dashboard/revenue", icon: TrendingUp, section: "Business" },
        { label: "Customers", href: "/dashboard/customers", icon: Target, section: "Business" },
        // Integrations
        { label: "Connectors", href: "/dashboard/connectors", icon: Zap, section: "Integrations" },
        ...(user?.role === "admin" ? [
            { label: "Admin Console", href: "/admin", icon: Shield, section: "Administration" }
        ] : []),
    ];

    // ── Loading ──
    if (authLoading || planLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5f5f5" }}>
                <div className="flex flex-col items-center gap-5">
                    <AnimatedSoloChiefLogo size={64} animate={true} loop={true} />
                    <p className="text-[13px] font-medium" style={{ color: "#737373" }}>Loading dashboard…</p>
                </div>
            </div>
        );
    }

    // ── Setup Gate ──
    if (!isSetupComplete) {
        const hasBooking = !!userBooking;
        const setupSteps = [
            { icon: CheckCircle2, label: "Subscription Received", description: hasBooking ? "Your plan has been registered" : "Complete your booking to get started", status: hasBooking ? "done" as const : "pending" as const },
            { icon: Cog, label: "Operator Configuration", description: "We're calibrating your operators to your business", status: hasBooking ? "active" as const : "pending" as const },
            { icon: Radio, label: "System Integration", description: "Connecting operators to your channels & data sources", status: "pending" as const },
            { icon: Sparkles, label: "Go Live", description: "Dashboard unlocked — operators start delivering results", status: "pending" as const },
        ];
        return (
            <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#f5f5f5" }}>
                <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }} className="w-full max-w-xl">
                    <div className="bg-white rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-lg" style={{ border: "1px solid #e5e5e5" }}>
                        <div className="relative mx-auto mb-8 w-20 h-20">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-2 border-dashed" style={{ borderColor: "#e5e5e5" }} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#f5f5f5" }}>
                                    <Cog className="w-6 h-6" style={{ color: "#0a0a0a" }} />
                                </motion.div>
                            </div>
                        </div>
                        <h1 className="text-[24px] md:text-[28px] font-semibold tracking-tight mb-3" style={{ color: "#0a0a0a" }}>{hasBooking ? "Setting Up Your Operators" : "No Active Subscription"}</h1>
                        <p className="text-[14px] mb-10 max-w-sm mx-auto" style={{ color: "#737373" }}>{hasBooking ? "Our team is configuring your personalized AI operators. This typically takes up to 7 hours." : "Book a plan to get your AI operators deployed and start seeing results."}</p>
                        <div className="space-y-0 relative text-left">
                            {setupSteps.map((step, i) => {
                                const StepIcon = step.icon; const isDone = step.status === "done"; const isActive = step.status === "active";
                                return (
                                    <motion.div key={step.label} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 * i, duration: 0.4 }}>
                                        <div className="flex items-start gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isDone ? "text-white" : isActive ? "text-white" : ""}`} style={{ background: isDone ? "#171717" : isActive ? "#0a0a0a" : "#f5f5f5", color: isDone || isActive ? "white" : "#a3a3a3" }}>
                                                    {isDone ? <CheckCircle2 size={20} /> : isActive ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}><StepIcon size={20} /></motion.div> : <StepIcon size={20} />}
                                                </div>
                                                {i < setupSteps.length - 1 && <div className={`w-0.5 h-6 my-1 rounded-full`} style={{ background: isDone ? "#171717" : "#e5e5e5" }} />}
                                            </div>
                                            <div className="pt-2 pb-4">
                                                <p className="text-[14px] font-medium" style={{ color: isDone ? "#171717" : isActive ? "#0a0a0a" : "#a3a3a3" }}>
                                                    {step.label}
                                                    {isActive && <span className="ml-2 inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(10,10,10,0.1)", color: "#0a0a0a" }}><Loader2 size={10} className="animate-spin" />In Progress</span>}
                                                </p>
                                                <p className="text-[12px] mt-0.5" style={{ color: isDone || isActive ? "#737373" : "#a3a3a3" }}>{step.description}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-10">
                            {hasBooking ? (
                                <div className="flex items-center justify-center gap-2 text-[13px]" style={{ color: "#737373" }}>
                                    <Clock size={14} />
                                    <span>Estimated completion: <strong style={{ color: "#0a0a0a" }}>within 7 hours</strong></span>
                                </div>
                            ) : (
                                <Link href="/book" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-[14px] transition-all hover:opacity-90 shadow-lg" style={{ background: "#0a0a0a" }}>
                                    Deploy Your Team <ArrowRight size={16} />
                                </Link>
                            )}
                        </motion.div>
                        <div className="mt-6"><button onClick={handleSignOut} className="text-[12px] hover:text-[#0a0a0a] transition-colors inline-flex items-center gap-1.5" style={{ color: "#a3a3a3" }}><LogOut size={12} />Sign out</button></div>
                    </div>
                </motion.div>
            </div>
        );
    }

    // ── Active Dashboard ──
    const isApex = userPlan === "APEX";
    const PlanIcon = PLAN_ICONS[userPlan || "CORE"];
    const planColor = PLAN_COLORS[userPlan || "CORE"];
    const getInitials = (name: string) => name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

    return (
        <div className="flex h-screen overflow-hidden" style={{ background: "#f5f5f5" }}>
            {/* Sidebar toggle for mobile */}
            <div className="lg:hidden fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
                    style={{ background: "#0a0a0a" }}
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* ═══ SIDEBAR ═══ */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-[260px] lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col h-full shrink-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-[110%] lg:translate-x-0"}`}
                style={{ background: "#ffffff", borderRight: "1px solid #e5e5e5" }}
            >
                {/* Logo */}
                <div className="px-6 pt-7 pb-6">
                    <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setIsSidebarOpen(false)}>
                        <SoloChiefLogo size={36} className="group-hover:scale-105 transition-transform duration-300" />
                        <span className="text-[17px] font-semibold tracking-tight" style={{ color: "#0a0a0a" }}>SoloChief</span>
                    </Link>
                </div>

                {/* Plan badge */}
                <div className="mx-4 mb-6 px-4 py-2.5 rounded-[12px] flex items-center gap-3" style={{ background: "#f5f5f5" }}>
                    <div className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{ background: `${planColor}15` }}>
                        <PlanIcon size={15} style={{ color: planColor }} />
                    </div>
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#0a0a0a" }}>{userPlan} Plan</p>
                        <p className="text-[10px] font-medium" style={{ color: "#737373" }}>Active</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 overflow-y-auto dash-scroll space-y-0.5">
                    {(() => {
                        let lastSection = "";
                        return navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const isLocked = (item.apexOnly && !isApex) || (item.primeAndApexOnly && userPlan === "CORE");
                            const Icon = item.icon;
                            const showSection = item.section && item.section !== lastSection;
                            if (item.section) lastSection = item.section;
                            return (
                                <div key={item.href}>
                                    {showSection && (
                                        <p className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-2 mt-5 first:mt-0" style={{ color: "#737373" }}>{item.section}</p>
                                    )}
                                    <Link
                                        href={isLocked ? "#" : item.href}
                                        onClick={(e) => {
                                            if (isLocked) {
                                                e.preventDefault();
                                            } else {
                                                setIsSidebarOpen(false);
                                            }
                                        }}
                                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-[10px] transition-all duration-200 text-[13px] font-medium ${
                                            isActive
                                                ? "text-[#0a0a0a] font-semibold"
                                                : isLocked
                                                    ? "opacity-35 cursor-not-allowed"
                                                    : "text-[#0a0a0a] hover:bg-[#f5f5f5]"
                                        }`}
                                        style={isActive ? { background: "rgba(10,10,10, 0.08)" } : {}}
                                    >
                                        <Icon size={18} style={{ color: isActive ? "#0a0a0a" : isLocked ? "#a3a3a3" : "#737373" }} />
                                        <span>{item.label}</span>
                                        {isLocked && <Lock size={11} className="ml-auto flex-shrink-0" style={{ color: "#a3a3a3" }} />}
                                    </Link>
                                </div>
                            );
                        });
                    })()}

                    {/* Account Section */}
                    <p className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-2 mt-5" style={{ color: "#737373" }}>Account</p>
                    <Link
                        href="/dashboard/settings"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-[10px] transition-all duration-200 text-[13px] font-medium ${
                            pathname === "/dashboard/settings"
                                ? "text-[#0a0a0a] font-semibold"
                                : "text-[#0a0a0a] hover:bg-[#f5f5f5]"
                        }`}
                        style={pathname === "/dashboard/settings" ? { background: "rgba(10,10,10, 0.08)" } : {}}
                    >
                        <Cog size={18} style={{ color: pathname === "/dashboard/settings" ? "#0a0a0a" : "#737373" }} />
                        <span>Settings</span>
                    </Link>
                </nav>

                {/* User footer */}
                <div className="mt-auto mx-3 mb-4 p-3" style={{ borderTop: "1px solid #e5e5e5" }}>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-[12px] flex-shrink-0" style={{ background: "#0a0a0a" }}>{getInitials(displayName)}</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-semibold truncate" style={{ color: "#0a0a0a" }}>{displayName}</p>
                            <p className="text-[10px] truncate" style={{ color: "#737373" }}>{user.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/dashboard/profile" onClick={() => setIsSidebarOpen(false)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-medium transition-all hover:bg-[#f5f5f5]" style={{ color: "#737373" }}>
                            <User size={13} /> Profile
                        </Link>
                        <button onClick={handleSignOut} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-medium transition-all hover:bg-[#fff0f0]" style={{ color: "#737373" }}>
                            <LogOut size={13} /> Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Sidebar backdrop for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* ═══ MAIN ═══ */}
            <main className="flex-1 overflow-hidden flex flex-col relative z-10 w-full">
                <DashboardContext.Provider value={{ userPlan: userPlan || "CORE", operators: ALL_OPERATORS, user, userBooking, displayName, firebaseMetrics, metricsLoading, dailyOutputs, outputsLoading, systemHealth, efficiencyScores }}>
                    <div className="h-full overflow-y-auto w-full dash-scroll">{children}</div>
                </DashboardContext.Provider>
            </main>
        </div>
    );
}

// ============================================
// DASHBOARD CONTEXT
// ============================================

interface DashboardContextType {
    userPlan: "CORE" | "PRIME" | "APEX";
    operators: typeof ALL_OPERATORS;
    user: AppUser;
    userBooking: BookingData | null;
    displayName: string;
    firebaseMetrics: OperatorMetrics[];
    metricsLoading: boolean;
    dailyOutputs: DailyOutput[];
    outputsLoading: boolean;
    systemHealth: SystemHealthMetrics | null;
    efficiencyScores: OperatorEfficiencyScore[];
}

const DashboardContext = createContext<DashboardContextType>({
    userPlan: "CORE",
    operators: ALL_OPERATORS,
    user: { id: "", email: "", fullName: "User", role: "user", plan: "CORE", status: "active", user_metadata: { full_name: "User" } },
    userBooking: null,
    displayName: "User",
    firebaseMetrics: [],
    metricsLoading: true,
    dailyOutputs: [],
    outputsLoading: true,
    systemHealth: null,
    efficiencyScores: [],
});

export const useDashboard = () => useContext(DashboardContext);
export { ALL_OPERATORS };
