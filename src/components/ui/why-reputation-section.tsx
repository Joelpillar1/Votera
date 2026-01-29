"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, DollarSign, Users, Zap, Eye, Scale, Clock, ShieldCheck, HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";

const ComparisonItem = ({ text, isPositive, index }: { text: string; isPositive: boolean; index: number }) => (
    <motion.li
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="flex items-center gap-4 text-lg p-3 rounded-xl hover:bg-white/5 transition-all duration-300 hover:scale-105 cursor-default"
    >
        <div className={cn(
            "h-6 w-6 rounded-full flex items-center justify-center border",
            isPositive
                ? "bg-primary/20 border-primary text-primary"
                : "bg-red-500/10 border-red-500/50 text-red-500"
        )}>
            {isPositive ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
        </div>
        <span className={cn(
            "font-medium",
            isPositive ? "text-white" : "text-gray-400 decoration-slate-600"
        )}>
            {text}
        </span>
    </motion.li>
);


export const WhyReputationSection = () => {
    return (
        <section id="features" className="py-24 px-6 lg:px-[130px] bg-[#050505]">
            <div className="w-full mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-secondary text-sm font-mono tracking-widest uppercase mb-4">THE REPUTATION STANDARD</h2>
                        <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">Why Reputation?</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            Reputation on Voterax is not just a number. It is earned, visible, and consequential power that cannot be bought.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-stretch">
                    {/* Old Way Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group p-10 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 relative overflow-hidden flex flex-col hover:border-red-500/30 hover:shadow-[0_0_30px_-10px_rgba(239,68,68,0.2)] transition-all duration-500"
                    >
                        {/* Background subtle red glow */}
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-900/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 text-red-500">
                                <DollarSign size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-red-400 mb-2 font-display">Most Systems Reward</h3>
                            <p className="text-gray-500 text-sm mb-10">Optimized for capital, not contribution.</p>

                            <ul className="space-y-6">
                                {['Capital & Whales', 'Popularity Contests', 'Bot Speed', 'Short-term Attention'].map((item, i) => (
                                    <ComparisonItem key={i} text={item} isPositive={false} index={i} />
                                ))}
                            </ul>
                        </div>

                        {/* Visual Noise */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                    </motion.div>

                    {/* Voterax Way Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group p-10 rounded-[2.5rem] bg-[#0E0514] border border-primary/20 relative overflow-hidden flex flex-col shadow-[0_0_50px_-20px_rgba(109,40,217,0.2)] hover:border-primary/50 hover:shadow-[0_0_50px_-10px_rgba(109,40,217,0.4)] transition-all duration-500"
                    >
                        {/* Background primary glow */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center mb-6 text-primary shadow-[0_0_20px_-5px_rgba(109,40,217,0.5)]">
                                <Scale size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-2 font-display">Voterax Rewards</h3>
                            <p className="text-primary/60 text-sm mb-10">Optimized for long-term value alignment.</p>

                            <ul className="space-y-6">
                                {['Consistent Contribution', 'Long-term Participation', 'On-chain Accountability', 'Conviction & Context'].map((item, i) => (
                                    <ComparisonItem key={i} text={item} isPositive={true} index={i} />
                                ))}
                            </ul>
                        </div>

                        {/* Visual Noise */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
