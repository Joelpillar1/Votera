"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Users, Zap, TrendingUp, ShieldCheck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const StatItem = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center text-center">
        <div className="text-2xl md:text-3xl font-bold text-white font-display mb-1">{value}</div>
        <div className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</div>
    </div>
);

const StepItem = ({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color: string }) => (
    <div className="flex flex-col items-center gap-3">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color} shadow-lg`}>
            <Icon size={20} className="text-white" />
        </div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{label}</span>
    </div>
);

const GraphVisual = () => (
    <div className="relative w-full h-32 mt-4 flex items-end px-4">
        {/* Background Grid */}
        <div className="absolute inset-x-4 inset-y-0 border-b border-white/5 flex flex-col justify-between py-2">
            <div className="w-full h-px bg-white/5" />
            <div className="w-full h-px bg-white/5" />
            <div className="w-full h-px bg-white/5" />
        </div>

        {/* Graph Line (SVG) */}
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#D97706" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
                <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D97706" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path
                d="M0,80 C50,80 80,60 120,60 C160,60 200,80 240,50 C280,20 320,10 400,5"
                fill="url(#fillGradient)"
                stroke="none"
                className="w-full"
                vectorEffect="non-scaling-stroke"
            />
            <path
                d="M0,80 C50,80 80,60 120,60 C160,60 200,80 240,50 C280,20 320,10 400,5"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
            />
            {/* Point */}
            <circle cx="240" cy="50" r="4" fill="#F59E0B" className="animate-pulse" />
            <rect x="225" y="15" width="30" height="20" rx="4" fill="#333" />
            <text x="240" y="29" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">High</text>
        </svg>
    </div>
);

export const TargetAudienceSection = () => {
    return (
        <section className="py-16 px-6 lg:px-[130px] bg-transparent relative z-10">
            <div className="max-w-[1400px] mx-auto mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl"
                >
                    <h2 className="text-primary text-sm font-mono tracking-widest uppercase mb-4">WHO IS VOTERAX FOR</h2>
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                        Empowering every side <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-400">
                            of the market.
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400">
                        Whether you are building a community or building your career, Voterax provides the infrastructure you need.
                    </p>
                </motion.div>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                {/* Card 1: For Participants */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col p-8 rounded-[2rem] bg-[#0A0A0A] border border-white/5 relative overflow-hidden group hover:border-violet-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

                    {/* Tag */}
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold mb-6 w-fit">
                        For Participants
                    </div>

                    {/* Content */}
                    <h3 className="text-3xl font-bold text-white font-display mb-2">
                        Unlock Earnings & <br />
                        Build Reputation
                    </h3>
                    <p className="text-gray-400 text-sm mb-8">
                        Prove your skills, earn rewards, and build an on-chain resume that travels with you.
                    </p>

                    {/* Stats Row */}
                    <div className="bg-[#111] rounded-2xl p-6 grid grid-cols-3 gap-4 mb-10 border border-white/5">
                        <StatItem value="$500K+" label="Rewards" />
                        <StatItem value="150+" label="Campaigns" />
                        <StatItem value="12K+" label="Users" />
                    </div>

                    {/* Visual Row */}
                    <div className="grid grid-cols-3 gap-4 mb-10 px-4">
                        <StepItem icon={Zap} label="Discover" color="bg-zinc-800" />
                        <StepItem icon={Trophy} label="Compete" color="bg-zinc-800" />
                        <StepItem icon={Wallet} label="Earn" color="bg-gradient-to-br from-violet-600 to-indigo-600" />
                    </div>

                    {/* CTA Button */}
                    <Button className="w-full h-14 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-base mt-auto shadow-[0_0_20px_-5px_rgba(109,40,217,0.5)] transition-all group-hover:shadow-[0_0_30px_-5px_rgba(109,40,217,0.7)]">
                        Start Earning Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </motion.div>


                {/* Card 2: For Organizers */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col p-8 rounded-[2rem] bg-[#0A0A0A] border border-white/5 relative overflow-hidden group hover:border-amber-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-600/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

                    {/* Tag */}
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold mb-6 w-fit">
                        For Organizers
                    </div>

                    {/* Content */}
                    <h3 className="text-3xl font-bold text-white font-display mb-2">
                        Engage Community & <br />
                        Drive Real Growth
                    </h3>
                    <p className="text-gray-400 text-sm mb-8">
                        Run Sybil-resistant campaigns. Measure actual contribution, not just clicks.
                    </p>

                    {/* Stats Row */}
                    <div className="bg-[#111] rounded-2xl p-6 grid grid-cols-3 gap-4 mb-10 border border-white/5">
                        <StatItem value="98%" label="Retention" />
                        <StatItem value="50K+" label="Tasks" />
                        <StatItem value="Zero" label="Bots" />
                    </div>

                    {/* Visual Row - Graph */}
                    <div className="mb-10 relative h-32 w-full bg-gradient-to-b from-[#111] to-transparent rounded-2xl border border-white/5 overflow-hidden">
                        <div className="absolute top-2 left-4 text-[10px] font-bold text-gray-500 uppercase">Growth Trajectory</div>
                        <GraphVisual />
                    </div>

                    {/* CTA Button */}
                    <Button className="w-full h-14 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-base mt-auto shadow-[0_0_20px_-5px_rgba(245,158,11,0.5)] transition-all group-hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.7)]">
                        Launch Campaign <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </motion.div>

            </div>
        </section>
    );
};
