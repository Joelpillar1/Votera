import React, { useState } from 'react';
import { Campaign, CampaignStatus } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
    ArrowLeft,
    Trophy,
    Users,
    TrendingUp,
    ExternalLink,
    Flame,
    CheckCircle2,
    BarChart3,
    PieChart,
    Share2,
    Download
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CampaignResultsProps {
    campaign: Campaign;
    onBack: () => void;
}

const CampaignResults: React.FC<CampaignResultsProps> = ({ campaign, onBack }) => {
    // Mock results data generation
    const participants = 156;
    const totalVotes = 4520;
    const cpBurned = 12500;
    const rpMinted = 840;

    // Mock rankings
    const rankings = [
        { id: 1, name: "DeFi Governance UI", score: 98, reward: 2500, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
        { id: 2, name: "Smart Contract Audit Bot", score: 95, reward: 1500, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" },
        { id: 3, name: "Community Dashboard", score: 89, reward: 1000, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
        { id: 4, name: "Translation Pack: Spanish", score: 82, reward: 500, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" },
        { id: 5, name: "Marketing Video Assets", score: 76, reward: 250, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Simba" },
    ];

    const distributionStats = [
        { label: "Community", value: 65, color: "bg-primary" },
        { label: "Core Contributors", value: 25, color: "bg-blue-500" },
        { label: "Treasury", value: 10, color: "bg-purple-500" },
    ];

    return (
        <div className="max-w-7xl mx-auto pb-24 animate-in fade-in duration-500 space-y-8">
            {/* Navigation */}
            <div className="flex items-center justify-between">
                <Button variant="ghost" className="pl-0 hover:pl-2 transition-all gap-2 text-muted-foreground hover:text-white" onClick={onBack}>
                    <ArrowLeft className="h-4 w-4" /> Back to Campaign
                </Button>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2 border-white/10 hover:bg-white/5">
                        <Download className="h-4 w-4" /> Export Report
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 border-white/10 hover:bg-white/5">
                        <Share2 className="h-4 w-4" /> Share
                    </Button>
                </div>
            </div>

            {/* Header Section */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/20 via-black to-black border border-white/10 p-8 md:p-12">
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                    <Trophy className="h-64 w-64 text-yellow-500" />
                </div>

                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
                        <CheckCircle2 className="h-3 w-3" /> Campaign Concluded
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-bold font-display text-white">{campaign.title} Results</h1>
                        <p className="text-xl text-gray-400 max-w-2xl">
                            The community has spoken. Governance consensus reached via Quadratic Voting.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
                        <div className="space-y-1">
                            <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Total Participants</div>
                            <div className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" /> {participants}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Votes Cast</div>
                            <div className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-blue-500" /> {totalVotes.toLocaleString()}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">CP Burned</div>
                            <div className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                                <Flame className="h-5 w-5 text-orange-500" /> {cpBurned.toLocaleString()}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">RP Minted</div>
                            <div className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-yellow-500" /> +{rpMinted}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Rankings */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="glass-panel border-white/10 bg-[#0a0a0a]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-yellow-500" /> Final Project Rankings
                            </CardTitle>
                            <CardDescription>Based on quadratic voting consensus weighted by reputation.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {rankings.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group overflow-hidden"
                                >
                                    {/* Rank Indicator */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${index === 0 ? 'bg-yellow-500' :
                                            index === 1 ? 'bg-gray-400' :
                                                index === 2 ? 'bg-orange-700' : 'bg-transparent'
                                        }`} />

                                    <div className="flex items-center gap-4 pl-2">
                                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-black/40 text-sm font-bold text-gray-400 border border-white/10">
                                            #{index + 1}
                                        </div>
                                        <img src={project.avatar} alt={project.name} className="h-10 w-10 rounded-full border border-white/10" />
                                        <div>
                                            <h3 className="font-bold text-white group-hover:text-primary transition-colors">{project.name}</h3>
                                            <p className="text-xs text-gray-500">Score: {project.score}/100</p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-xs text-gray-500 font-bold uppercase">Funding Awarded</div>
                                        <div className="text-lg font-bold text-green-400">{project.reward.toLocaleString()} CP</div>
                                    </div>
                                </motion.div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Outcome Explanation */}
                    <Card className="glass-panel border-white/10 bg-[#0a0a0a]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-blue-400" /> Impact Analysis
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-300 leading-relaxed">
                                The <strong>{campaign.title}</strong> campaign has successfully concluded with high participation.
                                The primary focus of voters was on <strong>Governance Tooling</strong> and <strong>Accessibility</strong>,
                                as evidenced by the top rankings of the 'DeFi Governance UI' and 'Translation Pack' tasks.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                A total of <strong>{cpBurned.toLocaleString()} CP</strong> was burned during the voting process, significantly reducing the circulating supply and validating the ecosystem's deflationary mechanics.
                            </p>

                            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mt-4">
                                <h4 className="text-sm font-bold text-yellow-500 mb-2 uppercase tracking-wide">Next Steps</h4>
                                <ul className="list-disc list-inside text-sm text-yellow-200/80 space-y-1">
                                    <li>Funds will be distributed to winners within 24 hours.</li>
                                    <li>Minted Reputation Points (RP) are now available in user profiles.</li>
                                    <li>Retrospective discussion opens in the Governance Forum.</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-8">
                    {/* RP Distribution Pie Chart */}
                    <Card className="glass-panel border-white/10 bg-[#0a0a0a]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <PieChart className="h-4 w-4 text-purple-400" /> Reward Distribution
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {distributionStats.map((stat, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">{stat.label}</span>
                                            <span className="text-white font-mono">{stat.value}%</span>
                                        </div>
                                        <Progress value={stat.value} className={`h-2 ${stat.color} bg-white/10`} />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-white/10 text-center">
                                <div className="text-xs text-gray-500 mb-1">Total Pool Distributed</div>
                                <div className="text-2xl font-bold text-white">5,000 CP</div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* On-Chain Reference */}
                    <Card className="glass-panel border-white/10 bg-[#0a0a0a]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <ExternalLink className="h-4 w-4 text-green-400" /> On-Chain Verification
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-3 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-colors">
                                <div className="space-y-0.5">
                                    <div className="text-[10px] text-gray-500 font-mono uppercase">Results Hash</div>
                                    <div className="text-xs text-blue-400 font-mono">0x7f...3a2b</div>
                                </div>
                                <ExternalLink className="h-3 w-3 text-gray-600 group-hover:text-primary" />
                            </div>
                            <div className="p-3 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-colors">
                                <div className="space-y-0.5">
                                    <div className="text-[10px] text-gray-500 font-mono uppercase">Payout Transaction</div>
                                    <div className="text-xs text-blue-400 font-mono">0x9c...1e4d</div>
                                </div>
                                <ExternalLink className="h-3 w-3 text-gray-600 group-hover:text-primary" />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                All results are immutable and stored permanently on the Voterax Consensus Layer.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CampaignResults;
