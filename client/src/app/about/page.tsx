"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Target, Users, Zap, Heart, Globe, Sparkles, Quote } from "lucide-react";
import Link from "next/link";

function FloatingShape({ className, delay = 0 }: { className?: string; delay?: number }) {
    return (
        <motion.div
            animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
            }}
            transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay,
            }}
            className={`absolute pointer-events-none opacity-20 ${className}`}
        />
    );
}



export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

    return (
        <div className="min-h-screen bg-background font-sans overflow-hidden">
            {/* Background Ambience handled globally */}

            <div className="relative z-10">
                <Header />

                <main ref={containerRef} className="flex flex-col gap-24 pb-24">
                    {/* Hero Section */}
                    <section className="relative min-h-[60vh] flex items-center justify-center px-4 overflow-hidden pt-32 lg:pt-48">
                        <FloatingShape className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-transparent top-20 left-[10%]" delay={0} />
                        <FloatingShape className="w-96 h-96 rounded-[3rem] bg-gradient-to-tr from-secondary/10 to-transparent bottom-20 right-[5%] rotate-12" delay={1} />

                        <div className="max-w-4xl mx-auto text-center relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, rotate: -8 }}
                                    animate={{ opacity: 1, rotate: -3 }}
                                    transition={{ duration: 0.5 }}
                                    className="inline-block -rotate-3 bg-primary px-4 py-2 shadow-lg text-sm font-bold text-primary-foreground mb-8 transform hover:rotate-0 transition-transform cursor-default"
                                    style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}
                                >
                                    Proof of Concept
                                </motion.div>
                                <h1 className="text-4xl sm:text-6xl md:text-8xl font-heading font-black tracking-tighter mb-8 leading-tight">
                                    The Manifesto
                                </h1>
                                <p className="text-xl md:text-3xl text-muted-foreground font-medium leading-relaxed">
                                    SoloChief is not just a product. <br />It is a proof of concept.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* The Hypocrisy (Intro) */}
                    <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                                Look at the biggest AI companies in the world. They promise &quot;automation,&quot; yet they hire thousands of employees. They preach efficiency, but their own offices are full of middle managers.
                            </p>
                            <h2 className="text-3xl md:text-5xl font-heading font-black text-foreground">
                                I found that hypocritical.
                            </h2>
                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                                I didn&apos;t build SoloChief just to sell it to you. I built it because I wanted to run a massive company without becoming a manager.
                            </p>
                        </motion.div>
                    </section>

                    {/* The Only Employee (Operators Display) */}
                    <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
                        <div className="clay-card p-5 sm:p-12 md:p-16 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

                            <div className="text-center mb-16 relative z-10">
                                <h2 className="text-4xl md:text-5xl font-heading font-black mb-6">I am the only human employee at SoloChief.</h2>
                                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                    Every email you receive, every lead we generate, every marketing post you see from us—it is all run by the exact same Operators you are about to hire.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8 relative z-10">
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="clay-card p-8 text-center flex flex-col items-center justify-center gap-4 group hover:border-primary/30 transition-all duration-500 border-primary/20 bg-primary/5 relative overflow-hidden"
                                >
                                    {/* Background decoration */}
                                    <div className="absolute top-0 right-0 p-24 bg-primary/10 rounded-full -mr-12 -mt-12 group-hover:bg-primary/20 transition-all duration-700 group-hover:scale-[4] group-hover:p-48" />
                                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center text-primary mb-2 shadow-inner group-hover:scale-110 transition-transform duration-500 relative z-10">
                                        <Target size={36} />
                                    </div>
                                    <h3 className="text-2xl font-bold font-heading relative z-10">My Lead Gen?</h3>
                                    <div className="h-1 w-12 bg-primary/20 rounded-full relative z-10" />
                                    <p className="text-muted-foreground text-lg relative z-10">
                                        Run by <span className="font-bold text-foreground">Intro</span>
                                    </p>
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="clay-card p-8 text-center flex flex-col items-center justify-center gap-4 group hover:border-secondary/30 transition-all duration-500 border-secondary/20 bg-secondary/5 relative overflow-hidden"
                                >
                                    {/* Background decoration */}
                                    <div className="absolute top-0 right-0 p-24 bg-secondary/10 rounded-full -mr-12 -mt-12 group-hover:bg-secondary/20 transition-all duration-700 group-hover:scale-[4] group-hover:p-48" />
                                    <div className="w-20 h-20 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-full flex items-center justify-center text-secondary mb-2 shadow-inner group-hover:scale-110 transition-transform duration-500 relative z-10">
                                        <Sparkles size={36} />
                                    </div>
                                    <h3 className="text-2xl font-bold font-heading relative z-10">My Social Media?</h3>
                                    <div className="h-1 w-12 bg-secondary/20 rounded-full relative z-10" />
                                    <p className="text-muted-foreground text-lg relative z-10">
                                        Designed by <span className="font-bold text-foreground">Snap</span> and <span className="font-bold text-foreground">Clip</span>
                                    </p>
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="clay-card p-8 text-center flex flex-col items-center justify-center gap-4 group hover:border-primary/30 transition-all duration-500 border-primary/20 bg-primary/5 relative overflow-hidden"
                                >
                                    {/* Background decoration */}
                                    <div className="absolute top-0 right-0 p-24 bg-primary/10 rounded-full -mr-12 -mt-12 group-hover:bg-primary/20 transition-all duration-700 group-hover:scale-[4] group-hover:p-48" />
                                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center text-primary mb-2 shadow-inner group-hover:scale-110 transition-transform duration-500 relative z-10">
                                        <Globe size={36} />
                                    </div>
                                    <h3 className="text-2xl font-bold font-heading relative z-10">My Market Research?</h3>
                                    <div className="h-1 w-12 bg-primary/20 rounded-full relative z-10" />
                                    <p className="text-muted-foreground text-lg relative z-10">
                                        Delivered by <span className="font-bold text-foreground">Scoop</span>
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Patient Zero Philosophy */}
                    <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full py-10">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black mb-6">The &quot;Patient Zero&quot; Philosophy</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    I believe that in the near future, the &quot;One-Person Unicorn&quot; (a billion-dollar company run by a single founder) will not be a fantasy—it will be normal.
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    But to get there, we need better infrastructure. We need tools that don&apos;t require &quot;integration meetings&quot; or &quot;onboarding calls.&quot;
                                </p>
                            </div>
                            <div className="clay-card p-6 sm:p-10 flex items-center justify-center text-center relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <Quote className="absolute top-4 left-4 text-primary/10 w-16 h-16 -rotate-12 transform group-hover:scale-110 transition-transform duration-500" />
                                <p className="text-2xl font-bold font-heading leading-tight italic relative z-10">
                                    &quot;I built SoloChief to be the operating system for that future.&quot;
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Why This Matters */}
                    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-heading font-black mb-6">Why This Matters to You</h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                When you subscribe to SoloChief, you aren&apos;t buying software from a bloated corporation that doesn&apos;t use its own tools.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <motion.div whileHover={{ scale: 1.02 }} className="clay-card p-6 sm:p-10 transition-all hover:shadow-xl hover:border-red-500/20 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-24 bg-red-500/5 rounded-full -mr-12 -mt-12 group-hover:bg-red-500/10 transition-all duration-700 group-hover:scale-[4] group-hover:p-48" />
                                <h3 className="text-2xl font-bold mb-4 text-red-500 relative z-10">The Old Way</h3>
                                <p className="text-muted-foreground text-lg mb-6 relative z-10">
                                    Hiring teams with 50 staff members. Paying for overhead, management layers, and office snacks.
                                </p>
                                <div className="flex items-center gap-3 text-foreground font-bold relative z-10">
                                    <div className="p-2 bg-red-500/10 rounded-lg">
                                        <Users size={24} className="text-red-500" />
                                    </div>
                                    <span>Bloated Teams</span>
                                </div>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.02 }} className="clay-card p-6 sm:p-10 border-primary/20 bg-primary/5 transition-all hover:bg-primary/10 hover:shadow-xl hover:shadow-primary/10 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-24 bg-primary/10 rounded-full -mr-12 -mt-12 group-hover:bg-primary/20 transition-all duration-700 group-hover:scale-[4] group-hover:p-48" />
                                <h3 className="text-2xl font-bold mb-4 text-primary relative z-10">The SoloChief Way</h3>
                                <p className="text-muted-foreground text-lg mb-6 relative z-10">
                                    Buying the exact infrastructure I use to compete with them. I don&apos;t have a Sales Team or Marketing Department. I have Operators.
                                </p>
                                <div className="flex items-center gap-3 text-foreground font-bold relative z-10">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Zap size={24} className="text-primary" />
                                    </div>
                                    <span>Zero Overhead</span>
                                </div>
                            </motion.div>
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-2xl font-bold text-foreground">
                                Which is why I can offer this power to you for a fraction of the cost of an employee.
                            </p>
                        </div>
                    </section>

                    {/* The Mission */}
                    <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-center py-20">
                        <div className="mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-foreground/10 mb-6">
                                <Heart className="w-4 h-4 text-primary" />
                                <span className="text-sm font-bold uppercase tracking-wider text-foreground/80">The Mission</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-heading font-black mb-8">
                                My goal is not to build a massive headcount.
                            </h2>
                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                                My goal is to empower <span className="text-foreground font-bold">10,000 Founders</span> to reclaim their time.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                I want you to stop doing &quot;Robot Work.&quot; I want you to stop stress-hiring. I want you to get back to the reason you started your company: <strong>To Build.</strong>
                            </p>
                        </div>

                        <div className="clay-card p-6 sm:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                            <h3 className="text-3xl md:text-4xl font-heading font-black mb-6">
                                This is the post-employee era. <br />And I’m right here in the trenches with you.
                            </h3>
                            <div className="text-xl font-medium text-muted-foreground">
                                — The Founder. <span className="text-primary font-bold text-sm ml-2">(Powered by SoloChief)</span>
                            </div>
                            <div className="mt-8">
                                <Link href="/contact">
                                    <button className="clay-button-primary px-8 py-4 font-bold font-heading">
                                        Reclaim Your Time
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    );
}
