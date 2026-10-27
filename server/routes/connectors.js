const express = require("express");
const Connector = require("../models/Connector");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ── List user's connectors ───────────────────────────────
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const connectors = await Connector.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, connectors });
  } catch (err) {
    next(err);
  }
});

// ── Create / connect a new connector ─────────────────────
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { name, type, config, syncFrequency } = req.body;
    const connector = await Connector.create({
      userId: req.user._id,
      name,
      type,
      config: config || {},
      syncFrequency: syncFrequency || "daily",
      status: "connected",
      lastSyncAt: new Date(),
    });
    res.status(201).json({ success: true, connector });
  } catch (err) {
    next(err);
  }
});

// ── Update connector ─────────────────────────────────────
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const updates = {};

    if (typeof req.body.name === "string" && req.body.name.trim()) {
      updates.name = req.body.name.trim();
    }
    if (req.body.syncFrequency !== undefined) {
      if (!["realtime", "hourly", "daily", "weekly"].includes(req.body.syncFrequency)) {
        return res.status(400).json({ success: false, message: "Invalid sync frequency" });
      }
      updates.syncFrequency = req.body.syncFrequency;
    }
    // Merge config fields individually so untouched credentials are preserved
    if (req.body.config && typeof req.body.config === "object") {
      for (const key of ["apiKey", "webhookUrl"]) {
        if (typeof req.body.config[key] === "string") updates[`config.${key}`] = req.body.config[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: "No valid fields to update" });
    }

    const connector = await Connector.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!connector) return res.status(404).json({ success: false, message: "Connector not found" });
    res.json({ success: true, connector });
  } catch (err) {
    next(err);
  }
});

// ── Toggle connector status ──────────────────────────────
router.patch("/:id/toggle", authMiddleware, async (req, res, next) => {
  try {
    const connector = await Connector.findOne({ _id: req.params.id, userId: req.user._id });
    if (!connector) return res.status(404).json({ success: false, message: "Connector not found" });

    connector.status = connector.status === "connected" ? "disconnected" : "connected";
    if (connector.status === "connected") connector.lastSyncAt = new Date();
    await connector.save();

    res.json({ success: true, connector });
  } catch (err) {
    next(err);
  }
});

// ── Delete connector ─────────────────────────────────────
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const connector = await Connector.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!connector) return res.status(404).json({ success: false, message: "Connector not found" });
    res.json({ success: true, message: "Connector removed" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
