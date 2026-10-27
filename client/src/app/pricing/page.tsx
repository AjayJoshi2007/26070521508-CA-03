"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Zap, Crown, Rocket, Shield, Clock, Loader2, CreditCard } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

import { CTASection } from "@/components/CTASection";
import { openDodoCheckout } from "@/components/DodoCheckoutProvider";
import { PLAN_PRODUCT_IDS, type PlanType } from "@/lib/dodo-payments";

const pricingTiers = [
  {
    name: "CORE" as PlanType,
    description: "The Foundation. For solo founders who need to validate quickly and generate cash flow.",
    price: "$498",
    period: "/month",
    icon: Zap,
    operatorsHeader: "(06/10)",
    features: [
      "INTRO (The Scout): 50–70 Verified Leads / Day (Single Channel)",
      "CHIEF CMO (The Brain): Weekly Content Strategy (1 Core Platform)",
      "SNAP (The Crafter): 3 Static Ad Creatives / Day",
      "CLIP (The Editor): 1 Vertical Video Ad / Week",
      "VIBE (The Bard): 1 Audio Ad / Week (+ Poetic Copy)",
      "PULSE (The Architect): Standard Domain & DNS Monitoring"
    ],
    terms: [],
    notIncluded: "MEND / BASE / TRACE / SCOOP",
    stickyText: "",
    buttonText: "DEPLOY CORE",
  },
  {
    name: "PRIME" as PlanType,
    description: "The Growth Engine. For scaling startups requiring market intelligence and high-volume content.",
    price: "$898",
    period: "/month",
    icon: Crown,
    operatorsHeader: "(08/10)",
    features: [
      "INTRO (The Scout): 150–180 Verified Leads / Day (Multi-Channel)",
      "CHIEF CMO (The Brain): Weekly Content Strategy (3 Platforms)",
      "VIBE (The Bard): 3 Audio Ads / Week (+ Rhythmic Jingles)",
      "BASE (The Anchor): 1 Customized Daily Operation (Your Routine, Automated)",
      "SNAP (The Crafter): 5 Static Ad Creatives / Day (Multivariate Testing)",
      "CLIP (The Editor): 3 Vertical Video Ads / Week",
      "SCOOP (The Sentinel): Monthly Sector Intelligence Report",
      "PULSE (The Architect): Enhanced Domain Health Monitoring"
    ],
    terms: [],
    notIncluded: "MEND / TRACE",
    stickyText: "Most Popular",
    buttonText: "GO PRIME",
  },
  {
    name: "APEX" as PlanType,
    description: "The Market Leader. Maximum volume. Total market ubiquity and bespoke engineering.",
    price: "$1,498",
    period: "/month",
    icon: Rocket,
    operatorsHeader: "(10/10 - FULL DECAGON)",
    features: [
      "TRACE (The Ghost): 24/7 Deep SEO & Generative AI Search (GEO) Domination",
      "BASE (The Anchor): 5 Customized Daily Operations (Full Workflow Chaining)",
      "MEND (The Arbiter): Priority Crisis Alerts & Psychological Resolution",
      "INTRO (The Scout): 350–400 Verified Leads / Day (Hyper-Personalized)",
      "CHIEF CMO (The Brain): Full Multi-Platform Strategy (Reddit, X, IG, LI, TT)",
      "SNAP (The Crafter): 7 Static Ad Creatives / Day (Brand-Locked Assets)",
      "CLIP (The Editor): 5 Vertical Video Ads / Week (Cinema Grade)",
      "VIBE (The Bard): Unlimited Poetic Copy + Weekly Professional Audio Ads",
      "SCOOP (The Sentinel): Weekly Sector Strategic Briefing",
      "PULSE (The Architect): Enterprise-Grade Infrastructure Health Checks"
    ],
    terms: [],
    notIncluded: "",
    stickyText: "",
    buttonText: "ACTIVATE APEX",
  },
];

