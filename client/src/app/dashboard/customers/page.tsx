"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Search, Filter, TrendingUp, TrendingDown,
  Heart, Activity, ArrowUpRight, Building2, Mail,
  Zap, Crown, Rocket, ChevronDown, Calendar, X,
  Plus, Edit3, Trash2, Save, Loader2, CheckCircle2,
  AlertTriangle, Shield
} from "lucide-react";
import { customerApi, type CustomerData } from "@/lib/api";
import { toast } from "sonner";

// ── Helpers ──────────────────────────────────────────────

const PLAN_COLORS: Record<string, string> = {
  CORE: "#0a0a0a",
  PRIME: "#525252",
  APEX: "#171717",
};
const PLAN_ICONS: Record<string, React.ElementType> = { CORE: Zap, PRIME: Crown, APEX: Rocket };

function getHealthColor(score: number) {
  if (score >= 80) return "#171717";
  if (score >= 60) return "#525252";
  return "#e5484d";
}

function getStatusStyle(status: string) {
  const map: Record<string, { bg: string; text: string }> = {
    active: { bg: "#f0f0f0", text: "#171717" },
    churned: { bg: "#fff0f0", text: "#e5484d" },
    trial: { bg: "#f5f5f5", text: "#0a0a0a" },
    pending: { bg: "#f5f5f5", text: "#525252" },
  };
  return map[status] || map.pending;
}

// ── Stats Card ───────────────────────────────────────────

function StatsCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
  iconColor,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
  accent: string;
  iconColor: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white rounded-2xl p-5 border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col gap-3"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: accent }}>
        <Icon size={18} style={{ color: iconColor }} />
      </div>
      <div>
        <p className="text-[26px] font-semibold leading-none tracking-tight text-[#0a0a0a]">{value}</p>
        <p className="text-[12px] font-medium mt-1.5 uppercase tracking-wide text-[#737373]">{label}</p>
        <p className="text-[11px] mt-0.5 text-[#a3a3a3]">{sub}</p>
      </div>
    </motion.div>
  );
}

// ── Customer Row ─────────────────────────────────────────

