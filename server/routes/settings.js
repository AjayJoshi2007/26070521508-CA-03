const express = require("express");
const Settings = require("../models/Settings");
const authMiddleware = require("../middleware/authMiddleware");
const crypto = require("crypto");

const router = express.Router();

// ── Get user settings ────────────────────────────────────
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    let settings = await Settings.findOne({ userId: req.user._id });
    if (!settings) {
      settings = await Settings.create({ userId: req.user._id });
    }
    res.json({ success: true, settings });
  } catch (err) {
    next(err);
  }
});

// ── Update settings ──────────────────────────────────────
router.put("/", authMiddleware, async (req, res, next) => {
  try {
    const { general, notifications, security, billing, api } = req.body;
    const updates = {};
    if (general) updates.general = general;
    if (notifications) updates.notifications = notifications;
    if (security) updates.security = security;
    if (billing) updates.billing = billing;
    if (api) updates.api = api;

    const settings = await Settings.findOneAndUpdate(
      { userId: req.user._id },
      { $set: updates },
      { new: true, upsert: true, runValidators: true }
    );
    res.json({ success: true, settings });
  } catch (err) {
    next(err);
  }
});

// ── Generate API key ─────────────────────────────────────
router.post("/generate-api-key", authMiddleware, async (req, res, next) => {
  try {
    const apiKey = `sc_${crypto.randomBytes(32).toString("hex")}`;
    const settings = await Settings.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { "api.apiKey": apiKey, "api.apiKeyCreatedAt": new Date() } },
      { new: true, upsert: true }
    );
    res.json({ success: true, apiKey, settings });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
