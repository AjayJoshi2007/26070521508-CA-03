const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Settings = require("../models/Settings");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  });
}

// ── Sign Up ──────────────────────────────────────────────
router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    const user = await User.create({ email, password, fullName });

    // Create default settings for user
    await Settings.create({ userId: user._id });

    const token = generateToken(user._id);
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        plan: user.plan,
        status: user.status,
      },
    });
  } catch (err) {
    next(err);
  }
});

// ── Sign In ──────────────────────────────────────────────
router.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    if (user.status === "suspended") {
      return res.status(403).json({ success: false, message: "Account suspended" });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = generateToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        plan: user.plan,
        status: user.status,
        companyName: user.companyName,
        bookingStatus: user.bookingStatus,
      },
    });
  } catch (err) {
    next(err);
  }
});

// ── Get Current User ─────────────────────────────────────
router.get("/me", authMiddleware, async (req, res) => {
  res.json({ success: true, user: req.user });
});

// ── Update Password ──────────────────────────────────────
router.put("/password", authMiddleware, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(400).json({ success: false, message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: "Password updated" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
