"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Clock, Lock, XCircle } from "lucide-react";

interface ProblemCardProps {
    title: string;
    description: string;
    icon: React.ElementType;
    delay?: number;
}

const ProblemCard = ({ title, description, icon: Icon, delay = 0 }: ProblemCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="group relative p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-red-500/30 transition-all duration-300 hover:bg-[#110505] overflow-hidden"
    >
        {/* Hover Gradient */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

        <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="mb-6">
                <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-4 text-white group-hover:scale-110 group-hover:bg-red-500/10 group-hover:text-red-500 transition-all duration-300">
                    <Icon size={24} />
                </div>
                <h4 className="text-gray-200 text-lg font-bold font-display mb-2">{title}</h4>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[90%] font-medium">
                {description}
            </p>
        </div>
    </motion.div>
);

export const ProblemSection = () => {
    return (
        <section id="problem" className="py-16 px-6 lg:px-[130px] bg-transparent relative z-10 overflow-hidden">
            <div className="w-full mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Content (Text) */}
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-medium text-red-400 mb-6"
                        >
                            <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                            The Problem
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-6xl font-bold text-white font-display leading-[1.1] mb-8"
                        >
                            Most campaigns look active. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">
                                Few actually feel fair.
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-400 leading-relaxed mb-10"
                        >
                            Every year, communities run bounties, hackathons, grants, and competitions with thousands of participants. But the same issues keep repeating: high participation doesn’t mean good outcomes.
                        </motion.p>
                    </div>

                    {/* Right Grid (Cards) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ProblemCard
                            title="Plutocracy"
                            description="People contribute, but only a few decide. Whales dominate the governance."
                            icon={Users}
                            delay={0.1}
                        />
                        <ProblemCard
                            title="Speed > Quality"
                            description="First-come-first-serve mechanics prioritize bots and scripts over thoughtful work."
                            icon={Clock}
                            delay={0.2}
                        />
                        <ProblemCard
                            title="Opacity"
                            description="Decisions happen in closed telegram chats. No on-chain accountability."
                            icon={Lock}
                            delay={0.3}
                        />
                        <ProblemCard
                            title="Contributor Churn"
                            description="Talent leaves after one-off bounties. No long-term reputation accumulation."
                            icon={XCircle}
                            delay={0.4}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};
