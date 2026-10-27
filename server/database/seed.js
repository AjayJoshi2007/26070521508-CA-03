// ═══════════════════════════════════════════════════════════
// MongoDB Seed Script — SoloChief
// Run: mongosh < database/seed.js
// ═══════════════════════════════════════════════════════════

use("solochief");

print("🌱 Seeding SoloChief database...");

// ── Seed Admin User ──────────────────────────────────────
// Password: "admin123" pre-hashed with bcrypt (12 rounds)
const adminId = ObjectId();
db.users.insertOne({
  _id: adminId,
  fullName: "SoloChief Admin",
  email: "admin@solochief.com",
  password: "$2a$12$LJ3m4ys3Gz6lVxGBiKxNjeFnJ1DBrZ9cq9VR0ndpMmHM6T4Y7WLgO",
  role: "admin",
  plan: "APEX",
  status: "active",
  companyName: "SoloChief Labs",
  companyInfo: "AI-powered autonomous workforce platform",
  domainName: "solochief.com",
  sector: "Technology",
  bookingStatus: "active",
  outputEmails: ["admin@solochief.com"],
  timezone: "UTC",
  language: "en",
  twoFactorEnabled: false,
  notificationPrefs: { email: true, push: true, inApp: true, weeklyReport: true },
  createdAt: new Date(),
  updatedAt: new Date(),
});
print("  ✅ Admin user created (admin@solochief.com / admin123)");

// ── Seed Demo Users ──────────────────────────────────────
const demoUsers = [
  { fullName: "Alex Chen", email: "alex@techstartup.io", plan: "APEX", company: "TechStartup", sector: "Technology" },
  { fullName: "Sarah Johnson", email: "sarah@growthco.com", plan: "PRIME", company: "GrowthCo", sector: "Marketing" },
  { fullName: "Marcus Lee", email: "marcus@digitalops.co", plan: "CORE", company: "Digital Operations", sector: "Finance" },
  { fullName: "Priya Patel", email: "priya@nexgen.ai", plan: "APEX", company: "NexGen AI", sector: "Technology" },
  { fullName: "James Wilson", email: "james@scalehq.io", plan: "PRIME", company: "ScaleHQ", sector: "SaaS" },
  { fullName: "Maria Garcia", email: "maria@brandcraft.co", plan: "CORE", company: "BrandCraft", sector: "Design" },
  { fullName: "David Kim", email: "david@quantumleap.dev", plan: "APEX", company: "QuantumLeap", sector: "Technology" },
  { fullName: "Emily Ross", email: "emily@cloudpeak.io", plan: "PRIME", company: "CloudPeak", sector: "Infrastructure" },
];

const userIds = [];
demoUsers.forEach((u) => {
  const id = ObjectId();
  userIds.push(id);
  db.users.insertOne({
    _id: id,
    fullName: u.fullName,
    email: u.email,
    password: "$2a$12$LJ3m4ys3Gz6lVxGBiKxNjeFnJ1DBrZ9cq9VR0ndpMmHM6T4Y7WLgO",
    role: "user",
    plan: u.plan,
    status: "active",
    companyName: u.company,
    sector: u.sector,
    domainName: u.email.split("@")[1],
    bookingStatus: "active",
    outputEmails: [u.email],
    timezone: "UTC",
    language: "en",
    twoFactorEnabled: false,
    notificationPrefs: { email: true, push: true, inApp: true, weeklyReport: true },
    createdAt: new Date(Date.now() - Math.random() * 90 * 86400000),
    updatedAt: new Date(),
  });
});
print(`  ✅ ${demoUsers.length} demo users created`);

// ── Seed Revenue Records ─────────────────────────────────
const planPrices = { CORE: 498, PRIME: 898, APEX: 1498 };
const allIds = [adminId, ...userIds];

allIds.forEach((uid, idx) => {
  const plan = idx === 0 ? "APEX" : demoUsers[idx - 1].plan;
  const price = planPrices[plan];

  // Setup fee
  db.revenues.insertOne({
    userId: uid,
    type: "setup_fee",
    amount: Math.round(price * 0.3),
    currency: "USD",
    plan: plan,
    status: "paid",
    description: `${plan} Plan — Setup Fee (30%)`,
    paidAt: new Date(Date.now() - 75 * 86400000),
    createdAt: new Date(Date.now() - 75 * 86400000),
    updatedAt: new Date(),
  });

  // Monthly subscriptions (last 3 months)
  for (let m = 2; m >= 0; m--) {
    const paidAt = new Date(Date.now() - m * 30 * 86400000);
    db.revenues.insertOne({
      userId: uid,
      type: "subscription",
      amount: price,
      currency: "USD",
      plan: plan,
      status: "paid",
      description: `${plan} Plan — Monthly Subscription`,
      billingPeriodStart: new Date(paidAt.getTime()),
      billingPeriodEnd: new Date(paidAt.getTime() + 30 * 86400000),
      paidAt: paidAt,
      createdAt: paidAt,
      updatedAt: new Date(),
    });
  }
});
print(`  ✅ ${allIds.length * 4} revenue records created`);

