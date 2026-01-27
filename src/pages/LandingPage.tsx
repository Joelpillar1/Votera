import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Flame,
    ShieldCheck,
    Users,
    ChevronDown,
    LayoutGrid,
    Trophy,
    Zap,
    Lock,
    Globe,
    School,
    Building2,
    Code2,
    HeartHandshake,
    Plus,
    Minus,
    Coins,
    Check,
    X,
    Vote,
    Gavel,
    Search
} from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';

interface LandingPageProps {
    onEnterApp: () => void;
}

const Navbar = ({ onEnterApp }: { onEnterApp: () => void }) => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020202]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="relative group cursor-pointer">
                    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative h-10 w-10 bg-[#0A0A0A] border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent"></div>
                        <span className="font-bold text-white text-xl font-display relative z-10">V</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-xl tracking-tight text-white font-display leading-none">Voterax</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-mono mt-1">Coordination OS</span>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-10">
                {['Vision', 'Architecture', 'Ecosystem', 'Governance'].map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group">
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-500 transition-all group-hover:w-full"></span>
                    </a>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" className="hidden md:flex text-gray-400 hover:text-white" onClick={onEnterApp}>Log in</Button>
                <Button onClick={onEnterApp} className="rounded-full bg-white text-black hover:bg-gray-100 font-medium px-8 h-11 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]">
                    Launch App
                </Button>
            </div>
        </div>
    </nav>
);

const Hero = ({ onEnterApp }: { onEnterApp: () => void }) => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Layers */}
            <div className="absolute inset-0 bg-[#020202]">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                {/* Dynamic Orbs */}
                <div className="absolute top-1/3 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-3000"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none"></div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] mask-gradient-to-b opacity-20"></div>
            </div>

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 max-w-6xl mx-auto px-6"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-12 text-center space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-indigo-300 uppercase tracking-widest backdrop-blur-md"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            Waitlist 2.0 Open
                            <div className="h-4 w-px bg-white/10 mx-2"></div>
                            <span className="text-gray-400">Join 12,000+ Contributors</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9] font-display">
                            Value. <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-500 to-gray-800">Earned.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                            Stop participating in systems that don't remember you. <br className="hidden md:block" />
                            Voterax is the <span className="text-white font-medium">Reputation Layer</span> for the internet, where influence is mathematically proven, not bought.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
                        >
                            <Button
                                onClick={onEnterApp}
                                size="lg"
                                className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-gray-100 hover:scale-105 transition-all shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] font-medium"
                            >
                                Start Contributing
                            </Button>
                            <div className="flex items-center gap-4 text-sm text-gray-500 font-mono">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-10 w-10 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-xs text-white">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                    ))}
                                </div>
                                <span>Trustless & Audited</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 opacity-50"
            >
                <span className="text-[10px] uppercase tracking-[0.3em]">Explore</span>
                <ChevronDown className="h-4 w-4" />
            </motion.div>
        </section>
    );
};

