"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SoloChiefLogo } from "@/components/SoloChiefLogo";
import { authApi } from "@/lib/api";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, Users, DollarSign, Settings,
  LogOut, Shield, ChevronLeft, X, Menu,
} from "lucide-react";

const ADMIN_NAV = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "User Management", href: "/admin/users", icon: Users },
  { label: "Revenue Analytics", href: "/admin/revenue", icon: DollarSign },
  { label: "Platform Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await authApi.getMe();
        if (res.user.role !== "admin") {
          router.replace("/dashboard");
          return;
        }
        setUser(res.user);
      } catch {
        router.replace("/login");
      }
      setLoading(false);
    }
    checkAdmin();
  }, [router]);

  const handleSignOut = () => {
    authApi.signOut();
    router.push("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5f5f5" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] border-t-transparent animate-spin" />
          <p className="text-[13px] font-medium" style={{ color: "#737373" }}>Loading admin panel…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#f5f5f5" }}>
      {/* Mobile toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
          style={{ background: "#0a0a0a" }}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[260px] lg:relative lg:translate-x-0 transition-transform duration-300 flex flex-col h-full shrink-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-[110%] lg:translate-x-0"}`}
        style={{
          background: "#ffffff",
          borderRight: "1px solid #e5e5e5",
        }}
      >
        {/* Logo */}
        <div className="px-6 pt-7 pb-6">
          <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setSidebarOpen(false)}>
            <SoloChiefLogo size={36} className="group-hover:scale-105 transition-transform duration-300" />
            <span className="text-[17px] font-semibold tracking-tight" style={{ color: "#0a0a0a" }}>SoloChief</span>
          </Link>
        </div>

        {/* Admin badge */}
        <div className="mx-4 mb-6 px-4 py-2.5 rounded-[12px] flex items-center gap-3" style={{ background: "#f5f5f5" }}>
          <div className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{ background: "#e5484d" }}>
            <Shield size={14} className="text-white" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#0a0a0a" }}>Admin</p>
            <p className="text-[10px] font-medium" style={{ color: "#737373" }}>Full Access</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-0.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-3" style={{ color: "#737373" }}>Management</p>
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-[10px] transition-all duration-200 text-[13px] font-medium ${
                  isActive
                    ? "text-[#0a0a0a] font-semibold"
                    : "text-[#0a0a0a] hover:bg-[#f5f5f5]"
                }`}
                style={isActive ? { background: "rgba(10,10,10, 0.08)" } : {}}
              >
                <Icon size={18} style={{ color: isActive ? "#0a0a0a" : "#737373" }} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Back to dashboard */}
          <div className="pt-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-3" style={{ color: "#737373" }}>Quick Links</p>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13px] font-medium text-[#737373] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] transition-all"
            >
              <ChevronLeft size={16} />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </nav>

        {/* User footer */}
        <div className="mt-auto mx-3 mb-4 rounded-[12px] p-3" style={{ borderTop: "1px solid #e5e5e5" }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-[12px] flex-shrink-0"
              style={{ background: "#0a0a0a" }}
            >
              {user.fullName?.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) || "AD"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold truncate" style={{ color: "#0a0a0a" }}>{user.fullName}</p>
              <p className="text-[10px] truncate" style={{ color: "#737373" }}>{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-[8px] text-[12px] font-medium transition-all hover:bg-[#fff1f0]"
            style={{ color: "#737373" }}
          >
            <LogOut size={13} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Backdrop */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 overflow-hidden flex flex-col relative z-10 w-full">
        <div className="h-full overflow-y-auto w-full dash-scroll">{children}</div>
      </main>
    </div>
  );
}
