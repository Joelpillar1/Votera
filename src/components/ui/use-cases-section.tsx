"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Wallet, Trophy, Coins, Users, Layers, Flame,
    CheckCircle2, ArrowRight, Star, ShieldCheck,
    Zap, Code2, GraduationCap, LayoutTemplate
} from "lucide-react";

// --- Visual Scenes for Cards ---

const BountiesScene = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Mock Card UI */}
        <div className="absolute w-48 h-32 bg-zinc-900 rounded-xl border border-white/10 shadow-2xl p-4 flex flex-col gap-3 z-10 rotate-[-6deg] translate-y-2">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-violet-600/20 flex items-center justify-center text-violet-400">
                    <Code2 size={16} />
                </div>
                <div className="space-y-1">
                    <div className="w-20 h-2 bg-white/20 rounded-full" />
                    <div className="w-12 h-2 bg-white/10 rounded-full" />
                </div>
            </div>
            <div className="mt-auto flex justify-between items-center">
                <div className="w-16 h-6 rounded-md bg-violet-600/20 text-violet-400 text-[10px] font-mono flex items-center justify-center">
                    $5,000
                </div>
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-green-500" />
                </div>
            </div>
        </div>
        {/* Background element */}
        <div className="absolute w-40 h-28 bg-white/5 rounded-xl rotate-[6deg] -translate-y-2" />
    </div>
);

const HackathonScene = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative z-10">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_-5px_rgba(245,158,11,0.5)]">
                <Trophy size={40} className="text-white drop-shadow-md" />
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-zinc-900 rounded-xl border border-white/10 flex items-center justify-center shadow-lg animate-bounce">
                <Star size={20} className="text-amber-400 fill-amber-400" />
            </div>
            <div className="absolute -bottom-2 -left-6 w-auto px-3 py-1 bg-zinc-800 rounded-full border border-white/10 text-[10px] font-mono text-white shadow-lg">
                1st Place
            </div>
        </div>
    </div>
);

const GrantsScene = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 w-16 h-16 rounded-full bg-emerald-500/20 blur-xl"
            />
        </div>
        <div className="relative z-10 grid grid-cols-2 gap-3 rotate-[15deg]">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-emerald-500/30 flex items-center justify-center">
                <Coins size={24} className="text-emerald-500" />
            </div>
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg translate-y-4">
                <Coins size={24} className="text-white" />
            </div>
            <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-white/5 flex items-center justify-center -translate-y-4">
                <div className="text-emerald-500 font-bold">$</div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-emerald-500/30 flex items-center justify-center">
                <div className="h-2 w-8 bg-emerald-500/50 rounded-full" />
            </div>
        </div>
    </div>
);

const CommunitiesScene = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-64 h-32">
            {[1, 2, 3, 4, 5].map((i) => (
                <div
                    key={i}
                    className="absolute w-12 h-12 rounded-full border-2 border-[#0A0A0A] bg-zinc-800 flex items-center justify-center overflow-hidden"
                    style={{
                        left: `${(i * 35) + 20}px`,
                        top: `${40 + (i % 2 === 0 ? -10 : 10)}px`,
                        zIndex: i
                    }}
                >
                    <div className={cn("w-full h-full flex items-center justify-center text-xs font-bold",
                        i === 2 ? "bg-primary text-white" : "text-gray-400"
                    )}>
                        {i === 2 ? "You" : `U${i}`}
                    </div>
                </div>
            ))}
            <div className="absolute top-4 right-10 w-auto px-2 py-1 bg-green-500 rounded-full text-[10px] text-black font-bold rotate-12">
                Active
            </div>
        </div>
    </div>
);

const IntegrationsScene = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <div className="flex gap-4">
            <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center">
                <LayoutTemplate size={24} className="text-blue-400" />
            </div>
            <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center translate-y-4">
                <ShieldCheck size={24} className="text-white" />
            </div>
            <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center">
                <Zap size={24} className="text-amber-400" />
            </div>
        </div>
        <div className="absolute w-full h-full bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent bottom-0" />
    </div>
);

