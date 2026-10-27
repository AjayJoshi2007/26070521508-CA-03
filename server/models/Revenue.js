const mongoose = require("mongoose");

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

revenueSchema.index({ userId: 1, createdAt: -1 });
revenueSchema.index({ plan: 1, paidAt: -1 });
revenueSchema.index({ status: 1 });

module.exports = mongoose.model("Revenue", revenueSchema);
