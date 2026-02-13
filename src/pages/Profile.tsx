import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    User,
    Clock,
    Trophy,
    Target,
    ShieldCheck,
    Hash,
    ArrowUpRight,
    Flame,
    CheckCircle2,
    Calendar,
    Award,
    TrendingUp,
    Briefcase,
    Rocket,
    Star,
    Landmark,
    Github,
    Linkedin,
    Twitter,
    ExternalLink,
    FileCheck,
    Link as LinkIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { mockUsers, mockContributions, mockCampaigns, mockTasks } from '@/data/mockData';

interface ProfileProps {
    onNavigate: (page: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
    // Mock logged-in user
    const user = mockUsers[0];

    // Calculate stats
    const userContributions = mockContributions.filter(c => c.user_id === user.id);
    const approvedContributions = userContributions.filter(c => c.status === 'approved');
    const totalRPEarned = 2450; // Mock total earned
    const totalRPUsed = 650; // Mock RP used in voting
    const rpRemaining = user.RP_balance;

    // Mock campaign history
    const campaignHistory = [
        { id: 1, name: 'DeFi Educational Series', role: 'Contributor', contributions: 3, rpEarned: 450, status: 'completed', date: 'Jan 2024' },
        { id: 2, name: 'Community Park Design', role: 'Lead Contributor', contributions: 5, rpEarned: 800, status: 'completed', date: 'Dec 2023' },
        { id: 3, name: 'DAO Governance Framework', role: 'Contributor', contributions: 2, rpEarned: 300, status: 'active', date: 'Ongoing' },
    ];

    // Mock contribution timeline
    const contributionTimeline = [
        { id: 1, date: '2024-01-28', campaign: 'DeFi Educational Series', task: 'Smart Contract Audit Documentation', rp: 150, status: 'approved' },
        { id: 2, date: '2024-01-25', campaign: 'DeFi Educational Series', task: 'Tutorial Video Script', rp: 100, status: 'approved' },
        { id: 3, date: '2024-01-20', campaign: 'Community Park Design', task: 'Playground Equipment Design', rp: 200, status: 'approved' },
        { id: 4, date: '2024-01-15', campaign: 'DAO Governance Framework', task: 'Voting Mechanism Research', rp: 150, status: 'approved' },
        { id: 5, date: '2024-01-10', campaign: 'Community Park Design', task: 'Community Survey Analysis', rp: 100, status: 'approved' },
    ];

    // Mock badges
    const badges = [
        { name: 'Early Adopter', icon: Rocket, bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20', iconColor: 'text-blue-400' },
        { name: 'Top Contributor', icon: Star, bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/20', iconColor: 'text-yellow-400' },
        { name: 'Governance Expert', icon: Landmark, bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/20', iconColor: 'text-purple-400' },
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-12">
            {/* Profile Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0a0a] via-[#111] to-black border border-white/10 p-6 md:p-8">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-start gap-6">{/* Reduced gap from 8 to 6 and removed mb-8 */}
                        {/* Avatar */}
                        <div className="relative">
                            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 border border-primary/30 flex items-center justify-center">
                                <span className="text-4xl font-bold text-white">{user.name.charAt(0)}</span>
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 border-2 border-black">
                                <ShieldCheck className="h-4 w-4 text-white" />
                            </div>
                        </div>

                        {/* Name & Wallet */}
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-white mb-2">{user.name}</h1>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-gray-400">
                                    {user.role}
                                </span>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Hash className="h-4 w-4" />
                                    <span className="font-mono text-sm">0x71C7...9A23</span>
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-3">
                                {badges.map((badge) => {
                                    const IconComponent = badge.icon;
                                    return (
                                        <div
                                            key={badge.name}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-xl ${badge.bgColor} border ${badge.borderColor}`}
                                        >
                                            <IconComponent className={`h-4 w-4 ${badge.iconColor}`} />
                                            <span className="text-xs font-bold text-white">{badge.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Verified Links - Stacked */}
                        <div className="flex flex-col gap-2 min-w-[200px] self-start">
                            {/* GitHub */}
                            <a
                                href="https://github.com/alexjohnson"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
                            >
                                <Github className="h-3.5 w-3.5 text-gray-400" />
                                <span className="text-xs font-medium text-white flex-1">GitHub</span>
                                <CheckCircle2 className="h-3 w-3 text-green-400" />
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="https://linkedin.com/in/alexjohnson"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
                            >
                                <Linkedin className="h-3.5 w-3.5 text-blue-400" />
                                <span className="text-xs font-medium text-white flex-1">LinkedIn</span>
                                <CheckCircle2 className="h-3 w-3 text-green-400" />
                            </a>

                            {/* X (Twitter) */}
                            <a
                                href="https://x.com/alexjohnson"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
                            >
                                <Twitter className="h-3.5 w-3.5 text-sky-400" />
                                <span className="text-xs font-medium text-white flex-1">X</span>
                                <CheckCircle2 className="h-3 w-3 text-green-400" />
                            </a>

                            {/* Portfolio */}
                            <a
                                href="https://alexjohnson.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
                            >
                                <LinkIcon className="h-3.5 w-3.5 text-purple-400" />
                                <span className="text-xs font-medium text-white flex-1">Portfolio</span>
                                <CheckCircle2 className="h-3 w-3 text-green-400" />
                            </a>

                            {/* Campaign Evidence */}
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
                            >
                                <FileCheck className="h-3.5 w-3.5 text-green-400" />
                                <span className="text-xs font-medium text-white flex-1">Evidence</span>
                                <CheckCircle2 className="h-3 w-3 text-green-400" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reputation Summary */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-primary" />
                    Reputation Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total RP Earned */}
                    <Card className="bg-[#0a0a0a] border-white/10">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                                    <TrendingUp className="h-5 w-5 text-green-400" />
                                </div>
                                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Earned</div>
                            </div>
                            <div className="text-4xl font-bold text-white mb-1">{totalRPEarned.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">Reputation Points</div>
                        </CardContent>
                    </Card>

                    {/* RP Used */}
                    <Card className="bg-[#0a0a0a] border-white/10">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                    <Flame className="h-5 w-5 text-orange-400" />
                                </div>
                                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">RP Used</div>
                            </div>
                            <div className="text-4xl font-bold text-white mb-1">{totalRPUsed.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">In Governance Voting</div>
                        </CardContent>
                    </Card>

                    {/* RP Remaining */}
                    <Card className="bg-[#0a0a0a] border-white/10">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <ShieldCheck className="h-5 w-5 text-primary" />
                                </div>
                                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Available</div>
                            </div>
                            <div className="text-4xl font-bold text-primary mb-1">{rpRemaining.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">Current Voting Power</div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Campaign History & Contribution Timeline - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Campaign History */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Briefcase className="h-6 w-6 text-primary" />
                        Campaign History
                    </h2>
                    <div className="space-y-4">
                        {campaignHistory.map((campaign, index) => (
                            <motion.div
                                key={campaign.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="bg-[#0a0a0a] border-white/10 hover:border-white/20 transition-all cursor-pointer">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-bold text-white">{campaign.name}</h3>
                                                    <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${campaign.status === 'completed'
                                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                        }`}>
                                                        {campaign.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Award className="h-4 w-4" />
                                                    <span>{campaign.role}</span>
                                                    <span className="text-gray-700">•</span>
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{campaign.date}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Contributions</div>
                                                <div className="text-2xl font-bold text-white">{campaign.contributions}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">RP Earned</div>
                                                <div className="text-2xl font-bold text-green-400">+{campaign.rpEarned}</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Contribution Timeline */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Target className="h-6 w-6 text-primary" />
                        Contribution Timeline
                    </h2>
                    <Card className="bg-[#0a0a0a] border-white/10">
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                {contributionTimeline.map((contribution, index) => (
                                    <div key={contribution.id} className="relative">
                                        {/* Timeline line */}
                                        {index !== contributionTimeline.length - 1 && (
                                            <div className="absolute left-[15px] top-8 bottom-0 w-px bg-white/10" />
                                        )}

                                        <div className="flex gap-4">
                                            {/* Timeline dot */}
                                            <div className="relative z-10 h-8 w-8 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center shrink-0">
                                                <CheckCircle2 className="h-4 w-4 text-green-400" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 pb-6">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h4 className="font-bold text-white mb-1">{contribution.task}</h4>
                                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                                            <span>{contribution.campaign}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-lg font-bold text-green-400">+{contribution.rp} RP</div>
                                                        <div className="text-xs text-gray-500">{contribution.date}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
