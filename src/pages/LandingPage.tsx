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

interface LandingPageProps {
    onEnterApp: () => void;
}

const Navbar = ({ onEnterApp }: { onEnterApp: () => void }) => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="w-full mx-auto px-6 lg:px-[130px] h-24 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="relative group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative h-10 w-10 bg-black border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
                        <span className="font-bold text-white text-xl font-display relative z-10">V</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-xl tracking-tight text-white font-display leading-none">Voterax</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mt-1">Coordination OS</span>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-10">
                {['Problem', 'Solution', 'Features', 'Use Cases'].map((item) => (
                    <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group">
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full"></span>
                    </a>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" className="hidden md:flex text-gray-400 hover:text-white" onClick={onEnterApp}>Log in</Button>
                <Button onClick={onEnterApp} className="rounded-full bg-white text-black hover:bg-gray-200 font-medium px-6 h-10 transition-transform hover:scale-105 active:scale-95">
                    Connect Wallet
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

const CAMPAIGNS: Campaign[] = [
    {
        id: "1",
        title: "DeFi Grant Round 12",
        category: "Grant",
        rewardPool: "$150k Pool",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1632"
    },
    {
        id: "2",
        title: "Zero-Knowledge Research",
        category: "Bounty",
        rewardPool: "20,000 OP",
        image: "https://images.unsplash.com/photo-1639322537228-ad7117a767d1?auto=format&fit=crop&q=80&w=1632"
    },
    {
        id: "3",
        title: "Public Goods Funding",
        category: "Quadratic",
        rewardPool: "$2M Match",
        image: "https://images.unsplash.com/photo-1593672740628-9bb490b3bfa0?auto=format&fit=crop&q=80&w=1470"
    },
    {
        id: "4",
        title: "Solana Hackathon 2026",
        category: "Competition",
        rewardPool: "$1M Prizes",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1470"
    },
    {
        id: "5",
        title: "DAO Governance Audit",
        category: "Security",
        rewardPool: "$50k USDC",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1470"
    },
    {
        id: "6",
        title: "Content Creator Fund",
        category: "Creative",
        rewardPool: "50 ETH",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1470"
    }
];

const Hero = ({ onEnterApp }: { onEnterApp: () => void }) => {
    return (
        <AnimatedMarqueeHero
            tagline="Participation-Driven Coordination"
            title={
                <>
                    Where reputation becomes <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400">
                        real decision power
                    </span>
                </>
            }
            description="Voterax is a participation-driven coordination platform that helps communities, organizations, and ecosystems run fair, transparent campaigns powered by earned reputation, not money, hype, or speed."
            ctaText="Join a Campaign"
            onCtaClick={onEnterApp}
            secondaryCta={
                <Button
                    onClick={onEnterApp}
                    variant="outline"
                    className="h-full px-8 py-3 rounded-full bg-transparent border-white/20 text-white hover:bg-white/5 transition-all w-full sm:w-auto font-semibold"
                >
                    Create a Campaign
                </Button>
            }
            campaigns={CAMPAIGNS}
        />
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


const TrustSection = () => {
    return (
        <section className="py-24 px-6 bg-black text-center">
            <div className="max-w-4xl mx-auto p-12 rounded-[3rem] bg-white/5 border border-white/5 backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-white mb-12 font-display">Trust & Transparency</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
                    {[
                        "No governance tokens",
                        "No selling of reputation",
                        "No pay-to-influence",
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

const FinalCTA = ({ onEnterApp }: { onEnterApp: () => void }) => (
    <section className="py-24 relative px-6 lg:px-[130px] overflow-hidden flex items-center justify-center bg-black">
        <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none"></div>
        </div>

        <div className="relative z-10 text-center space-y-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display leading-[1.1]">
                Ready to run campaigns <br />
                <span className="text-primary">people actually trust?</span>
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                <Button onClick={onEnterApp} className="h-16 px-10 text-xl rounded-full bg-white text-black hover:bg-gray-200 transition-all shadow-xl font-medium w-full sm:w-auto">
                    Create a Campaign
                </Button>
                <Button onClick={onEnterApp} variant="outline" className="h-16 px-10 text-xl rounded-full bg-transparent border-white/20 text-white hover:bg-white/5 transition-all w-full sm:w-auto">
                    Join a Campaign
                </Button>
            </div>
        </div>
    </section>
);

// Footer Component Imported from '@/components/ui/footer'


const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
    const [showAuth, setShowAuth] = useState(false);

    const handleAuthTrigger = () => {
        setShowAuth(true);
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-primary/30 overflow-x-hidden scroll-smooth">
            <Navbar onEnterApp={handleAuthTrigger} />
            <Hero onEnterApp={handleAuthTrigger} />
            <ProblemSection />
            <SolutionSection />
            <WhyReputationSection />
            <UseCasesSection />
            <TargetAudienceSection />
            <TrustSection />
            <FinalCTA onEnterApp={handleAuthTrigger} />
            <Footer />

            <AuthModal
                isOpen={showAuth}
                onClose={() => setShowAuth(false)}
                onLogin={onEnterApp}
            />
        </div>
    );
};

export default LandingPage;
