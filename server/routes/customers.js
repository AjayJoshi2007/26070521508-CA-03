const express = require("express");
const Customer = require("../models/Customer");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ── List customers ───────────────────────────────────────
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const { search, status, plan, sort = "-createdAt", page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (plan) filter.plan = plan;
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
      ];
    }

    const customers = await Customer.find(filter)
      .sort(sort)
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const total = await Customer.countDocuments(filter);

    res.json({ success: true, customers, total, page: +page, pages: Math.ceil(total / +limit) });
  } catch (err) {
    next(err);
  }
});

// ── Customer stats ───────────────────────────────────────
// IMPORTANT: Must be declared BEFORE /:id — otherwise Express matches
// "stats" as a Mongo ObjectId and throws a CastError (500).
router.get("/stats/overview", authMiddleware, async (req, res, next) => {
  try {
    const [total, active, churned, byPlan, avgHealth] = await Promise.all([
      Customer.countDocuments(),
      Customer.countDocuments({ status: "active" }),
      Customer.countDocuments({ status: "churned" }),
      Customer.aggregate([{ $group: { _id: "$plan", count: { $sum: 1 } } }]),
      Customer.aggregate([{ $group: { _id: null, avg: { $avg: "$healthScore" } } }]),
    ]);

    res.json({
      success: true,
      stats: {
        total,
        active,
        churned,
        churnRate: total > 0 ? ((churned / total) * 100).toFixed(1) : 0,
        avgHealthScore: Math.round(avgHealth[0]?.avg || 0),
        byPlan: byPlan.map((p) => ({ plan: p._id, count: p.count })),
      },
    });
  } catch (err) {
    next(err);
  }
});

// ── Get single customer ──────────────────────────────────
router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id).populate("userId", "fullName email");
    if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });
    res.json({ success: true, customer });
  } catch (err) {
    next(err);
  }
});

// ── Create customer ──────────────────────────────────────
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const customer = await Customer.create({ ...req.body, userId: req.user._id });
    res.status(201).json({ success: true, customer });
  } catch (err) {
    next(err);
  }
});

// ── Update customer ──────────────────────────────────────
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });
    res.json({ success: true, customer });
  } catch (err) {
    next(err);
  }
});

// ── Delete customer ──────────────────────────────────────
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });
    res.json({ success: true, message: "Customer deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
