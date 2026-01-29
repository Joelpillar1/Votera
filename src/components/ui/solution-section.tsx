"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, Briefcase, Zap, Trophy, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SolutionCardProps {
    title: string;
    value: string;
    description: string;
    icon: React.ElementType;
    delay?: number;
}

const SolutionCard = ({ title, value, description, icon: Icon, delay = 0 }: SolutionCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="group relative p-6 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-[#111] overflow-hidden"
    >
        {/* Hover Gradient */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

        <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="mb-6">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mb-4 text-white group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
                    <Icon size={20} />
                </div>
                <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">{title}</h4>
                <div className="text-2xl md:text-3xl font-bold text-white font-display mb-2">{value}</div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[90%]">
                {description}
            </p>
        </div>
    </motion.div>
);

export const SolutionSection = () => {
    return (
        <section id="solution" className="py-24 px-6 lg:px-[130px] bg-black relative overflow-hidden">
            <div className="w-full mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Content (Text) - Order 2 on Desktop */}
                    <div className="max-w-xl order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-6"
                        >
                            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            The Solution
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-6xl font-bold text-white font-display leading-[1.1] mb-8"
                        >
                            Participation <br />
                            is the only <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-400">
                                currency that matters.
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-400 leading-relaxed mb-10"
                        >
                            We replaced "pay-to-win" with "prove-to-win". Voterax introduces a coordination model where your verifiable on-chain work earns you Reputation Points (RP), and that reputation determines your influence.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Button className="h-14 px-8 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-105 transition-all text-lg font-medium group">
                                Explore the Architecture
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Grid (Cards) - Order 1 on Desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 order-2 lg:order-1">
                        <SolutionCard
                            title="Input"
                            value="Verifiable Work"
                            description="Participants complete on-chain tasks, Github commits, or event attendance to prove valid contribution."
                            icon={Briefcase}
                            delay={0.1}
                        />
                        <SolutionCard
                            title="Reward"
                            value="CP + RP Tokens"
                            description="Earn liquid Campaign Points for voting and non-transferable Reputation Points for long-term status."
                            icon={Zap}
                            delay={0.2}
                        />
                        <SolutionCard
                            title="Status"
                            value="Compound Trust"
                            description="Your reputation travels with you across campaigns. Build a global history that cannot be bought."
                            icon={Trophy}
                            delay={0.3}
                        />
                        <SolutionCard
                            title="Output"
                            value="Fair Influence"
                            description="Voting power is weighted by your reputation. Only those with skin in the game decide the outcome."
                            icon={Vote}
                            delay={0.4}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};
