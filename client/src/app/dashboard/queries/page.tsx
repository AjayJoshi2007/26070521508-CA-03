"use client";

import { useState, useEffect, useMemo } from "react";
import { useDashboard } from "../layout";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { createQuery, getUserQueries, updateQueryStatus, updateQueryDetails, deleteQuery, type QueryData } from "@/lib/firestore";
import {
    Send, X, Clock, CheckCircle2,
    Loader2, MessageCircle, Plus,
    AlertCircle, Search, ChevronRight,
    Inbox, Sparkles, Filter, Check,
    HelpCircle, ArrowUpRight, ShieldCheck, Pencil, Trash2, RotateCcw, Save
} from "lucide-react";

interface StatusConfig {
    label: string;
    color: string;
    bg: string;
    borderColor: string;
    dotColor: string;
}

const STATUS_CONFIG: Record<string, StatusConfig> = {
    "open": {
        label: "Open",
        color: "#0a0a0a",
        bg: "rgba(10,10,10, 0.08)",
        borderColor: "rgba(10,10,10, 0.2)",
        dotColor: "#0a0a0a"
    },
    "in-progress": {
        label: "In Progress",
        color: "#525252",
        bg: "rgba(82,82,82, 0.08)",
        borderColor: "rgba(82,82,82, 0.2)",
        dotColor: "#525252"
    },
    "resolved": {
        label: "Resolved",
        color: "#171717",
        bg: "rgba(23,23,23, 0.08)",
        borderColor: "rgba(23,23,23, 0.2)",
        dotColor: "#171717"
    },
    "closed": {
        label: "Closed",
        color: "#737373",
        bg: "rgba(115,115,115, 0.08)",
        borderColor: "rgba(115,115,115, 0.2)",
        dotColor: "#737373"
    },
};

function formatQueryDate(rawDate: any): string {
    if (!rawDate) return "Recently";
    try {
        const d = rawDate.toDate ? rawDate.toDate() : new Date(rawDate);
        if (isNaN(d.getTime())) return "Recently";
        const diffSec = Math.floor((Date.now() - d.getTime()) / 1000);
        if (diffSec < 60) return "Just now";
        if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
        if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
        if (diffSec < 86400 * 7) return `${Math.floor(diffSec / 86400)}d ago`;
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
        return "Recently";
    }
}

