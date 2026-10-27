require("dotenv").config();
const path = require("node:path");
const fs = require("node:fs/promises");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const User = require("./models/User");
const Settings = require("./models/Settings");
const Revenue = require("./models/Revenue");
const Customer = require("./models/Customer");
const Connector = require("./models/Connector");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const revenueRoutes = require("./routes/revenue");
const connectorRoutes = require("./routes/connectors");
const customerRoutes = require("./routes/customers");
const adminRoutes = require("./routes/admin");
const settingsRoutes = require("./routes/settings");

const app = express();

// ── Middleware ────────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000", credentials: true }));
app.use(express.json({ limit: "10mb" }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use("/api/", limiter);

// ── Routes ───────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/revenue", revenueRoutes);
app.use("/api/connectors", connectorRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/settings", settingsRoutes);

app.get("/api/health", (_req, res) => res.json({ status: "ok", ts: new Date().toISOString() }));

// ── Chrome DevTools Probe ────────────────────────────────
app.get("/.well-known/appspecific/com.chrome.devtools.json", (_req, res) => {
  res.status(200).json({});
});

// ── 404 Not Found Handler ────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ── Global Error Handler ─────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("❌ Server Error:", err);
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Internal server error";

  // Mongoose CastError (e.g. invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 404;
    message = `Resource not found with ${err.path}: ${err.value}`;
  }
  // Mongoose ValidationError
  else if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map((e) => e.message).join(", ");
  }
  // JWT errors
  else if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Invalid or expired token";
  }
  // Bad JSON in request body
  else if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    statusCode = 400;
    message = "Malformed JSON in request body";
  }

  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === "production" && statusCode === 500 ? "Internal server error" : message,
  });
});

// ── MongoDB + Start ──────────────────────────────────────
const PORT = process.env.PORT || 5000;
const DEFAULT_MONGODB_URI = "mongodb://127.0.0.1:27017/solochief";

function isLocalMongoUri(uri) {
  return /^mongodb(?:\+srv)?:\/\/(?:[^@/]+@)?(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?(?:\/|$)/i.test(uri);
}

async function connectDatabase() {
  const uri = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    return null;
  } catch (error) {
    if (process.env.NODE_ENV === "production" || !isLocalMongoUri(uri)) {
      throw error;
    }

    console.warn("Local MongoDB was not found. Starting a persistent development database...");
    const { MongoMemoryServer } = require("mongodb-memory-server");
    const dbPath = path.join(__dirname, ".data", "mongodb");
    await fs.mkdir(dbPath, { recursive: true });
    const localMongo = await MongoMemoryServer.create({
      instance: {
        dbPath,
        ip: "127.0.0.1",
        port: 27017,
      },
    });

    await mongoose.connect(localMongo.getUri("solochief"), { serverSelectionTimeoutMS: 10000 });
    return localMongo;
  }
}

// ── Sample data definitions ──────────────────────────────
const PLAN_PRICES = { CORE: 498, PRIME: 898, APEX: 1498 };
const DEMO_ACCOUNTS = [
  { fullName: "SoloChief Admin",   email: "admin@solochief.com",   role: "admin", plan: "APEX",  company: "SoloChief Labs",     sector: "Technology"     },
  { fullName: "Alex Chen",         email: "alex@techstartup.io",   role: "user",  plan: "APEX",  company: "TechStartup",        sector: "Technology"     },
  { fullName: "Sarah Johnson",     email: "sarah@growthco.com",    role: "user",  plan: "PRIME", company: "GrowthCo",           sector: "Marketing"      },
  { fullName: "Marcus Lee",        email: "marcus@digitalops.co",  role: "user",  plan: "CORE",  company: "Digital Operations", sector: "Finance"        },
  { fullName: "Priya Patel",       email: "priya@nexgen.ai",       role: "user",  plan: "APEX",  company: "NexGen AI",          sector: "Technology"     },
  { fullName: "James Wilson",      email: "james@scalehq.io",      role: "user",  plan: "PRIME", company: "ScaleHQ",            sector: "SaaS"           },
  { fullName: "Maria Garcia",      email: "maria@brandcraft.co",   role: "user",  plan: "CORE",  company: "BrandCraft",         sector: "Design"         },
  { fullName: "David Kim",         email: "david@quantumleap.dev", role: "user",  plan: "APEX",  company: "QuantumLeap",        sector: "Technology"     },
  { fullName: "Emily Ross",        email: "emily@cloudpeak.io",    role: "user",  plan: "PRIME", company: "CloudPeak",          sector: "Infrastructure" },
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
];

