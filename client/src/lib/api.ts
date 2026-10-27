// ═══════════════════════════════════════════════════════════
// SoloChief API Client — Replaces Firebase SDK
// All communication with MongoDB goes through the Express backend
// ═══════════════════════════════════════════════════════════

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ── Token Management ─────────────────────────────────────
function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("sc_token");
}

function setToken(token: string) {
  localStorage.setItem("sc_token", token);
}

function removeToken() {
  localStorage.removeItem("sc_token");
}

// ── Base Fetch ───────────────────────────────────────────
async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> || {}),
  };

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });
  } catch (error) {
    if (error instanceof TypeError) {
      const localApi = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(API_BASE);
      throw new Error(
        localApi
          ? "The local sign-in service is unavailable. Run `npm run dev` from the project root and retry in a few seconds."
          : "Unable to reach the SoloChief API. Check your connection and try again."
      );
    }
    throw error;
  }

  let data: any;
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      data = await res.json();
    } catch {
      data = { message: res.statusText || `HTTP ${res.status}` };
    }
  } else {
    const text = await res.text();
    data = { message: text || res.statusText || `HTTP ${res.status}` };
  }

  if (!res.ok) {
    throw new Error(data?.message || `API Error: ${res.status}`);
  }

  return data;
}

// ═══════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: "user" | "admin";
  plan: "CORE" | "PRIME" | "APEX" | null;
  status: string;
  companyName?: string;
  bookingStatus?: string;
}

