"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Globe,
  Mail,
  User,
  Info,
  Instagram,
  Facebook,
  Linkedin,
  Building2,
  Rocket,
  Loader2,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { trackBookingSubmission } from "@/lib/posthog";
import { createBooking, createUserProfile } from "@/lib/firestore";
import { signUp, signIn } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";
import { PLAN_PRODUCT_IDS } from "@/lib/dodo-payments";
import { openDodoCheckout } from "@/components/DodoCheckoutProvider";

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  companyName: z.string().min(2, "Company name is required"),
  sector: z.string().min(2, "Sector is required"),
  companyInfo: z.string().min(10, "Please provide more info about your company"),
  domainName: z.string().min(3, "Domain name is required"),
  linkedin: z.string().optional().refine(val => !val || z.string().url().safeParse(val).success, "Must be a valid URL"),
  instagram: z.string().optional().refine(val => !val || z.string().url().safeParse(val).success, "Must be a valid URL"),
  facebook: z.string().optional().refine(val => !val || z.string().url().safeParse(val).success, "Must be a valid URL"),
  plan: z.enum(["CORE", "PRIME", "APEX"]),
  outputEmail1: z.string().trim().email("Invalid email address"),
  outputEmail2: z.string().trim().email("Invalid email address").optional().or(z.literal("")),
  outputEmail3: z.string().trim().email("Invalid email address").optional().or(z.literal("")),
  outputEmail4: z.string().trim().email("Invalid email address").optional().or(z.literal("")),
  outputEmail5: z.string().trim().email("Invalid email address").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const plans = {
  CORE: {
    price: 498,
    total: 498,
    features: [
      "70% Refund Guarantee.",
      "INTRO: 50–70 Verified Leads / Day (Single Channel)",
      "SNAP: 3 Static Ad Creatives / Day",
      "CLIP: 1 Vertical Video Ad / Week",
      "SCOOP (Intel): ❌ Not Included",
      "MEND (Reputation): ❌ Not Included",
      "PULSE (Monitoring): ❌ Not Included",
      "30% Non-Refundable Setup Fee applied to first month."
    ]
  },
  PRIME: {
    price: 898,
    total: 898,
    features: [
      "INTRO: 150–180 Verified Leads / Day (Multi-Channel)",
      "SNAP: 5 Static Ad Creatives / Day (Multivariate Testing)",
      "CLIP: 3 Vertical Video Ads / Week",
      "SCOOP: Monthly Sector Report",
      "MEND: Standard Review Scanning",
      "PULSE: Standard Domain Monitoring",
      "30% Non-Refundable Setup Fee applied to first month."
    ]
  },
  APEX: {
    price: 1498,
    total: 1498,
    features: [
      "Priority Support & Human Oversight.",
      "INTRO: 350–400 Verified Leads / Day (Hyper-Personalized)",
      "SNAP: 7 Static Ad Creatives / Day (Brand-Locked Assets)",
      "CLIP: 5 Vertical Video Ads / Week (Cinema Grade)",
      "SCOOP: Weekly Sector Briefing",
      "MEND: Priority Crisis Alerts",
      "PULSE: Enterprise Health Checks",
      "30% Non-Refundable Setup Fee applied to first month."
    ]
  },
};

