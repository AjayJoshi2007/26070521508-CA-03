const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    plan: { type: String, enum: ["CORE", "PRIME", "APEX", null], default: null },
    status: { type: String, enum: ["active", "pending", "suspended"], default: "active" },
    companyName: { type: String, default: "" },
    companyInfo: { type: String, default: "" },
    domainName: { type: String, default: "" },
    sector: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    instagram: { type: String, default: "" },
    facebook: { type: String, default: "" },
    outputEmails: [{ type: String }],
    avatar: { type: String, default: "" },
    timezone: { type: String, default: "UTC" },
    language: { type: String, default: "en" },
    twoFactorEnabled: { type: Boolean, default: false },
    notificationPrefs: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      inApp: { type: Boolean, default: true },
      weeklyReport: { type: Boolean, default: true },
    },
    lastLoginAt: { type: Date },
    bookingStatus: { type: String, enum: ["none", "pending", "active", "cancelled"], default: "none" },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Strip password from JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);
