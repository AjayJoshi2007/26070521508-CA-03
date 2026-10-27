const mongoose = require("mongoose");

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

module.exports = mongoose.model("Settings", settingsSchema);