// ── Seed Connectors ──────────────────────────────────────
const connectorTypes = [
  { name: "Slack Workspace", type: "slack" },
  { name: "Gmail Integration", type: "gmail" },
  { name: "HubSpot CRM", type: "hubspot" },
  { name: "Zapier Automation", type: "zapier" },
  { name: "Notion Workspace", type: "notion" },
  { name: "Google Sheets", type: "sheets" },
  { name: "Stripe Payments", type: "stripe" },
  { name: "Salesforce CRM", type: "salesforce" },
  { name: "Custom Webhook", type: "webhook" },
  { name: "REST API", type: "api" },
];

allIds.slice(0, 5).forEach((uid) => {
  const count = 3 + Math.floor(Math.random() * 4);
  const shuffled = connectorTypes.sort(() => 0.5 - Math.random()).slice(0, count);
  shuffled.forEach((c) => {
    db.connectors.insertOne({
      userId: uid,
      name: c.name,
      type: c.type,
      status: Math.random() > 0.2 ? "connected" : "disconnected",
      config: { apiKey: "", webhookUrl: "", accessToken: "", refreshToken: "", metadata: {} },
      lastSyncAt: new Date(Date.now() - Math.random() * 7 * 86400000),
      syncFrequency: ["realtime", "hourly", "daily", "weekly"][Math.floor(Math.random() * 4)],
      eventsProcessed: Math.floor(Math.random() * 5000),
      errorMessage: "",
      createdAt: new Date(Date.now() - Math.random() * 60 * 86400000),
      updatedAt: new Date(),
    });
  });
});
print("  ✅ Connectors seeded");

// ── Seed Customers ───────────────────────────────────────
allIds.forEach((uid, idx) => {
  const plan = idx === 0 ? "APEX" : demoUsers[idx - 1]?.plan || "CORE";
  const name = idx === 0 ? "SoloChief Admin" : demoUsers[idx - 1].fullName;
  const email = idx === 0 ? "admin@solochief.com" : demoUsers[idx - 1].email;
  const company = idx === 0 ? "SoloChief Labs" : demoUsers[idx - 1].company;

  db.customers.insertOne({
    userId: uid,
    fullName: name,
    email: email,
    companyName: company,
    plan: plan,
    status: Math.random() > 0.15 ? "active" : "churned",
    healthScore: 60 + Math.floor(Math.random() * 40),
    totalRevenue: planPrices[plan] * 3 + Math.round(planPrices[plan] * 0.3),
    lastActivityAt: new Date(Date.now() - Math.random() * 7 * 86400000),
    operatorsActive: plan === "APEX" ? 10 : plan === "PRIME" ? 8 : 6,
    tasksCompleted: Math.floor(Math.random() * 500) + 50,
    joinedAt: new Date(Date.now() - Math.random() * 90 * 86400000),
    tags: [plan.toLowerCase(), "seed"],
    activityLog: [
      { action: "signup", description: "Account created", timestamp: new Date(Date.now() - 80 * 86400000) },
      { action: "plan_activated", description: `${plan} plan activated`, timestamp: new Date(Date.now() - 75 * 86400000) },
      { action: "operators_deployed", description: "AI operators deployed", timestamp: new Date(Date.now() - 74 * 86400000) },
    ],
    createdAt: new Date(Date.now() - Math.random() * 90 * 86400000),
    updatedAt: new Date(),
  });
});
print(`  ✅ ${allIds.length} customer records created`);

// ── Seed Settings ────────────────────────────────────────
allIds.forEach((uid) => {
  db.settings.insertOne({
    userId: uid,
    general: { timezone: "UTC", language: "en", dateFormat: "MM/DD/YYYY", theme: "light" },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      inAppNotifications: true,
      weeklyReport: true,
      operatorAlerts: true,
      securityAlerts: true,
    },
    security: { twoFactorEnabled: false, sessionTimeout: 30, ipWhitelist: [] },
    billing: { autoRenew: true, paymentMethod: "", billingEmail: "" },
    api: { apiKey: "", apiKeyCreatedAt: null, rateLimitPerMinute: 60 },
    createdAt: new Date(),
    updatedAt: new Date(),
  });
});
print("  ✅ Settings seeded");

print("\n✅ SoloChief database seeded successfully!");
print("   Admin login: admin@solochief.com / admin123");
