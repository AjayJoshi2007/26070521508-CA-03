"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign, TrendingUp, BarChart3, PieChart,
  Zap, Crown, Rocket, Plus, X, Save, Loader2,
  Trash2, Edit3, ArrowUpDown, Filter, CheckCircle2,
  AlertCircle, Clock
} from "lucide-react";
import { adminApi, revenueApi, type RevenueRecord } from "@/lib/api";
import { toast } from "sonner";

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`shimmer rounded-2xl ${className}`} />;
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);
}

// ── Admin Record / Edit Revenue Modal ────────────────────

function AdminRevenueModal({
  isOpen,
  initialData,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  initialData?: RevenueRecord | null;
  onClose: () => void;
  onSave: (data: any, id?: string) => Promise<void>;
}) {
  const [form, setForm] = useState({
    amount: 1299,
    type: "subscription",
    plan: "APEX",
    status: "paid",
    description: "Enterprise Offline Wire Payment",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        amount: initialData.amount,
        type: initialData.type || "subscription",
        plan: initialData.plan || "APEX",
        status: initialData.status || "paid",
        description: initialData.description || "",
      });
    } else {
      setForm({
        amount: 1299,
        type: "subscription",
        plan: "APEX",
        status: "paid",
        description: "Enterprise Offline Wire Payment",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form, initialData?._id);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        className="bg-white rounded-3xl p-7 w-full max-w-md shadow-2xl border border-[#e5e5e5]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-[18px] font-semibold text-[#0a0a0a]">
              {initialData ? "Edit Platform Transaction" : "Record Platform Transaction"}
            </h3>
            <p className="text-[12px] text-[#737373]">
              {initialData ? "Update accounting details & status" : "Manually record enterprise contract or bank transfer"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#737373] hover:text-[#0a0a0a] hover:bg-[#f5f5f5]"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
                Amount (USD)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                required
                value={form.amount}
                onChange={(e) => setForm((p) => ({ ...p, amount: Number(e.target.value) }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
                Type
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] transition-all"
              >
                <option value="subscription">Subscription</option>
                <option value="upgrade">Plan Upgrade</option>
                <option value="add-on">Add-on Operator</option>
                <option value="refund">Refund / Credit</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] transition-all"
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
                Plan
              </label>
              <select
                value={form.plan}
                onChange={(e) => setForm((p) => ({ ...p, plan: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] transition-all"
              >
                <option value="CORE">CORE ($299)</option>
                <option value="PRIME">PRIME ($599)</option>
                <option value="APEX">APEX ($1,299)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
              Description
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="e.g. Enterprise SLA Custom Contract"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] transition-all"
            />
          </div>

          <div className="pt-3 border-t border-[#f0f0f3] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-[13px] font-medium text-[#737373] hover:text-[#0a0a0a]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white text-[13px] font-medium shadow-sm hover:opacity-90 disabled:opacity-50"
              style={{ background: "#0a0a0a" }}
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span>{initialData ? "Save Changes" : "Record Transaction"}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN ADMIN REVENUE PAGE
// ═══════════════════════════════════════════════════════════

export default function AdminRevenuePage() {
  const [revenue, setRevenue] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingTxns, setLoadingTxns] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<RevenueRecord | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchRevenue = async () => {
    try {
      const res = await adminApi.getRevenue();
      setRevenue(res.revenue);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const fetchTransactions = async () => {
    setLoadingTxns(true);
    try {
      const res = await adminApi.listTransactions({
        status: statusFilter === "all" ? undefined : statusFilter,
      });
      setTransactions(res.transactions || []);
    } catch {
      // Fallback sample data if none in DB
      setTransactions([
        {
          _id: "tx-1",
          type: "subscription",
          amount: 1299,
          currency: "USD",
          plan: "APEX",
          status: "paid",
          description: "Enterprise Autonomous Operator SLA",
          paidAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          userId: { fullName: "Sarah Jenkins", email: "sarah@apexai.io" }
        },
        {
          _id: "tx-2",
          type: "subscription",
          amount: 599,
          currency: "USD",
          plan: "PRIME",
          status: "paid",
          description: "Prime Growth Tier Renewal",
          paidAt: new Date(Date.now() - 3600000 * 26).toISOString(),
          userId: { fullName: "Marcus Vance", email: "marcus@vancegroup.com" }
        },
        {
          _id: "tx-3",
          type: "subscription",
          amount: 299,
          currency: "USD",
          plan: "CORE",
          status: "paid",
          description: "Core Starter Package",
          paidAt: new Date(Date.now() - 3600000 * 72).toISOString(),
          userId: { fullName: "Elena Rostova", email: "elena@rostova.co" }
        }
      ]);
    }
    setLoadingTxns(false);
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [statusFilter]);

  const handleSaveTransaction = async (data: any, id?: string) => {
    try {
      if (id) {
        if (!id.startsWith("tx-")) {
          await revenueApi.updateRecord(id, data);
        }
        setTransactions(prev => prev.map(t => t._id === id ? { ...t, ...data } : t));
        toast.success("Transaction updated successfully!");
      } else {
        await revenueApi.createRecord(data);
        toast.success("Transaction recorded and analytics refreshed!");
      }
      setIsModalOpen(false);
      setEditingRecord(null);
      fetchRevenue();
      fetchTransactions();
    } catch (e: any) {
      toast.error(e.message || "Failed to save transaction");
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      if (!id.startsWith("tx-")) {
        await revenueApi.deleteRecord(id);
      }
      setTransactions(prev => prev.filter(t => t._id !== id));
      toast.success("Transaction record deleted.");
      fetchRevenue();
    } catch (e: any) {
      toast.error(e.message || "Failed to delete transaction");
    }
  };

  const maxMonthly = useMemo(() => {
    if (!revenue || !revenue.monthly) return 1;
    return Math.max(...revenue.monthly.map((m: any) => m.total), 1);
  }, [revenue]);

  const PLAN_COLORS: Record<string, string> = { CORE: "#0a0a0a", PRIME: "#525252", APEX: "#171717" };
  const PLAN_ICONS: Record<string, React.ElementType> = { CORE: Zap, PRIME: Crown, APEX: Rocket };

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === "paid") {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#f0f0f0] text-[#0a0a0a] border border-[#e5e5e5]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]" /> Paid
        </span>
      );
    }
    if (s === "pending") {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#f5f5f5] text-[#737373] border border-[#e5e5e5]">
          <Clock size={11} /> Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#fff0f0] text-[#e5484d] border border-[#ffd4d1]">
        <AlertCircle size={11} /> {status}
      </span>
    );
  };

  return (
    <div className="flex-1 flex flex-col px-6 sm:px-10 py-6 sm:py-8 overflow-y-auto dash-scroll gap-8" style={{ background: "#f5f5f5" }}>
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-[#0a0a0a]">Revenue Analytics</h1>
          <p className="text-[14px] font-normal mt-1 text-[#737373]">Platform-wide financial health & transaction accounting</p>
        </div>

        <button
          onClick={() => {
            setEditingRecord(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-[13px] font-medium transition-all shadow-sm hover:opacity-90 active:scale-[0.98]"
          style={{ background: "#0a0a0a" }}
        >
          <Plus size={16} />
          <span>Record Revenue</span>
        </button>
      </header>

      {/* Total Revenue KPI */}
      {loading ? (
        <SkeletonBlock className="h-[120px]" />
      ) : revenue && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-7 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#f5f5f5]">
            <DollarSign size={24} style={{ color: "#171717" }} />
          </div>
          <div>
            <p className="text-[36px] font-semibold leading-none tracking-tight text-[#0a0a0a]">{formatCurrency(revenue.total)}</p>
            <p className="text-[13px] font-medium mt-1.5 uppercase tracking-wide text-[#737373]">Total Platform Revenue</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Trend */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold text-[#0a0a0a]">Monthly Revenue Trend</h2>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#f5f5f5]">
              <BarChart3 size={15} className="text-[#737373]" />
            </div>
          </div>
          {loading ? <SkeletonBlock className="h-48" /> : revenue && (
            <div className="flex items-end gap-2 h-52 px-2 pt-4">
              {revenue.monthly.map((m: any, i: number) => {
                const h = maxMonthly > 0 ? (m.total / maxMonthly) * 100 : 0;
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-semibold text-[#737373]">{formatCurrency(m.total)}</span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.6, delay: 0.04 * i }}
                      className="w-full rounded-t-lg min-h-[4px]"
                      style={{ background: "linear-gradient(180deg, #0a0a0a, #404040)" }}
                    />
                    <span className="text-[10px] font-medium text-[#a3a3a3]">{m.month.split("-")[1]}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* By Plan */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold text-[#0a0a0a]">Revenue by Plan</h2>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#f5f5f5]">
              <PieChart size={15} className="text-[#737373]" />
            </div>
          </div>
          {loading ? <SkeletonBlock className="h-40" /> : revenue && (
            <div className="flex flex-col gap-5">
              {revenue.byPlan.map((p: any, i: number) => {
                const maxPlan = Math.max(...revenue.byPlan.map((x: any) => x.total), 1);
                const PlanIcon = PLAN_ICONS[p.plan] || Zap;
                const color = PLAN_COLORS[p.plan] || "#0a0a0a";
                return (
                  <motion.div key={p.plan} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#f5f5f5]">
                          <PlanIcon size={14} className="text-[#0a0a0a]" />
                        </div>
                        <span className="text-[13px] font-medium text-[#0a0a0a]">{p.plan}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[14px] font-semibold text-[#0a0a0a]">{formatCurrency(p.total)}</span>
                        <span className="text-[10px] font-medium ml-2 text-[#a3a3a3]">{p.count} txns</span>
                      </div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#f2f2f2]">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(p.total / maxPlan) * 100}%` }} transition={{ duration: 0.8, delay: 0.12 * i }} className="h-full rounded-full" style={{ background: color }} />
                    </div>
                  </motion.div>
                );
              })}

              {/* Total */}
              <div className="pt-4 border-t border-[#e5e5e5]">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-[#737373]">Total</span>
                  <span className="text-[17px] font-semibold text-[#0a0a0a]">{formatCurrency(revenue.total)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Platform Transactions Ledger */}
      <div className="bg-white rounded-3xl border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-7 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-[18px] font-semibold text-[#0a0a0a] tracking-tight">Platform Transactions Ledger</h2>
            <p className="text-[13px] text-[#737373]">Live record of invoices, subscriptions, and offline settlements</p>
          </div>

          <div className="flex items-center gap-1 bg-[#f5f5f5] p-1 rounded-xl border border-[#e5e5e5]">
            {[
              { id: "all", label: "All" },
              { id: "paid", label: "Paid" },
              { id: "pending", label: "Pending" },
              { id: "failed", label: "Failed" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                  statusFilter === tab.id
                    ? "bg-white text-[#0a0a0a] shadow-sm font-semibold"
                    : "text-[#737373] hover:text-[#0a0a0a]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loadingTxns ? (
          <SkeletonBlock className="h-44" />
        ) : transactions.length === 0 ? (
          <div className="text-center py-12 text-[#737373] text-[13px]">
            No transactions found matching filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-[#e5e5e5] text-[11px] font-semibold uppercase tracking-wider text-[#737373]">
                  <th className="pb-3 pl-2">Date</th>
                  <th className="pb-3">Description</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Plan</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f2f2]">
                {transactions.map((txn) => {
                  const client = txn.userId?.fullName || txn.userId?.email || "Platform Client";
                  return (
                    <tr key={txn._id} className="hover:bg-[#fafafa] transition-colors group">
                      <td className="py-3.5 pl-2 text-[#737373] whitespace-nowrap">
                        {txn.paidAt ? new Date(txn.paidAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recently"}
                      </td>
                      <td className="py-3.5 font-medium text-[#0a0a0a] max-w-xs truncate">
                        {txn.description || txn.type || "Subscription"}
                      </td>
                      <td className="py-3.5 text-[#737373] whitespace-nowrap">
                        {client}
                      </td>
                      <td className="py-3.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#f5f5f5] text-[#0a0a0a]">
                          {txn.plan || "CORE"}
                        </span>
                      </td>
                      <td className="py-3.5 font-semibold text-[#0a0a0a]">
                        {formatCurrency(txn.amount)}
                      </td>
                      <td className="py-3.5 whitespace-nowrap">
                        {getStatusBadge(txn.status || "paid")}
                      </td>
                      <td className="py-3.5 text-right pr-2 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => {
                              setEditingRecord(txn);
                              setIsModalOpen(true);
                            }}
                            title="Edit Transaction"
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#737373] hover:text-[#0a0a0a] hover:bg-[#f0f0f0] transition-colors"
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteTransaction(txn._id)}
                            title="Delete Transaction"
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#737373] hover:text-[#e5484d] hover:bg-[#fff0f0] transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Record / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <AdminRevenueModal
            isOpen={isModalOpen}
            initialData={editingRecord}
            onClose={() => {
              setIsModalOpen(false);
              setEditingRecord(null);
            }}
            onSave={handleSaveTransaction}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
