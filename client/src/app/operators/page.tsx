"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Target,
  Palette,
  Film,
  TrendingUp,
  Eye,
  Shield,
  Bot,
  Search,
  Users,
  ArrowRight,
  Sparkles,
  Music,
  Brain,
  Ghost,
  Layers,
  Activity
} from "lucide-react";

const operators = [
  {
    number: "01",
    name: "INTRO",
    role: "Lead Generation",
    frequency: "Daily",
    value: "High",
    info: "Scans global B2B databases, social media, and the open web to identify your perfect customer match. It verifies emails, writes the initial outreach script, and delivers a clean CSV of 50–400 verified leads to your inbox every morning.",
  },
  {
    number: "02",
    name: "SNAP",
    role: "Ad Design",
    frequency: "Daily",
    value: "High",
    info: "Generates professional static ad creatives and social posters tailored to your brand’s specific HEX codes. Whether for LinkedIn sliders or Instagram ads, it produces high-converting visuals daily.",
  },
  {
    number: "03",
    name: "CLIP",
    role: "Video Production",
    frequency: "Weekly",
    value: "Very High",
    info: "Transforms text scripts and blog posts into engaging vertical video ads (Reels/TikTok style). It automatically handles the stock footage, AI voiceovers, and captions to keep your social feed active.",
  },
  {
    number: "04",
    name: "SCOOP",
    role: "Market Intelligence",
    frequency: "24/7",
    value: "Strategic",
    info: "Monitors your specific industry sector 24/7. It tracks competitor moves, emerging trends, and pricing shifts, delivering a periodic strategic briefing so you never fly blind.",
  },
  {
    number: "05",
    name: "MEND",
    role: "Reputation Management",
    frequency: "Real-Time",
    value: "High",
    info: "Scans the web for mentions of your brand. If it detects a negative review or angry comment, it instantly drafts a psychological resolution script to help you resolve the issue and protect your rating.",
  },
  {
    number: "06",
    name: "PULSE",
    role: "Domain Infrastructure",
    frequency: "24/7",
    value: "Essential",
    info: "Acts as your invisible engineer. It monitors your entire domain reputation and DNS health (SPF, DKIM, DMARC). If your domain score drops, it alerts you immediately to prevent your emails from hitting the spam folder.",
  },
  {
    number: "07",
    name: "VIBE",
    role: "Poetics & Audio Ads",
    frequency: "Weekly",
    value: "Creative",
    info: "Generates high-converting poetic ad copy, rhythmic jingles, and lyrical scripts for audio platforms. It ensures your brand voice is memorable and emotional, cutting through the standard corporate noise.",
  },
  {
    number: "08",
    name: "CHIEF CMO",
    role: "Social Content Strategist",
    frequency: "Weekly",
    value: "Strategic",
    info: "Analyzes real-time trends across Reddit, Instagram, X, TikTok, FB, and LinkedIn. It provides a weekly content strategy based on the newest viral hooks, telling you exactly what to post to capture the week's energy.",
  },
  {
    number: "09",
    name: "TRACE",
    role: "SEO & AI Search",
    frequency: "24/7",
    value: "Essential",
    info: "Monitors the website 24/7 for SEO health while optimizing content for Generative Engine Optimization (GEO). It ensures your brand is the top-cited recommendation when people ask Gemini or ChatGPT for solutions.",
  },
  {
    number: "10",
    name: "BASE",
    role: "Automated Routine",
    frequency: "Scheduled",
    value: "Custom",
    info: "Tell it any recurring task you need done every morning (e.g., Scrape the top 5 AI news stories and summarize them), and it executes that loop daily, delivering the results straight to your mail.",
  }
];

