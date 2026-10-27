const express = require("express");
const Revenue = require("../models/Revenue");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ── Get user's revenue records ───────────────────────────
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const { period = "30d", page = 1, limit = 50 } = req.query;
    let dateFilter = {};
    const now = new Date();

    if (period === "7d") dateFilter = { paidAt: { $gte: new Date(now - 7 * 86400000) } };
    else if (period === "30d") dateFilter = { paidAt: { $gte: new Date(now - 30 * 86400000) } };
    else if (period === "90d") dateFilter = { paidAt: { $gte: new Date(now - 90 * 86400000) } };
    else if (period === "1y") dateFilter = { paidAt: { $gte: new Date(now - 365 * 86400000) } };

    const records = await Revenue.find({ userId: req.user._id, ...dateFilter })
      .sort({ paidAt: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const total = await Revenue.countDocuments({ userId: req.user._id, ...dateFilter });

    res.json({ success: true, records, total, page: +page, pages: Math.ceil(total / +limit) });
  } catch (err) {
    next(err);
  }
});

// ── Revenue summary / analytics ──────────────────────────
router.get("/summary", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Total revenue
    const totalAgg = await Revenue.aggregate([
      { $match: { userId, status: "paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Monthly breakdown (last 12 months)
    const monthlyAgg = await Revenue.aggregate([
      { $match: { userId, status: "paid", paidAt: { $gte: new Date(Date.now() - 365 * 86400000) } } },
      {
        $group: {
          _id: { year: { $year: "$paidAt" }, month: { $month: "$paidAt" } },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // By plan
    const byPlanAgg = await Revenue.aggregate([
      { $match: { userId, status: "paid" } },
      { $group: { _id: "$plan", total: { $sum: "$amount" }, count: { $sum: 1 } } },
    ]);

    // Current month
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const currentMonthAgg = await Revenue.aggregate([
      { $match: { userId, status: "paid", paidAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Previous month for comparison
    const prevMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
    const prevMonthAgg = await Revenue.aggregate([
      { $match: { userId, status: "paid", paidAt: { $gte: prevMonthStart, $lt: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const currentMRR = currentMonthAgg[0]?.total || 0;
    const prevMRR = prevMonthAgg[0]?.total || 0;
    const mrrGrowth = prevMRR > 0 ? (((currentMRR - prevMRR) / prevMRR) * 100).toFixed(1) : 0;

    res.json({
      success: true,
      summary: {
        totalRevenue: totalAgg[0]?.total || 0,
        currentMRR,
        arr: currentMRR * 12,
        mrrGrowth: +mrrGrowth,
        monthly: monthlyAgg.map((m) => ({
          month: `${m._id.year}-${String(m._id.month).padStart(2, "0")}`,
          total: m.total,
          count: m.count,
        })),
        byPlan: byPlanAgg.map((p) => ({ plan: p._id, total: p.total, count: p.count })),
      },
    });
  } catch (err) {
    next(err);
  }
});

// ── Create revenue record ────────────────────────────────
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { type, amount, currency = "USD", plan, status = "paid", invoiceId, description } = req.body;
    const record = await Revenue.create({
      userId: req.user._id,
      type: type || "subscription",
      amount: Number(amount) || 0,
      currency,
      plan: plan || req.user.plan || "CORE",
      status,
      invoiceId: invoiceId || `INV-${Date.now().toString().slice(-6)}`,
      description: description || "SoloChief Subscription",
      paidAt: new Date(),
    });
    res.status(201).json({ success: true, record });
  } catch (err) {
    next(err);
  }
});

// ── Update revenue record ────────────────────────────────
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const filter = req.user.role === "admin" ? { _id: req.params.id } : { _id: req.params.id, userId: req.user._id };

    const allowed = ["type", "amount", "currency", "plan", "status", "description", "invoiceId"];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }
    if (updates.amount !== undefined) updates.amount = Number(updates.amount) || 0;

    const record = await Revenue.findOneAndUpdate(filter, updates, { new: true, runValidators: true });
    if (!record) return res.status(404).json({ success: false, message: "Transaction record not found" });
    res.json({ success: true, record });
  } catch (err) {
    next(err);
  }
});

// ── Delete revenue record ────────────────────────────────
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const filter = req.user.role === "admin" ? { _id: req.params.id } : { _id: req.params.id, userId: req.user._id };
    const record = await Revenue.findOneAndDelete(filter);
    if (!record) return res.status(404).json({ success: false, message: "Transaction record not found" });
    res.json({ success: true, message: "Transaction record deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