const GovernanceScene = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-500 to-orange-500 flex items-center justify-center shadow-[0_0_40px_-10px_rgba(244,63,94,0.4)] animate-pulse">
            <Flame size={40} className="text-white fill-white" />
        </div>
        <div className="absolute bottom-6 right-10 w-8 h-8 bg-zinc-900 rounded-full border border-white/10 flex items-center justify-center">
            <div className="text-[10px]">RP</div>
        </div>
    </div>
);


interface FeatureCardProps {
    title: string;
    description: string;
    Scene: React.ElementType;
    delay?: number;
    colSpan?: 1 | 2;
}

const FeatureCard = ({ title, description, Scene, delay = 0, colSpan = 1 }: FeatureCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className={cn(
            "group relative flex flex-col rounded-3xl bg-[#0F0F0F] border border-white/5 overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
            "col-span-1" // Keeping strictly grid for now, but could span if needed
        )}
    >
        {/* Scene Container */}
        <div className="relative w-full aspect-[16/10] bg-[#111] overflow-hidden group-hover:bg-[#141414] transition-colors">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent)]" />
            <Scene />
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-grow bg-[#0F0F0F]">
            <h3 className="text-xl font-bold text-white font-display mb-3">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    </motion.div>
);

const ContributorScene = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <div className="flex flex-col gap-2 w-48">
            <div className="h-10 w-full bg-zinc-900 rounded-lg border border-white/10 flex items-center px-3 gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] text-blue-400 font-bold">1</div>
                <div className="h-2 w-20 bg-white/20 rounded-full"></div>
                <div className="ml-auto text-[10px] text-green-400">+50 RP</div>
            </div>
            <div className="h-10 w-full bg-zinc-900/50 rounded-lg border border-white/5 flex items-center px-3 gap-3 opacity-60">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-gray-400 font-bold">2</div>
                <div className="h-2 w-16 bg-white/10 rounded-full"></div>
                <div className="ml-auto text-[10px] text-gray-500">+30 RP</div>
            </div>
        </div>
    </div>
);

const SchoolScene = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-24 h-24 bg-zinc-900 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center relative">
            <GraduationCap size={40} className="text-white" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                A+
            </div>
        </div>
    </div>
);

export const UseCasesSection = () => {
    const features = [
        {
            title: "Bounties",
            description: "Automate task verification and payouts. Perfect for distinct dev tasks, bug fixes, or design gigs.",
            Scene: BountiesScene,
            delay: 0.1
        },
        {
            title: "Contributor Programs",
            description: "Track reputation over time for core contributors. Setup complex criteria for roles and monthly rewards.",
            Scene: ContributorScene,
            delay: 0.2
        },
        {
            title: "Hackathons & Competitions",
            description: "Run fair competitions where judges' reputation weighs more. Transparent scoring and instant prize distribution.",
            Scene: HackathonScene,
            delay: 0.3
        },
        {
            title: "Grants & Funding Rounds",
            description: "Quadratic funding rounds powered by reputation. Funds flow to projects the community actually values.",
            Scene: GrantsScene,
            delay: 0.1
        },
        {
            title: "Community Campaigns",
            description: "Engage your DAO or discord community. Reward engagement with reputation that decays if inactivity sets in.",
            Scene: CommunitiesScene,
            delay: 0.2
        },
        {
            title: "Institutional Evaluations",
            description: "Academic grading systems where peer review and expert assessment blend seamlessly for fair results.",
            Scene: SchoolScene,
            delay: 0.3
        }
    ];

    return (
        <section id="use-cases" className="py-16 px-6 lg:px-[130px] bg-transparent relative z-10">

            <div className="w-full mx-auto relative z-10">
                <div className="mb-20 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-primary text-sm font-mono tracking-widest uppercase mb-4">WHAT YOU CAN RUN ON VOTERAX</h2>
                        <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                            Built for Web3 and non-Web3 organizations alike.
                        </h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            {...feature}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
