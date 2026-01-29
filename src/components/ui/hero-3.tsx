"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Campaign {
    id: string;
    title: string;
    image: string;
    category: string;
    rewardPool: string;
}

// Props interface for the component
interface AnimatedMarqueeHeroProps {
    tagline: string;
    title: React.ReactNode;
    description: string;
    ctaText: string;
    onCtaClick?: () => void;
    campaigns: Campaign[];
    className?: string;
    secondaryCta?: React.ReactNode;
}

// Reusable Button component styled consistent with Voterax theme
const ActionButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="px-8 py-3 rounded-full bg-primary text-white font-semibold shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)] transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-opacity-75"
    >
        {children}
    </motion.button>
);

const CampaignCard = ({ campaign }: { campaign: Campaign }) => (
    <div className="relative w-full h-full overflow-hidden rounded-3xl border border-white/10 group">
        <div className="absolute inset-0 bg-gray-900 animate-pulse" />
        <img
            src={campaign.image}
            alt={campaign.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-xs font-mono text-secondary">
            {campaign.rewardPool}
        </div>

        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/20 border border-primary/20 backdrop-blur-md text-[10px] uppercase tracking-wider font-bold text-white">
            {campaign.category}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-white font-bold text-lg leading-tight mb-1 font-display">{campaign.title}</h3>
            <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-gray-400 text-xs">Live now</span>
            </div>
        </div>
    </div>
);

// The main hero component
export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
    tagline,
    title,
    description,
    ctaText,
    onCtaClick,
    campaigns,
    className,
    secondaryCta
}) => {
    // Animation variants for the text content
    const FADE_IN_ANIMATION_VARIANTS = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
    };

    // Duplicate campaigns for a seamless loop
    const duplicatedCampaigns = [...campaigns, ...campaigns];

    return (
        <section
            className={cn(
                "relative w-full h-[110vh] md:h-screen overflow-hidden bg-black flex flex-col items-center justify-start pt-32 md:pt-40 text-center px-4",
                className
            )}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-black pointer-events-none">
                {/* Dynamic Orbs */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse duration-3000 opacity-40"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none opacity-30"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            </div>

            <div className="relative z-40 flex flex-col items-center w-full px-6 lg:px-[130px] mx-auto mb-12 md:mb-20">
                {/* Tagline */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={FADE_IN_ANIMATION_VARIANTS}
                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-mono text-primary-foreground backdrop-blur-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    {tagline}
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: {},
                        show: {
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                    className="text-4xl md:text-7xl font-bold tracking-tighter text-white font-display leading-[1.1] max-w-5xl"
                >
                    {typeof title === 'string' ? (
                        title.split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                variants={FADE_IN_ANIMATION_VARIANTS}
                                className="inline-block"
                            >
                                {word}&nbsp;
                            </motion.span>
                        ))
                    ) : (
                        title
                    )}
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial="hidden"
                    animate="show"
                    variants={FADE_IN_ANIMATION_VARIANTS}
                    transition={{ delay: 0.5 }}
                    className="mt-6 max-w-2xl text-base md:text-lg text-gray-400 font-light leading-relaxed"
                >
                    {description}
                </motion.p>

                {/* Call to Action Buttons */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={FADE_IN_ANIMATION_VARIANTS}
                    transition={{ delay: 0.6 }}
                    className="mt-10 flex flex-col sm:flex-row items-center gap-4 z-50"
                >
                    <ActionButton onClick={onCtaClick}>{ctaText}</ActionButton>
                    {secondaryCta}
                </motion.div>
            </div>

            {/* Animated Image Marquee */}
            <div className="absolute bottom-0 left-0 w-full h-[45vh] md:h-[50vh] pointer-events-auto z-10 flex items-end pb-8 [mask-image:linear-gradient(to_bottom,transparent_0%,black_50%,black_100%)]">
                <motion.div
                    className="flex gap-6 pl-4"
                    animate={{
                        x: ["0%", "-50%"],
                        transition: {
                            ease: "linear",
                            duration: 60,
                            repeat: Infinity,
                        },
                    }}
                >
                    {duplicatedCampaigns.map((campaign, index) => (
                        <div
                            key={`${campaign.id}-${index}`}
                            className="relative aspect-[3/4] h-[300px] md:h-[400px] flex-shrink-0"
                            style={{
                                top: index % 2 === 0 ? "0px" : "40px",
                                rotate: `${index % 2 === 0 ? -2 : 2}deg`,
                            }}
                        >
                            <CampaignCard campaign={campaign} />
                        </div>
                    ))}
                </motion.div>
            </div>
            {/* Gradient Fade to make it look like the reference */}
            <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-transparent to-black/0 pointer-events-none"></div>
        </section>
    );
};
