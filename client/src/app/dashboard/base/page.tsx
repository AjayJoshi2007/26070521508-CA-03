"use client";

import { useState, useEffect } from "react";
import { useDashboard } from "../layout";
import { motion, AnimatePresence } from "framer-motion";
import {
    Layers, Sparkles, Clock, Play, Plus, Trash2, AlertCircle,
    ArrowRight, CheckCircle2, Loader2, Pencil, Pause, X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { createWorkflow, getUserWorkflows, deleteWorkflow, updateWorkflow, type WorkflowData } from "@/lib/firestore";
import { toast } from "sonner";

export default function BaseAutomationPage() {
    const { userPlan, user } = useDashboard();
    const router = useRouter();
    const [workflowName, setWorkflowName] = useState("");
    const [prompt, setPrompt] = useState("");
    const [interval, setInterval] = useState("daily");
    const [isCreating, setIsCreating] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
    const [isLoadingWorkflows, setIsLoadingWorkflows] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        async function loadWorkflows() {
            if (user?.id) {
                try {
                    const data = await getUserWorkflows(user.id);
                    if (data && data.length > 0) {
                        setWorkflows(data);
                    } else {
                        setWorkflows([
                            { id: "wf-1", userId: user.id, name: "Daily Lead Scoring & Enrichment", prompt: "Score and categorize high-intent inbound inquiries across CRM pipeline", interval: "daily", status: "active", createdAt: { seconds: Date.now() / 1000 - 86400 } as any },
                            { id: "wf-2", userId: user.id, name: "Competitor Price & Feature Monitor", prompt: "Scan competitor pricing changes every Sunday and alert via Slack webhook", interval: "weekly", status: "active", createdAt: { seconds: Date.now() / 1000 - 86400 * 3 } as any },
                        ]);
                    }
                } catch (error) {
                    setWorkflows([
                        { id: "wf-1", userId: user.id, name: "Daily Lead Scoring & Enrichment", prompt: "Score and categorize high-intent inbound inquiries across CRM pipeline", interval: "daily", status: "active", createdAt: { seconds: Date.now() / 1000 - 86400 } as any },
                        { id: "wf-2", userId: user.id, name: "Competitor Price & Feature Monitor", prompt: "Scan competitor pricing changes every Sunday and alert via Slack webhook", interval: "weekly", status: "active", createdAt: { seconds: Date.now() / 1000 - 86400 * 3 } as any },
                    ]);
                } finally {
                    setIsLoadingWorkflows(false);
                }
            }
        }
        loadWorkflows();
    }, [user?.id]);

    // Access Check
    if (userPlan === "CORE") {
        return (
            <div className="flex-1 flex items-center justify-center p-8" style={{ background: "#f5f5f5" }}>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="metric-card p-10 max-w-md text-center flex flex-col items-center gap-5"
                >
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "#f5f5f5" }}>
                        <AlertCircle size={32} style={{ color: "#525252" }} />
                    </div>
                    <div>
                        <h2 className="text-[22px] font-semibold tracking-tight" style={{ color: "#0a0a0a" }}>Upgrade Required</h2>
                        <p className="text-[13px] mt-2 max-w-xs mx-auto" style={{ color: "#737373" }}>
                            The BASE Custom Automation engine is available for Prime and Apex plans.
                            Upgrade to start building bespoke AI workflows.
                        </p>
                    </div>
                    <button
                        onClick={() => router.push("/pricing")}
                        className="w-full py-3.5 rounded-xl text-white font-medium text-[14px] transition-all hover:opacity-90"
                        style={{ background: "#0a0a0a" }}
                    >
                        View Upgrade Options
                    </button>
                </motion.div>
            </div>
        );
    }

    // Demo workflows ("wf-*") are local-only and never hit the database
    const isLocalId = (id: string) => id.startsWith("wf-");

    const resetForm = () => {
        setEditingId(null);
        setWorkflowName("");
        setPrompt("");
        setInterval("daily");
    };

    const handleStartEdit = (flow: WorkflowData) => {
        if (!flow.id) return;
        setEditingId(flow.id);
        setWorkflowName(flow.name);
        setPrompt(flow.prompt);
        setInterval(flow.interval);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSaveEdit = async () => {
        if (!editingId) return;
        setIsCreating(true);
        try {
            const changes = { name: workflowName.trim(), prompt: prompt.trim(), interval };
            if (!isLocalId(editingId)) await updateWorkflow(editingId, changes);
            setWorkflows(prev => prev.map(w => (w.id === editingId ? { ...w, ...changes } : w)));
            toast.success("Workflow updated.");
            resetForm();
        } catch {
            toast.error("Could not update workflow.");
        } finally {
            setIsCreating(false);
        }
    };

    const handleToggleStatus = async (flow: WorkflowData) => {
        if (!flow.id) return;
        const next: WorkflowData["status"] = flow.status === "paused" ? "active" : "paused";
        try {
            if (!isLocalId(flow.id)) await updateWorkflow(flow.id, { status: next });
            setWorkflows(prev => prev.map(w => (w.id === flow.id ? { ...w, status: next } : w)));
            toast.success(next === "paused" ? "Workflow paused." : "Workflow resumed.");
        } catch {
            toast.error("Could not change workflow status.");
        }
    };

    const handleCreateWorkflow = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;

        if (editingId) {
            await handleSaveEdit();
            return;
        }

        setIsCreating(true);
        try {
            let workflowId = `wf-${Date.now()}`;
            try {
                workflowId = await createWorkflow({
                    userId: user.id,
                    name: workflowName,
                    prompt: prompt,
                    interval: interval,
                    status: 'active'
                });
            } catch {
                // fallback ID if firestore offline
            }

            const newWorkflow: WorkflowData = {
                id: workflowId,
                userId: user.id,
                name: workflowName,
                prompt: prompt,
                interval: interval,
                status: 'active',
                createdAt: { seconds: Date.now() / 1000 } as any
            };

            setWorkflows(prev => [newWorkflow, ...prev]);
            setShowSuccess(true);
            setWorkflowName("");
            setPrompt("");

            setTimeout(() => setShowSuccess(false), 4000);
        } catch (error) {
            toast.error("Failed to create workflow using BASE engine.");
        } finally {
            setIsCreating(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            if (!isLocalId(id)) await deleteWorkflow(id);
            if (editingId === id) resetForm();
            setWorkflows(prev => prev.filter(w => w.id !== id));
            toast.success("Workflow decommissioned.");
        } catch (error) {
            toast.error("Could not delete workflow.");
        }
    };

    return (
        <div className="flex-1 flex flex-col px-6 sm:px-10 py-6 sm:py-8 gap-8 overflow-y-auto dash-scroll" style={{ background: "#f5f5f5" }}>
            {/* Header */}
            <header>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-md" style={{ background: "rgba(10,10,10,0.08)", color: "#0a0a0a" }}>
                        Operator: BASE
                    </span>
                </div>
                <h1 className="text-[28px] font-semibold tracking-tight" style={{ color: "#0a0a0a" }}>Automations & Workflows</h1>
                <p className="text-[14px] font-normal mt-1" style={{ color: "#737373" }}>Build custom routines using the BASE Sovereign Engine.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Creation Form */}
                <div className="lg:col-span-12 xl:col-span-7">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="metric-card p-7"
                    >
                        <div className="flex items-center gap-4 mb-7">
                            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white" style={{ background: "#0a0a0a" }}>
                                <Plus size={22} />
                            </div>
                            <div>
                                <h3 className="text-[18px] font-semibold" style={{ color: "#0a0a0a" }}>{editingId ? "Edit Workflow" : "Create New Workflow"}</h3>
                                <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#737373" }}>Prompt-to-Routine Engine</p>
                            </div>
                        </div>

                        <form onSubmit={handleCreateWorkflow} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-semibold uppercase tracking-wider ml-0.5" style={{ color: "#737373" }}>
                                    Workflow Identity
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Daily LinkedIn Prospecting"
                                    value={workflowName}
                                    onChange={(e) => setWorkflowName(e.target.value)}
                                    className="w-full px-5 py-3.5 rounded-xl text-[13px] font-medium outline-none transition-all focus:ring-2 focus:ring-[#0a0a0a]/20"
                                    style={{ background: "#f5f5f5", border: "1px solid #e5e5e5", color: "#0a0a0a" }}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-semibold uppercase tracking-wider ml-0.5 flex items-center justify-between" style={{ color: "#737373" }}>
                                    <span>AI Instructions (The Prompt)</span>
                                    <span className="flex items-center gap-1 text-[10px] font-medium" style={{ color: "#0a0a0a" }}>
                                        <Sparkles size={10} /> Powered by Oracle
                                    </span>
                                </label>
                                <textarea
                                    required
                                    placeholder="Describe exactly what you want the BASE operator to do..."
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="w-full min-h-[140px] px-5 py-4 rounded-xl text-[13px] font-medium outline-none transition-all resize-none leading-relaxed focus:ring-2 focus:ring-[#0a0a0a]/20"
                                    style={{ background: "#f5f5f5", border: "1px solid #e5e5e5", color: "#0a0a0a" }}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-semibold uppercase tracking-wider ml-0.5" style={{ color: "#737373" }}>
                                        Execution Frequency
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={interval}
                                            onChange={(e) => setInterval(e.target.value)}
                                            className="w-full px-5 py-3.5 pr-10 rounded-xl text-[13px] font-medium outline-none appearance-none cursor-pointer"
                                            style={{ background: "#f5f5f5", border: "1px solid #e5e5e5", color: "#0a0a0a" }}
                                        >
                                            <option value="hourly">Every Hour</option>
                                            <option value="6h">Every 6 Hours</option>
                                            <option value="daily">Daily (Global Refresh)</option>
                                            <option value="weekly">Weekly Cycle</option>
                                        </select>
                                        <Clock className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" size={14} style={{ color: "#a3a3a3" }} />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-semibold uppercase tracking-wider ml-0.5" style={{ color: "#737373" }}>
                                        Priority Level
                                    </label>
                                    <div className="flex p-1 rounded-xl gap-1" style={{ background: "#f5f5f5", border: "1px solid #e5e5e5" }}>
                                        <div className="flex-1 rounded-lg py-3 flex items-center justify-center text-[11px] font-semibold" style={{ background: "rgba(10,10,10,0.08)", color: "#0a0a0a" }}>STANDARD</div>
                                        <div className="flex-1 rounded-lg py-3 flex items-center justify-center text-[11px] font-semibold cursor-not-allowed" style={{ color: "#a3a3a3" }}>URGENT</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isCreating}
                                className="w-full py-4 rounded-xl text-white font-medium text-[14px] flex items-center justify-center gap-2.5 transition-all hover:opacity-90 disabled:opacity-50"
                                style={{ background: "#0a0a0a" }}
                            >
                                {isCreating ? (
                                    <><Loader2 size={18} className="animate-spin" /> {editingId ? "Saving Changes..." : "Creating Architecture..."}</>
                                ) : (
                                    <><Play size={16} fill="currentColor" /> {editingId ? "Save Changes" : "Initialize Workflow"}</>
                                )}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="w-full py-3.5 rounded-xl font-medium text-[13px] flex items-center justify-center gap-2 transition-all hover:bg-[#f5f5f5]"
                                    style={{ color: "#737373", border: "1px solid #e5e5e5" }}
                                >
                                    <X size={14} /> Cancel Editing
                                </button>
                            )}
                        </form>
                    </motion.div>
                </div>

                {/* Sidebar: Info + Existing */}
                <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
                    <AnimatePresence>
                        {showSuccess && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -12 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -12 }}
                                className="p-4 rounded-xl text-white flex items-center gap-3"
                                style={{ background: "#171717" }}
                            >
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                                    <CheckCircle2 size={18} />
                                </div>
                                <div>
                                    <p className="text-[13px] font-semibold">Workflow Created</p>
                                    <p className="text-[11px] font-medium" style={{ opacity: 0.85 }}>BASE has initialized your custom routine.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="metric-card p-6 flex flex-col gap-4">
                        <h3 className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#737373" }}>Sovereign Rules</h3>
                        <div className="flex flex-col gap-4">
                            {[
                                { title: "Chained Execution", desc: "BASE can trigger other operators sequentially.", icon: Layers },
                                { title: "Context Preservation", desc: "Workflows share data between steps automatically.", icon: ArrowRight },
                                { title: "Infinite Loop Guard", desc: "System prevents circular dependencies in logic.", icon: AlertCircle }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#f5f5f5" }}>
                                        <item.icon size={15} style={{ color: "#737373" }} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-medium" style={{ color: "#0a0a0a" }}>{item.title}</p>
                                        <p className="text-[11px] mt-0.5" style={{ color: "#737373" }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="metric-card p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#737373" }}>Your Routines</h3>
                            <span className="text-[10px] font-semibold py-1 px-2.5 rounded-full" style={{ background: "#f5f5f5", color: "#737373" }}>{workflows.length} ACTIVE</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            {isLoadingWorkflows ? (
                                <div className="flex flex-col items-center justify-center py-8 gap-2">
                                    <Loader2 size={20} className="animate-spin" style={{ color: "#a3a3a3" }} />
                                    <p className="text-[11px] font-medium" style={{ color: "#a3a3a3" }}>Loading workflows…</p>
                                </div>
                            ) : workflows.length === 0 ? (
                                <div className="text-center py-8 px-4 rounded-xl" style={{ background: "#f5f5f5", border: "1px dashed #e5e5e5" }}>
                                    <p className="text-[12px] font-medium" style={{ color: "#a3a3a3" }}>No active routines</p>
                                </div>
                            ) : (
                                workflows.map((flow) => (
                                    <div
                                        key={flow.id}
                                        className="group p-4 rounded-xl flex items-center justify-between transition-all hover:bg-[#fafafa]"
                                        style={{ background: "#ffffff", border: "1px solid #e5e5e5" }}
                                    >
                                        <div className="min-w-0">
                                            <p className="text-[13px] font-medium truncate" style={{ color: flow.status === "paused" ? "#a3a3a3" : "#0a0a0a" }}>{flow.name}</p>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <Clock size={10} style={{ color: "#a3a3a3" }} />
                                                <p className="text-[11px] font-medium capitalize" style={{ color: "#737373" }}>{flow.interval}</p>
                                                {flow.status === "paused" && (
                                                    <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full" style={{ background: "#f0f0f0", color: "#737373" }}>Paused</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleToggleStatus(flow)}
                                                title={flow.status === "paused" ? "Resume workflow" : "Pause workflow"}
                                                aria-label={flow.status === "paused" ? "Resume workflow" : "Pause workflow"}
                                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-[#f0f0f0]"
                                            >
                                                {flow.status === "paused" ? <Play size={14} style={{ color: "#0a0a0a" }} /> : <Pause size={14} style={{ color: "#737373" }} />}
                                            </button>
                                            <button
                                                onClick={() => handleStartEdit(flow)}
                                                title="Edit workflow"
                                                aria-label="Edit workflow"
                                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-[#f0f0f0]"
                                            >
                                                <Pencil size={14} style={{ color: "#737373" }} />
                                            </button>
                                            <button
                                                onClick={() => flow.id && handleDelete(flow.id)}
                                                title="Delete workflow"
                                                aria-label="Delete workflow"
                                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-[#fff0f0]"
                                            >
                                                <Trash2 size={14} style={{ color: "#e5484d" }} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
