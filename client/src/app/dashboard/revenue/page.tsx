"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign, TrendingUp, TrendingDown, Minus,
  BarChart3, PieChart, ArrowUpRight, Calendar,
  CreditCard, Receipt, RefreshCw, Plus, Trash2,
  Edit3, X, Save, Loader2, CheckCircle2, Shield
} from "lucide-react";
import { revenueApi, type RevenueSummary, type RevenueRecord } from "@/lib/api";
import { toast } from "sonner";

// ── Helpers ──────────────────────────────────────────────

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(amount);
}

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`shimmer rounded-2xl ${className}`} />;
}

// ── Metric Card ──────────────────────────────────────────

function RevenueMetricCard({
  icon: Icon, label, value, sub, accent, iconColor, trend, trendVal, delay,
}: {
  icon: React.ElementType; label: string; value: string; sub: string;
  accent: string; iconColor: string; trend?: "up" | "down" | "stable"; trendVal?: string; delay?: number;
}) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "#171717" : trend === "down" ? "#e5484d" : "#737373";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay || 0, duration: 0.4 }}
      className="bg-white rounded-2xl p-5 border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: accent }}>
          <Icon size={18} style={{ color: iconColor }} />
        </div>
        {trend && trendVal && (
          <span className="flex items-center gap-1 text-[11px] font-semibold rounded-full px-2.5 py-1" style={{ background: `${trendColor}12`, color: trendColor }}>
            <TrendIcon size={12} /> {trendVal}
          </span>
        )}
      </div>
      <div>
        <p className="text-[26px] font-semibold leading-none tracking-tight text-[#0a0a0a]">{value}</p>
        <p className="text-[12px] font-medium mt-1.5 uppercase tracking-wide text-[#737373]">{label}</p>
        <p className="text-[11px] mt-0.5 text-[#a3a3a3]">{sub}</p>
      </div>
    </motion.div>
  );
}

// ── Bar Chart (Pure CSS) ─────────────────────────────────

