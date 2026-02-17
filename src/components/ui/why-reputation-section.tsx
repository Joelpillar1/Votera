"use client";

import React from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingDown, Zap, Users, Shield, Target, Award, Scale, Sparkles, AlertCircle, ArrowRight, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const ComparisonRow = ({
    leftItem,
    rightItem,
    index
}: {
    leftItem: { icon: React.ElementType, title: string, description: string },
    rightItem: { icon: React.ElementType, title: string, description: string },
    index: number
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 relative group"
        >
            {/* Divider Line (Desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.03] -translate-x-1/2 group-last:bg-gradient-to-b group-last:from-white/[0.03] group-last:to-transparent" />

            {/* Light orb in center */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white/10 group-hover:bg-primary transition-colors duration-500 shadow-[0_0_10px_rgba(109,40,217,0)] group-hover:shadow-[0_0_10px_rgba(109,40,217,0.5)]" />

            {/* Left: The Old Way (Red/Gray/Dim) */}
            <div className="flex flex-row md:flex-row-reverse items-center gap-6 p-6 md:p-8 rounded-2xl md:bg-transparent bg-white/[0.02] border border-white/[0.02] md:border-none transition-all duration-500 hover:bg-white/[0.02] group-hover:opacity-50 hover:!opacity-100">
                <div className="shrink-0 relative">
                    <div className="h-12 w-12 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center">
                        <leftItem.icon className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-red-950/80 border border-red-500/30 rounded-full flex items-center justify-center">
                        <X className="h-3 w-3 text-red-500" />
                    </div>
                </div>
                <div className="md:text-right">
                    <h4 className="text-gray-300 font-bold text-lg mb-1.5 font-display tracking-tight">{leftItem.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed font-body font-light">{leftItem.description}</p>
                </div>
            </div>

            {/* Right: The New Way (Primary/Bright) */}
            <div className="flex flex-row items-center gap-6 p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 md:border-primary/10 transition-all duration-500 hover:bg-white/[0.04] relative overflow-hidden group/item">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />

                <div className="shrink-0 relative z-10">
                    <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_15px_-3px_rgba(109,40,217,0.3)]">
                        <rightItem.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-emerald-950/80 border border-emerald-500/30 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-emerald-500" />
                    </div>
                </div>
                <div className="relative z-10">
                    <h4 className="text-white font-bold text-lg mb-1.5 font-display tracking-tight">{rightItem.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover/item:text-gray-300 transition-colors font-body font-light">{rightItem.description}</p>
                </div>
            </div>
        </motion.div>
    );
};

export const WhyReputationSection = () => {
    const legacyItems = [
        { icon: DollarSign, title: "Capital & Whales", description: "Power and influence are defined solely by wallet size." },
        { icon: TrendingDown, title: "Popularity Contests", description: "Influence is based on vanity metrics rather than work." },
        { icon: Zap, title: "Bot Manipulation", description: "Automated systems game rewards through volume." },
        { icon: Users, title: "Short-term Attention", description: "Systems optimized for quick extraction, not growth." },
        { icon: AlertCircle, title: "Siloed History", description: "Your reputation is locked to one specific platform." }
    ];

    const voteraxItems = [
        { icon: Shield, title: "Consistent Contribution", description: "Power is earned through proven, verifiable work." },
        { icon: Target, title: "Long-term Participation", description: "Influence scales with your commitment over time." },
        { icon: Award, title: "On-chain Accountability", description: "Every action is permanently verifiable on-chain." },
        { icon: Scale, title: "Conviction & Context", description: "Decisions are weighted by your domain expertise." },
        { icon: Sparkles, title: "Verifiable Portfolio", description: "Your reputation travels with you across all DAOs." }
    ];

    return (
        <section id="features" className="py-20 px-6 lg:px-[130px] bg-transparent relative z-10 overflow-hidden">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block"
                    >
                        <h2 className="text-5xl md:text-7xl font-bold font-display text-white mb-6 leading-none">
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-gray-500 to-gray-700">From Capital</span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-300 to-white">To Contribution</span>
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-body font-light leading-relaxed"
                    >
                        The fundamental shift in how power is distributed in decentralized systems.
                    </motion.p>
                </div>

                {/* Comparison Labels (Desktop) */}
                <div className="hidden md:grid grid-cols-2 mb-10 text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-500 font-sans">
                    <div>The Old Standard</div>
                    <div className="text-primary">The Voterax Standard</div>
                </div>

                {/* Comparison List */}
                <div className="space-y-4 relative">
                    {/* Connection Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-x-1/2 hidden md:block" />

                    {legacyItems.map((item, i) => (
                        <ComparisonRow
                            key={i}
                            index={i}
                            leftItem={item}
                            rightItem={voteraxItems[i]}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