const ProblemSolution = () => {
    return (
        <section id="vision" className="py-20 px-6 bg-[#020202] relative">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div className="inline-block border-b border-red-500/50 pb-2">
                            <h2 className="text-xs font-mono uppercase tracking-widest text-red-500">The Problem</h2>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                            The internet's coordination layer is <span className="text-gray-600 line-through">broken</span> rigid.
                        </h3>
                        <div className="space-y-6">
                            {[
                                { title: "Plutocracy Rule", desc: "1 Token = 1 Vote means the rich decide everything, regardless of expertise." },
                                { title: "Transient Identity", desc: "Your contributions to one DAO are invisible to the next. You start from zero every time." },
                                { title: "Opaque Committees", desc: "Grants and bounties are decided in black boxes by people you didn't elect." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="h-10 w-10 rounded-full bg-red-900/10 border border-red-900/20 flex items-center justify-center shrink-0 group-hover:bg-red-900/20 transition-colors">
                                        <X className="h-4 w-4 text-red-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-200 mb-1">{item.title}</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8 relative">
                        {/* Vertial Divider Line */}
                        <div className="hidden lg:block absolute left-[-3rem] top-0 bottom-0 w-px bg-white/5"></div>

                        <div className="inline-block border-b border-indigo-500/50 pb-2">
                            <h2 className="text-xs font-mono uppercase tracking-widest text-indigo-500">The Voterax Solution</h2>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                            A protocol that <span className="text-indigo-400">remembers</span> what you did.
                        </h3>
                        <div className="space-y-6">
                            {[
                                { title: "Meritocracy Rule", desc: "Influence (Voting Power) is derived from verifiable work (CP), not bank balance." },
                                { title: "Compound Reputation", desc: "Your RP travels with you. Build a global resume that is cryptographically unforgeable." },
                                { title: "Combustion Clarity", desc: "Voting burns points. Only those with skin in the game influence the outcome." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="h-10 w-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                                        <Check className="h-4 w-4 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const Architecture = () => {
    return (
        <section id="architecture" className="py-40 px-6 bg-[#030303] relative border-t border-white/5">
            <div className="max-w-7xl mx-auto space-y-24">
                <div className="text-center space-y-6">
                    <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight font-display">The Engine</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                        Three layers working in unison to produce trusted outcomes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Layer 1 */}
                    <div className="group relative bg-[#080808] border border-white/5 p-10 rounded-[2rem] hover:border-white/10 transition-all duration-500">
                        <div className="text-8xl font-bold text-white/5 absolute -top-10 right-4 font-display group-hover:text-white/10 transition-colors">01</div>
                        <div className="h-16 w-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-8 border border-blue-500/20">
                            <ActivityIcon />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Participation Layer</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            The input. Tracks verified on-chain and off-chain actions. Every submission, code commit, or event attendance is cryptographically receipted.
                        </p>
                    </div>

                    {/* Layer 2 */}
                    <div className="group relative bg-[#080808] border border-white/5 p-10 rounded-[2rem] hover:border-white/10 transition-all duration-500">
                        <div className="text-8xl font-bold text-white/5 absolute -top-10 right-4 font-display group-hover:text-white/10 transition-colors">02</div>
                        <div className="h-16 w-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-400 mb-8 border border-yellow-500/20">
                            <Trophy className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Reputation Layer</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            The memory. Converts raw actions into non-transferable Reputation Points (RP). This is your 'Soul'. It cannot be sold, transferred, or faked.
                        </p>
                    </div>

                    {/* Layer 3 */}
                    <div className="group relative bg-[#080808] border border-white/5 p-10 rounded-[2rem] hover:border-white/10 transition-all duration-500">
                        <div className="text-8xl font-bold text-white/5 absolute -top-10 right-4 font-display group-hover:text-white/10 transition-colors">03</div>
                        <div className="h-16 w-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-8 border border-purple-500/20">
                            <Gavel className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Decision Layer</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            The output. Combustion Voting enables quadratic-style influence where the cost of voting scales, prioritizing conviction over convenient consensus.
                        </p>
                    </div>
                </div>

                {/* The Math */}
                <div className="rounded-[2.5rem] bg-gradient-to-b from-[#0A0A0A] to-black border border-white/10 p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>

                    <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-12">The Governance Algorithm</h3>

                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-5xl md:text-8xl font-bold font-mono text-white">
                        <div className="flex flex-col items-center gap-4 group">
                            <span className="group-hover:text-indigo-400 transition-colors">VP</span>
                            <span className="text-xs text-gray-600 font-sans tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Voting Pwr</span>
                        </div>
                        <span className="text-gray-700 font-light">=</span>
                        <div className="flex flex-col items-center gap-4 group">
                            <span className="group-hover:text-blue-400 transition-colors">CP</span>
                            <span className="text-xs text-gray-600 font-sans tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Campaign Pts</span>
                        </div>
                        <span className="text-gray-700 font-light">+</span>
                        <div className="p-4 md:p-8 rounded-3xl bg-white/5 text-4xl md:text-6xl flex items-center gap-4 border border-white/5 shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-yellow-500/5 opacity-0 hover:opacity-100 transition-opacity"></div>
                            <span className="text-gray-500">(</span>
                            <span className="text-yellow-400">RP</span>
                            <span className="text-gray-500 text-3xl">×</span>
                            <span className="text-gray-400">0.2</span>
                            <span className="text-gray-500">)</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Ecosystem = () => {
    return (
        <section id="ecosystem" className="py-40 px-6 bg-[#020202]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10">
                        <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight font-display leading-[1.1]">
                            One logic. <br />
                            <span className="text-gray-600">Infinite use cases.</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-lg leading-relaxed font-light">
                            Voterax is infrastructure. We don't dictate the rules; we provide the physics.
                            Whether you are a global protocol or a local chess club.
                        </p>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-8 pt-8">
                            {[
                                { val: "100%", label: "Verifiable" },
                                { val: "0", label: "Protocol Fee" },
                                { val: "2.4s", label: "Finality" },
                                { val: "∞", label: "Scalability" },
                            ].map((s, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="text-3xl font-bold text-white font-mono">{s.val}</div>
                                    <div className="text-sm text-gray-500 uppercase tracking-widest">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { icon: Globe, title: "Global Grants", desc: "Allocate $10M+ in funding distributed through 10,000+ contributors." },
                            { icon: Users, title: "DAO Governance", desc: "Replace token-weighted voting (wealth) with reputation-weighted voting (merit)." },
                            { icon: School, title: "Education", desc: "Track student contributions to campus life and automate trusted transcripts." },
                            { icon: Trophy, title: "Competitions", desc: "Judge hackathons transparently without a panel of biased experts." }
                        ].map((card, i) => (
                            <div key={i} className="group flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="h-14 w-14 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <card.icon className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white">{card.title}</h4>
                                    <p className="text-sm text-gray-500">{card.desc}</p>
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-700 ml-auto group-hover:text-white transition-colors group-hover:translate-x-1" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const CTA = ({ onEnterApp }: { onEnterApp: () => void }) => (
    <section className="py-40 relative px-6 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[#020202]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#0A0A0A] to-[#020202]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none"></div>
        </div>

        <div className="relative z-10 text-center space-y-10 max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter font-display leading-[1]">
                Ready to govern?
            </h2>
            <p className="text-2xl text-gray-400 font-light max-w-2xl mx-auto">
                The protocol is live. The treasury is funded. Your reputation is waiting to be written.
            </p>
            <div className="pt-8">
                <Button onClick={onEnterApp} className="h-20 px-16 text-2xl rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_80px_-20px_rgba(79,70,229,0.5)] transition-all hover:scale-105 active:scale-95">
                    Enter Voterax
                </Button>
            </div>
            <p className="text-sm text-gray-600 font-mono pt-8">
                v1.0.4-beta • Audited by Trail of Bits
            </p>
        </div>
    </section>
);

const Footer = () => (
    <footer className="border-t border-white/5 bg-[#010101] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-gray-500">
            <div className="space-y-6">
                <div className="flex items-center gap-2 text-white font-bold text-xl">
                    <div className="h-6 w-6 rounded bg-indigo-600 flex items-center justify-center text-xs">V</div>
                    Voterax
                </div>
                <p>The coordination layer for the new internet. Built for humans.</p>
            </div>

            <div className="space-y-4">
                <h4 className="text-white font-bold">Protocol</h4>
                <a href="#" className="block hover:text-white transition-colors">Architecture</a>
                <a href="#" className="block hover:text-white transition-colors">Smart Contracts</a>
                <a href="#" className="block hover:text-white transition-colors">Audits</a>
                <a href="#" className="block hover:text-white transition-colors">Bug Bounty</a>
            </div>

            <div className="space-y-4">
                <h4 className="text-white font-bold">Community</h4>
                <a href="#" className="block hover:text-white transition-colors">Governance Forum</a>
                <a href="#" className="block hover:text-white transition-colors">Discord</a>
                <a href="#" className="block hover:text-white transition-colors">Twitter (X)</a>
                <a href="#" className="block hover:text-white transition-colors">Events</a>
            </div>

            <div className="space-y-4">
                <h4 className="text-white font-bold">Legal</h4>
                <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
            </div>
        </div>
    </footer>
);

const ActivityIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
    const [showAuth, setShowAuth] = useState(false);

    const handleAuthTrigger = () => {
        setShowAuth(true);
    };

    return (
        <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden scroll-smooth">
            <Navbar onEnterApp={handleAuthTrigger} />
            <Hero onEnterApp={handleAuthTrigger} />
            <ProblemSolution />
            <Architecture />
            <Ecosystem />
            <CTA onEnterApp={handleAuthTrigger} />
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