function HunterVisual() {
  const leads = [
    { name: "Sarah J.", role: "CEO @ TechFlow", status: "Active" },
    { name: "Marcus K.", role: "Head of Growth", status: "Verified" },
    { name: "Elena R.", role: "Product Lead", status: "Active" },
  ];

  return (
    <div className="relative w-full h-[350px] sm:h-[400px] flex items-center justify-center group scale-[0.85] sm:scale-100 origin-center">
      <div className="relative z-20 w-full max-w-[320px] aspect-square bg-background rounded-[3rem] shadow-2xl border border-foreground/5 flex items-center justify-center overflow-hidden p-6">
        <div className="absolute inset-0 bg-background opacity-50" />

        <div className="relative z-10 w-full h-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="px-3 py-1 bg-primary rounded-full flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] text-white font-black tracking-widest uppercase">HUNTING</span>
            </div>
            <Search size={18} className="text-foreground/20" />
          </div>

          <div className="flex-1 space-y-2">
            {leads.map((lead, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="p-2.5 w-full bg-background rounded-xl flex items-center gap-3 border border-foreground/5 shadow-sm hover:border-foreground/10 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center shrink-0">
                  <Users size={14} className="text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-foreground truncate">{lead.name}</div>
                  <div className="text-[8px] text-foreground/40 truncate">{lead.role}</div>
                </div>
                <div className="text-[8px] font-bold text-foreground/20 uppercase">{lead.status}</div>
              </motion.div>
            ))}
          </div>

          <div className="h-10 w-full bg-foreground/5 rounded-xl flex items-center justify-between px-4 border border-foreground/5">
            <div className="flex flex-col">
              <span className="text-[8px] text-foreground/40 font-bold uppercase tracking-widest">Daily Leads</span>
              <span className="text-[12px] font-black text-foreground">+24 qualified</span>
            </div>
            <Target size={16} className="text-foreground/40" />
          </div>
        </div>

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-4 right-4 p-4 bg-foreground text-background rounded-2xl shadow-xl z-30 border border-background/10"
        >
          <Target size={24} />
        </motion.div>
      </div>
    </div>
  );
}