async function ensureLocalSampleData() {
  if (process.env.NODE_ENV === "production") return;

  // Only seed if the DB is completely empty
  const existingCount = await User.countDocuments();
  if (existingCount > 0) return;

  const password = process.env.LOCAL_DEMO_PASSWORD || "admin123";
  console.log("🌱 Seeding sample data for development...");

  for (const account of DEMO_ACCOUNTS) {
    const user = await User.create({
      fullName: account.fullName,
      email: account.email,
      password,
      role: account.role,
      plan: account.plan,
      status: "active",
      companyName: account.company,
      companyInfo: `${account.sector} company using SoloChief AI operators`,
      domainName: account.email.split("@")[1],
      sector: account.sector,
      outputEmails: [account.email],
      bookingStatus: "active",
    });

    // Settings
    await Settings.create({ userId: user._id });

    // Customer record
    const plan = account.plan;
    const price = PLAN_PRICES[plan];
    const isActive = Math.random() > 0.12;
    await Customer.create({
      userId: user._id,
      fullName: account.fullName,
      email: account.email,
      companyName: account.company,
      plan,
      status: isActive ? "active" : "churned",
      healthScore: isActive ? (65 + Math.floor(Math.random() * 33)) : (20 + Math.floor(Math.random() * 36)),
      totalRevenue: price * 6 + Math.round(price * 0.3),
      lastActivityAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 86400000),
      operatorsActive: plan === "APEX" ? 10 + Math.floor(Math.random() * 5) : plan === "PRIME" ? 6 + Math.floor(Math.random() * 4) : 3 + Math.floor(Math.random() * 4),
      tasksCompleted: 50 + Math.floor(Math.random() * 550),
      joinedAt: new Date(Date.now() - (30 + Math.floor(Math.random() * 90)) * 86400000),
      tags: [plan.toLowerCase(), account.sector.toLowerCase().replace(/\s/g, "-")],
      activityLog: [
        { action: "signup",             description: "Account created",          timestamp: new Date(Date.now() - 100 * 86400000) },
        { action: "plan_activated",     description: `${plan} plan activated`,   timestamp: new Date(Date.now() - 95  * 86400000) },
        { action: "operators_deployed", description: "AI operators deployed",    timestamp: new Date(Date.now() - 90  * 86400000) },
      ],
    });

    // Setup fee
    await Revenue.create({
      userId: user._id,
      type: "setup_fee",
      amount: Math.round(price * 0.3),
      currency: "USD",
      plan,
      status: "paid",
      invoiceId: `INV-SETUP-${user._id.toString().slice(-6)}`,
      description: `${plan} Plan — Setup Fee`,
      paidAt: new Date(Date.now() - 75 * 86400000),
    });

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
        invoiceId: `INV-${user._id.toString().slice(-6)}-M${m}`,
        description: `${plan} Plan — Monthly Subscription`,
        billingPeriodStart: paidAt,
        billingPeriodEnd: new Date(paidAt.getTime() + 30 * 86400000),
        paidAt,
      });
    }

    // Connectors (first 6 users)
    if (DEMO_ACCOUNTS.indexOf(account) < 6) {
      const count = 2 + Math.floor(Math.random() * 4);
      const chosen = [...CONNECTOR_TYPES].sort(() => Math.random() - 0.5).slice(0, count);
      for (const c of chosen) {
        await Connector.create({
          userId: user._id,
          name: c.name,
          type: c.type,
          status: Math.random() > 0.25 ? "connected" : "disconnected",
          config: { apiKey: "", webhookUrl: "", accessToken: "", refreshToken: "", metadata: {} },
          lastSyncAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 86400000),
          syncFrequency: ["realtime", "hourly", "daily", "weekly"][Math.floor(Math.random() * 4)],
          eventsProcessed: 100 + Math.floor(Math.random() * 4900),
          errorMessage: "",
        });
      }
    }

    console.log(`   ✅ ${account.email}`);
  }

  console.log("✅ Sample data seeded — login: admin@solochief.com / admin123");
}

let localMongo;
let httpServer;

async function start() {
  localMongo = await connectDatabase();
  console.log("✅ MongoDB connected");
  await ensureLocalSampleData();
  httpServer = app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
}

async function shutdown() {
  if (httpServer) {
    await new Promise((resolve) => httpServer.close(resolve));
  }
  await mongoose.disconnect();
  if (localMongo) await localMongo.stop();
  process.exit(0);
}

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);

start().catch((err) => {
  console.error("❌ Backend startup failed:", err.message);
  process.exit(1);
});
