const mongoose = require("mongoose");

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

customerSchema.index({ status: 1, healthScore: -1 });
customerSchema.index({ plan: 1 });
customerSchema.index({ email: 1 });

module.exports = mongoose.model("Customer", customerSchema);