function VisualizerVisual() {
  return (
    <div className="relative w-full h-[350px] sm:h-[400px] flex items-center justify-center group scale-[0.85] sm:scale-100 origin-center">
      <div className="relative z-20 w-full max-w-[320px] aspect-square bg-background rounded-[3rem] shadow-2xl border border-foreground/5 overflow-hidden">
        <div className="absolute inset-0 bg-background" />

        <div className="relative z-10 w-full h-full p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="px-2 py-0.5 bg-primary rounded-full flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
              <span className="text-[8px] text-white font-black tracking-widest uppercase">Design Gen</span>
            </div>
            <Palette size={16} className="text-foreground/40" />
          </div>

          <div className="flex-1 relative bg-gradient-to-br from-foreground/10 to-foreground/5 rounded-2xl border border-foreground/5 shadow-inner overflow-hidden flex flex-col items-center justify-center p-6">
            <motion.div
              animate={{
                scale: [0.95, 1, 0.95],
                rotate: [-2, 2, -2]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-32 h-32 bg-foreground/10 rounded-xl shadow-lg border border-foreground/10 flex items-center justify-center relative"
            >
              <Palette size={48} className="text-foreground/40" />
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute top-2 right-2 w-3 h-3 bg-zinc-500/60 rounded-full"></div>
                <div className="absolute top-2 right-7 w-3 h-3 bg-zinc-400/60 rounded-full"></div>
                <div className="absolute top-2 right-12 w-3 h-3 bg-zinc-600/60 rounded-full"></div>
              </div>
            </motion.div>

            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mt-6 space-y-2"
            >
              <div className="h-2 w-20 bg-foreground rounded-full" />
              <div className="h-1.5 w-28 bg-foreground/20 rounded-full" />
            </motion.div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex-1 h-1.5 bg-foreground/5 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="h-full bg-foreground"
              />
            </div>
            <span className="text-[8px] font-black text-foreground/40 uppercase tracking-widest whitespace-nowrap">
              Creating...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirectorVisual() {
  return (
    <div className="relative w-full h-[350px] sm:h-[400px] flex items-center justify-center group scale-[0.85] sm:scale-100 origin-center">
      <div className="relative z-20 w-full max-w-[320px] aspect-square bg-background rounded-[3rem] shadow-2xl border border-foreground/5 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-background" />

        <div className="relative z-10 w-full h-full flex flex-col">
          <div className="p-5 flex-1 flex flex-col gap-3">
            <div className="w-full h-24 bg-foreground/5 rounded-2xl relative overflow-hidden flex items-center justify-center">
              <Film size={32} className="text-foreground/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                <span className="text-[8px] text-foreground font-black uppercase tracking-widest">PRODUCING</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <div className="space-y-1">
                  <div className="w-24 h-1 bg-foreground/20 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="h-full bg-foreground"
                    />
                  </div>
                  <span className="text-[8px] text-foreground/50 font-mono">00:45 / 01:00</span>
                </div>
                <Film size={14} className="text-foreground fill-foreground/20" />
              </div>
            </div>

            <div className="flex items-end justify-between h-12 gap-1 px-2">
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [15, Math.random() * 35 + 10, 15] }}
                  transition={{ duration: 0.6 + Math.random() * 0.4, repeat: Infinity }}
                  className="w-1.5 bg-foreground rounded-full opacity-30"
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-foreground/5 rounded-lg border border-foreground/5">
                <div className="text-[6px] text-foreground/40 font-bold uppercase mb-1">Quality</div>
                <div className="text-[10px] font-black text-foreground">4K CINEMA</div>
              </div>
              <div className="p-2 bg-foreground/5 rounded-lg border border-foreground/5">
                <div className="text-[6px] text-foreground/40 font-bold uppercase mb-1">Status</div>
                <div className="text-[10px] font-black text-foreground">60 FPS</div>
              </div>
            </div>
          </div>

          <div className="h-12 bg-foreground px-4 border-t border-background/10 flex items-center justify-between">
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ delay: i * 0.2, duration: 1.2, repeat: Infinity }}
                  className="w-6 h-6 rounded-lg bg-background/20 border border-background/20"
                />
              ))}
            </div>
            <div className="px-3 py-1 bg-[#FAFAFA] rounded-full text-[8px] font-black text-primary uppercase tracking-widest">
              RENDERING
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OracleVisual() {
  return (
    <div className="relative w-full h-[350px] sm:h-[400px] flex items-center justify-center group scale-[0.85] sm:scale-100 origin-center">
      <div className="relative z-20 w-full max-w-[320px] aspect-square bg-background rounded-[3rem] shadow-2xl border border-foreground/5 flex items-center justify-center overflow-hidden p-6">
        <div className="absolute inset-0 bg-background" />

        <div className="relative z-10 w-full h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="px-2 py-0.5 bg-foreground rounded-full flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-background animate-pulse" />
              <span className="text-[8px] text-background font-black tracking-widest uppercase">Analyzing</span>
            </div>
            <TrendingUp size={16} className="text-foreground/40" />
          </div>

          <div className="flex-1 space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-foreground">Market Opportunity</span>
                <span className="text-[10px] font-black text-foreground">92%</span>
              </div>
              <motion.div
                animate={{ width: ["0%", "92%"] }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="h-1.5 bg-foreground rounded-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-foreground">Competitive Edge</span>
                <span className="text-[10px] font-black text-foreground">78%</span>
              </div>
              <motion.div
                animate={{ width: ["0%", "78%"] }}
                transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
                className="h-1.5 bg-foreground rounded-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-foreground">Growth Potential</span>
                <span className="text-[10px] font-black text-foreground">85%</span>
              </div>
              <motion.div
                animate={{ width: ["0%", "85%"] }}
                transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
                className="h-1.5 bg-foreground rounded-full"
              />
            </div>
          </div>

          <div className="mt-4 p-3 bg-foreground/5 rounded-lg border border-foreground/10">
            <div className="text-[8px] font-bold text-foreground/60 uppercase mb-1">Insight</div>
            <div className="text-[10px] font-black text-foreground">+34% untapped market potential</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DefenderVisual() {
  return (
    <div className="relative w-full h-[350px] sm:h-[400px] flex items-center justify-center group scale-[0.85] sm:scale-100 origin-center">
      <div className="relative z-20 w-full max-w-[320px] aspect-square bg-background rounded-[3rem] shadow-2xl border border-foreground/5 flex items-center justify-center overflow-hidden p-6">
        <div className="absolute inset-0 bg-background" />

        <div className="relative z-10 w-full h-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="px-2 py-0.5 bg-primary rounded-full flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
              <span className="text-[8px] text-white font-black tracking-widest uppercase">LISTENING</span>
            </div>
            <Eye size={18} className="text-foreground/40" />
          </div>

          <div className="flex-1 space-y-2">
            {[
              { platform: "Twitter", sentiment: "Positive", mentions: 124 },
              { platform: "LinkedIn", sentiment: "Positive", mentions: 89 },
              { platform: "Reddit", sentiment: "Neutral", mentions: 34 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="p-3 w-full bg-background rounded-xl flex items-center justify-between border border-foreground/5 hover:border-foreground/10 transition-colors"
              >
                <div>
                  <div className="text-[10px] font-bold text-foreground">{item.platform}</div>
                  <div className="text-[8px] text-foreground/40">{item.mentions} mentions</div>
                </div>
                <div className={`text-[8px] font-black px-2 py-1 rounded-full ${item.sentiment === "Positive" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
                  }`}>
                  {item.sentiment}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-10 w-full bg-foreground/5 rounded-xl flex items-center justify-between px-4 border border-foreground/5"
          >
            <span className="text-[8px] font-black text-foreground/60 uppercase">Real-Time Feed</span>
            <div className="flex gap-1">
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1] }}
                  transition={{ delay: i * 0.15, duration: 0.6, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-foreground"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function MechanicVisual() {
  return (
    <div className="relative w-full h-[350px] sm:h-[400px] flex items-center justify-center group scale-[0.85] sm:scale-100 origin-center">
      <div className="relative z-20 w-full max-w-[320px] aspect-square bg-background rounded-[3rem] shadow-2xl border border-foreground/5 flex items-center justify-center overflow-hidden p-6">
        <div className="absolute inset-0 bg-background" />

        <div className="relative z-10 w-full h-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="px-2 py-0.5 bg-primary rounded-full flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
              <span className="text-[8px] text-white font-black tracking-widest uppercase">PROTECTING</span>
            </div>
            <Shield size={18} className="text-foreground/40" />
          </div>

          <div className="flex-1 space-y-3">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-4 bg-foreground/5 rounded-xl border border-primary/20"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <div>
                  <div className="text-[10px] font-bold text-foreground">System Health</div>
                  <div className="text-[8px] text-foreground/50">100% operational</div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-foreground">Uptime</span>
                <span className="text-[9px] font-black text-foreground">99.99%</span>
              </div>
              <div className="h-1.5 bg-foreground/5 rounded-full overflow-hidden">
                <div className="h-full w-full bg-foreground rounded-full" style={{ width: "99.99%" }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-foreground">Threats Blocked</span>
                <span className="text-[9px] font-black text-foreground">47 today</span>
              </div>
              <div className="h-1.5 bg-foreground/5 rounded-full overflow-hidden">
                <div className="h-full bg-foreground rounded-full" style={{ width: "92%" }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-foreground">Security Score</span>
                <span className="text-[9px] font-black text-foreground">A+</span>
              </div>
              <div className="h-1.5 bg-foreground/5 rounded-full overflow-hidden">
                <div className="h-full w-full bg-foreground rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VibeVisual() {
  return (
    <div className="relative w-full h-[350px] sm:h-[400px] flex items-center justify-center group pointer-events-none scale-[0.85] sm:scale-100 origin-center">
      <div className="relative z-20 w-full max-w-[320px] aspect-square bg-background rounded-[3rem] shadow-2xl border border-foreground/5 flex flex-col overflow-hidden p-5 gap-3">
        <div className="absolute inset-0 bg-background" />

        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="px-3 py-1 bg-primary rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[9px] text-white font-black tracking-widest uppercase">AUDIO STUDIO</span>
          </div>
          <Music size={18} className="text-foreground/20" />
        </div>

        {/* Player UI */}
        <div className="relative z-10 bg-foreground/5 border border-foreground/10 rounded-2xl p-4 flex gap-4 items-center mt-2">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/80 to-primary/20 rounded-xl shadow-lg flex items-center justify-center shrink-0">
            <Music size={24} className="text-white" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[12px] font-black tracking-tight text-foreground truncate">Spotify 30s B2B Spot</span>
            <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest mb-2">VIBE OPERATOR</span>
            <div className="w-full h-1 bg-foreground/10 rounded-full overflow-hidden">
              <motion.div animate={{ width: ["0%", "100%"] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="h-full bg-primary" />
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-[8px] font-mono text-foreground/50">0:14</span>
              <span className="text-[8px] font-mono text-foreground/50">0:30</span>
            </div>
          </div>
        </div>

        {/* Audio Channels */}
        <div className="relative z-10 flex-1 bg-background rounded-2xl border border-foreground/5 shadow-sm p-4 flex flex-col justify-between">
          {[
            { name: "VOCAL SYNTH", color: "bg-primary" },
            { name: "ATMOSPHERE", color: "bg-secondary" },
            { name: "BEAT DETECT", color: "bg-foreground/40" },
          ].map((channel, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[7px] font-bold text-foreground/40 uppercase w-16">{channel.name}</span>
              <div className="flex-1 h-3 flex gap-1 items-center">
                {[...Array(12)].map((_, j) => (
                  <motion.div
                    key={j}
                    animate={{ opacity: [0.2, Math.random() * 0.8 + 0.2, 0.2] }}
                    transition={{ duration: 0.2 + Math.random(), repeat: Infinity, ease: "linear" }}
                    className={`h-full w-2 rounded-sm ${channel.color}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChiefCmoVisual() {
  return (
    <div className="relative w-full h-[350px] sm:h-[400px] flex items-center justify-center group pointer-events-none scale-[0.85] sm:scale-100 origin-center">
      <div className="relative z-20 w-full max-w-[320px] aspect-square bg-background rounded-[3rem] shadow-2xl border border-foreground/5 flex flex-col overflow-hidden p-5 gap-3">
        <div className="absolute inset-0 bg-background" />

        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="px-3 py-1 bg-foreground rounded-full flex items-center gap-2 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
            <span className="text-[8px] text-background font-black tracking-widest uppercase">VIRAL HOOKS</span>
          </div>
          <Brain size={18} className="text-foreground/30" />
        </div>

        {/* Analytics Main Card */}
        <div className="relative z-10 bg-foreground/[0.03] border border-foreground/10 rounded-2xl p-4 flex flex-col gap-3 mt-2">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[8px] font-bold text-foreground/40 uppercase mb-1">Brand Momentum</span>
              <span className="text-2xl font-heading font-black text-foreground leading-none">8.4k</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-md">
              <TrendingUp size={12} /> +24%
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end justify-between h-14 mt-2 gap-1.5">
            {[20, 35, 25, 60, 45, 80, 50].map((h, i) => (
              <div key={i} className="flex-1 bg-foreground/5 rounded-t-md relative overflow-hidden h-full group">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className={`w-full absolute bottom-0 ${i === 5 ? 'bg-primary' : 'bg-foreground/20'} rounded-t-md`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Platforms */}
        <div className="relative z-10 grid grid-cols-2 gap-3 flex-1">
          {[{ name: "X (Twitter)", val: "+14%" }, { name: "TikTok", val: "Viral" }, { name: "LinkedIn", val: "+22%" }, { name: "Reddit", val: "Hot" }].map((plat, i) => (
            <div key={i} className="bg-background border border-foreground/10 shadow-sm rounded-xl p-3 flex flex-col justify-center">
              <span className="text-[8px] font-bold text-foreground/50 uppercase">{plat.name}</span>
              <span className="text-[12px] font-black text-foreground">{plat.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TraceVisual() {
  return (
    <div className="relative w-full h-[350px] sm:h-[400px] flex items-center justify-center group pointer-events-none scale-[0.85] sm:scale-100 origin-center">
      <div className="relative z-20 w-full max-w-[320px] aspect-square bg-background rounded-[3rem] shadow-2xl border border-foreground/5 overflow-hidden p-5 flex flex-col gap-3">
        <div className="absolute inset-0 bg-background" />

        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] text-primary font-black tracking-widest uppercase">GEO AUDIT</span>
          </div>
          <Search size={18} className="text-foreground/30" />
        </div>

        {/* Health Score Gauge */}
        <div className="relative z-10 bg-foreground/[0.03] border border-foreground/10 rounded-3xl py-4 px-4 flex flex-col items-center justify-center mt-2">
          <div className="relative w-32 h-16 flex justify-center overflow-hidden">
            <div className="absolute top-0 w-32 h-32 rounded-full border-[12px] border-foreground/5" />
            <motion.div
              initial={{ rotate: -180 }}
              animate={{ rotate: -20 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-0 w-32 h-32 rounded-full border-[12px] border-transparent border-t-primary border-r-primary rotate-45"
            />
            <div className="absolute bottom-0 w-full flex flex-col items-center">
              <span className="text-3xl font-heading font-black text-foreground leading-none">98</span>
              <span className="text-[8px] font-bold text-foreground/40 uppercase tracking-widest mt-1">SEO Health</span>
            </div>
          </div>
        </div>

        {/* Generative Engines */}
        <div className="relative z-10 flex-1 flex flex-col justify-end gap-2">
          <span className="text-[9px] font-bold text-foreground/50 uppercase tracking-widest ml-1">Engine Indexing</span>
          {[
            { title: "ChatGPT-4 Omni", status: "Verified", icon: <Bot size={12} className="text-primary" /> },
            { title: "Perplexity AI", status: "Rank 1", icon: <Search size={12} className="text-primary" /> }
          ].map((eng, i) => (
            <div key={i} className="flex items-center bg-background border border-foreground/10 p-2.5 rounded-xl shadow-sm gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                {eng.icon}
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-[10px] font-bold text-foreground">{eng.title}</span>
                <span className="text-[8px] text-foreground/40">{eng.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BaseVisual() {
  return (
    <div className="relative w-full h-[350px] sm:h-[400px] flex items-center justify-center group pointer-events-none scale-[0.85] sm:scale-100 origin-center">
      <div className="relative z-20 w-full max-w-[320px] aspect-square bg-background rounded-[3rem] shadow-2xl border border-foreground/5 overflow-hidden p-5 flex flex-col gap-3">
        <div className="absolute inset-0 bg-background" />

        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="px-3 py-1 bg-foreground rounded-full flex items-center gap-2 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
            <span className="text-[9px] text-background font-black tracking-widest uppercase">ROUTINE BUILDER</span>
          </div>
          <Layers size={18} className="text-foreground/30" />
        </div>

        {/* Workflow Canvas */}
        <div className="relative z-10 flex-1 bg-foreground/[0.02] border border-foreground/10 rounded-2xl flex flex-col p-4 isolate">

          {/* Connecting Line */}
          <div className="absolute left-[38px] top-8 bottom-8 w-[2px] bg-foreground/10 -z-10" />

          {[
            { type: "TRIGGER", name: "Inbound Email (Sales)", icon: <Activity size={12} /> },
            { type: "ACTION", name: "Extract Context (LLM)", icon: <Brain size={12} /> },
            { type: "ACTION", name: "Update HubSpot CRM", icon: <Layers size={12} /> }
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.4 }}
              className="flex items-center gap-4 mb-3 last:mb-0 relative"
            >
              <div className="w-6 h-6 rounded-full bg-background border border-foreground/20 flex items-center justify-center shadow-sm relative z-10">
                {step.icon}
              </div>
              <div className="flex-1 bg-background border border-foreground/10 p-2.5 rounded-xl shadow-sm flex flex-col">
                <span className="text-[7px] font-bold text-foreground/40 uppercase tracking-widest">{step.type}</span>
                <span className="text-[10px] font-bold text-foreground">{step.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OperatorsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const getVisual = (index: number) => {
    switch (index) {
      case 0:
        return <HunterVisual />;
      case 1:
        return <VisualizerVisual />;
      case 2:
        return <DirectorVisual />;
      case 3:
        return <OracleVisual />;
      case 4:
        return <DefenderVisual />;
      case 5:
        return <MechanicVisual />;
      case 6:
        return <VibeVisual />;
      case 7:
        return <ChiefCmoVisual />;
      case 8:
        return <TraceVisual />;
      case 9:
        return <BaseVisual />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-500 selection:bg-foreground/10 overflow-x-hidden flex flex-col">
      <Header />

      <main className="relative pt-32 pb-48">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Hero Section */}
          <div className="max-w-3xl mb-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block -rotate-3 bg-primary px-4 py-2 shadow-lg text-sm font-bold text-primary-foreground mb-6 transform hover:rotate-0 transition-transform cursor-default"
            >
              <span className="flex items-center gap-2">
                <Bot size={14} />
                YOUR AI OPERATORS
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-tight"
            >
              TEN BOTS, <span className="text-foreground/40">ZERO COFFEE</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-foreground/60 leading-relaxed font-medium"
            >
              Meet the Decagon: The only team where nobody argues about where to go for lunch.
            </motion.p>
          </div>

          {/* Operators Container with Progress Line */}
          <div ref={containerRef} className="relative">
            {/* Background Line */}
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-foreground/5 -translate-x-1/2 hidden md:block" />

            {/* Progress Line */}
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-foreground -translate-x-1/2 z-10 hidden md:block"
            />

            <div className="space-y-20 sm:space-y-32 lg:space-y-48">
              {operators.map((operator, index) => (
                <div key={operator.name} className="relative">
                  {/* Number Indicator */}
                  <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 top-0 z-20">
                    <div className="sticky top-48 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ margin: "-20%" }}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-background border-2 border-foreground/10 shadow-xl flex items-center justify-center font-black text-lg sm:text-xl text-foreground"
                      >
                        {operator.number}
                      </motion.div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Content */}
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} pl-14 sm:pl-16 lg:pl-0`}>
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-md"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground text-background text-[10px] font-black tracking-widest uppercase">
                            {operator.frequency}
                          </div>
                          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border ${operator.value === "Very High" || operator.value === "Essential"
                            ? "bg-primary/10 border-primary/20 text-primary"
                            : "bg-secondary/10 border-secondary/20 text-secondary"
                            } text-[10px] font-black tracking-widest uppercase`}>
                            {operator.value}
                          </div>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-3 flex items-center gap-3 text-foreground font-heading">
                          {operator.name}
                        </h2>
                        <p className="text-sm text-foreground/50 font-medium mb-6">{operator.role}</p>
                        <p className="text-lg text-foreground/60 mb-8 leading-relaxed font-medium">
                          {operator.info}
                        </p>
                      </motion.div>
                    </div>

                    {/* Visual */}
                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                      >
                        {getVisual(index)}
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Coming Soon Section ── */}
          <section className="relative mt-20 sm:mt-40 lg:mt-56 pb-10">
            {/* Background glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/[0.04] rounded-full blur-[140px] pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="relative max-w-5xl mx-auto"
            >
              {/* Architectural grid backdrop */}
              <div className="absolute inset-0 -inset-x-8 -inset-y-8 z-0 overflow-hidden rounded-[3rem] pointer-events-none" aria-hidden="true">
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                    backgroundSize: '48px 48px',
                    maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)'
                  }}
                />
              </div>

              {/* Main card */}
              <div className="relative z-10 clay-card p-0 overflow-hidden border border-foreground/[0.06]">
                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                <div className="p-6 sm:p-10 md:p-16 lg:p-20">
                  {/* Top row: badge + orbit */}
                  <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left: Content */}
                    <div className="flex-1 text-center lg:text-left">
                      <motion.div
                        initial={{ opacity: 0, rotate: 8 }}
                        whileInView={{ opacity: 1, rotate: -3 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.2 }}
                        className="inline-block -rotate-3 bg-primary px-4 py-2 shadow-lg text-sm font-bold text-primary-foreground mb-8 transform hover:rotate-0 transition-transform cursor-default"
                        style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}
                      >
                        <span className="flex items-center gap-2">
                          <Sparkles size={14} />
                          EXPANDING FLEET
                        </span>
                      </motion.div>

                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-foreground leading-[1.1] mb-6"
                      >
                        More Operators{" "}
                        <span className="text-foreground/30">In Training</span>
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-foreground/55 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed mb-10"
                      >
                        Our neural labs are training the next wave of hyper-specialized operators. New capabilities spanning HR automation, financial intelligence, and legal compliance are being calibrated for deployment.
                      </motion.p>

                      {/* Upcoming sectors */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25 }}
                        className="flex flex-wrap justify-center lg:justify-start gap-3"
                      >
                        {["HR Automation", "Finance", "Legal Compliance"].map((sector, i) => (
                          <div
                            key={sector}
                            className="px-4 py-2 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] text-xs font-bold text-foreground/50 uppercase tracking-widest backdrop-blur-sm"
                          >
                            {sector}
                          </div>
                        ))}
                      </motion.div>
                    </div>

                    {/* Right: Animated visual */}
                    <div className="relative flex-shrink-0 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 scale-[0.85] sm:scale-100 origin-center">
                      {/* Orbital rings */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-foreground/[0.06] rounded-full"
                        aria-hidden="true"
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-6 border border-dashed border-foreground/[0.05] rounded-full"
                        aria-hidden="true"
                      />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-12 border border-foreground/[0.04] rounded-full"
                        aria-hidden="true"
                      />

                      {/* Center monolith */}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <motion.div
                          animate={{ y: [0, -12, 0] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                          className="relative"
                        >
                          <div className="w-28 h-36 bg-primary rounded-2xl shadow-[20px_30px_60px_-10px_rgba(0,0,0,0.4)] border border-white/20 overflow-hidden flex flex-col p-4 relative">
                            {/* Shine sweep */}
                            <motion.div
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
                              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12"
                              aria-hidden="true"
                            />

                            <div className="relative z-10 flex-1 flex flex-col justify-between">
                              <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                                <span className="text-[7px] font-black text-white/50 uppercase tracking-[0.15em]">Training</span>
                              </div>

                              <div className="space-y-1.5">
                                <div className="h-1 w-8 bg-white/20 rounded-full" />
                                <div className="text-xl font-heading font-black text-white tracking-tighter leading-none">
                                  11
                                </div>
                                <div className="text-[8px] font-bold text-white/40 uppercase tracking-widest">NEXT OP</div>
                              </div>

                              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  animate={{ width: ["15%", "80%", "15%"] }}
                                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                  className="h-full bg-white/50 rounded-full"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Orbiting satellite cards */}
                      {[
                        { label: "12", angle: 0, delay: 0 },
                        { label: "13", angle: 120, delay: 0.4 },
                        { label: "14", angle: 240, delay: 0.8 },
                      ].map((sat) => (
                        <motion.div
                          key={sat.label}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0"
                          style={{ rotate: sat.angle }}
                        >
                          <motion.div
                            animate={{ scale: [0.9, 1.1, 0.9] }}
                            transition={{ duration: 3, repeat: Infinity, delay: sat.delay, ease: "easeInOut" }}
                            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            style={{ rotate: -sat.angle }}
                          >
                            <div className="w-11 h-11 bg-background rounded-xl border border-foreground/10 shadow-lg flex items-center justify-center">
                              <span className="text-[10px] font-black text-foreground/30">{sat.label}</span>
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}

                      {/* Pulsing dots on orbit */}
                      {[45, 165, 285].map((deg, i) => (
                        <motion.div
                          key={deg}
                          animate={{ opacity: [0.2, 0.8, 0.2] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                          className="absolute w-1.5 h-1.5 bg-primary rounded-full z-20"
                          style={{
                            top: `${50 - 46 * Math.cos(deg * Math.PI / 180)}%`,
                            left: `${50 + 46 * Math.sin(deg * Math.PI / 180)}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom status bar */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 }}
                    className="mt-14 pt-8 border-t border-foreground/[0.05]"
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/[0.06] border border-primary/[0.1]">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-primary">Neural Training Active</span>
                        </div>
                        <div className="hidden sm:block h-4 w-px bg-foreground/10" />
                        <span className="hidden sm:block text-[11px] text-foreground/30 font-bold">ETA: Q2 2026</span>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Mini progress indicators */}
                        {[
                          { label: "Core Model", pct: 78 },
                          { label: "Calibration", pct: 45 },
                          { label: "Integration", pct: 20 },
                        ].map((item) => (
                          <div key={item.label} className="flex flex-col items-center gap-1.5">
                            <span className="text-[8px] font-bold text-foreground/30 uppercase tracking-widest">{item.label}</span>
                            <div className="w-16 h-1 bg-foreground/[0.06] rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.pct}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                className="h-full bg-primary/40 rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

        </div>
      </main>

      {/* CTA Section */}
      <section id="cta" className="relative w-full px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        {/* Background accents */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-foreground/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="mx-auto w-full relative z-10 max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="clay-card p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 border-foreground/10 relative overflow-hidden"
          >


            <div className="flex flex-col gap-6 text-center lg:text-left max-w-2xl">
              <motion.div
                initial={{ opacity: 0, rotate: 8 }}
                whileInView={{ opacity: 1, rotate: 3 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.15 }}
                className="inline-block rotate-3 bg-primary px-4 py-2 shadow-lg text-sm font-bold text-primary-foreground self-center lg:self-start mb-2 transform hover:rotate-0 transition-transform cursor-default"
                style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}
              >
                The Next Step
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-foreground leading-tight">
                Your New Executive Team is Ready.
              </h2>
              <p className="text-lg text-foreground/60 font-medium">
                Stop trading your time for growth. Deploy a fully autonomous workforce today and reclaim your role as the CEO. Setup takes less than 5 minutes.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link href="/book">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="clay-button-primary group flex items-center gap-3 px-10 py-5 text-xl font-bold font-heading"
                >
                  DEPLOY WORKFORCE
                  <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
