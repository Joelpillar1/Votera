import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Users,
    ChevronDown,
    Trophy,
    Globe,
    School,
    HeartHandshake,
    ShieldCheck,
    Briefcase,
    Zap,
    Scale,
    Vote,
    Clock,
    Lock,
    CheckCircle2,
    XCircle,
    Layout
} from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';
import Campaigns from './Campaigns';

interface LandingPageProps {
    onLogin: (address: string) => void;
}

const Navbar = ({ onEnterApp, currentView, onViewChange }: {
    onEnterApp: (mode?: 'login' | 'signup') => void;
    currentView: 'home' | 'campaigns';
    onViewChange: (view: 'home' | 'campaigns') => void;
}) => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="w-full mx-auto px-6 lg:px-[130px] h-24 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="relative group cursor-pointer" onClick={() => onViewChange('home')}>
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative h-10 w-10 rounded-xl flex items-center justify-center overflow-hidden">
                        <img src="/src/images/IMG_4553 png.png" alt="Voterax Logo" className="h-full w-full object-contain" />
                    </div>
                </div>
                <div className="flex flex-col cursor-pointer" onClick={() => onViewChange('home')}>
                    <span className="font-bold text-xl tracking-tight text-white font-display leading-none">Voterax</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mt-1">Coordination OS</span>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-10">
                <button
                    onClick={() => onViewChange('campaigns')}
                    className={`text-sm font-medium transition-colors relative group ${currentView === 'campaigns' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    Campaigns
                    <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all ${currentView === 'campaigns' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
                {['Problem', 'Solution', 'Features', 'Use Cases'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                        onClick={(e) => {
                            if (currentView !== 'home') {
                                e.preventDefault();
                                onViewChange('home');
                                setTimeout(() => {
                                    const element = document.getElementById(item.toLowerCase().replace(' ', '-'));
                                    element?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }
                        }}
                        className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                    >
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full"></span>
                    </a>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" className="hidden md:flex text-gray-400 hover:text-white" onClick={() => onEnterApp('login')}>Log in</Button>
                <Button onClick={() => onEnterApp('signup')} className="rounded-full bg-white text-black hover:bg-gray-200 font-medium px-6 h-10 transition-transform hover:scale-105 active:scale-95">
                    Get Started
                </Button>
            </div>
        </div>
    </nav>
);

import { AnimatedMarqueeHero, Campaign } from '@/components/ui/hero-3';
import { SolutionSection } from '@/components/ui/solution-section';
import { ProblemSection } from '@/components/ui/problem-section';
import { WhyReputationSection } from '@/components/ui/why-reputation-section';
import { UseCasesSection } from '@/components/ui/use-cases-section';
import { TargetAudienceSection } from '@/components/ui/target-audience-section';
import { Footer } from '@/components/ui/footer';
import { mockCampaigns } from '@/data/mockData';
import { CampaignStatus } from '@/types';

// Organization logos for the hero marquee
const ORGANIZATIONS = [
    { name: "Uniswap", logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png" },
    { name: "Binance", logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png" },
    { name: "Aave", logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png" },
    { name: "Gitcoin", logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xDe30da39c46104798bB5aA3fe8B9e0e1F348163F/logo.png" },
    { name: "Optimism", logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/info/logo.png" },
    { name: "Arbitrum", logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png" },
    { name: "ENS", logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72/logo.png" },
    { name: "Polygon", logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png" },
    { name: "Cosmos", logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/cosmos/info/logo.png" },
    { name: "MakerDAO", logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/logo.png" },
    { name: "Compound", logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png" },
    { name: "Lido", logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32/logo.png" },
    { name: "Filecoin", logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/filecoin/info/logo.png" },
    { name: "Polkadot", logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polkadot/info/logo.png" },
    { name: "Celestia", logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/celestia/info/logo.png" },
    { name: "Gnosis", logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x655A59247c94EeD0445d3148F47898495A2df308/logo.png" },
];

const Hero = ({ onEnterApp }: { onEnterApp: () => void }) => {
    // Duplicate for seamless loop
    const duplicatedOrgs = [...ORGANIZATIONS, ...ORGANIZATIONS];

    return (
        <section className="relative w-full h-[90vh] md:h-screen overflow-hidden bg-black flex flex-col items-center justify-start pt-28 md:pt-40 text-center px-4">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-black pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse duration-3000 opacity-40"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none opacity-30"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            </div>

            {/* Content */}
            <div className="relative z-40 flex flex-col items-center w-full px-6 lg:px-[130px] mx-auto mb-0 md:mb-20">
                {/* Tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="mb-6 md:mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-mono text-primary-foreground backdrop-blur-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Participation-Driven Coordination
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 100, damping: 20 }}
                    className="text-4xl md:text-7xl font-bold tracking-tighter text-white font-display leading-[1.1] max-w-5xl"
                >
                    Where <span className="inline-block px-4 py-1 mx-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm -rotate-2 hover:rotate-0 transition-transform cursor-default">reputation</span> becomes <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400">
                        real decision power
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
                    className="mt-4 md:mt-6 max-w-2xl text-base md:text-lg text-gray-400 font-light leading-relaxed"
                >
                    Voterax is a reputation-powered coordination layer for fair decision-making, campaign governance, and merit-based participation across Web2 and Web3 institutions.
                </motion.p>

                {/* Call to Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 20 }}
                    className="mt-6 md:mt-10 flex flex-col sm:flex-row items-center gap-4 z-50"
                >
                    <Button
                        onClick={() => onEnterApp('signup')}
                        className="px-8 py-3 rounded-full bg-primary text-white font-semibold shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)] transition-transform duration-300 hover:bg-primary/90 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-opacity-75"
                    >
                        Join a Campaign
                    </Button>
                    <Button
                        onClick={() => onEnterApp('signup')}
                        variant="outline"
                        className="h-full px-8 py-3 rounded-full bg-transparent border-white/20 text-white hover:bg-white/5 transition-transform duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto font-semibold"
                    >
                        Create a Campaign
                    </Button>
                </motion.div>
            </div>

            {/* Scrolling Organization Logos */}
            <div className="absolute bottom-0 left-0 w-full h-[22vh] md:h-[40vh] pointer-events-none z-10 flex flex-col items-center justify-center gap-4 md:gap-8 pb-4 md:pb-12 [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%,black_70%,transparent_100%)]">
                {/* First Row - Scrolling Left to Right */}
                <div className="w-full overflow-hidden">
                    <motion.div
                        className="flex gap-12 items-center"
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            ease: "linear",
                            duration: 40,
                            repeat: Infinity,
                        }}
                    >
                        {duplicatedOrgs.map((org, index) => (
                            <div
                                key={`row1-${index}`}
                                className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-4 flex items-center justify-center hover:bg-white/10 transition-all group"
                            >
                                <img
                                    src={org.logo}
                                    alt={org.name}
                                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${org.name}`;
                                    }}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Second Row - Scrolling Right to Left */}
                <div className="w-full overflow-hidden">
                    <motion.div
                        className="flex gap-12 items-center"
                        animate={{
                            x: ["-50%", "0%"],
                        }}
                        transition={{
                            ease: "linear",
                            duration: 40,
                            repeat: Infinity,
                        }}
                    >
                        {duplicatedOrgs.map((org, index) => (
                            <div
                                key={`row2-${index}`}
                                className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-4 flex items-center justify-center hover:bg-white/10 transition-all group"
                            >
                                <img
                                    src={org.logo}
                                    alt={org.name}
                                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${org.name}`;
                                    }}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};




// Helper for dynamic icon assignment if needed, keeping it simple for now
const checkCircleIcon = CheckCircle2;

// WhyReputation Component Replaced

// UseCases Component Replaced


// Icon helper
const CoinsIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18" /><path d="M7 6h1v4" /><path d="m16.71 13.88.7 .71-2.82 2.82" /></svg>
)

// TargetAudience Component Replaced


const PremiumBackground = () => (
    <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Deep Space Base */}
        <div className="absolute inset-0 bg-[#020202]" />

        {/* Architectural Grid - Top Fade */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] opacity-80" />

        {/* Atmospheric Lighting */}
        <div className="absolute top-[-20%] left-[20%] w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[150px] mix-blend-screen opacity-40 animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen opacity-30" />
    </div>
);

const TrustSection = () => {
    return (
        <section className="py-16 px-6 relative z-10">
            <div className="max-w-4xl mx-auto p-12 rounded-[3rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-md relative overflow-hidden">
                {/* Subtle sheen */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

                <h2 className="text-3xl font-bold text-white mb-4 font-display relative z-10">Trust & Principles</h2>
                <p className="text-gray-400 mb-12 text-sm relative z-10">Voterax proves contribution without exposing contributors.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left relative z-10">
                    {[
                        "No governance tokens",
                        "No selling of reputation",
                        "No pay-to-influence",
                        "Merit-based voting",
                        "Sybil-resistant design",
                        "Privacy-preserving reputation",
                        "Anchored on-chain",
                        "Scalable off-chain logic",
                        "Infrastructure not marketplace"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                            <span className="text-gray-300">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FinalCTA = ({ onEnterApp }: { onEnterApp: (mode?: 'login' | 'signup') => void }) => (
    <section className="py-20 relative px-6 lg:px-[130px] overflow-hidden flex items-center justify-center">
        {/* Background Gradients & Grid - Local override for extra punch */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-20"></div>
        </div>

        <div className="relative w-full max-w-5xl mx-auto text-center z-10">
            <div className="flex flex-col items-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter font-display mb-6 leading-[1.1]"
                >
                    Stop voting in the dark. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-indigo-400">
                        Start leading with reputation.
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg text-zinc-400 max-w-2xl mb-10 mx-auto leading-relaxed"
                >
                    Join the coordination layer that prioritizes merit over money. <br className="hidden sm:block" />
                    Start your journey with Voterax today.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
                >
                    <Button
                        onClick={() => onEnterApp('signup')}
                        className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-zinc-200 transition-transform duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] font-semibold min-w-[200px]"
                    >
                        Create Campaign
                    </Button>
                    <Button
                        onClick={() => onEnterApp('signup')}
                        variant="outline"
                        className="h-14 px-8 text-lg rounded-full bg-transparent border-white/10 text-white hover:bg-white/5 transition-transform duration-300 hover:scale-105 active:scale-95 font-semibold min-w-[200px]"
                    >
                        Join Campaign
                    </Button>
                </motion.div>
            </div>
        </div>
    </section>
);

// Footer Component Imported from '@/components/ui/footer'

interface LandingPageProps {
    onConnect: (mode?: 'login' | 'signup') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onConnect }) => {
    const [currentView, setCurrentView] = useState<'home' | 'campaigns'>('home');

    return (
        <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-primary/30 overflow-x-hidden scroll-smooth relative">
            <PremiumBackground />

            <Navbar onEnterApp={onConnect} currentView={currentView} onViewChange={setCurrentView} />

            {currentView === 'home' ? (
                <div className="relative z-10">
                    <Hero onEnterApp={onConnect} />
                    <ProblemSection />
                    <SolutionSection />
                    <WhyReputationSection />
                    <UseCasesSection />
                    <TargetAudienceSection />
                    <TrustSection />
                    <FinalCTA onEnterApp={onConnect} />
                </div>
            ) : (
                <div className="pt-32 px-6 lg:px-[130px] min-h-screen pb-20 relative z-10">
                    <Campaigns onNavigate={onConnect} isPublic={true} />
                </div>
            )}

            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
};

export default LandingPage;
