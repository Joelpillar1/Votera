import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Award, Zap, Users, TrendingUp, Plus, Clock, Bell, CheckCircle2, AlertCircle, Wallet, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockCampaigns, mockTasks } from '@/data/mockData';
import { CampaignStatus } from '@/types';

interface DashboardProps {
    onNavigate: (page: string, data?: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    // Mock Data for new sections
    const notifications = [
        { id: 1, title: 'Proposal Passed', message: 'Uniswap V4 Hookathon proposal has passed quorum.', time: '2h ago', type: 'success' },
        { id: 2, title: 'New Task Available', message: 'Design task added to "Optimism RPG"', time: '4h ago', type: 'info' },
        { id: 3, title: 'Voting Ending Soon', message: 'Binance Listing Vote ends in 24 hours.', time: '1d ago', type: 'warning' },
    ];

    const recentActivity = [
        { id: 1, action: 'Voted', target: 'Arbitrum DAO Constitution', reward: '+10 RP', time: 'Yesterday' },
        { id: 2, action: 'Task Approved', target: 'Submit a park layout sketch', reward: '+100 CP', time: '2 days ago' },
        { id: 3, action: 'Joined Campaign', target: 'ENS Stewardship Election', reward: '', time: '3 days ago' },
    ];

    const activeCampaigns = mockCampaigns.filter(c => c.status === CampaignStatus.ACTIVE || c.status === CampaignStatus.VOTING).slice(0, 3);
    const pendingTasks = mockTasks.slice(0, 3);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Hero Section - Welcome Back Card */}
            <div className="relative group overflow-hidden rounded-[2rem] bg-[#050505] border border-white/5 hover:border-white/10 transition-colors">
                {/* Background Gradients */}
                <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-indigo-900/40 via-[#0a0a0a]/50 to-transparent pointer-events-none"></div>
                <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="relative p-6 h-full flex flex-col justify-between z-10">
                    {/* Header Content */}
                    <div className="space-y-3 max-w-xl">
                        <div className="space-y-2">
                            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Status: Active</span>
                            <h1 className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight leading-[1.1]">
                                Welcome back, Architect.
                            </h1>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                                The collective has proposed {mockCampaigns.length} new campaigns requiring your immediate attention. Your reputation is key to governance.
                            </p>
                        </div>

                        {/* Progress Bar Segmented */}
                        <div className="space-y-2 max-w-sm pt-2">
                            <div className="flex gap-1.5">
                                {[1, 2, 3, 4, 5, 6].map((step) => (
                                    <div
                                        key={step}
                                        className={`h-1.5 flex-1 rounded-full ${step <= 2 ? 'bg-primary' : 'bg-white/10'}`}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] text-gray-500 font-mono uppercase">
                                <span>Reputation Level 2</span>
                                <span>Next: Level 3</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer / Meta */}
                    <div className="pt-4 flex items-center gap-6 mt-auto">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-3">
                                {[
                                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
                                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=faces",
                                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces"
                                ].map((src, i) => (
                                    <div key={i} className="h-8 w-8 rounded-full border-2 border-[#050505] bg-gray-800 flex items-center justify-center overflow-hidden">
                                        <img src={src} className="h-full w-full object-cover" alt="User" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white">29K</span>
                                <span className="text-[10px] text-gray-500 uppercase">Participants</span>
                            </div>
                        </div>

                        <div className="h-8 w-px bg-white/10"></div>

                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-yellow-500/20 text-yellow-500 flex items-center justify-center">
                                <Zap className="h-4 w-4 fill-current" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white">1,250</span>
                                <span className="text-[10px] text-gray-500 uppercase">CP Earned</span>
                            </div>
                        </div>

                        <Button onClick={() => onNavigate('campaigns')} size="sm" className="ml-auto rounded-full px-6 bg-white text-black hover:bg-gray-200">
                            Start Voting <ArrowUpRight className="ml-2 h-3 w-3" />
                        </Button>
                    </div>
                </div>

                {/* Right Side 3D Graphic Abstraction */}
                <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 hidden lg:block w-[400px] h-[400px] pointer-events-none">
                    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#312e81', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#1e1b4b', stopOpacity: 1 }} />
                            </linearGradient>
                            <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#3730a3', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>

                        {/* Abstract Platform */}
                        <path d="M100 160 L40 130 L40 70 L100 40 L160 70 L160 130 Z" fill="url(#grad1)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        <path d="M100 40 L160 70 L100 100 L40 70 Z" fill="rgba(255,255,255,0.05)" />

                        {/* Floating Token/Coin */}
                        <circle cx="100" cy="85" r="30" fill="#111" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                        <circle cx="100" cy="85" r="24" fill="url(#grad2)" />

                        {/* Icon on Coin */}
                        <path d="M100 75 L110 95 H90 Z" fill="white" transform="rotate(180 100 85)" opacity="0.9" />
                    </svg>
                </div>
            </div>

            {/* 1. Top Bar: RP balance | CP balance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative overflow-hidden rounded-2xl bg-[#080808] border border-white/5 p-6 flex flex-col justify-center group hover:border-indigo-500/30 transition-colors">
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Award className="h-24 w-24 text-indigo-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                            <Award className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-400">Governance Power (RP)</span>
                    </div>
                    <div className="text-4xl font-bold font-display text-white tracking-tight">450 <span className="text-lg text-gray-500">RP</span></div>
                    <div className="mt-2 text-xs text-indigo-400 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> Top 15% of contributors
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-[#080808] border border-white/5 p-6 flex flex-col justify-center group hover:border-yellow-500/30 transition-colors">
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Zap className="h-24 w-24 text-yellow-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400">
                            <Zap className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-400">Contribution Points (CP)</span>
                    </div>
                    <div className="text-4xl font-bold font-display text-white tracking-tight">1,250 <span className="text-lg text-gray-500">CP</span></div>
                    <div className="mt-2 text-xs text-yellow-400 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> +150 this week
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT COLUMN: Main Cards (2/3) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Voting Eligibility Card */}
                    <div className="rounded-2xl bg-gradient-to-r from-indigo-900/20 to-[#080808] border border-indigo-500/20 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                    Voting Eligibility Status
                                </h3>
                                <p className="text-gray-400 mt-1 text-sm max-w-md">
                                    You are currently eligible to vote in <span className="text-white font-bold">3 active campaigns</span>. Your Verified status grants you 2x voting weight.
                                </p>
                            </div>
                            <Button onClick={() => onNavigate('campaigns')} className="bg-indigo-600 hover:bg-indigo-700 text-white border-0 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                                View Ballots
                            </Button>
                        </div>
                    </div>

                    {/* Active Campaigns */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Activity className="h-5 w-5 text-primary" /> Active Campaigns
                            </h2>
                            <Button variant="ghost" size="sm" onClick={() => onNavigate('campaigns')} className="text-gray-400 hover:text-white">View All</Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activeCampaigns.map((campaign) => {
                                const daysLeft = Math.ceil((new Date(campaign.timeline.end).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

                                return (
                                    <div
                                        key={campaign.id}
                                        className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-[#080808] border border-white/5 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(79,70,229,0.1)] cursor-pointer h-[280px]"
                                        onClick={() => onNavigate('campaign-details', campaign)}
                                    >
                                        {/* Card Background */}
                                        <div className="absolute inset-0 z-0">
                                            <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#050505]"></div>
                                            <div
                                                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 bg-cover bg-center mix-blend-overlay"
                                                style={{ backgroundImage: `url('https://images.unsplash.com/photo-${1639762681485 + campaign.id}-074b7f938ba0?q=80&w=800&auto=format&fit=crop')` }}
                                            ></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
                                        </div>

                                        <div className="relative z-10 p-5 flex flex-col h-full">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="h-10 w-10 rounded-lg bg-black border border-white/10 overflow-hidden shadow-lg">
                                                    {campaign.organizer?.avatar ? (
                                                        <img src={campaign.organizer.avatar} alt="Logo" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-800 flex items-center justify-center font-bold text-white">{campaign.title.charAt(0)}</div>
                                                    )}
                                                </div>
                                                <div className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide bg-white/5 border border-white/5 text-gray-300 backdrop-blur-md flex items-center gap-1">
                                                    <Clock className="h-3 w-3" /> {daysLeft} Days
                                                </div>
                                            </div>

                                            <div className="mt-auto">
                                                <h3 className="text-lg font-bold text-white leading-tight mb-2 group-hover:text-primary transition-colors">{campaign.title}</h3>
                                                <p className="text-xs text-gray-400 line-clamp-2 mb-4">{campaign.objective}</p>

                                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                    <div className="text-xs text-gray-500">
                                                        <span className="text-white font-bold block">150+</span> Participants
                                                    </div>
                                                    <div className="text-xs text-right">
                                                        <span className="text-yellow-400 font-bold block">{campaign.budget?.toLocaleString() || '5,000'} CP</span> Bounty Pool
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Pending Tasks */}


                </div>

                {/* RIGHT COLUMN: Side Panel (1/3) */}
                <div className="lg:col-span-1 space-y-8">

                    {/* Pending Tasks (Moved to Side Panel) */}
                    <div className="rounded-2xl bg-[#080808] border border-white/5 overflow-hidden">
                        <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-400" /> Pending Tasks
                            </h3>
                            <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-gray-400">{pendingTasks.length}</span>
                        </div>
                        <div className="p-4 space-y-3">
                            {pendingTasks.map((task) => (
                                <div key={task.id} className="p-3 rounded-xl bg-[#080808] border border-white/5 flex flex-col gap-3 group hover:border-white/10 transition-colors">
                                    <div className="flex items-start gap-3">
                                        <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 shrink-0 mt-0.5 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            <AlertCircle className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-white leading-tight group-hover:text-primary transition-colors">{task.description}</h4>
                                            <span className="text-[10px] text-gray-500 mt-1 block">Campaign #{task.campaign_id}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Reward</span>
                                            <span className="text-xs font-bold text-yellow-400">{task.CP_value} CP</span>
                                        </div>
                                        <Button size="sm" variant="outline" className="h-7 text-xs border-white/10 hover:bg-white/5 text-gray-300">
                                            Start Task
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity Panel */}
                    <div className="rounded-2xl bg-[#080808] border border-white/5 overflow-hidden">
                        <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Activity className="h-4 w-4 text-gray-400" /> Recent Activity
                            </h3>
                        </div>
                        <div className="p-4 space-y-6">
                            {recentActivity.map((activity, i) => (
                                <div key={activity.id} className="relative pl-6 pb-2 border-l border-white/10 last:pb-0 last:border-0">
                                    <div className="absolute left-[-5px] top-0 h-2.5 w-2.5 rounded-full bg-gray-800 border border-gray-600"></div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 mb-0.5">{activity.time}</span>
                                        <span className="text-sm font-medium text-white">
                                            {activity.action} <span className="text-gray-400">on</span> {activity.target}
                                        </span>
                                        {activity.reward && (
                                            <span className="text-xs font-bold text-green-400 mt-1">{activity.reward}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