function CustomerRow({
  customer,
  delay,
  onSelect,
  onEdit,
  onDelete,
}: {
  customer: CustomerData;
  delay: number;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const PlanIcon = PLAN_ICONS[customer.plan] || Zap;
  const status = getStatusStyle(customer.status);
  const healthColor = getHealthColor(customer.healthScore);
  const planColor = PLAN_COLORS[customer.plan] || "#0a0a0a";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 transition-colors hover:bg-[#fafafa] group border-b border-[#f2f2f2]"
    >
      {/* Avatar + Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" onClick={onSelect}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[12px] font-semibold flex-shrink-0"
          style={{ background: "#0a0a0a" }}
        >
          {customer.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-medium truncate text-[#0a0a0a] group-hover:text-[#0a0a0a] transition-colors">
            {customer.fullName}
          </p>
          <p className="text-[11px] truncate text-[#737373]">{customer.companyName || customer.email}</p>
        </div>
      </div>

      {/* Plan Badge */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md" style={{ background: `${planColor}12` }}>
        <PlanIcon size={12} style={{ color: planColor }} />
        <span className="text-[10px] font-semibold uppercase" style={{ color: planColor }}>{customer.plan}</span>
      </div>

      {/* Health Score */}
      <div className="flex items-center gap-2 w-28">
        <Heart size={13} style={{ color: healthColor }} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[11px] font-semibold" style={{ color: healthColor }}>{customer.healthScore}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#f2f2f2]">
            <div className="h-full rounded-full transition-all" style={{ width: `${customer.healthScore}%`, background: healthColor }} />
          </div>
        </div>
      </div>

      {/* Status */}
      <span
        className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full text-center"
        style={{ background: status.bg, color: status.text }}
      >
        {customer.status}
      </span>

      {/* Revenue */}
      <div className="text-right w-24">
        <p className="text-[14px] font-semibold text-[#0a0a0a]">${(customer.totalRevenue || 0).toLocaleString()}</p>
        <p className="text-[10px] font-medium text-[#a3a3a3]">lifetime</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          title="Edit Customer"
          className="w-7 h-7 rounded-lg flex items-center justify-center text-[#737373] hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/10 transition-colors"
        >
          <Edit3 size={13} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          title="Delete Customer"
          className="w-7 h-7 rounded-lg flex items-center justify-center text-[#737373] hover:text-[#e5484d] hover:bg-[#fff0f0] transition-colors"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </motion.div>
  );
}

// ── Customer Detail Panel ────────────────────────────────

function CustomerDetail({
  customer,
  onClose,
  onEdit,
  onDelete,
}: {
  customer: CustomerData;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const healthColor = getHealthColor(customer.healthScore);
  const PlanIcon = PLAN_ICONS[customer.plan] || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl p-6 border border-[#e5e5e5] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col gap-5 sticky top-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-[#0a0a0a]">Customer Details</h3>
        <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f5f5f5] transition-colors">
          <X size={15} className="text-[#737373]" />
        </button>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-[17px] font-semibold" style={{ background: "#0a0a0a" }}>
          {customer.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
        </div>
        <div>
          <p className="text-[16px] font-semibold text-[#0a0a0a]">{customer.fullName}</p>
          <p className="text-[12px] text-[#737373]">{customer.email}</p>
          <p className="text-[11px] font-medium text-[#0a0a0a]">{customer.companyName || "Independent Client"}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Plan", value: customer.plan, icon: PlanIcon },
          { label: "Health", value: `${customer.healthScore}%`, icon: Heart },
          { label: "Revenue", value: `$${(customer.totalRevenue || 0).toLocaleString()}`, icon: TrendingUp },
          { label: "Tasks Done", value: (customer.tasksCompleted || 0).toString(), icon: Activity },
          { label: "Operators", value: (customer.operatorsActive || 0).toString(), icon: Users },
          {
            label: "Joined",
            value: customer.joinedAt
              ? new Date(customer.joinedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
              : "Recently",
            icon: Calendar,
          },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl p-3.5 bg-[#f5f5f5]">
            <div className="flex items-center gap-1.5 mb-1">
              <stat.icon size={12} className="text-[#737373]" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#737373]">{stat.label}</span>
            </div>
            <p className="text-[15px] font-semibold text-[#0a0a0a]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="pt-2 border-t border-[#efefef] flex items-center gap-3">
        <button
          onClick={onEdit}
          className="flex-1 py-2 px-3 rounded-xl text-[12px] font-medium bg-[#f5f5f5] hover:bg-[#e5e5e5] text-[#0a0a0a] flex items-center justify-center gap-1.5 transition-colors"
        >
          <Edit3 size={13} /> Edit Customer
        </button>
        <button
          onClick={onDelete}
          className="py-2 px-3 rounded-xl text-[12px] font-medium bg-[#fff0f0] hover:bg-[#ffe5e5] text-[#e5484d] flex items-center justify-center gap-1.5 transition-colors"
        >
          <Trash2 size={13} /> Delete
        </button>
      </div>
    </motion.div>
  );
}

// ── Customer Form Modal (Create / Edit) ───────────────────

function CustomerModal({
  isOpen,
  initialData,
  onSave,
  onClose,
}: {
  isOpen: boolean;
  initialData?: CustomerData | null;
  onSave: (data: Partial<CustomerData>) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    companyName: "",
    plan: "CORE",
    status: "active",
    healthScore: 85,
    totalRevenue: 299,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        fullName: initialData.fullName || "",
        email: initialData.email || "",
        companyName: initialData.companyName || "",
        plan: initialData.plan || "CORE",
        status: initialData.status || "active",
        healthScore: initialData.healthScore ?? 85,
        totalRevenue: initialData.totalRevenue ?? 0,
      });
    } else {
      setForm({
        fullName: "",
        email: "",
        companyName: "",
        plan: "CORE",
        status: "active",
        healthScore: 85,
        totalRevenue: 299,
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email) {
      toast.error("Name and Email are required");
      return;
    }
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-3xl w-full max-w-lg shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#e5e5e5] overflow-hidden"
      >
        <div className="px-6 py-4.5 border-b border-[#e5e5e5] flex items-center justify-between bg-[#fafafa]">
          <div>
            <h3 className="text-[17px] font-semibold text-[#0a0a0a]">
              {initialData ? "Edit Customer Record" : "Add New Customer"}
            </h3>
            <p className="text-[12px] text-[#737373]">
              {initialData ? "Update customer profile and assigned plan" : "Create a client entry for autonomous operator provisioning"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#737373] hover:text-[#0a0a0a] hover:bg-[#efefef] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                placeholder="Sarah Jenkins"
                className="w-full px-3.5 py-2 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-4 focus:ring-[#0a0a0a]/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="sarah@company.com"
                className="w-full px-3.5 py-2 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-4 focus:ring-[#0a0a0a]/10 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))}
              placeholder="Acme Growth Labs"
              className="w-full px-3.5 py-2 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-4 focus:ring-[#0a0a0a]/10 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
                Plan
              </label>
              <select
                value={form.plan}
                onChange={(e) => setForm((p) => ({ ...p, plan: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] transition-all"
              >
                <option value="CORE">CORE ($299/mo)</option>
                <option value="PRIME">PRIME ($599/mo)</option>
                <option value="APEX">APEX ($1,299/mo)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] transition-all"
              >
                <option value="active">Active</option>
                <option value="trial">Trial</option>
                <option value="pending">Pending</option>
                <option value="churned">Churned</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
                Health Score ({form.healthScore}%)
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={form.healthScore}
                onChange={(e) => setForm((p) => ({ ...p, healthScore: Number(e.target.value) }))}
                className="w-full accent-[#171717] mt-2 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
                Lifetime Revenue ($)
              </label>
              <input
                type="number"
                min="0"
                value={form.totalRevenue}
                onChange={(e) => setForm((p) => ({ ...p, totalRevenue: Number(e.target.value) }))}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] transition-all"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#efefef] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-[13px] font-medium text-[#737373] hover:text-[#0a0a0a] transition-colors"
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
              <span>{initialData ? "Save Changes" : "Create Customer"}</span>
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

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [selected, setSelected] = useState<CustomerData | null>(null);
  const [stats, setStats] = useState<any>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerData | null>(null);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const [custRes, statsRes] = await Promise.all([
        customerApi.list({ search, status: statusFilter, plan: planFilter }),
        customerApi.getStats(),
      ]);
      setCustomers(custRes.customers || []);
      setStats(statsRes.stats);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, [search, statusFilter, planFilter]);

  const handleSaveCustomer = async (data: Partial<CustomerData>) => {
    try {
      if (editingCustomer) {
        await customerApi.update(editingCustomer._id, data);
        toast.success("Customer record updated!");
      } else {
        await customerApi.create(data);
        toast.success("Customer created successfully!");
      }
      setIsModalOpen(false);
      setEditingCustomer(null);
      fetchCustomers();
    } catch (e: any) {
      toast.error(e.message || "Failed to save customer");
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;
    try {
      await customerApi.remove(id);
      toast.success("Customer deleted");
      if (selected?._id === id) setSelected(null);
      fetchCustomers();
    } catch (e: any) {
      toast.error(e.message || "Failed to delete customer");
    }
  };

  return (
    <div className="flex-1 flex flex-col px-6 sm:px-10 py-6 sm:py-8 overflow-y-auto dash-scroll gap-7" style={{ background: "#f5f5f5" }}>
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-[#0a0a0a]">Customers</h1>
          <p className="text-[14px] font-normal mt-1 text-[#737373]">
            Manage client pipelines, operator assignments, and subscription health
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingCustomer(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-[13px] font-medium transition-all shadow-sm hover:opacity-90 active:scale-[0.98]"
            style={{ background: "#0a0a0a" }}
          >
            <Plus size={16} />
            <span>Add Customer</span>
          </button>
        </div>
      </header>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatsCard icon={Users} label="Total Customers" value={stats.total.toString()} sub="All-time accounts" accent="#f5f5f5" iconColor="#0a0a0a" delay={0} />
          <StatsCard icon={Activity} label="Active" value={stats.active.toString()} sub="Currently subscribed" accent="#f0f0f0" iconColor="#171717" delay={0.05} />
          <StatsCard icon={Heart} label="Avg Health" value={`${stats.avgHealthScore}%`} sub="Across active accounts" accent="#f5f5f5" iconColor="#525252" delay={0.1} />
          <StatsCard icon={TrendingDown} label="Churn Rate" value={`${stats.churnRate}%`} sub={`${stats.churned} churned`} accent="#fff0f0" iconColor="#e5484d" delay={0.15} />
        </div>
      )}

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a3a3a3]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers by name, email, or company..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-[13px] font-medium outline-none transition-all focus:ring-2 focus:ring-[#0a0a0a]/20 bg-white border border-[#e5e5e5] text-[#0a0a0a]"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-[13px] font-medium outline-none bg-white border border-[#e5e5e5] text-[#0a0a0a]"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="churned">Churned</option>
            <option value="trial">Trial</option>
            <option value="pending">Pending</option>
          </select>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-[13px] font-medium outline-none bg-white border border-[#e5e5e5] text-[#0a0a0a]"
          >
            <option value="">All Plans</option>
            <option value="CORE">Core</option>
            <option value="PRIME">Prime</option>
            <option value="APEX">Apex</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Customer List */}
        <div className={`${selected ? "lg:col-span-7" : "lg:col-span-12"}`}>
          <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
            {/* Table header */}
            <div className="px-5 py-3 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-wider text-[#737373] border-b border-[#e5e5e5] bg-[#fafafa]">
              <span className="flex-1">Customer</span>
              <span className="w-16 text-center">Plan</span>
              <span className="w-28 text-center">Health</span>
              <span className="w-20 text-center">Status</span>
              <span className="w-24 text-right">Revenue</span>
              <span className="w-16 text-right">Actions</span>
            </div>
            {loading ? (
              Array(5).fill(0).map((_, i) => <div key={i} className="shimmer h-[72px] border-b border-[#f2f2f2]" />)
            ) : customers.length === 0 ? (
              <div className="p-16 text-center">
                <Users size={40} className="mx-auto mb-4 text-[#a3a3a3]" />
                <p className="text-[16px] font-semibold text-[#0a0a0a]">No customers found</p>
                <p className="text-[13px] mt-1 text-[#737373]">Add your first customer entry or adjust filters</p>
                <button
                  onClick={() => {
                    setEditingCustomer(null);
                    setIsModalOpen(true);
                  }}
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[13px] font-medium shadow-sm"
                  style={{ background: "#0a0a0a" }}
                >
                  <Plus size={15} /> Add Customer
                </button>
              </div>
            ) : (
              customers.map((c, i) => (
                <CustomerRow
                  key={c._id}
                  customer={c}
                  delay={0.02 * i}
                  onSelect={() => setSelected(c)}
                  onEdit={() => {
                    setEditingCustomer(c);
                    setIsModalOpen(true);
                  }}
                  onDelete={() => handleDeleteCustomer(c._id)}
                />
              ))
            )}
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="lg:col-span-5">
            <CustomerDetail
              customer={selected}
              onClose={() => setSelected(null)}
              onEdit={() => {
                setEditingCustomer(selected);
                setIsModalOpen(true);
              }}
              onDelete={() => handleDeleteCustomer(selected._id)}
            />
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <CustomerModal
            isOpen={isModalOpen}
            initialData={editingCustomer}
            onSave={handleSaveCustomer}
            onClose={() => {
              setIsModalOpen(false);
              setEditingCustomer(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