export default function PricingPage() {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<PlanType | null>(null);

  /**
   * Handle plan checkout — calls the /api/checkout endpoint
   * to create a Dodo Payments checkout session, then opens the overlay
   */
  const handleCheckout = async (plan: PlanType) => {
    setLoadingPlan(plan);
    try {
      const productId = PLAN_PRODUCT_IDS[plan];

      // Create checkout via our API route (static GET)
      const response = await fetch(`/api/checkout?productId=${productId}`);
      const data = await response.json();

      if (!response.ok || !data.checkout_url) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Open the Dodo Payments overlay checkout
      await openDodoCheckout(data.checkout_url);
    } catch (error: any) {
      console.error("[Pricing] Checkout error:", error);
      toast.error(error.message || "Failed to initiate checkout. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans transition-colors duration-300 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[60%] w-[60%] rounded-full bg-foreground/5 blur-[120px]"></div>
        <div className="absolute right-[-5%] bottom-[-10%] h-[60%] w-[60%] rounded-full bg-foreground/5 blur-[120px]"></div>
        <div className="absolute left-[20%] top-[40%] h-[40%] w-[40%] rounded-full bg-foreground/5 blur-[100px]"></div>
      </div>

      <div className="relative z-10 flex flex-col">
        <Header />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pt-48">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, rotate: -8 }}
                animate={{ opacity: 1, rotate: -3 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="inline-block -rotate-3 bg-primary px-4 py-2 shadow-lg text-sm font-bold text-primary-foreground mb-6 transform hover:rotate-0 transition-transform cursor-default"
                style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}
              >
                Simple Pricing
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-heading font-bold text-foreground mb-4 uppercase tracking-tight">
                DECAGON: YOUR{" "}
                <span className="text-foreground/40 underline decoration-foreground/20 underline-offset-8 mt-2 block sm:inline">DECA-FORCE</span>
              </h1>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-medium">
                10 Elite Operators. 0% Drama. One Sovereign Engine.
              </p>
            </motion.div>



            {/* Pricing Cards */}
            <div className="grid gap-8 sm:gap-12 lg:grid-cols-3 mb-16 pt-8">
              {pricingTiers.map((tier, index) => {
                const Icon = tier.icon;
                const isLoading = loadingPlan === tier.name;
                return (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (index + 3), duration: 0.5 }}
                    onMouseEnter={() => setHoveredTier(index)}
                    onMouseLeave={() => setHoveredTier(null)}
                    className="relative clay-card p-8 flex flex-col transition-all duration-300 hover:translate-y-[-8px] border-primary/20 bg-primary/5 shadow-xl overflow-hidden group"
                  >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 p-24 bg-primary/10 rounded-full -mr-12 -mt-12 group-hover:bg-primary/20 transition-all duration-700 group-hover:scale-[4] group-hover:p-48" />
                    <AnimatePresence>
                      {tier.stickyText && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, rotate: 2 }}
                          animate={{ opacity: 1, y: -45, rotate: -4 }}
                          exit={{ opacity: 0, y: 10, rotate: 2 }}
                          className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap"
                        >
                          <div
                            className="bg-primary px-4 py-2 shadow-lg text-sm font-bold text-primary-foreground transform transition-transform"
                            style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}
                          >
                            {tier.stickyText}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45 shadow-[2px_2px_0px_rgba(0,0,0,0.05)]"></div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/5 border border-foreground/10">
                        <Icon size={24} className="text-foreground" />
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-foreground">{tier.name}</h3>
                    </div>

                    <p className="text-foreground/60 mb-6 min-h-[48px] font-medium relative z-10">{tier.description}</p>

                    <div className="mb-6 relative z-10">
                      <span className="text-4xl font-heading font-bold text-foreground">{tier.price}</span>
                      <span className="text-foreground/40 font-bold ml-1">{tier.period}</span>
                    </div>

                    <div className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-foreground/40 relative z-10 mt-2">
                      <Sparkles size={12} />
                      THE OPERATORS {tier.operatorsHeader}:
                    </div>

                    <ul className="space-y-3 mb-6 relative z-10 flex-1">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check size={18} className="text-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/80 font-medium text-sm leading-snug">{feature}</span>
                        </li>
                      ))}
                      {tier.notIncluded && (
                        <li className="flex items-start gap-3 opacity-60">
                          <div className="flex-shrink-0 mt-0.5 w-[18px] text-center text-sm">❌</div>
                          <span className="text-foreground font-medium text-sm leading-snug">{tier.notIncluded}: Not Included</span>
                        </li>
                      )}
                    </ul>

                    {tier.terms.length > 0 && (
                      <ul className="space-y-2 mb-8 relative z-10 pt-4 border-t border-foreground/10">
                        {tier.terms.map((term, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-[18px] h-[18px] rounded flex items-center justify-center bg-foreground/5 border border-foreground/10 flex-shrink-0 mt-0.5">
                              <div className="w-1 h-1 rounded-full bg-foreground/40" />
                            </div>
                            <span className="text-foreground/50 font-bold text-[10px] uppercase tracking-wide leading-tight">{term}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Payment Button */}
                    <div className="relative z-10 space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCheckout(tier.name)}
                        disabled={loadingPlan !== null}
                        className="w-full clay-button-primary py-4 px-6 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard size={18} />
                            {tier.buttonText}
                          </>
                        )}
                      </motion.button>
                      <p className="text-center text-[10px] text-foreground/30 font-bold flex items-center justify-center gap-1">
                        <Shield size={10} />
                        Secured by Dodo Payments
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mb-16 px-4">
              <p className="text-primary font-bold text-sm max-w-2xl mx-auto">
                BILLING NOTICE: Secure transactions are processed by the authorized merchant BHAMINI HITESH HARSH. Please recognize this descriptor on your bank statement.
              </p>
            </div>

            {/* Cost Comparison Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, rotate: -8 }}
                  animate={{ opacity: 1, rotate: -3 }}
                  transition={{ delay: 0.65, duration: 0.3 }}
                  className="inline-block -rotate-3 bg-foreground px-4 py-2 shadow-lg text-sm font-bold text-background mb-6 transform hover:rotate-0 transition-transform cursor-default"
                  style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}
                >
                  The Math is Simple
                </motion.div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  Why SoloChief Costs Less Than{" "}
                  <span className="text-foreground/40 underline decoration-foreground/20 underline-offset-8">
                    One Employee
                  </span>
                </h2>
                <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-medium">
                  Replace an entire operational team for less than the cost of a single mid-level hire.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Traditional Team */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="clay-card p-5 sm:p-8 border-2 border-red-500/20 bg-red-500/5"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                      <Clock size={24} className="text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-foreground">Hiring Equivalent Team</h3>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center pb-2 border-b border-foreground/10">
                      <span className="text-sm text-foreground/70 font-medium">Lead Gen Specialist (INTRO)</span>
                      <span className="text-sm font-bold text-foreground">$4,500/mo</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-foreground/10">
                      <span className="text-sm text-foreground/70 font-medium">Graphic Designer (SNAP)</span>
                      <span className="text-sm font-bold text-foreground">$4,000/mo</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-foreground/10">
                      <span className="text-sm text-foreground/70 font-medium">Video Editor (CLIP)</span>
                      <span className="text-sm font-bold text-foreground">$4,500/mo</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-foreground/10">
                      <span className="text-sm text-foreground/70 font-medium">Market Analyst (SCOOP)</span>
                      <span className="text-sm font-bold text-foreground">$5,500/mo</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-foreground/10">
                      <span className="text-sm text-foreground/70 font-medium">Community Manager (MEND)</span>
                      <span className="text-sm font-bold text-foreground">$3,500/mo</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-foreground/10">
                      <span className="text-sm text-foreground/70 font-medium">DevOps/IT (PULSE)</span>
                      <span className="text-sm font-bold text-foreground">$6,000/mo</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-foreground/10">
                      <span className="text-sm text-foreground/70 font-medium">Tools & Software</span>
                      <span className="text-sm font-bold text-foreground">$1,200/mo</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-foreground/10">
                      <span className="text-sm text-foreground/70 font-medium">Copywriter / Audio (VIBE)</span>
                      <span className="text-sm font-bold text-foreground">$4,500/mo</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-foreground/10">
                      <span className="text-sm text-foreground/70 font-medium">Chief Mktg Officer (CHIEF CMO)</span>
                      <span className="text-sm font-bold text-foreground">$8,000/mo</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-foreground/10">
                      <span className="text-sm text-foreground/70 font-medium">SEO Specialist (TRACE)</span>
                      <span className="text-sm font-bold text-foreground">$5,000/mo</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-foreground/10">
                      <span className="text-sm text-foreground/70 font-medium">Operations Manager (BASE)</span>
                      <span className="text-sm font-bold text-foreground">$5,000/mo</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-foreground/10">
                      <span className="text-sm text-foreground/70 font-medium">Payroll Taxes (15%)</span>
                      <span className="text-sm font-bold text-foreground">$7,500/mo</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-red-500/30">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-heading font-bold text-foreground">TOTAL COST</span>
                      <span className="text-2xl font-heading font-black text-red-600 dark:text-red-400">
                        $58,700/mo
                      </span>
                    </div>
                    <p className="text-xs text-foreground/50 mt-2 font-medium">
                      + Sick days, vacations, turnover, training costs
                    </p>
                  </div>
                </motion.div>

                {/* SoloChief */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="clay-card p-5 sm:p-8 border-2 border-primary/30 bg-primary/5 relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4 px-3 py-1 bg-primary rounded-full">
                    <span className="text-xs font-black text-primary-foreground">97% SAVINGS</span>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Zap size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-foreground">SoloChief APEX</h3>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Check size={18} className="text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-bold text-foreground">10 AI Operators</p>
                        <p className="text-xs text-foreground/60">INTRO, SNAP, CLIP, SCOOP, MEND, PULSE, VIBE, CHIEF CMO, TRACE, BASE</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check size={18} className="text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-bold text-foreground">24/7/365 Operation</p>
                        <p className="text-xs text-foreground/60">No sick days, no vacations, no downtime</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check size={18} className="text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-bold text-foreground">Human Verification Layer</p>
                        <p className="text-xs text-foreground/60">Quality control on every output</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check size={18} className="text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-bold text-foreground">All Tools Included</p>
                        <p className="text-xs text-foreground/60">No additional software costs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check size={18} className="text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-bold text-foreground">Zero Management</p>
                        <p className="text-xs text-foreground/60">Fully autonomous execution</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check size={18} className="text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-bold text-foreground">Instant Scaling</p>
                        <p className="text-xs text-foreground/60">Upgrade or downgrade anytime</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-primary/30">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-heading font-bold text-foreground">TOTAL COST</span>
                      <span className="text-2xl font-heading font-black text-primary">$1,498/mo</span>
                    </div>
                    {/* Green overlay card removed as requested */}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <div className="mt-20">
              <CTASection />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
