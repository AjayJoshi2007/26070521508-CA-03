"use client";

import { motion } from "framer-motion";
import { DollarSign, TrendingDown, Users, Zap } from "lucide-react";

export function CostSavingsBanner() {
    return (
        <section className="relative w-full overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="clay-card p-8 md:p-12 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 relative overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />

                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="inline-block -rotate-3 bg-primary px-4 py-2 shadow-lg text-sm font-bold text-primary-foreground mb-4 transform hover:rotate-0 transition-transform cursor-default"
                                style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}
                            >
                                Revolutionary Pricing
                            </motion.div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                                The Cost of <span className="text-foreground/40">Doing Business</span> Just Changed
                            </h2>
                            <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-medium">
                                Why pay for a full team when AI can do it better, faster, and for 90% less?
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-center p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-foreground/10"
                            >
                                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                                    <Users size={24} className="text-red-600 dark:text-red-400" />
                                </div>
                                <div className="text-2xl font-heading font-black text-foreground mb-1">$33K/mo</div>
                                <div className="text-sm text-foreground/60 font-medium">Hiring Team</div>
                                <div className="text-xs text-foreground/40 mt-2">6 specialists + tools</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="text-center p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-foreground/10"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <Zap size={24} className="text-primary" />
                                </div>
                                <div className="text-2xl font-heading font-black text-primary mb-1">$1.5K/mo</div>
                                <div className="text-sm text-foreground/60 font-medium">SoloChief APEX</div>
                                <div className="text-xs text-foreground/40 mt-2">10 AI operators + human QA</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="text-center p-6 rounded-2xl bg-green-500/10 backdrop-blur-sm border border-green-500/20"
                            >
                                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                                    <TrendingDown size={24} className="text-green-600 dark:text-green-400" />
                                </div>
                                <div className="text-2xl font-heading font-black text-green-600 dark:text-green-400 mb-1">95%</div>
                                <div className="text-sm text-foreground/60 font-medium">Cost Reduction</div>
                                <div className="text-xs text-foreground/40 mt-2">Same output, fraction of cost</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="text-center p-6 rounded-2xl bg-green-500/10 backdrop-blur-sm border border-green-500/20"
                            >
                                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                                    <DollarSign size={24} className="text-green-600 dark:text-green-400" />
                                </div>
                                <div className="text-2xl font-heading font-black text-green-600 dark:text-green-400 mb-1">$378K</div>
                                <div className="text-sm text-foreground/60 font-medium">Annual Savings</div>
                                <div className="text-xs text-foreground/40 mt-2">Reinvest in growth</div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="mt-8 text-center"
                        >
                            <p className="text-sm text-foreground/60 font-medium mb-4">
                                <span className="font-bold text-foreground">Real talk:</span> You didn't start a business to manage a team.
                                You started it to build something great. Let AI handle the operations.
                            </p>
                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
                                <Zap size={16} className="text-primary" />
                                <span className="text-sm font-black text-primary">
                                    Deploy your AI workforce in under 5 minutes
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
