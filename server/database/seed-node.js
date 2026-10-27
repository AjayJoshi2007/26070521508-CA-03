// ═══════════════════════════════════════════════════════════
// Node.js Seed Script — SoloChief
// Run from server dir:     node database/seed-node.js
// ═══════════════════════════════════════════════════════════

const path = require("path");

// ── Resolve server dir regardless of cwd ─────────────────
const BACKEND_DIR = path.resolve(__dirname, "..");

// Load env from server/.env
require("dotenv").config({ path: path.join(BACKEND_DIR, ".env") });

// Point require() to server's node_modules
const Module = require("module");
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  try {
    return originalResolve.call(this, request, parent, isMain, options);
  } catch (_) {
    return originalResolve.call(this, request, {
      ...parent,
      filename: path.join(BACKEND_DIR, "server.js"),
      paths: [path.join(BACKEND_DIR, "node_modules")],
    }, isMain, options);
  }
};

const mongoose = require(path.join(BACKEND_DIR, "node_modules/mongoose"));
const bcrypt   = require(path.join(BACKEND_DIR, "node_modules/bcryptjs"));

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    plan: { type: String, enum: ["CORE", "PRIME", "APEX", null], default: null },
    status: { type: String, enum: ["active", "pending", "suspended"], default: "active" },
    companyName: { type: String, default: "" },
    companyInfo: { type: String, default: "" },
    domainName: { type: String, default: "" },
    sector: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    outputEmails: [{ type: String }],
    avatar: { type: String, default: "" },
    timezone: { type: String, default: "UTC" },
    language: { type: String, default: "en" },
    twoFactorEnabled: { type: Boolean, default: false },
    notificationPrefs: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      inApp: { type: Boolean, default: true },
      weeklyReport: { type: Boolean, default: true },
    },
    lastLoginAt: { type: Date },
    bookingStatus: { type: String, enum: ["none", "pending", "active", "cancelled"], default: "none" },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const revenueSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["subscription", "setup_fee", "addon", "refund"], required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    plan: { type: String, enum: ["CORE", "PRIME", "APEX"], required: true },
    status: { type: String, enum: ["paid", "pending", "failed", "refunded"], default: "paid" },
    invoiceId: { type: String, default: "" },
    description: { type: String, default: "" },
    billingPeriodStart: { type: Date },
    billingPeriodEnd: { type: Date },
    paidAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const connectorSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["slack", "gmail", "hubspot", "zapier", "notion", "sheets", "webhook", "api", "salesforce", "stripe"],
      required: true,
    },
    status: { type: String, enum: ["connected", "disconnected", "error", "pending"], default: "disconnected" },
    config: {
      apiKey: { type: String, default: "" },
      webhookUrl: { type: String, default: "" },
      accessToken: { type: String, default: "" },
      refreshToken: { type: String, default: "" },
      metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    },
    lastSyncAt: { type: Date },
    syncFrequency: { type: String, enum: ["realtime", "hourly", "daily", "weekly"], default: "daily" },
    eventsProcessed: { type: Number, default: 0 },
    errorMessage: { type: String, default: "" },
  },
  { timestamps: true }
);

const customerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    companyName: { type: String, default: "" },
    plan: { type: String, enum: ["CORE", "PRIME", "APEX"], required: true },
    status: { type: String, enum: ["active", "churned", "trial", "pending"], default: "active" },
    healthScore: { type: Number, min: 0, max: 100, default: 80 },
    totalRevenue: { type: Number, default: 0 },
    lastActivityAt: { type: Date, default: Date.now },
    operatorsActive: { type: Number, default: 0 },
    tasksCompleted: { type: Number, default: 0 },
    joinedAt: { type: Date, default: Date.now },
    notes: { type: String, default: "" },
    tags: [{ type: String }],
    activityLog: [
      {
        action: { type: String },
        description: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const settingsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    general: {
      timezone: { type: String, default: "UTC" },
      language: { type: String, default: "en" },
      dateFormat: { type: String, default: "MM/DD/YYYY" },
      theme: { type: String, enum: ["light", "dark", "system"], default: "light" },
    },
    notifications: {
      emailAlerts: { type: Boolean, default: true },
      pushNotifications: { type: Boolean, default: true },
      inAppNotifications: { type: Boolean, default: true },
      weeklyReport: { type: Boolean, default: true },
      operatorAlerts: { type: Boolean, default: true },
      securityAlerts: { type: Boolean, default: true },
    },
    security: {
      twoFactorEnabled: { type: Boolean, default: false },
      sessionTimeout: { type: Number, default: 30 },
      ipWhitelist: [{ type: String }],
    },
    billing: {
      autoRenew: { type: Boolean, default: true },
      paymentMethod: { type: String, default: "" },
      billingEmail: { type: String, default: "" },
    },
    api: {
      apiKey: { type: String, default: "" },
      apiKeyCreatedAt: { type: Date },
      rateLimitPerMinute: { type: Number, default: 60 },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Revenue = mongoose.model("Revenue", revenueSchema);
const Connector = mongoose.model("Connector", connectorSchema);
const Customer = mongoose.model("Customer", customerSchema);
const Settings = mongoose.model("Settings", settingsSchema);

// ── Sample data ───────────────────────────────────────────
const PLAN_PRICES = { CORE: 498, PRIME: 898, APEX: 1498 };

const DEMO_USERS = [
  { fullName: "SoloChief Admin",  email: "admin@solochief.com",  role: "admin", plan: "APEX",  company: "SoloChief Labs",       sector: "Technology",      bookingStatus: "active" },
  { fullName: "Alex Chen",        email: "alex@techstartup.io",  role: "user",  plan: "APEX",  company: "TechStartup",          sector: "Technology",      bookingStatus: "active" },
  { fullName: "Sarah Johnson",    email: "sarah@growthco.com",   role: "user",  plan: "PRIME", company: "GrowthCo",             sector: "Marketing",       bookingStatus: "active" },
  { fullName: "Marcus Lee",       email: "marcus@digitalops.co", role: "user",  plan: "CORE",  company: "Digital Operations",   sector: "Finance",         bookingStatus: "active" },
  { fullName: "Priya Patel",      email: "priya@nexgen.ai",      role: "user",  plan: "APEX",  company: "NexGen AI",            sector: "Technology",      bookingStatus: "active" },
  { fullName: "James Wilson",     email: "james@scalehq.io",     role: "user",  plan: "PRIME", company: "ScaleHQ",              sector: "SaaS",            bookingStatus: "active" },
  { fullName: "Maria Garcia",     email: "maria@brandcraft.co",  role: "user",  plan: "CORE",  company: "BrandCraft",           sector: "Design",          bookingStatus: "active" },
  { fullName: "David Kim",        email: "david@quantumleap.dev",role: "user",  plan: "APEX",  company: "QuantumLeap",          sector: "Technology",      bookingStatus: "active" },
  { fullName: "Emily Ross",       email: "emily@cloudpeak.io",   role: "user",  plan: "PRIME", company: "CloudPeak",            sector: "Infrastructure",  bookingStatus: "active" },
];

const CONNECTOR_TYPES = [
  { name: "Slack Workspace",   type: "slack"      },
  { name: "Gmail Integration", type: "gmail"      },
  { name: "HubSpot CRM",       type: "hubspot"    },
  { name: "Zapier Automation", type: "zapier"     },
  { name: "Notion Workspace",  type: "notion"     },
  { name: "Google Sheets",     type: "sheets"     },
  { name: "Stripe Payments",   type: "stripe"     },
  { name: "Salesforce CRM",    type: "salesforce" },
  { name: "Custom Webhook",    type: "webhook"    },
  { name: "REST API",          type: "api"        },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seed() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/solochief";
  let localMongo;

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    console.log("✅ Connected to MongoDB");
  } catch {
    // Fall back to mongodb-memory-server (same as server.js)
    console.warn("⚠️  Local MongoDB not found — using mongodb-memory-server...");
    const { MongoMemoryServer } = require(path.join(BACKEND_DIR, "node_modules/mongodb-memory-server"));
    const fs = require("fs/promises");
    const dbPath = path.join(__dirname, "../.data/mongodb");
    await fs.mkdir(dbPath, { recursive: true });
    localMongo = await MongoMemoryServer.create({
      instance: { dbPath, ip: "127.0.0.1", port: 27017 },
    });
    await mongoose.connect(localMongo.getUri("solochief"), { serverSelectionTimeoutMS: 10000 });
    console.log("✅ mongodb-memory-server started");
  }

  // ── Wipe existing seed data ───────────────────────────
  console.log("\n🗑️  Clearing existing data...");
  await Promise.all([
    User.deleteMany({}),
    Revenue.deleteMany({}),
    Connector.deleteMany({}),
    Customer.deleteMany({}),
    Settings.deleteMany({}),
  ]);

  // ── Create users ──────────────────────────────────────
  console.log("👤 Creating users...");
  const PASSWORD = "admin123";
  const createdUsers = [];

  for (const u of DEMO_USERS) {
    const user = await User.create({
      fullName: u.fullName,
      email: u.email,
      password: PASSWORD,
      role: u.role,
      plan: u.plan,
      status: "active",
      companyName: u.company,
      companyInfo: u.sector + " company using SoloChief AI operators",
      domainName: u.email.split("@")[1],
      sector: u.sector,
      outputEmails: [u.email],
      bookingStatus: u.bookingStatus,
      timezone: "UTC",
      language: "en",
    });
    createdUsers.push({ user, meta: u });
    console.log(`   ✓ ${u.email}`);
  }

  // ── Create settings ───────────────────────────────────
  console.log("⚙️  Creating settings...");
  for (const { user } of createdUsers) {
    await Settings.create({ userId: user._id });
  }

  // ── Create revenue records ────────────────────────────
  console.log("💰 Creating revenue records...");
  let revenueCount = 0;
  for (const { user, meta } of createdUsers) {
    const plan = meta.plan;
    const price = PLAN_PRICES[plan];

    // Setup fee
    await Revenue.create({
      userId: user._id,
      type: "setup_fee",
      amount: Math.round(price * 0.3),
      currency: "USD",
      plan,
      status: "paid",
      invoiceId: `INV-SETUP-${Date.now()}-${rand(100, 999)}`,
      description: `${plan} Plan — Setup Fee (30%)`,
      paidAt: new Date(Date.now() - 75 * 86400000),
    });
    revenueCount++;

    // Monthly subscriptions (last 6 months)
    for (let m = 5; m >= 0; m--) {
      const paidAt = new Date(Date.now() - m * 30 * 86400000);
      await Revenue.create({
        userId: user._id,
        type: "subscription",
        amount: price,
        currency: "USD",
        plan,
        status: "paid",
        invoiceId: `INV-${Date.now()}-${rand(1000, 9999)}`,
        description: `${plan} Plan — Monthly Subscription`,
        billingPeriodStart: paidAt,
        billingPeriodEnd: new Date(paidAt.getTime() + 30 * 86400000),
        paidAt,
      });
      revenueCount++;
    }
  }
  console.log(`   ✓ ${revenueCount} revenue records`);

  // ── Create connectors ─────────────────────────────────
  console.log("🔌 Creating connectors...");
  let connectorCount = 0;
  for (const { user } of createdUsers.slice(0, 6)) {
    const count = rand(2, 5);
    const chosen = shuffle(CONNECTOR_TYPES).slice(0, count);
    for (const c of chosen) {
      await Connector.create({
        userId: user._id,
        name: c.name,
        type: c.type,
        status: Math.random() > 0.25 ? "connected" : "disconnected",
        config: { apiKey: "", webhookUrl: "", accessToken: "", refreshToken: "", metadata: {} },
        lastSyncAt: new Date(Date.now() - rand(0, 7) * 86400000),
        syncFrequency: ["realtime", "hourly", "daily", "weekly"][rand(0, 3)],
        eventsProcessed: rand(100, 5000),
        errorMessage: "",
      });
      connectorCount++;
    }
  }
  console.log(`   ✓ ${connectorCount} connector records`);

  // ── Create customers ──────────────────────────────────
  console.log("🏢 Creating customers...");
  for (const { user, meta } of createdUsers) {
    const plan = meta.plan;
    const price = PLAN_PRICES[plan];
    const isActive = Math.random() > 0.12;
    await Customer.create({
      userId: user._id,
      fullName: meta.fullName,
      email: meta.email,
      companyName: meta.company,
      plan,
      status: isActive ? "active" : "churned",
      healthScore: isActive ? rand(65, 98) : rand(20, 55),
      totalRevenue: price * 6 + Math.round(price * 0.3),
      lastActivityAt: new Date(Date.now() - rand(0, 7) * 86400000),
      operatorsActive: plan === "APEX" ? rand(8, 15) : plan === "PRIME" ? rand(5, 10) : rand(3, 7),
      tasksCompleted: rand(50, 600),
      joinedAt: new Date(Date.now() - rand(30, 120) * 86400000),
      notes: `${meta.sector} customer on ${plan} plan.`,
      tags: [plan.toLowerCase(), meta.sector.toLowerCase().replace(/\s/g, "-"), "seed"],
      activityLog: [
        { action: "signup",             description: "Account created",             timestamp: new Date(Date.now() - 100 * 86400000) },
        { action: "plan_activated",     description: `${plan} plan activated`,      timestamp: new Date(Date.now() - 95 * 86400000) },
        { action: "operators_deployed", description: "AI operators deployed",       timestamp: new Date(Date.now() - 90 * 86400000) },
        { action: "first_task",         description: "First automated task run",    timestamp: new Date(Date.now() - 85 * 86400000) },
      ],
    });
    console.log(`   ✓ ${meta.email}`);
  }

  console.log("\n✅ SoloChief database seeded successfully!");
  console.log("   Admin login:  admin@solochief.com / admin123");
  console.log(`   Users:        ${createdUsers.length}`);
  console.log(`   Revenue:      ${revenueCount} records`);
  console.log(`   Connectors:   ${connectorCount} records`);
  console.log(`   Customers:    ${createdUsers.length} records`);

  await mongoose.disconnect();
  if (localMongo) await localMongo.stop();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
