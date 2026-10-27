"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Search, Shield, Zap, Crown, Rocket,
  Trash2, Edit3, X, Save, Loader2, Plus,
  Building2, Mail, Lock, UserCheck
} from "lucide-react";
import { adminApi } from "@/lib/api";
import { toast } from "sonner";

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`shimmer rounded-2xl ${className}`} />;
}

const PLAN_ICONS: Record<string, React.ElementType> = { CORE: Zap, PRIME: Crown, APEX: Rocket };
const PLAN_COLORS: Record<string, string> = { CORE: "#0a0a0a", PRIME: "#525252", APEX: "#171717" };

function getStatusStyle(status: string) {
  const map: Record<string, { bg: string; text: string }> = {
    active: { bg: "#f0f0f0", text: "#171717" },
    suspended: { bg: "#fff0f0", text: "#e5484d" },
    pending: { bg: "#f5f5f5", text: "#525252" },
  };
  return map[status] || map.pending;
}

// ── Create User Modal ─────────────────────────────────────

function CreateUserModal({
  isOpen,
  onClose,
  onCreate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => Promise<void>;
}) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "user",
    plan: "CORE",
    status: "active",
    companyName: "",
  });
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email) {
      toast.error("Name and Email are required");
      return;
    }
    setSaving(true);
    await onCreate(form);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl p-7 w-full max-w-lg shadow-2xl border border-[#e5e5e5]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-[18px] font-semibold text-[#0a0a0a]">Add New User</h3>
            <p className="text-[12px] text-[#737373]">Create an account with role and plan credentials</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f5f5f5] transition-colors">
            <X size={16} className="text-[#737373]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Marcus Vance"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-4 focus:ring-[#0a0a0a]/10 transition-all"
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
                placeholder="marcus@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-4 focus:ring-[#0a0a0a]/10 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
                Temporary Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                placeholder="Defaults to tempPass123!"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-4 focus:ring-[#0a0a0a]/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
                Company / Organization
              </label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))}
                placeholder="Vance Capital"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-4 focus:ring-[#0a0a0a]/10 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3.5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
                Role
              </label>
              <select
                value={form.role}
                onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] transition-all"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
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

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737373] mb-1">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] text-[13px] text-[#0a0a0a] focus:bg-white focus:outline-none focus:border-[#0a0a0a] transition-all"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-[#efefef] flex items-center justify-end gap-3">
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
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              <span>Create User</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ── Edit Modal ───────────────────────────────────────────

function EditUserModal({ user, onSave, onClose }: { user: any; onSave: (id: string, data: any) => void; onClose: () => void }) {
  const [form, setForm] = useState({
    fullName: user.fullName || "",
    companyName: user.companyName || "",
    status: user.status,
    role: user.role,
    plan: user.plan || "",
    bookingStatus: user.bookingStatus || "none"
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(user._id, form);
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-3xl p-7 w-full max-w-md shadow-2xl border border-[#e5e5e5]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[18px] font-semibold text-[#0a0a0a]">Edit User Profile</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f5f5f5] transition-colors">
            <X size={16} className="text-[#737373]" />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6 p-3 rounded-2xl bg-[#f5f5f5]">
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-[13px] bg-[#0a0a0a]">
            {user.fullName?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-[#0a0a0a] truncate">{user.fullName}</p>
            <p className="text-[12px] text-[#737373] truncate">{user.email}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block text-[#737373]">Full Name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm(p => ({ ...p, fullName: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl text-[13px] font-medium outline-none transition-all focus:ring-2 focus:ring-[#0a0a0a]/20 bg-[#f5f5f5] border border-[#e5e5e5] text-[#0a0a0a]"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block text-[#737373]">Company</label>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => setForm(p => ({ ...p, companyName: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl text-[13px] font-medium outline-none transition-all focus:ring-2 focus:ring-[#0a0a0a]/20 bg-[#f5f5f5] border border-[#e5e5e5] text-[#0a0a0a]"
            />
          </div>

          {[
            { key: "status", label: "Status", options: ["active", "pending", "suspended"] },
            { key: "role", label: "Role", options: ["user", "admin"] },
            { key: "plan", label: "Plan", options: ["", "CORE", "PRIME", "APEX"] },
            { key: "bookingStatus", label: "Booking Status", options: ["none", "pending", "active", "cancelled"] },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block text-[#737373]">{field.label}</label>
              <select
                value={(form as any)[field.key]}
                onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl text-[13px] font-medium outline-none transition-all focus:ring-2 focus:ring-[#0a0a0a]/20 bg-[#f5f5f5] border border-[#e5e5e5] text-[#0a0a0a]"
              >
                {field.options.map((o) => <option key={o} value={o}>{o || "None"}</option>)}
              </select>
            </div>
          ))}

          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[#efefef]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full text-[13px] font-medium transition-all bg-[#f5f5f5] hover:bg-[#e5e5e5] text-[#737373]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-full text-[13px] font-medium text-white flex items-center justify-center gap-1.5 transition-all hover:opacity-90 shadow-sm"
              style={{ background: "#0a0a0a" }}
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ADMIN USERS PAGE
// ═══════════════════════════════════════════════════════════

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [editUser, setEditUser] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await adminApi.listUsers({ search, status: statusFilter, role: roleFilter, page });
      setUsers(res.users);
      setTotal(res.total);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, [search, statusFilter, roleFilter, page]);

  const handleCreateUser = async (data: any) => {
    try {
      await adminApi.createUser(data);
      toast.success("User created successfully!");
      setIsCreateOpen(false);
      fetchUsers();
    } catch (e: any) {
      toast.error(e.message || "Failed to create user");
    }
  };

  const handleUpdateUser = async (id: string, data: any) => {
    try {
      await adminApi.updateUser(id, data);
      toast.success("User updated!");
      fetchUsers();
    } catch (e: any) { toast.error(e.message); }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Delete this user permanently?")) return;
    try {
      await adminApi.deleteUser(id);
      toast.success("User deleted");
      fetchUsers();
    } catch (e: any) { toast.error(e.message); }
  };

  return (
    <div className="flex-1 flex flex-col px-6 sm:px-10 py-6 sm:py-8 overflow-y-auto dash-scroll gap-6" style={{ background: "#f5f5f5" }}>
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-[#0a0a0a]">User Management</h1>
          <p className="text-[14px] font-normal mt-1 text-[#737373]">{total} registered enterprise and customer accounts</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-[13px] font-medium transition-all shadow-sm hover:opacity-90 active:scale-[0.98]"
            style={{ background: "#0a0a0a" }}
          >
            <Plus size={16} />
            <span>New User</span>
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a3a3a3]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name or email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-[13px] font-medium outline-none transition-all focus:ring-2 focus:ring-[#0a0a0a]/20 bg-white border border-[#e5e5e5] text-[#0a0a0a]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl text-[13px] font-medium outline-none bg-white border border-[#e5e5e5] text-[#0a0a0a]"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl text-[13px] font-medium outline-none bg-white border border-[#e5e5e5] text-[#0a0a0a]"
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* User list */}
      <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
        {loading ? (
          <div className="flex flex-col gap-0">
            {Array(6).fill(0).map((_, i) => <div key={i} className="shimmer h-[64px] border-b border-[#f2f2f2]" />)}
          </div>
        ) : users.length === 0 ? (
          <div className="p-16 text-center">
            <Users size={36} className="mx-auto mb-3 text-[#a3a3a3]" />
            <p className="text-[15px] font-semibold text-[#0a0a0a]">No users found</p>
            <p className="text-[12px] text-[#737373] mt-1">Try modifying your search or filters</p>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[13px] font-medium shadow-sm"
              style={{ background: "#0a0a0a" }}
            >
              <Plus size={15} /> Create First User
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#f2f2f2]">
            {users.map((u, i) => {
              const PlanIcon = PLAN_ICONS[u.plan] || Zap;
              const planColor = PLAN_COLORS[u.plan] || "#0a0a0a";
              const status = getStatusStyle(u.status);

              return (
                <motion.div
                  key={u._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.02 * i }}
                  className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#fafafa] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-[12px] flex-shrink-0 bg-[#0a0a0a]">
                      {u.fullName?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] font-semibold truncate text-[#0a0a0a]">{u.fullName}</p>
                        {u.role === "admin" && (
                          <span className="flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f5f5f5] text-[#0a0a0a]">
                            <Shield size={9} /> Admin
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#737373] truncate">{u.email} {u.companyName ? `· ${u.companyName}` : ""}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {u.plan && (
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-md" style={{ background: `${planColor}12` }}>
                        <PlanIcon size={12} style={{ color: planColor }} />
                        <span className="text-[10px] font-bold uppercase" style={{ color: planColor }}>{u.plan}</span>
                      </div>
                    )}

                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full text-center"
                      style={{ background: status.bg, color: status.text }}
                    >
                      {u.status}
                    </span>

                    <span className="text-[11px] text-[#a3a3a3] hidden md:inline">
                      {new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditUser(u)}
                        title="Edit User"
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#f5f5f5] text-[#737373] hover:text-[#0a0a0a] transition-colors"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        title="Delete User"
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#fff0f0] text-[#737373] hover:text-[#e5484d] transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editUser && (
          <EditUserModal user={editUser} onSave={handleUpdateUser} onClose={() => setEditUser(null)} />
        )}
      </AnimatePresence>

      {/* Create Modal */}
      <AnimatePresence>
        {isCreateOpen && (
          <CreateUserModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onCreate={handleCreateUser} />
        )}
      </AnimatePresence>
    </div>
  );
}