function MiniBarChart({ data, maxVal }: { data: { month: string; total: number }[]; maxVal: number }) {
  return (
    <div className="flex items-end gap-2 h-44 px-2 pt-4">
      {data.map((d, i) => {
        const h = maxVal > 0 ? (d.total / maxVal) * 100 : 0;
        return (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.6, delay: 0.04 * i }}
              className="w-full rounded-t-lg min-h-[4px]"
              style={{ background: "linear-gradient(180deg, #0a0a0a, #404040)" }}
            />
            <span className="text-[9px] font-medium text-[#a3a3a3]">
              {d.month.split("-")[1]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Plan Breakdown Bars ──────────────────────────────────

function PlanBreakdown({ data }: { data: { plan: string; total: number; count: number }[] }) {
  const maxTotal = Math.max(...data.map((d) => d.total), 1);
  const planColors: Record<string, string> = {
    CORE: "#0a0a0a",
    PRIME: "#525252",
    APEX: "#171717",
  };

  return (
    <div className="flex flex-col gap-4">
      {data.map((d, i) => (
        <motion.div
          key={d.plan}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * i }}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${planColors[d.plan] || "#0a0a0a"}15` }}>
                <span className="w-2 h-2 rounded-full" style={{ background: planColors[d.plan] || "#0a0a0a" }} />
              </div>
              <span className="text-[13px] font-medium text-[#0a0a0a]">{d.plan}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-[#a3a3a3]">{d.count} txns</span>
              <span className="text-[14px] font-semibold text-[#0a0a0a]">{formatCurrency(d.total)}</span>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-[#f2f2f2]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(d.total / maxTotal) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.12 * i }}
              className="h-full rounded-full"
              style={{ background: planColors[d.plan] || "#0a0a0a" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Transaction Row ──────────────────────────────────────

function TransactionRow({
  record,
  delay,
  onEdit,
  onDelete,
}: {
  record: RevenueRecord;
  delay: number;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const statusColors: Record<string, string> = {
    paid: "#171717",
    pending: "#525252",
    failed: "#e5484d",
    refunded: "#737373",
  };
  const typeIcons: Record<string, React.ElementType> = {
    subscription: CreditCard,
    setup_fee: Receipt,
    addon: ArrowUpRight,
    refund: TrendingDown,
  };
  const Icon = typeIcons[record.type] || CreditCard;
  const statusColor = statusColors[record.status] || "#737373";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="px-5 py-3.5 flex items-center justify-between hover:bg-[#fafafa] transition-colors border-b border-[#f2f2f2] group"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#f5f5f5]">
          <Icon size={16} className="text-[#737373]" />
        </div>
        <div>
          <p className="text-[13px] font-medium text-[#0a0a0a]">{record.description || record.type}</p>
          <p className="text-[11px] text-[#737373]">
            {new Date(record.paidAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
          style={{ background: `${statusColor}12`, color: statusColor }}
        >
          {record.status}
        </span>
        <span className="text-[14px] font-semibold text-[#0a0a0a]">
          {record.type === "refund" ? "-" : ""}{formatCurrency(record.amount)}
        </span>

        {/* Action buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            title="Edit Status"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#737373] hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/10 transition-colors"
          >
            <Edit3 size={13} />
          </button>
          <button
            onClick={onDelete}
            title="Delete Record"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#737373] hover:text-[#e5484d] hover:bg-[#fff0f0] transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Transaction Modal (Create / Edit) ─────────────────────

function TransactionModal({
  isOpen,
  initialData,
  onSave,
  onClose,
}: {
  isOpen: boolean;
  initialData?: RevenueRecord | null;
  onSave: (data: Partial<RevenueRecord>) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    amount: 299,
    type: "subscription",
    plan: "CORE",
    status: "paid",
    description: "SoloChief Monthly Subscription",
    invoiceId: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        amount: initialData.amount,
        type: initialData.type,
        plan: initialData.plan || "CORE",
        status: initialData.status,
        description: initialData.description || "",
        invoiceId: (initialData as any).invoiceId || "",
      });
    } else {
      setForm({
        amount: 299,
        type: "subscription",
        plan: "CORE",
        status: "paid",
        description: "SoloChief Monthly Subscription",
        invoiceId: `INV-${Date.now().toString().slice(-6)}`,
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        className="bg-white rounded-3xl p-7 w-full max-w-md shadow-2xl border border-[#e5e5e5]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[18px] font-semibold text-[#0a0a0a]">
            {initialData ? "Edit Transaction" : "Record New Transaction"}
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f5f5f5]">
            <X size={16} className="text-[#737373]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
              Amount (USD) *
            </label>
            <input
              type="number"
              required
              min="1"
              value={form.amount}
              onChange={(e) => setForm((p) => ({ ...p, amount: Number(e.target.value) }))}
              className="w-full px-3.5 py-2 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
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
                <option value="setup_fee">Setup Fee</option>
                <option value="addon">Addon</option>
                <option value="refund">Refund</option>
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
                <option value="CORE">CORE</option>
                <option value="PRIME">PRIME</option>
                <option value="APEX">APEX</option>
              </select>
            </div>
          </div>

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
              Description
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="e.g. Q4 Autonomous Operator Renewal"
              className="w-full px-3.5 py-2 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] transition-all"
            />
          </div>

          <div className="pt-3 border-t border-[#efefef] flex items-center justify-end gap-3">
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
              <span>{initialData ? "Save" : "Record"}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════

export default function RevenuePage() {
  const [summary, setSummary] = useState<RevenueSummary | null>(null);
  const [records, setRecords] = useState<RevenueRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("30d");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<RevenueRecord | null>(null);

  const fetchRevenue = async () => {
    setLoading(true);
    try {
      const [sumRes, recRes] = await Promise.all([
        revenueApi.getSummary(),
        revenueApi.getRecords(period),
      ]);
      setSummary(sumRes.summary);
      setRecords(recRes.records || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRevenue();
  }, [period]);

  const handleSaveTransaction = async (data: Partial<RevenueRecord>) => {
    try {
      if (editingRecord) {
        await revenueApi.updateRecord(editingRecord._id, data);
        toast.success("Transaction updated!");
      } else {
        await revenueApi.createRecord(data);
        toast.success("Transaction recorded!");
      }
      setIsModalOpen(false);
      setEditingRecord(null);
      fetchRevenue();
    } catch (e: any) {
      toast.error(e.message || "Failed to save transaction");
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    if (!confirm("Delete this transaction entry?")) return;
    try {
      await revenueApi.deleteRecord(id);
      toast.success("Transaction deleted");
      fetchRevenue();
    } catch (e: any) {
      toast.error(e.message || "Failed to delete transaction");
    }
  };

  const maxMonthly = useMemo(() => {
    if (!summary) return 1;
    return Math.max(...summary.monthly.map((m) => m.total), 1);
  }, [summary]);

  return (
    <div className="flex-1 flex flex-col px-6 sm:px-10 py-6 sm:py-8 overflow-y-auto dash-scroll gap-7" style={{ background: "#f5f5f5" }}>
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-[#0a0a0a]">Revenue</h1>
          <p className="text-[14px] font-normal mt-1 text-[#737373]">Track and record your autonomous operator billings</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingRecord(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-[13px] font-medium transition-all shadow-sm hover:opacity-90 active:scale-[0.98]"
            style={{ background: "#0a0a0a" }}
          >
            <Plus size={16} />
            <span>Record Transaction</span>
          </button>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-white border border-[#e5e5e5]">
            {["7d", "30d", "90d", "1y"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="px-3.5 py-1.5 rounded-lg text-[12px] font-medium transition-all"
                style={period === p
                  ? { background: "#0a0a0a", color: "#ffffff" }
                  : { color: "#737373" }
                }
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Top Metrics */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, i) => <SkeletonBlock key={i} className="h-[120px]" />)}
        </div>
      ) : summary ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <RevenueMetricCard
            icon={DollarSign}
            label="Total Revenue"
            value={formatCurrency(summary.totalRevenue)}
            sub="All-time recorded"
            accent="#f0f0f0"
            iconColor="#171717"
            delay={0}
          />
          <RevenueMetricCard
            icon={TrendingUp}
            label="Current MRR"
            value={formatCurrency(summary.currentMRR)}
            sub="Monthly recurring"
            accent="#f5f5f5"
            iconColor="#0a0a0a"
            trend={summary.mrrGrowth >= 0 ? "up" : "down"}
            trendVal={`${summary.mrrGrowth}%`}
            delay={0.05}
          />
          <RevenueMetricCard
            icon={BarChart3}
            label="ARR Projection"
            value={formatCurrency(summary.arr)}
            sub="Annualized run-rate"
            accent="#f5f5f5"
            iconColor="#525252"
            delay={0.1}
          />
          <RevenueMetricCard
            icon={CreditCard}
            label="Active Subscriptions"
            value={summary.byPlan.reduce((acc, p) => acc + p.count, 0).toString()}
            sub="Across all active tiers"
            accent="#f5f5f5"
            iconColor="#0a0a0a"
            delay={0.15}
          />
        </div>
      ) : null}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Trend */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl p-6 border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[16px] font-semibold text-[#0a0a0a]">Monthly Revenue Trend</h3>
                <p className="text-[12px] text-[#737373]">Trailing 12 months performance</p>
              </div>
              <Calendar size={18} className="text-[#737373]" />
            </div>
            {summary && summary.monthly.length > 0 ? (
              <MiniBarChart data={summary.monthly} maxVal={maxMonthly} />
            ) : (
              <div className="h-44 flex items-center justify-center text-[13px] text-[#737373]">
                No monthly revenue records found
              </div>
            )}
          </div>
        </div>

        {/* Plan Breakdown */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl p-6 border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[16px] font-semibold text-[#0a0a0a]">Revenue by Plan</h3>
                <p className="text-[12px] text-[#737373]">Distribution across tiers</p>
              </div>
              <PieChart size={18} className="text-[#737373]" />
            </div>
            {summary && summary.byPlan.length > 0 ? (
              <PlanBreakdown data={summary.byPlan} />
            ) : (
              <div className="py-8 text-center text-[13px] text-[#737373]">
                No plan data available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between border-b border-[#e5e5e5]">
          <div>
            <h3 className="text-[16px] font-semibold text-[#0a0a0a]">Transaction History</h3>
            <p className="text-[12px] text-[#737373]">{records.length} transactions recorded</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col gap-0">
            {Array(4).fill(0).map((_, i) => <div key={i} className="shimmer h-[60px] border-b border-[#f2f2f2]" />)}
          </div>
        ) : records.length === 0 ? (
          <div className="p-16 text-center">
            <Receipt size={36} className="mx-auto mb-3 text-[#a3a3a3]" />
            <p className="text-[15px] font-semibold text-[#0a0a0a]">No transactions recorded</p>
            <p className="text-[12px] text-[#737373] mt-1">Record invoices or incoming subscription revenue</p>
            <button
              onClick={() => {
                setEditingRecord(null);
                setIsModalOpen(true);
              }}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[13px] font-medium shadow-sm"
              style={{ background: "#0a0a0a" }}
            >
              <Plus size={15} /> Record Transaction
            </button>
          </div>
        ) : (
          records.map((r, i) => (
            <TransactionRow
              key={r._id}
              record={r}
              delay={0.02 * i}
              onEdit={() => {
                setEditingRecord(r);
                setIsModalOpen(true);
              }}
              onDelete={() => handleDeleteTransaction(r._id)}
            />
          ))
        )}
      </div>

      {/* Transaction Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <TransactionModal
            isOpen={isModalOpen}
            initialData={editingRecord}
            onSave={handleSaveTransaction}
            onClose={() => {
              setIsModalOpen(false);
              setEditingRecord(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