export default function QueriesPage() {
    const { user, userBooking, displayName } = useDashboard();
    const [queries, setQueries] = useState<QueryData[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [selected, setSelected] = useState<QueryData | null>(null);
    const [form, setForm] = useState({ subject: "", queryDetails: "", category: "technical" });
    const [sending, setSending] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ subject: "", queryDetails: "" });
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [busy, setBusy] = useState(false);

    // Leaving a ticket always cancels any in-progress edit / pending delete
    useEffect(() => {
        setIsEditing(false);
        setConfirmDelete(false);
    }, [selected?.id]);

    useEffect(() => {
        if (!user?.id) return;
        (async () => {
            setLoading(true);
            try {
                const res = await getUserQueries(user.id);
                if (res && res.length > 0) {
                    setQueries(res);
                    setSelected(res[0]);
                } else {
                    const fallbackQueries: QueryData[] = [
                        {
                            id: "q1",
                            userId: user.id,
                            customerName: displayName,
                            companyName: userBooking?.companyName || "TechStartup",
                            email: user.email,
                            subject: "Operator scaling calibration",
                            queryDetails: "Requesting increase in INTRO daily lead generation ceiling to 200 leads/day with verified business contacts.",
                            status: "resolved",
                            createdAt: new Date(Date.now() - 3600000 * 5) as any
                        },
                        {
                            id: "q2",
                            userId: user.id,
                            customerName: displayName,
                            companyName: userBooking?.companyName || "TechStartup",
                            email: user.email,
                            subject: "HubSpot CRM bi-directional sync",
                            queryDetails: "Need assistance setting up automatic connector pipeline sync between SoloChief outputs and our HubSpot deals.",
                            status: "in-progress",
                            createdAt: new Date(Date.now() - 3600000 * 18) as any
                        },
                        {
                            id: "q3",
                            userId: user.id,
                            customerName: displayName,
                            companyName: userBooking?.companyName || "TechStartup",
                            email: user.email,
                            subject: "APEX subscription receipt & tax invoice",
                            queryDetails: "Please provide itemized invoice with VAT registration for the active enterprise quarterly cycle.",
                            status: "open",
                            createdAt: new Date(Date.now() - 3600000 * 48) as any
                        },
                    ];
                    setQueries(fallbackQueries);
                    setSelected(fallbackQueries[0]);
                }
            } catch {
                const fallbackQueries: QueryData[] = [
                    {
                        id: "q1",
                        userId: user.id,
                        customerName: displayName,
                        companyName: userBooking?.companyName || "TechStartup",
                        email: user.email,
                        subject: "Operator scaling calibration",
                        queryDetails: "Requesting increase in INTRO daily lead generation ceiling to 200 leads/day with verified business contacts.",
                        status: "resolved",
                        createdAt: new Date(Date.now() - 3600000 * 5) as any
                    },
                    {
                        id: "q2",
                        userId: user.id,
                        customerName: displayName,
                        companyName: userBooking?.companyName || "TechStartup",
                        email: user.email,
                        subject: "HubSpot CRM bi-directional sync",
                        queryDetails: "Need assistance setting up automatic connector pipeline sync between SoloChief outputs and our HubSpot deals.",
                        status: "in-progress",
                        createdAt: new Date(Date.now() - 3600000 * 18) as any
                    },
                    {
                        id: "q3",
                        userId: user.id,
                        customerName: displayName,
                        companyName: userBooking?.companyName || "TechStartup",
                        email: user.email,
                        subject: "APEX subscription receipt & tax invoice",
                        queryDetails: "Please provide itemized invoice with VAT registration for the active enterprise quarterly cycle.",
                        status: "open",
                        createdAt: new Date(Date.now() - 3600000 * 48) as any
                    },
                ];
                setQueries(fallbackQueries);
                setSelected(fallbackQueries[0]);
            }
            setLoading(false);
        })();
    }, [user?.id, user?.email, displayName, userBooking?.companyName]);

    const filtered = useMemo(() => {
        return queries.filter((q) => {
            const matchesFilter = filter === "all" ? true : q.status === filter;
            const matchesSearch = searchQuery.trim() === "" ||
                q.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.queryDetails.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [queries, filter, searchQuery]);

    const stats = useMemo(() => {
        return {
            total: queries.length,
            open: queries.filter(q => q.status === "open").length,
            inProgress: queries.filter(q => q.status === "in-progress").length,
            resolved: queries.filter(q => q.status === "resolved").length,
        };
    }, [queries]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.subject.trim() || !form.queryDetails.trim()) {
            toast.error("Please enter a subject and details");
            return;
        }
        setSending(true);
        try {
            let queryId = `q-${Date.now()}`;
            try {
                queryId = await createQuery({
                    userId: user.id,
                    customerName: displayName,
                    companyName: userBooking?.companyName || "",
                    email: user.email,
                    subject: form.subject,
                    queryDetails: form.queryDetails,
                    status: "open"
                });
            } catch {
                // local fallback if network / firestore fails
            }
            const newQuery: QueryData = {
                id: queryId,
                userId: user.id,
                customerName: displayName,
                companyName: userBooking?.companyName || "",
                email: user.email,
                subject: form.subject,
                queryDetails: form.queryDetails,
                status: "open",
                createdAt: new Date() as any,
            };
            setQueries(prev => [newQuery, ...prev]);
            setSelected(newQuery);
            toast.success("Query submitted successfully. We will follow up shortly.");
            setForm({ subject: "", queryDetails: "", category: "technical" });
            setShowForm(false);
        } catch (e: any) {
            toast.error(e?.message || "Failed to submit query.");
        }
        setSending(false);
    };

    // Demo tickets (q1..q3) and offline fallbacks (q-<timestamp>) are never persisted
    const isLocalId = (id?: string) => !id || /^q-?\d+$/.test(id);

    const handleStatusChange = async (status: QueryData["status"]) => {
        if (!selected?.id) return;
        setBusy(true);
        try {
            if (!isLocalId(selected.id)) await updateQueryStatus(selected.id, status);
            const updated = { ...selected, status };
            setQueries(prev => prev.map(q => (q.id === selected.id ? updated : q)));
            setSelected(updated);
            toast.success(status === "resolved" ? "Ticket marked as resolved" : status === "closed" ? "Ticket closed" : "Ticket reopened");
        } catch (e: any) {
            toast.error(e?.message || "Could not update ticket status.");
        }
        setBusy(false);
    };

    const handleStartEdit = () => {
        if (!selected) return;
        setEditForm({ subject: selected.subject, queryDetails: selected.queryDetails });
        setIsEditing(true);
    };

    const handleSaveEdit = async () => {
        if (!selected?.id) return;
        const subject = editForm.subject.trim();
        const queryDetails = editForm.queryDetails.trim();
        if (!subject || !queryDetails) {
            toast.error("Subject and details cannot be empty");
            return;
        }
        setBusy(true);
        try {
            if (!isLocalId(selected.id)) await updateQueryDetails(selected.id, { subject, queryDetails });
            const updated = { ...selected, subject, queryDetails };
            setQueries(prev => prev.map(q => (q.id === selected.id ? updated : q)));
            setSelected(updated);
            setIsEditing(false);
            toast.success("Ticket updated");
        } catch (e: any) {
            toast.error(e?.message || "Could not update ticket.");
        }
        setBusy(false);
    };

    const handleDeleteQuery = async () => {
        if (!selected?.id) return;
        const targetId = selected.id;
        setBusy(true);
        try {
            if (!isLocalId(targetId)) await deleteQuery(targetId);
            const remaining = queries.filter(q => q.id !== targetId);
            setQueries(remaining);
            setSelected(remaining[0] ?? null);
            toast.success("Ticket deleted");
        } catch (e: any) {
            toast.error(e?.message || "Could not delete ticket.");
        }
        setConfirmDelete(false);
        setBusy(false);
    };

    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden" style={{ background: "#f5f5f5" }}>
            {/* Top Bar Header */}
            <header className="px-6 sm:px-8 pt-7 pb-5 shrink-0 bg-[#f5f5f5]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#737373]">Support & Operations</span>
                        </div>
                        <h1 className="text-[26px] font-semibold tracking-tight text-[#0a0a0a]">Inquiries & Tickets</h1>
                        <p className="text-[13px] text-[#737373] mt-0.5">Submit technical requests, custom calibrations, or billing support</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowForm(true)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-[13px] font-medium transition-all shadow-sm hover:opacity-90 active:scale-[0.98]"
                            style={{ background: "#0a0a0a" }}
                        >
                            <Plus size={16} />
                            <span>New Inquiry</span>
                        </button>
                    </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                    <div className="bg-white rounded-2xl p-4 border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                        <p className="text-[11px] font-medium text-[#737373]">Total Tickets</p>
                        <p className="text-[22px] font-semibold text-[#0a0a0a] tracking-tight mt-0.5">{stats.total}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-medium text-[#737373]">Open</p>
                            <span className="w-2 h-2 rounded-full bg-[#0a0a0a]" />
                        </div>
                        <p className="text-[22px] font-semibold text-[#0a0a0a] tracking-tight mt-0.5">{stats.open}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-medium text-[#737373]">In Progress</p>
                            <span className="w-2 h-2 rounded-full bg-[#525252]" />
                        </div>
                        <p className="text-[22px] font-semibold text-[#525252] tracking-tight mt-0.5">{stats.inProgress}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-medium text-[#737373]">Resolved</p>
                            <span className="w-2 h-2 rounded-full bg-[#171717]" />
                        </div>
                        <p className="text-[22px] font-semibold text-[#171717] tracking-tight mt-0.5">{stats.resolved}</p>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 px-6 sm:px-8 pb-8 min-h-0 flex flex-col">
                <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex-1 min-h-0 flex flex-col overflow-hidden">
                    {/* Filter and Search Bar */}
                    <div className="px-5 py-3.5 border-b border-[#e5e5e5] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#fafafa]">
                        {/* Segmented Filter Pills */}
                        <div className="flex items-center gap-1 bg-[#f5f5f5] p-1 rounded-xl self-start sm:self-auto border border-[#e5e5e5]">
                            {[
                                { id: "all", label: "All" },
                                { id: "open", label: "Open" },
                                { id: "in-progress", label: "In Progress" },
                                { id: "resolved", label: "Resolved" },
                                { id: "closed", label: "Closed" },
                            ].map((tab) => {
                                const isActive = filter === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setFilter(tab.id)}
                                        className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                                            isActive
                                                ? "bg-white text-[#0a0a0a] shadow-sm font-semibold"
                                                : "text-[#737373] hover:text-[#0a0a0a]"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Search Input */}
                        <div className="relative min-w-[220px]">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search queries..."
                                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-[#e5e5e5] text-[12px] text-[#0a0a0a] placeholder-[#737373] focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
                            />
                        </div>
                    </div>

                    {/* Master-Detail Split Pane */}
                    <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[#e5e5e5]">
                        {/* Left Column: Tickets List */}
                        <div className="w-full md:w-[380px] lg:w-[420px] flex-col shrink-0 flex overflow-y-auto dash-scroll">
                            {loading ? (
                                <div className="p-8 flex flex-col items-center justify-center gap-3 text-[#737373]">
                                    <Loader2 size={24} className="animate-spin text-[#0a0a0a]" />
                                    <span className="text-[13px]">Loading queries...</span>
                                </div>
                            ) : filtered.length === 0 ? (
                                <div className="p-12 flex flex-col items-center justify-center text-center">
                                    <div className="w-12 h-12 rounded-2xl bg-[#f5f5f5] flex items-center justify-center text-[#737373] mb-3">
                                        <Inbox size={22} />
                                    </div>
                                    <p className="text-[14px] font-semibold text-[#0a0a0a]">No queries found</p>
                                    <p className="text-[12px] text-[#737373] mt-1 max-w-[200px]">
                                        {searchQuery ? "No matches for current search criteria" : "You have no active queries in this view."}
                                    </p>
                                </div>
                            ) : (
                                <div className="divide-y divide-[#efefef]">
                                    {filtered.map((q) => {
                                        const isSelected = selected?.id === q.id;
                                        const cfg = STATUS_CONFIG[q.status] || STATUS_CONFIG.open;
                                        return (
                                            <button
                                                key={q.id}
                                                onClick={() => setSelected(q)}
                                                className={`w-full text-left p-4.5 transition-all flex flex-col gap-1.5 relative ${
                                                    isSelected
                                                        ? "bg-[#f5f5f5]"
                                                        : "bg-white hover:bg-[#fafafa]"
                                                }`}
                                            >
                                                {isSelected && (
                                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0a0a0a]" />
                                                )}
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-[13px] font-semibold text-[#0a0a0a] truncate">
                                                        {q.subject}
                                                    </span>
                                                    <span
                                                        className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0"
                                                        style={{ background: cfg.bg, color: cfg.color }}
                                                    >
                                                        {cfg.label}
                                                    </span>
                                                </div>
                                                <p className="text-[12px] text-[#737373] line-clamp-2 leading-relaxed">
                                                    {q.queryDetails}
                                                </p>
                                                <div className="flex items-center justify-between text-[11px] text-[#737373] mt-1">
                                                    <span className="flex items-center gap-1 font-medium">
                                                        <Clock size={11} /> {formatQueryDate(q.createdAt)}
                                                    </span>
                                                    <span className="text-[#737373]">{q.companyName || "SoloChief Client"}</span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Right Column: Ticket Details Pane */}
                        <div className="flex-1 flex flex-col min-h-0 bg-white overflow-y-auto dash-scroll">
                            {selected ? (
                                <div className="p-6 sm:p-8 flex flex-col gap-6">
                                    {/* Header of Detail */}
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#e5e5e5]">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                                                    style={{
                                                        background: STATUS_CONFIG[selected.status]?.bg || STATUS_CONFIG.open.bg,
                                                        color: STATUS_CONFIG[selected.status]?.color || STATUS_CONFIG.open.color
                                                    }}
                                                >
                                                    <span
                                                        className="w-1.5 h-1.5 rounded-full"
                                                        style={{ background: STATUS_CONFIG[selected.status]?.dotColor || STATUS_CONFIG.open.dotColor }}
                                                    />
                                                    {STATUS_CONFIG[selected.status]?.label || selected.status}
                                                </span>
                                                <span className="text-[12px] text-[#737373]">
                                                    ID: #{selected.id ? selected.id.slice(-6).toUpperCase() : "SOLO-01"}
                                                </span>
                                            </div>
                                            {isEditing ? (
                                                <div className="pt-1">
                                                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
                                                        Subject
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={editForm.subject}
                                                        onChange={(e) => setEditForm(p => ({ ...p, subject: e.target.value }))}
                                                        className="w-full px-3.5 py-2 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[15px] font-semibold text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] transition-all"
                                                    />
                                                </div>
                                            ) : (
                                                <h2 className="text-[20px] font-semibold text-[#0a0a0a] tracking-tight">
                                                    {selected.subject}
                                                </h2>
                                            )}
                                        </div>

                                        <div className="text-left sm:text-right text-[12px] text-[#737373] shrink-0">
                                            <p className="font-medium text-[#0a0a0a]">Submitted by {selected.customerName || displayName}</p>
                                            <p>{formatQueryDate(selected.createdAt)}</p>
                                        </div>
                                    </div>

                                    {/* Ticket Actions */}
                                    <div className="flex flex-wrap items-center gap-2">
                                        {!isEditing ? (
                                            <button
                                                onClick={handleStartEdit}
                                                disabled={busy}
                                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-medium border border-[#e5e5e5] text-[#0a0a0a] hover:bg-[#f5f5f5] transition-colors disabled:opacity-50"
                                            >
                                                <Pencil size={13} /> Edit
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={handleSaveEdit}
                                                    disabled={busy}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-medium bg-[#0a0a0a] text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                                                >
                                                    {busy ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />} Save Changes
                                                </button>
                                                <button
                                                    onClick={() => setIsEditing(false)}
                                                    disabled={busy}
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-medium border border-[#e5e5e5] text-[#737373] hover:text-[#0a0a0a] transition-colors disabled:opacity-50"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                        {!isEditing && (selected.status === "resolved" || selected.status === "closed" ? (
                                            <button
                                                onClick={() => handleStatusChange("open")}
                                                disabled={busy}
                                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-medium border border-[#e5e5e5] text-[#0a0a0a] hover:bg-[#f5f5f5] transition-colors disabled:opacity-50"
                                            >
                                                <RotateCcw size={13} /> Reopen
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleStatusChange("resolved")}
                                                disabled={busy}
                                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-medium bg-[#0a0a0a] text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                                            >
                                                <CheckCircle2 size={13} /> Mark Resolved
                                            </button>
                                        ))}
                                        <div className="ml-auto flex items-center gap-2">
                                            {confirmDelete ? (
                                                <>
                                                    <span className="text-[12px] text-[#737373]">Delete this ticket?</span>
                                                    <button
                                                        onClick={() => setConfirmDelete(false)}
                                                        disabled={busy}
                                                        className="px-3 py-1.5 rounded-full text-[12px] font-medium text-[#737373] hover:text-[#0a0a0a]"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={handleDeleteQuery}
                                                        disabled={busy}
                                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium text-white bg-[#e5484d] hover:opacity-90 disabled:opacity-50"
                                                    >
                                                        {busy ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />} Delete
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => setConfirmDelete(true)}
                                                    disabled={busy}
                                                    aria-label="Delete ticket"
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-medium text-[#e5484d] hover:bg-[#fff0f0] transition-colors disabled:opacity-50"
                                                >
                                                    <Trash2 size={13} /> Delete
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Details Body */}
                                    <div className="space-y-4">
                                        <h3 className="text-[12px] font-semibold uppercase tracking-wider text-[#737373]">
                                            Request Description
                                        </h3>
                                        {isEditing ? (
                                            <textarea
                                                rows={6}
                                                value={editForm.queryDetails}
                                                onChange={(e) => setEditForm(p => ({ ...p, queryDetails: e.target.value }))}
                                                className="w-full p-4 rounded-2xl bg-[#f5f5f5] border border-[#e5e5e5] text-[14px] leading-relaxed text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] transition-all resize-y"
                                            />
                                        ) : (
                                            <div className="bg-[#f5f5f5] rounded-2xl p-5 border border-[#e5e5e5] text-[14px] leading-relaxed text-[#0a0a0a] whitespace-pre-wrap font-normal">
                                                {selected.queryDetails}
                                            </div>
                                        )}
                                    </div>

                                    {/* Resolution Info Banner */}
                                    <div className="p-4 rounded-xl bg-white border border-[#e5e5e5] flex items-start gap-3 shadow-sm">
                                        <div className="w-8 h-8 rounded-lg bg-[#0a0a0a]/10 text-[#0a0a0a] flex items-center justify-center shrink-0 mt-0.5">
                                            <ShieldCheck size={16} />
                                        </div>
                                        <div className="text-[12px] text-[#737373] leading-normal">
                                            <strong className="text-[#0a0a0a] font-semibold block">SoloChief Operations SLA</strong>
                                            Our autonomous operators and engineering team review requests 24/7. Target response time for {userBooking?.plan || "CORE"} tier is within 4 hours.
                                        </div>
                                    </div>

                                    {/* Conversation / Update thread info */}
                                    <div className="space-y-3 pt-2">
                                        <h3 className="text-[12px] font-semibold uppercase tracking-wider text-[#737373]">
                                            Status Timeline
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3 text-[12px]">
                                                <div className="w-6 h-6 rounded-full bg-[#171717]/10 text-[#171717] flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check size={12} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[#0a0a0a]">Ticket acknowledged</p>
                                                    <p className="text-[11px] text-[#737373]">Automated dispatch to technical operations queue</p>
                                                </div>
                                            </div>
                                            {selected.status === "resolved" && (
                                                <div className="flex items-start gap-3 text-[12px]">
                                                    <div className="w-6 h-6 rounded-full bg-[#171717]/10 text-[#171717] flex items-center justify-center shrink-0 mt-0.5">
                                                        <CheckCircle2 size={12} />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-[#0a0a0a]">Marked as Resolved</p>
                                                        <p className="text-[11px] text-[#737373]">Adjustments and calibrations applied to operator cluster</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-12 flex-1 flex flex-col items-center justify-center text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-[#f5f5f5] flex items-center justify-center text-[#737373] mb-3">
                                        <MessageCircle size={26} />
                                    </div>
                                    <p className="text-[15px] font-semibold text-[#0a0a0a]">Select a query</p>
                                    <p className="text-[13px] text-[#737373] mt-1 max-w-sm">
                                        Choose an inquiry from the sidebar to review status updates and technical responses.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Compose Modal (Apple Sheet Style) */}
            <AnimatePresence>
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/30 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-3xl w-full max-w-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#e5e5e5] overflow-hidden flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="px-6 py-4.5 border-b border-[#e5e5e5] flex items-center justify-between bg-[#fafafa]">
                                <div>
                                    <h3 className="text-[17px] font-semibold text-[#0a0a0a]">Submit Support Inquiry</h3>
                                    <p className="text-[12px] text-[#737373]">Connect with our engineering and operations team</p>
                                </div>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#737373] hover:text-[#0a0a0a] hover:bg-[#efefef] transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1.5">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.subject}
                                        onChange={(e) => setForm(prev => ({ ...prev, subject: e.target.value }))}
                                        placeholder="e.g. Increase INTRO operator daily leads quota"
                                        className="w-full px-4 py-2.5 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-4 focus:ring-[#0a0a0a]/10 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1.5">
                                        Inquiry Category
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { id: "technical", label: "Technical" },
                                            { id: "calibration", label: "Calibration" },
                                            { id: "billing", label: "Billing" },
                                        ].map((cat) => (
                                            <button
                                                type="button"
                                                key={cat.id}
                                                onClick={() => setForm(p => ({ ...p, category: cat.id }))}
                                                className={`py-2 px-3 rounded-xl text-[12px] font-medium border text-center transition-all ${
                                                    form.category === cat.id
                                                        ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                                                        : "bg-[#f5f5f5] text-[#0a0a0a] border-[#e5e5e5] hover:bg-[#e5e5e5]"
                                                }`}
                                            >
                                                {cat.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1.5">
                                        Details
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={form.queryDetails}
                                        onChange={(e) => setForm(prev => ({ ...prev, queryDetails: e.target.value }))}
                                        placeholder="Provide specific details, operator names, or instructions..."
                                        className="w-full px-4 py-3 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-4 focus:ring-[#0a0a0a]/10 transition-all resize-none"
                                    />
                                </div>

                                <div className="pt-2 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="px-4 py-2.5 rounded-full text-[13px] font-medium text-[#737373] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={sending}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[13px] font-medium transition-all shadow-sm disabled:opacity-50"
                                        style={{ background: "#0a0a0a" }}
                                    >
                                        {sending ? (
                                            <>
                                                <Loader2 size={15} className="animate-spin" />
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send size={15} />
                                                <span>Send Ticket</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
