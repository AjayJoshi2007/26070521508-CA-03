const express = require("express");
const User = require("../models/User");
const Revenue = require("../models/Revenue");
const Customer = require("../models/Customer");
const Connector = require("../models/Connector");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();
router.use(authMiddleware, adminMiddleware);

// ── Platform overview KPIs ───────────────────────────────
router.get("/overview", async (req, res, next) => {
  try {
    const [totalUsers, activeUsers, totalRevenue, monthlyRevenue, customersByPlan, recentSignups] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ status: "active", bookingStatus: "active" }),
      Revenue.aggregate([{ $match: { status: "paid" } }, { $group: { _id: null, total: { $sum: "$amount" } } }]),
      Revenue.aggregate([
        { $match: { status: "paid", paidAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Customer.aggregate([{ $group: { _id: "$plan", count: { $sum: 1 } } }]),
      User.find().sort({ createdAt: -1 }).limit(10).select("fullName email plan createdAt status"),
    ]);

    res.json({
      success: true,
      overview: {
        totalUsers,
        activeUsers,
        totalRevenue: totalRevenue[0]?.total || 0,
        currentMRR: monthlyRevenue[0]?.total || 0,
        customersByPlan: customersByPlan.map((p) => ({ plan: p._id, count: p.count })),
        recentSignups,
      },
    });
  } catch (err) {
    next(err);
  }
});

// ── All users (paginated) ────────────────────────────────
router.get("/users", async (req, res, next) => {
  try {
    const { search, status, role, plan, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (role) filter.role = role;
    if (plan) filter.plan = plan;
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(filter).sort({ createdAt: -1 }).skip((+page - 1) * +limit).limit(+limit);
    const total = await User.countDocuments(filter);

    res.json({ success: true, users, total, page: +page, pages: Math.ceil(total / +limit) });
  } catch (err) {
    next(err);
  }
});

// ── Create user (admin) ──────────────────────────────────
router.post("/users", async (req, res, next) => {
  try {
    const { email, password, fullName, role = "user", plan = "CORE", status = "active", companyName = "Client Co" } = req.body;
    if (!email || !fullName) {
      return res.status(400).json({ success: false, message: "Email and Full Name are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: "User with this email already exists" });
    }

    const user = await User.create({
      email: email.toLowerCase(),
      password: password || "tempPass123!",
      fullName,
      role,
      plan,
      status,
      companyName,
      bookingStatus: "active",
    });

    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
});

// ── Update user (admin) ──────────────────────────────────
router.put("/users/:id", async (req, res, next) => {
  try {
    const { status, role, plan, bookingStatus, fullName, companyName } = req.body;
    const updates = {};
    if (status) updates.status = status;
    if (role) updates.role = role;
    if (plan) updates.plan = plan;
    if (bookingStatus) updates.bookingStatus = bookingStatus;
    if (fullName) updates.fullName = fullName;
    if (companyName) updates.companyName = companyName;

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
});

// ── Platform revenue analytics ───────────────────────────
router.get("/revenue", async (req, res, next) => {
  try {
    const [monthlyTrend, byPlan, totalAgg] = await Promise.all([
      Revenue.aggregate([
        { $match: { status: "paid", paidAt: { $gte: new Date(Date.now() - 365 * 86400000) } } },
        {
          $group: {
            _id: { year: { $year: "$paidAt" }, month: { $month: "$paidAt" } },
            total: { $sum: "$amount" },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
      Revenue.aggregate([
        { $match: { status: "paid" } },
        { $group: { _id: "$plan", total: { $sum: "$amount" }, count: { $sum: 1 } } },
      ]),
      Revenue.aggregate([
        { $match: { status: "paid" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ]);

    res.json({
      success: true,
      revenue: {
        total: totalAgg[0]?.total || 0,
        monthly: monthlyTrend.map((m) => ({
          month: `${m._id.year}-${String(m._id.month).padStart(2, "0")}`,
          total: m.total,
          count: m.count,
        })),
        byPlan: byPlan.map((p) => ({ plan: p._id, total: p.total, count: p.count })),
      },
    });
  } catch (err) {
    next(err);
  }
});

// ── Platform transactions ledger (admin) ─────────────────
router.get("/transactions", async (req, res, next) => {
  try {
    const { status, page = 1, limit = 25 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const safeLimit = Math.min(Math.max(+limit || 25, 1), 100);
    const safePage = Math.max(+page || 1, 1);

    const [transactions, total] = await Promise.all([
      Revenue.find(filter)
        .sort({ paidAt: -1 })
        .skip((safePage - 1) * safeLimit)
        .limit(safeLimit)
        .populate("userId", "fullName email"),
      Revenue.countDocuments(filter),
    ]);

    res.json({ success: true, transactions, total, page: safePage, pages: Math.ceil(total / safeLimit) });
  } catch (err) {
    next(err);
  }
});

// ── Delete user (admin) ──────────────────────────────────
router.delete("/users/:id", async (req, res, next) => {
  try {
    if (String(req.user._id) === String(req.params.id)) {
      return res.status(400).json({ success: false, message: "You cannot delete your own account" });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
