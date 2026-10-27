const mongoose = require("mongoose");

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

connectorSchema.index({ userId: 1, type: 1 });

module.exports = mongoose.model("Connector", connectorSchema);