export function BookingForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: "CORE",
      password: "",
      linkedin: "",
      instagram: "",
      facebook: "",
    },
  });

  const selectedPlan = watch("plan");
  const formData = watch();

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    if (step === 1) fieldsToValidate = ["fullName", "email", "password"];
    if (step === 2) fieldsToValidate = ["companyName", "sector", "companyInfo", "domainName"];
    if (step === 3) fieldsToValidate = ["linkedin", "instagram", "facebook"];
    if (step === 4) {
      fieldsToValidate = ["plan", "outputEmail1"];
      // Add conditional validation based on plan
      if (selectedPlan === "PRIME" || selectedPlan === "APEX") {
        fieldsToValidate.push("outputEmail2", "outputEmail3");
      }
      if (selectedPlan === "APEX") {
        fieldsToValidate.push("outputEmail4", "outputEmail5");
      }
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep((s) => s + 1);
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const prevStep = () => {
    setStep((s) => s - 1);
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    try {
      // Step 1: Create Firebase Auth account (if not already signed in)
      let userId = user?.id;

      if (!userId) {
        try {
          // Try to create a new account
          const userCredential = await signUp(formData.email, formData.password, formData.fullName);
          userId = userCredential.user.uid;
        } catch (authError: any) {
          // If account already exists, sign them in instead
          if (authError.message?.includes('already exists')) {
            toast.info("Account already exists. Signing you in...");
            try {
              const signInCredential = await signIn(formData.email, formData.password);
              userId = signInCredential.user.uid;
            } catch (signInError: any) {
              console.error('📝 BookingForm: Sign-in also failed:', signInError.message);
              throw new Error('Account exists but sign-in failed. Please check your password and try again.');
            }
          } else {
            throw authError;
          }
        }
      }

      if (!userId) {
        throw new Error('Authentication failed. Please try again.');
      }

      // Step 2: Save user profile to Firestore (name, email for auth/admin)
      await createUserProfile(userId, {
        fullName: formData.fullName,
        email: formData.email,
      });

      // Step 3: Save booking to Firestore
      const bookingId = await createBooking({
        userId: userId,
        fullName: formData.fullName,
        email: formData.email,
        companyName: formData.companyName,
        sector: formData.sector,
        companyInfo: formData.companyInfo,
        domainName: formData.domainName,
        linkedin: formData.linkedin || '',
        instagram: formData.instagram || '',
        facebook: formData.facebook || '',
        plan: formData.plan,
        outputEmail1: formData.outputEmail1,
        outputEmail2: formData.outputEmail2 || '',
        outputEmail3: formData.outputEmail3 || '',
        outputEmail4: formData.outputEmail4 || '',
        outputEmail5: formData.outputEmail5 || '',
        status: 'pending',
      });

      // Step 4: Track successful booking with PostHog
      trackBookingSubmission(formData.plan, formData.companyName);

      // Step 5: Create Dodo Payments checkout session
      const productId = PLAN_PRODUCT_IDS[formData.plan];

      const checkoutResponse = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: productId,
          customer: {
            email: formData.email,
            name: formData.fullName,
          },
          quantity: 1,
          payment_link: true,
          metadata: {
            bookingId: bookingId,
            userId: userId,
            plan: formData.plan,
            companyName: formData.companyName,
          },
        }),
      });

      const checkoutData = await checkoutResponse.json();

      if (checkoutResponse.ok && checkoutData.checkout_url) {
        // Open the Dodo Payments overlay checkout
        toast.success("🎉 Booking created! Opening secure payment...");
        await openDodoCheckout(checkoutData.checkout_url);
        setShowSuccess(true);
      } else {
        // Booking saved but payment link failed — still show success
        // Payment can be arranged later
        console.warn("[BookingForm] Checkout creation failed, booking saved:", checkoutData);
        setShowSuccess(true);
        toast.success("🎉 Deployment request confirmed! Payment will be arranged separately.");
      }
    } catch (error: any) {
      console.error("📝 BookingForm ERROR:", error);
      toast.error(error.message || "Transaction failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const stepTitles = [
    "Personal Info",
    "Company Details",
    "Social Presence",
    "Choose Plan",
    "Confirm & Deploy"
  ];

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="clay-card p-6 md:p-10 border-foreground/10 shadow-2xl relative overflow-hidden bg-background/80 backdrop-blur-xl"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (step < 5) {
                  nextStep();
                } else {
                  handleConfirmBooking();
                }
              }}
              className="h-full flex flex-col justify-between"
            >
              <button type="submit" disabled={isSubmitting} className="hidden" aria-hidden="true" />
              <div className="mb-10">
                <div className="flex justify-between items-end mb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                      Step {step} of 5
                    </span>
                    <h3 className="text-xl font-heading font-black text-foreground">
                      {stepTitles[step - 1]}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-foreground/20">
                      {Math.round((step / 5) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full bg-foreground/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / 5) * 100}%` }}
                    className="h-full bg-foreground transition-all duration-500 ease-out"
                  />
                </div>
              </div>

              <div>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                          <User size={14} /> Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          {...register("fullName")}
                          className={`w-full bg-foreground/5 border-2 ${errors.fullName ? "border-red-500/50" : "border-transparent focus:border-foreground/20"} rounded-xl px-4 py-3 font-medium outline-none transition-all`}
                          placeholder="e.g. Alex Rivera"
                        />
                        {errors.fullName && <p className="text-xs font-bold text-red-500 mt-1">{errors.fullName.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                          <Mail size={14} /> Email ID <span className="text-red-500">*</span>
                        </label>
                        <input
                          {...register("email")}
                          className={`w-full bg-foreground/5 border-2 ${errors.email ? "border-red-500/50" : "border-transparent focus:border-foreground/20"} rounded-xl px-4 py-3 font-medium outline-none transition-all`}
                          placeholder="alex@company.com"
                        />
                        {errors.email && <p className="text-xs font-bold text-red-500 mt-1">{errors.email.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                          <Lock size={14} /> Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          {...register("password")}
                          className={`w-full bg-foreground/5 border-2 ${errors.password ? "border-red-500/50" : "border-transparent focus:border-foreground/20"} rounded-xl px-4 py-3 font-medium outline-none transition-all`}
                          placeholder="••••••••"
                        />
                        {errors.password && <p className="text-xs font-bold text-red-500 mt-1">{errors.password.message}</p>}
                        <p className="text-[10px] text-foreground/40 font-bold ml-1">Used for accessing your dashboard later</p>
                      </div>

                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                            <Building2 size={14} /> Company Name
                          </label>
                          <input
                            {...register("companyName")}
                            className="w-full bg-foreground/5 border-2 border-transparent focus:border-foreground/20 rounded-xl px-4 py-3 font-medium outline-none transition-all"
                            placeholder="Acme Corp"
                          />
                          {errors.companyName && <p className="text-xs font-bold text-red-500">{errors.companyName.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                            <Rocket size={14} /> Sector
                          </label>
                          <input
                            {...register("sector")}
                            className="w-full bg-foreground/5 border-2 border-transparent focus:border-foreground/20 rounded-xl px-4 py-3 font-medium outline-none transition-all"
                            placeholder="AI / FinTech"
                          />
                          {errors.sector && <p className="text-xs font-bold text-red-500">{errors.sector.message}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                          <Info size={14} /> Company Info
                        </label>
                        <textarea
                          {...register("companyInfo")}
                          rows={3}
                          className="w-full bg-foreground/5 border-2 border-transparent focus:border-foreground/20 rounded-xl px-4 py-3 font-medium outline-none transition-all resize-none"
                          placeholder="Tell us about your company goals..."
                        />
                        {errors.companyInfo && <p className="text-xs font-bold text-red-500">{errors.companyInfo.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                          <Globe size={14} /> Domain Name
                        </label>
                        <input
                          {...register("domainName")}
                          className="w-full bg-foreground/5 border-2 border-transparent focus:border-foreground/20 rounded-xl px-4 py-3 font-medium outline-none transition-all"
                          placeholder="acme.com"
                        />
                        {errors.domainName && <p className="text-xs font-bold text-red-500">{errors.domainName.message}</p>}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <p className="text-sm text-foreground/40 font-bold italic mb-4">
                        Social links are optional but help us tailor your operators.
                      </p>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                            <Linkedin size={14} className="text-[#0077b5]" /> LinkedIn
                          </label>
                          <input
                            {...register("linkedin")}
                            className="w-full bg-foreground/5 border-2 border-transparent focus:border-foreground/20 rounded-xl px-4 py-3 font-medium outline-none transition-all"
                            placeholder="https://linkedin.com/in/username"
                          />
                          {errors.linkedin && <p className="text-xs font-bold text-red-500">{errors.linkedin.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                            <Instagram size={14} className="text-[#e1306c]" /> Instagram
                          </label>
                          <input
                            {...register("instagram")}
                            className="w-full bg-foreground/5 border-2 border-transparent focus:border-foreground/20 rounded-xl px-4 py-3 font-medium outline-none transition-all"
                            placeholder="https://instagram.com/username"
                          />
                          {errors.instagram && <p className="text-xs font-bold text-red-500">{errors.instagram.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                            <Facebook size={14} className="text-[#1877f2]" /> Facebook
                          </label>
                          <input
                            {...register("facebook")}
                            className="w-full bg-foreground/5 border-2 border-transparent focus:border-foreground/20 rounded-xl px-4 py-3 font-medium outline-none transition-all"
                            placeholder="https://facebook.com/username"
                          />
                          {errors.facebook && <p className="text-xs font-bold text-red-500">{errors.facebook.message}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="grid md:grid-cols-3 gap-4">
                        {(["CORE", "PRIME", "APEX"] as const).map((planName) => (
                          <motion.div
                            key={planName}
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setValue("plan", planName)}
                            className={`cursor-pointer p-6 clay-card transition-all duration-300 relative group md:col-span-1 flex flex-col justify-between overflow-hidden
                              ${selectedPlan === planName
                                ? 'border-2 border-primary shadow-xl bg-primary/5'
                                : 'border-primary/20 bg-primary/5 hover:border-primary/30 hover:shadow-lg opacity-70 hover:opacity-100'
                              }`}
                          >
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 p-24 bg-primary/10 rounded-full -mr-12 -mt-12 group-hover:bg-primary/20 transition-all duration-700 group-hover:scale-[4] group-hover:p-48" />
                            <div className="flex flex-col gap-4 relative z-10">
                              <div className="flex justify-between items-start">
                                <span className={`text-lg font-heading font-black ${selectedPlan === planName ? 'text-primary' : 'text-foreground'}`}>
                                  {planName}
                                </span>
                                {selectedPlan === planName && (
                                  <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                    <CheckCircle2 size={14} />
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="text-2xl font-black text-foreground">
                                  ${plans[planName].price.toLocaleString()}
                                </div>
                                <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
                                  Per Month
                                </div>
                              </div>
                              <div className="h-px w-full bg-foreground/10 my-2" />
                              <ul className="space-y-3">
                                {plans[planName].features.map((feature, i) => (
                                  <li key={i} className="flex items-start gap-2 text-[11px] font-bold text-foreground/70">
                                    <div className={`mt-0.5 h-1.5 w-1.5 rounded-full shrink-0 ${selectedPlan === planName ? 'bg-primary' : 'bg-foreground/30'}`} />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      {/* Output Email 1 - Required for all plans */}
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                          <Mail size={14} /> Output Delivery Email 1 <span className="text-red-500">*</span>
                        </label>
                        <input
                          {...register("outputEmail1")}
                          className="w-full bg-foreground/5 border-2 border-transparent focus:border-foreground/20 rounded-xl px-4 py-3 font-medium outline-none transition-all"
                          placeholder="primary@company.com"
                        />
                        {errors.outputEmail1 && <p className="text-xs font-bold text-red-500">{errors.outputEmail1.message}</p>}
                      </div>

                      {/* Output Email 2 - Optional for PRIME & APEX */}
                      {(selectedPlan === "PRIME" || selectedPlan === "APEX") && (
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                            <Mail size={14} /> Output Delivery Email 2 <span className="text-foreground/40 text-[10px]">(Optional)</span>
                          </label>
                          <input
                            {...register("outputEmail2")}
                            className="w-full bg-foreground/5 border-2 border-transparent focus:border-foreground/20 rounded-xl px-4 py-3 font-medium outline-none transition-all"
                            placeholder="secondary@company.com"
                          />
                          {errors.outputEmail2 && <p className="text-xs font-bold text-red-500">{errors.outputEmail2.message}</p>}
                        </div>
                      )}

                      {/* Output Email 3 - Optional for PRIME & APEX */}
                      {(selectedPlan === "PRIME" || selectedPlan === "APEX") && (
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                            <Mail size={14} /> Output Delivery Email 3 <span className="text-foreground/40 text-[10px]">(Optional)</span>
                          </label>
                          <input
                            {...register("outputEmail3")}
                            className="w-full bg-foreground/5 border-2 border-transparent focus:border-foreground/20 rounded-xl px-4 py-3 font-medium outline-none transition-all"
                            placeholder="third@company.com"
                          />
                          {errors.outputEmail3 && <p className="text-xs font-bold text-red-500">{errors.outputEmail3.message}</p>}
                        </div>
                      )}

                      {/* Output Email 4 - Optional for APEX only */}
                      {selectedPlan === "APEX" && (
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                            <Mail size={14} /> Output Delivery Email 4 <span className="text-foreground/40 text-[10px]">(Optional)</span>
                          </label>
                          <input
                            {...register("outputEmail4")}
                            className="w-full bg-foreground/5 border-2 border-transparent focus:border-foreground/20 rounded-xl px-4 py-3 font-medium outline-none transition-all"
                            placeholder="fourth@company.com"
                          />
                          {errors.outputEmail4 && <p className="text-xs font-bold text-red-500">{errors.outputEmail4.message}</p>}
                        </div>
                      )}

                      {/* Output Email 5 - Optional for APEX only */}
                      {selectedPlan === "APEX" && (
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                            <Mail size={14} /> Output Delivery Email 5 <span className="text-foreground/40 text-[10px]">(Optional)</span>
                          </label>
                          <input
                            {...register("outputEmail5")}
                            className="w-full bg-foreground/5 border-2 border-transparent focus:border-foreground/20 rounded-xl px-4 py-3 font-medium outline-none transition-all"
                            placeholder="fifth@company.com"
                          />
                          {errors.outputEmail5 && <p className="text-xs font-bold text-red-500">{errors.outputEmail5.message}</p>}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {step === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {/* Deployment Summary */}
                      <div className="clay-card p-6 bg-foreground/5 border-foreground/10">
                        <h3 className="text-xl font-heading font-black mb-4 flex items-center gap-2">
                          Deployment Summary
                        </h3>
                        <div className="flex justify-between items-center border-b border-foreground/10 pb-4 mb-4">
                          <div>
                            <p className="font-bold text-lg">{formData.plan} Plan</p>
                            <p className="text-xs text-foreground/60">Monthly Operator Subscription</p>
                          </div>
                          <p className="font-heading font-black text-xl">${plans[formData.plan].total.toLocaleString()}/mo</p>
                        </div>

                        {/* Included Operators */}
                        <div className="mb-4">
                          <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-2">Included Operators</p>
                          <ul className="space-y-1.5">
                            {plans[formData.plan].features
                              .filter(f => !f.includes("❌") && !f.includes("Refund") && !f.includes("Setup Fee"))
                              .map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-[11px] font-bold text-foreground/70">
                                  <CheckCircle2 size={12} className="text-green-500 mt-0.5 shrink-0" />
                                  {feature}
                                </li>
                              ))}
                          </ul>
                        </div>

                        {/* Delivery Details */}
                        <div className="bg-foreground/5 rounded-xl p-4 space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-foreground/50 font-bold">Delivered to</span>
                            <span className="font-bold text-foreground">{formData.outputEmail1}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-foreground/50 font-bold">Company</span>
                            <span className="font-bold text-foreground">{formData.companyName}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-foreground/50 font-bold">Setup Time</span>
                            <span className="font-bold text-foreground">Within 7 Hours</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Notice */}
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/15">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Lock size={14} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-foreground mb-1">Secure Payment via Dodo Payments</p>
                            <p className="text-[11px] text-foreground/50 font-medium leading-relaxed">
                              When you confirm, a secure checkout will open for payment processing. Your booking is saved immediately — operators begin deployment within 7 hours of payment confirmation.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="px-2 mt-4 text-center">
                        <p className="text-xs font-bold text-foreground/50 leading-relaxed">
                          By confirming, you&apos;re requesting a {formData.plan} Plan deployment and will be directed to our secure payment portal.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-4 mt-10">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={isSubmitting}
                      className="flex-1 py-4 px-6 border-2 border-foreground/10 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                  )}
                  {step < 5 ? (
                    <button
                      type="submit"
                      className="flex-[2] clay-button-primary py-4 px-6 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 group"
                    >
                      Continue
                      <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-[2] clay-button-primary py-4 px-6 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 group disabled:opacity-50 bg-gradient-to-r from-primary to-primary/80 text-white border-none"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Deploying Operators...
                        </>
                      ) : (
                        <>
                          Confirm & Proceed to Payment
                          <Rocket size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="clay-card p-8 md:p-12 text-center flex flex-col items-center gap-6 border-foreground/10 shadow-3xl bg-background relative overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/50" />

            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/20 flex items-center justify-center"
            >
              <CheckCircle2 size={40} className="text-green-500" />
            </motion.div>

            {/* Main Message */}
            <div className="space-y-4 max-w-md">
              <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground">
                Your Request Has Been Received
              </h2>
              <p className="text-base text-foreground/60 font-medium leading-relaxed">
                Welcome to SoloChief, <span className="text-foreground font-bold">{formData.fullName}</span>.
              </p>
              <p className="text-sm text-foreground/50 font-medium leading-relaxed">
                We are now training our operators specifically for <span className="font-bold text-foreground/70">{formData.companyName}</span>.
                They will be calibrated to your sector, domain, and company profile — and <span className="font-bold text-foreground">activated within 7 hours</span>.
              </p>
              <p className="text-xs text-foreground/40 font-medium leading-relaxed">
                Our team will reach out to finalize payment and setup details. Outputs will be delivered to <span className="font-bold text-foreground/60">{formData.outputEmail1}</span>.
              </p>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-3 w-full max-w-sm"
            >
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full clay-button-primary px-10 py-4 font-bold text-base flex items-center justify-center gap-2 group"
              >
                Go to Your Dashboard <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[10px] text-foreground/30 font-bold">
                Track your setup progress from the dashboard
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
