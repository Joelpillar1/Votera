import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockCampaigns } from '@/data/mockData';
import { Campaign, CampaignStatus, UserRole } from '@/types';
import { Search, Filter, Calendar, Users, Trophy, ChevronRight, Clock, Target, Verified, CheckCircle2, BadgeCheck, Zap, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CampaignsProps {
    onNavigate: (page: string, data?: any) => void;
    isPublic?: boolean;
    userRole?: UserRole;
}

const Campaigns: React.FC<CampaignsProps> = ({ onNavigate, isPublic = false, userRole }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'active' | 'voting' | 'completed'>('active');

    const filteredCampaigns = mockCampaigns.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.objective.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter logic: 'active' shows contribution phase, 'voting' shows voting phase, 'completed' shows ended
        let matchesFilter = false;
        if (filter === 'active') matchesFilter = c.status === CampaignStatus.ACTIVE;
        if (filter === 'voting') matchesFilter = c.status === CampaignStatus.VOTING;
        if (filter === 'completed') matchesFilter = c.status === CampaignStatus.COMPLETED;

        return matchesSearch && matchesFilter;
    });

    // Mock User Status Logic for Demo
    const getUserStatus = (campaignId: number): { label: string; color: string } | null => {
        if (campaignId === 1) return { label: 'Joined', color: 'bg-green-500/10 text-green-400 border-green-500/20' }; // Active
        if (campaignId === 2) return { label: 'Voted', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' }; // Voting
        if (campaignId === 5) return { label: 'Eligible', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' }; // Voting
        if (campaignId === 3) return { label: 'Start', color: 'bg-white/5 text-white border-white/10' }; // Active, not joined
        return null;
    };

    // Check if user can create campaigns (only organizers)
    const canCreateCampaign = !isPublic && userRole === UserRole.ORGANIZER;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Promotional Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-black border border-white/10 p-8">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                            <Trophy className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Complete Campaigns to Unlock Reputation</h3>
                            <p className="text-sm text-gray-400">Participate in governance and earn RP to increase your voting power</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                <BadgeCheck className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Achievement</div>
                                <div className="text-sm font-bold text-white">Governance Badge</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                                <Zap className="h-5 w-5 text-yellow-400" />
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Reward</div>
                                <div className="text-sm font-bold text-white">Platform Credits</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold font-display text-white">Find Meaningful Work</h1>
                        <p className="text-muted-foreground mt-2 text-lg">Discover active campaigns, participate in governance, and earn reputation.</p>
                    </div>
                    {canCreateCampaign && (
                        <Button onClick={() => onNavigate('create-campaign')} className="bg-white text-black hover:bg-gray-200 shrink-0">
                            Create Campaign
                        </Button>
                    )}
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by title or DAO..."
                        className="pl-11 h-12 bg-[#080808] border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-0 rounded-xl"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* New & Trending Campaigns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* New Campaigns */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-white">New</h2>
                    <div className="space-y-3">
                        {mockCampaigns.slice(0, 3).map((campaign) => (
                            <motion.div
                                key={campaign.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="group flex items-center gap-4 p-4 rounded-xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                                onClick={() => onNavigate('campaign-details', campaign)}
                            >
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center shrink-0 border border-white/10">
                                    {campaign.organizer?.avatar ? (
                                        <img src={campaign.organizer.avatar} className="h-full w-full object-cover rounded-xl" alt="" />
                                    ) : (
                                        <Trophy className="h-6 w-6 text-primary" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-white text-sm group-hover:text-primary transition-colors truncate">
                                        {campaign.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex items-center -space-x-2">
                                            <div className="h-4 w-4 rounded-full bg-blue-500 border border-black" />
                                            <div className="h-4 w-4 rounded-full bg-purple-500 border border-black" />
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {Math.floor(Math.random() * 500) + 50} Participants
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Trending Campaigns */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-white">Trending</h2>
                    <div className="space-y-3">
                        {mockCampaigns.slice(3, 6).map((campaign) => (
                            <motion.div
                                key={campaign.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="group flex items-center gap-4 p-4 rounded-xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                                onClick={() => onNavigate('campaign-details', campaign)}
                            >
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center shrink-0 border border-white/10">
                                    {campaign.organizer?.avatar ? (
                                        <img src={campaign.organizer.avatar} className="h-full w-full object-cover rounded-xl" alt="" />
                                    ) : (
                                        <Zap className="h-6 w-6 text-purple-400" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-white text-sm group-hover:text-primary transition-colors truncate">
                                        {campaign.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex items-center -space-x-2">
                                            <div className="h-4 w-4 rounded-full bg-orange-500 border border-black" />
                                            <div className="h-4 w-4 rounded-full bg-pink-500 border border-black" />
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {Math.floor(Math.random() * 800) + 200} Participants
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Filters */}
            <div className="flex p-1 bg-white/5 rounded-xl border border-white/5 w-fit">
                {(['active', 'voting', 'completed'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${filter === f
                            ? 'bg-[#080808] text-white shadow-lg border border-white/10'
                            : 'text-gray-500 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {f === 'active' ? 'Contribution' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Campaign Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.length > 0 ? (
                    filteredCampaigns.map((campaign, i) => (
                        <motion.div
                            key={campaign.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            {/* Card Implementation */}
                            {(() => {
                                const daysLeft = Math.ceil((new Date(campaign.timeline.end).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
                                const userStatus = getUserStatus(campaign.id);

                                return (
                                    <div
                                        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5 transition-all duration-300 hover:border-white/10 hover:shadow-2xl cursor-pointer h-full min-h-[320px] p-6"
                                        onClick={() => onNavigate('campaign-details', campaign)}
                                    >
                                        {/* Top Row: Phase + User Status */}
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${campaign.status === CampaignStatus.ACTIVE ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                campaign.status === CampaignStatus.VOTING ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                                    'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                                }`}>
                                                {campaign.status === CampaignStatus.ACTIVE ? 'Contribution' :
                                                    campaign.status === CampaignStatus.VOTING ? 'Voting Phase' : 'Ended'}
                                            </div>
                                            {userStatus && (
                                                <div className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide border ${userStatus.color}`}>
                                                    {userStatus.label}
                                                </div>
                                            )}
                                        </div>

                                        {/* Main Content */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="h-10 w-10 rounded-lg bg-[#111] border border-white/10 p-0.5 overflow-hidden">
                                                    {campaign.organizer?.avatar ? (
                                                        <img src={campaign.organizer.avatar} className="w-full h-full object-cover rounded-md" alt="Org" />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-800 rounded-md" />
                                                    )}
                                                </div>
                                                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{campaign.organizer?.name}</span>
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-primary transition-colors">{campaign.title}</h3>
                                            <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">{campaign.objective}</p>
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">Time Remaining</span>
                                                <span className="text-xs font-mono text-gray-300 mt-0.5">{daysLeft > 0 ? `${daysLeft} days` : 'Ended'}</span>
                                            </div>
                                            <div className="flex flex-col text-right">
                                                <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">Reward</span>
                                                <span className="text-xs font-bold text-yellow-500 mt-0.5">{campaign.budget ? `${(campaign.budget / 1000).toFixed(1)}k CP` : '5k CP'}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="h-6 w-6 text-gray-600" />
                        </div>
                        <h3 className="text-white font-bold mb-1">No campaigns found</h3>
                        <p className="text-gray-500 text-sm">There are no {filter} campaigns at the moment.</p>
                        <Button variant="link" onClick={() => setFilter('active')} className="mt-2 text-primary">View Active Campaigns</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Campaigns;