export const authApi = {
  async signUp(email: string, password: string, fullName: string) {
    const data = await apiFetch<{ success: boolean; token: string; user: AuthUser }>("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, fullName }),
    });
    setToken(data.token);
    return data;
  },

  async signIn(email: string, password: string) {
    const data = await apiFetch<{ success: boolean; token: string; user: AuthUser }>("/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    return data;
  },

  async getMe() {
    return apiFetch<{ success: boolean; user: AuthUser }>("/auth/me");
  },

  async updatePassword(currentPassword: string, newPassword: string) {
    return apiFetch("/auth/password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  signOut() {
    removeToken();
  },

  isAuthenticated() {
    return !!getToken();
  },
};

// ═══════════════════════════════════════════════════════════
// USERS / PROFILE
// ═══════════════════════════════════════════════════════════

export const userApi = {
  async getProfile() {
    return apiFetch<{ success: boolean; user: any }>("/users/profile");
  },

  async updateProfile(data: Record<string, any>) {
    return apiFetch<{ success: boolean; user: any }>("/users/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteAccount() {
    const data = await apiFetch("/users/account", { method: "DELETE" });
    removeToken();
    return data;
  },
};

// ═══════════════════════════════════════════════════════════
// REVENUE
// ═══════════════════════════════════════════════════════════

export interface RevenueRecord {
  _id: string;
  type: string;
  amount: number;
  currency: string;
  plan: string;
  status: string;
  description: string;
  paidAt: string;
}

export interface RevenueSummary {
  totalRevenue: number;
  currentMRR: number;
  arr: number;
  mrrGrowth: number;
  monthly: { month: string; total: number; count: number }[];
  byPlan: { plan: string; total: number; count: number }[];
}

export const revenueApi = {
  async getRecords(period = "30d", page = 1) {
    return apiFetch<{ success: boolean; records: RevenueRecord[]; total: number; pages: number }>(
      `/revenue?period=${period}&page=${page}`
    );
  },

  async getSummary() {
    return apiFetch<{ success: boolean; summary: RevenueSummary }>("/revenue/summary");
  },

  async createRecord(data: Partial<RevenueRecord>) {
    return apiFetch<{ success: boolean; record: RevenueRecord }>("/revenue", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateRecord(id: string, data: Partial<RevenueRecord>) {
    return apiFetch<{ success: boolean; record: RevenueRecord }>(`/revenue/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteRecord(id: string) {
    return apiFetch<{ success: boolean; message: string }>(`/revenue/${id}`, {
      method: "DELETE",
    });
  },
};

// ═══════════════════════════════════════════════════════════
// CONNECTORS
// ═══════════════════════════════════════════════════════════

export interface ConnectorData {
  _id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected" | "error" | "pending";
  lastSyncAt: string;
  syncFrequency: string;
  eventsProcessed: number;
  config?: { apiKey?: string; webhookUrl?: string };
}

export interface ConnectorUpdate {
  name?: string;
  syncFrequency?: string;
  config?: { apiKey?: string; webhookUrl?: string };
}

export const connectorApi = {
  async list() {
    return apiFetch<{ success: boolean; connectors: ConnectorData[] }>("/connectors");
  },

  async create(data: { name: string; type: string; config?: any; syncFrequency?: string }) {
    return apiFetch<{ success: boolean; connector: ConnectorData }>("/connectors", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async toggle(id: string) {
    return apiFetch<{ success: boolean; connector: ConnectorData }>(`/connectors/${id}/toggle`, {
      method: "PATCH",
    });
  },

  async update(id: string, data: ConnectorUpdate) {
    return apiFetch<{ success: boolean; connector: ConnectorData }>(`/connectors/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async remove(id: string) {
    return apiFetch(`/connectors/${id}`, { method: "DELETE" });
  },
};

// ═══════════════════════════════════════════════════════════
// CUSTOMERS
// ═══════════════════════════════════════════════════════════

export interface CustomerData {
  _id: string;
  fullName: string;
  email: string;
  companyName: string;
  plan: string;
  status: string;
  healthScore: number;
  totalRevenue: number;
  lastActivityAt: string;
  operatorsActive: number;
  tasksCompleted: number;
  joinedAt: string;
  tags: string[];
}

export const customerApi = {
  async list(params?: { search?: string; status?: string; plan?: string; page?: number }) {
    const q = new URLSearchParams();
    if (params?.search) q.set("search", params.search);
    if (params?.status) q.set("status", params.status);
    if (params?.plan) q.set("plan", params.plan);
    if (params?.page) q.set("page", String(params.page));
    return apiFetch<{ success: boolean; customers: CustomerData[]; total: number; pages: number }>(
      `/customers?${q.toString()}`
    );
  },

  async getById(id: string) {
    return apiFetch<{ success: boolean; customer: CustomerData }>(`/customers/${id}`);
  },

  async getStats() {
    return apiFetch<{ success: boolean; stats: any }>("/customers/stats/overview");
  },

  async create(data: Partial<CustomerData>) {
    return apiFetch<{ success: boolean; customer: CustomerData }>("/customers", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: Partial<CustomerData>) {
    return apiFetch<{ success: boolean; customer: CustomerData }>(`/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async remove(id: string) {
    return apiFetch<{ success: boolean; message: string }>(`/customers/${id}`, {
      method: "DELETE",
    });
  },
};

// ═══════════════════════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════════════════════

export interface SettingsData {
  general: { timezone: string; language: string; dateFormat: string; theme: string };
  notifications: Record<string, boolean>;
  security: { twoFactorEnabled: boolean; sessionTimeout: number; ipWhitelist: string[] };
  billing: { autoRenew: boolean; paymentMethod: string; billingEmail: string };
  api: { apiKey: string; apiKeyCreatedAt: string | null; rateLimitPerMinute: number };
}

export const settingsApi = {
  async get() {
    return apiFetch<{ success: boolean; settings: SettingsData }>("/settings");
  },

  async update(data: Partial<SettingsData>) {
    return apiFetch<{ success: boolean; settings: SettingsData }>("/settings", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async generateApiKey() {
    return apiFetch<{ success: boolean; apiKey: string }>("/settings/generate-api-key", {
      method: "POST",
    });
  },
};

// ═══════════════════════════════════════════════════════════
// ADMIN
// ═══════════════════════════════════════════════════════════

export const adminApi = {
  async getOverview() {
    return apiFetch<{ success: boolean; overview: any }>("/admin/overview");
  },

  async listUsers(params?: { search?: string; status?: string; role?: string; plan?: string; page?: number }) {
    const q = new URLSearchParams();
    if (params?.search) q.set("search", params.search);
    if (params?.status) q.set("status", params.status);
    if (params?.role) q.set("role", params.role);
    if (params?.plan) q.set("plan", params.plan);
    if (params?.page) q.set("page", String(params.page));
    return apiFetch<{ success: boolean; users: any[]; total: number; pages: number }>(
      `/admin/users?${q.toString()}`
    );
  },

  async createUser(data: { email: string; fullName: string; password?: string; role?: string; plan?: string; status?: string; companyName?: string }) {
    return apiFetch<{ success: boolean; user: any }>("/admin/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateUser(id: string, data: Record<string, any>) {
    return apiFetch(`/admin/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteUser(id: string) {
    return apiFetch(`/admin/users/${id}`, { method: "DELETE" });
  },

  async getRevenue() {
    return apiFetch<{ success: boolean; revenue: any }>("/admin/revenue");
  },

  async listTransactions(params?: { status?: string; page?: number }) {
    const q = new URLSearchParams();
    if (params?.status) q.set("status", params.status);
    if (params?.page) q.set("page", String(params.page));
    return apiFetch<{ success: boolean; transactions: any[]; total: number; pages: number }>(
      `/admin/transactions?${q.toString()}`
    );
  },
};
