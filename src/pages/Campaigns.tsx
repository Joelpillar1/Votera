import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockCampaigns } from '@/data/mockData';
import { Campaign, CampaignStatus } from '@/types';
import { Search, Filter, Calendar, Users, Trophy, ChevronRight, Clock, Target, Verified, CheckCircle2, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface CampaignsProps {
    onNavigate: (page: string, data?: any) => void;
}

const Campaigns: React.FC<CampaignsProps> = ({ onNavigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'voting' | 'completed'>('all');

    const filteredCampaigns = mockCampaigns.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.objective.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || c.status.toLowerCase() === filter.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    // Curated images for specific campaigns to ensure they "resonate"
    const getCampaignImage = (id: number, customImage?: string) => {
        if (customImage) return customImage;
        const images: Record<number, string> = {
            1: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=800&auto=format&fit=crop', // Architecture/Modern (Park)
            2: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&auto=format&fit=crop', // Giving/Hands (Charity)
            3: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop', // Tech/Cyber (Open Source)
            4: 'https://images.unsplash.com/photo-1626785774573-4b7993143a23?q=80&w=800&auto=format&fit=crop', // Creative/Art (Mascot)
        };
        // Fallback for others
        return images[id] || `https://images.unsplash.com/photo-${1639762681485 + id}-074b7f938ba0?q=80&w=800&auto=format&fit=crop`;
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display text-white">Campaign Registry</h1>
                    <p className="text-muted-foreground mt-1">Discover opportunities to contribute and earn reputation.</p>
                </div>
                <Button onClick={() => onNavigate('create-campaign')} className="shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                    Create New Campaign
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search campaigns..."
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    {(['all', 'active', 'voting', 'completed'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f
                                ? 'bg-white text-black'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Campaign Grid - REDESIGNED */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.length > 0 ? (
                    filteredCampaigns.map((campaign, i) => (
                        <motion.div
                            key={campaign.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Card
                                className="group relative overflow-hidden text-left border-white/5 hover:border-primary/30 transition-all cursor-pointer bg-[#0c0c0c] hover:bg-[#111] h-[320px] flex flex-col"
                                onClick={() => onNavigate('campaign-details', campaign)}
                            >
                                {/* Top Banner Image */}
                                <div className="h-28 w-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] to-transparent z-10" />
                                    <img
                                        src={getCampaignImage(campaign.id, campaign.coverImage)}
                                        alt="Campaign Cover"
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                                    />
                                    {/* Status Badge - Top Right */}
                                    <div className="absolute top-3 right-3 z-20">
                                        <div className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest backdrop-blur-md border ${campaign.status === CampaignStatus.ACTIVE ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            campaign.status === CampaignStatus.VOTING ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                            }`}>
                                            {campaign.status}
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="flex-1 p-5 pt-2 relative">
                                    {/* Project Avatar (Overlapping) */}
                                    <div className="absolute -top-8 left-5 h-14 w-14 rounded-xl bg-[#111] border-4 border-[#0c0c0c] flex items-center justify-center shadow-lg group-hover:border-[#111] transition-colors overflow-hidden">
                                        {/* Fallback Avatar logic - usually this would be a logo */}
                                        <div className="h-full w-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-lg font-bold text-white">
                                            {campaign.title.charAt(0)}
                                        </div>
                                    </div>

                                    {/* Content Header */}
                                    <div className="pl-16 mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <h3 className="font-bold text-base text-white truncate leading-tight group-hover:text-primary transition-colors">
                                                {campaign.title}
                                            </h3>
                                            {campaign.verified && (
                                                <BadgeCheck className="h-4 w-4 text-white fill-blue-500 shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {campaign.verified ? 'Voterax Verified' : 'Community Campaign'}
                                        </p>
                                    </div>

                                    {/* Description Body */}
                                    <p className="text-sm text-gray-400 line-clamp-2 mb-6 h-10 leading-relaxed">
                                        {campaign.objective}
                                    </p>

                                    {/* Footer Metrics - Clean Grid */}
                                    <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                        <div>
                                            <div className="flex items-center gap-1.5 text-green-400 mb-0.5">
                                                <Target className="h-3 w-3" />
                                                <span className="text-xs font-bold">Active Tasks</span>
                                            </div>
                                            <div className="text-xs text-gray-500">8 Opportunities</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center justify-end gap-1.5 text-primary mb-0.5">
                                                <Trophy className="h-3 w-3" />
                                                <span className="text-xs font-bold">{(campaign.budget || 5000).toLocaleString()} CP</span>
                                            </div>
                                            <div className="text-xs text-gray-500">Bounty Pool</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                        <Trophy className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No campaigns found</h3>
                        <p className="text-gray-400">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Campaigns;
