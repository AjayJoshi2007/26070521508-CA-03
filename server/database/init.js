// ═══════════════════════════════════════════════════════════
// MongoDB Init Script — SoloChief
// Run: mongosh < database/init.js
// ═══════════════════════════════════════════════════════════

use("solochief");

print("🚀 Initializing SoloChief database...");

// ── Users Collection ─────────────────────────────────────
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["fullName", "email", "password", "role", "status"],
      properties: {
        fullName: { bsonType: "string", description: "User's full name" },
        email: { bsonType: "string", description: "Unique email address" },
        password: { bsonType: "string", description: "Bcrypt hashed password" },
        role: { enum: ["user", "admin"], description: "User role" },
        plan: { enum: ["CORE", "PRIME", "APEX", null], description: "Subscription plan" },
        status: { enum: ["active", "pending", "suspended"], description: "Account status" },
        companyName: { bsonType: "string" },
        companyInfo: { bsonType: "string" },
        domainName: { bsonType: "string" },
        sector: { bsonType: "string" },
        bookingStatus: { enum: ["none", "pending", "active", "cancelled"] },
      },
    },
  },
});

db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1, status: 1 });
db.users.createIndex({ plan: 1 });
db.users.createIndex({ createdAt: -1 });
print("  ✅ users collection created with indexes");

// ── Revenue Collection ───────────────────────────────────
db.createCollection("revenues", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "type", "amount", "plan", "status"],
      properties: {
        userId: { bsonType: "objectId" },
        type: { enum: ["subscription", "setup_fee", "addon", "refund"] },
        amount: { bsonType: "number", minimum: 0 },
        currency: { bsonType: "string" },
        plan: { enum: ["CORE", "PRIME", "APEX"] },
        status: { enum: ["paid", "pending", "failed", "refunded"] },
      },
    },
  },
});

db.revenues.createIndex({ userId: 1, paidAt: -1 });
db.revenues.createIndex({ plan: 1, paidAt: -1 });
db.revenues.createIndex({ status: 1, paidAt: -1 });
print("  ✅ revenues collection created with indexes");

// ── Connectors Collection ────────────────────────────────
db.createCollection("connectors", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "name", "type", "status"],
      properties: {
        userId: { bsonType: "objectId" },
        name: { bsonType: "string" },
        type: { enum: ["slack", "gmail", "hubspot", "zapier", "notion", "sheets", "webhook", "api", "salesforce", "stripe"] },
        status: { enum: ["connected", "disconnected", "error", "pending"] },
      },
    },
  },
});

db.connectors.createIndex({ userId: 1, type: 1 });
print("  ✅ connectors collection created with indexes");

// ── Customers Collection ─────────────────────────────────
db.createCollection("customers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "fullName", "email", "plan", "status"],
      properties: {
        userId: { bsonType: "objectId" },
        fullName: { bsonType: "string" },
        email: { bsonType: "string" },
        plan: { enum: ["CORE", "PRIME", "APEX"] },
        status: { enum: ["active", "churned", "trial", "pending"] },
        healthScore: { bsonType: "number", minimum: 0, maximum: 100 },
      },
    },
  },
});

db.customers.createIndex({ status: 1, healthScore: -1 });
db.customers.createIndex({ plan: 1 });
db.customers.createIndex({ email: 1 });
print("  ✅ customers collection created with indexes");

// ── Settings Collection ──────────────────────────────────
db.createCollection("settings");
db.settings.createIndex({ userId: 1 }, { unique: true });
print("  ✅ settings collection created with indexes");

print("\n✅ SoloChief database initialized successfully!");
print("   Collections: users, revenues, connectors, customers, settings");
