const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ── Get user profile ─────────────────────────────────────
router.get("/profile", authMiddleware, async (req, res) => {
  res.json({ success: true, user: req.user });
});

// ── Update profile ───────────────────────────────────────
router.put("/profile", authMiddleware, async (req, res, next) => {
  try {
    const allowed = [
      "fullName", "companyName", "companyInfo", "domainName", "sector",
      "linkedin", "instagram", "facebook", "outputEmails", "timezone", "language",
    ];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
});

// ── Delete account ───────────────────────────────────────
router.delete("/account", authMiddleware, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({ success: true, message: "Account deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
