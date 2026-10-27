/**
 * Website Configuration & Constants
 * 
 * Centralized location for all marketing copy, social links, pricing,
 * features, and other constants to make updates easier.
 */

export const SITE_NAME = "SoloChief";
export const SITE_DESCRIPTION =
  "The Autonomous Executive Team. We replace operational friction with intelligent execution.";

export const SOCIAL_LINKS = {
  twitter: "https://x.com/SolochiefLabs",
  linkedin: "https://linkedin.com/company/solochief",
  instagram: "https://www.instagram.com/solochieflabs/",
  youtube: "https://youtube.com/@solochief",
  threads: "https://www.threads.com/@solochieflabs",
};

export const NAVIGATION = {
  company: [
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

export const HERO_CONTENT = {
  badge: "Future of Business",
  headline: "Scale your business, Not your headcount.",
  subheadline:
    "Stop doing everything yourself. SoloChief deploys a fully autonomous team—covering Sales, Design, and Reputation—that executes your daily operations 24/7. Replace a $33K/month team for under $2.4K. No management required.",
  cta: {
    primary: {
      label: "DEPLOY YOUR TEAM",
      href: "/book",
    },
  },
};

export const FEATURES = [
  {
    icon: "Zap",
    title: "Enterprise V1.0",
    description: "Premium AI Operations.",
  },
];

export const METRICS = {
  efficiency: {
    label: "Efficiency",
    value: "99.4%",
  },
  latency: {
    label: "Latency",
    value: "12ms",
  },
};

export const PRICING_TIERS = [
  {
    name: "CORE",
    price: "$498",
    period: "/month",
    description: "The Foundation. For solo founders who need to validate quickly and generate cash flow.",
    features: [
      "INTRO (The Scout): 50–70 Verified Leads / Day",
      "CHIEF CMO (The Brain): Weekly Content Strategy (1 Core Platform)",
      "SNAP (The Crafter): 3 Static Ad Creatives / Day",
      "CLIP (The Editor): 1 Vertical Video Ad / Week",
      "VIBE (The Bard): 1 Audio Ad / Week (+ Poetic Copy)",
      "PULSE (The Architect): Standard Domain & DNS Monitoring",
      "30% Non-Refundable Setup Fee applied to first month."
    ],
    highlighted: false,
    buttonText: "DEPLOY CORE"
  },
  {
    name: "PRIME",
    price: "$898",
    period: "/month",
    description: "The Growth Engine. For scaling startups requiring market intelligence & high-volume content.",
    features: [
      "Most Popular",
      "INTRO (The Scout): 150–180 Verified Leads / Day (Multi-Channel)",
      "CHIEF CMO (The Brain): Weekly Content Strategy (3 Platforms)",
      "VIBE (The Bard): 3 Audio Ads / Week (+ Rhythmic Jingles)",
      "BASE (The Anchor): 1 Customized Daily Operation (Your Routine, Automated)",
      "SNAP (The Crafter): 5 Static Ad Creatives / Day (Multivariate Testing)",
      "CLIP (The Editor): 3 Vertical Video Ads / Week",
      "SCOOP (The Sentinel): Monthly Sector Intelligence Report",
      "30% Non-Refundable Setup Fee applied to first month."
    ],
    highlighted: true,
    buttonText: "GO PRIME"
  },
  {
    name: "APEX",
    price: "$1,498",
    period: "/month",
    description: "The Market Leader. Maximum volume. Total market ubiquity and bespoke engineering.",
    features: [
      "TRACE (The Ghost): 24/7 Deep SEO & Generative AI Search (GEO) Domination",
      "BASE (The Anchor): 5 Customized Daily Operations (Full Workflow Chaining)",
      "MEND (The Arbiter): Priority Crisis Alerts & Psychological Resolution",
      "INTRO (The Scout): 350–400 Verified Leads / Day (Hyper-Personalized)",
      "CHIEF CMO (The Brain): Full Multi-Platform Strategy",
      "SNAP (The Crafter): 7 Static Ad Creatives / Day (Brand-Locked Assets)",
      "CLIP (The Editor): 5 Vertical Video Ads / Week (Cinema Grade)",
      "VIBE (The Bard): Unlimited Poetic Copy + Weekly Professional Audio Ads",
      "30% Non-Refundable Setup Fee applied to first month."
    ],
    highlighted: false,
    buttonText: "ACTIVATE APEX"
  },
];

export const TEAM_ROLES = [
  {
    role: "Sales Operator",
    description: "Handles lead generation and sales pipeline",
    icon: "TrendingUp",
  },
  {
    role: "Design Operator",
    description: "Creates marketing materials and brand assets",
    icon: "Palette",
  },
  {
    role: "Reputation Operator",
    description: "Monitors and manages your online presence",
    icon: "Shield",
  },
];

export const WHY_CHOOSE_US = [
  {
    title: "Cost-Effective",
    description: "$33K/month team for under $2.4K",
  },
  {
    title: "24/7 Operation",
    description: "Never miss an opportunity",
  },
  {
    title: "No Management",
    description: "Plug and play setup",
  },
  {
    title: "Enterprise Grade",
    description: "99.4% uptime SLA",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "SoloChief transformed our operations. We're now able to focus on strategy instead of daily tasks.",
    author: "Alex Chen",
    role: "Founder, TechStartup",
  },
  {
    quote:
      "The ROI was immediate. We replaced our entire operations team with SoloChief.",
    author: "Sarah Johnson",
    role: "CEO, GrowthCo",
  },
  {
    quote:
      "Finally, a solution that actually understands our business workflow. Couldn't recommend it more.",
    author: "Marcus Lee",
    role: "Director, Digital Operations",
  },
];

export const FAQ = [
  {
    question: "How long does it take to set up?",
    answer:
      "SoloChief can be deployed in under 30 minutes. Our onboarding team will guide you through the entire process.",
  },
  {
    question: "Can I customize the AI operators?",
    answer:
      "Yes! Each operator can be customized to match your specific business needs and workflows.",
  },
  {
    question: "What if I need to scale up?",
    answer:
      "Simply add more operators as your business grows. Your plan can be upgraded at any time.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "All plans include a 30% non-refundable setup fee applied to the first month, which covers infrastructure provisioning and operator calibration costs. Please refer to our Terms of Service for detailed cancellation policies.",
  },
];

export const FOOTER_TEXT = {
  description:
    "The Autonomous Executive Team. We replace operational friction with intelligent execution. SoloChief deploys specialized AI operators that scale your revenue, protect your brand, and run your daily workflows—so you don't have to.",
  copyright: `© {{year}} ${SITE_NAME}. All rights reserved.`,
};
