import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Award, Zap, Users, TrendingUp, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockCampaigns } from '@/data/mockData';
import { CampaignStatus } from '@/types';

interface DashboardProps {
    onNavigate: (page: string, data?: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    const stats = [
        { title: 'Governance Power', value: '450 RP', icon: Award, trend: '+12%', color: 'text-primary' },
        { title: 'Contribution Points', value: '1,250 CP', icon: Zap, trend: '+5%', color: 'text-yellow-400' },
        { title: 'Active Votes', value: '3', icon: Users, trend: 'Active', color: 'text-green-400' },
    ];

    const activeCampaigns = mockCampaigns.slice(0, 3); // Just take first 3 for dashboard

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-2 relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-background border-primary/20">
                    <div className="absolute -right-20 -top-20 h-64 w-64 bg-primary/30 rounded-full blur-3xl rounded-full"></div>
                    <CardHeader>
                        <CardTitle className="text-4xl text-white tracking-tight cursor-pointer hover:text-primary transition-colors" onClick={() => onNavigate('profile')}>
                            Welcome back, Architect.
                        </CardTitle>
                        <CardDescription className="text-lg text-muted-foreground mt-2">
                            The collective has proposed {mockCampaigns.length} new campaigns requiring your immediate attention.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-8 flex gap-4">
                        <Button size="lg" className="gap-2 bg-white text-black hover:bg-white/90" onClick={() => onNavigate('campaigns')}>
                            Review Proposals <ArrowUpRight className="h-4 w-4" />
                        </Button>
                        <Button size="lg" variant="outline" className="gap-2 border-white/20 text-white hover:bg-white/10" onClick={() => onNavigate('create-campaign')}>
                            Create Campaign <Plus className="h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>

                <Card className="col-span-1 bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ActivityIcon /> Network Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between py-2 border-b border-white/5">
                            <span className="text-sm text-muted-foreground">Block Height</span>
                            <span className="font-mono text-primary">#14,205,102</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-white/5">
                            <span className="text-sm text-muted-foreground">Active Members</span>
                            <span className="font-mono text-white">4,201</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-muted-foreground">Cycle Ends</span>
                            <span className="font-mono text-white">2d 14h</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bento Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                    >
                        <Card className="hover:scale-[1.02] transition-transform duration-200">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-base font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold font-display text-white">{stat.value}</div>
                                <p className={`text-xs mt-1 ${stat.color} flex items-center gap-1`}>
                                    <TrendingUp className="h-3 w-3" /> {stat.trend} from last cycle
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Recent Campaigns List (Mock Bento Row) */}
            <div className="grid grid-cols-1 gap-6">
                <h2 className="text-2xl font-bold tracking-tight text-white mb-4">Active Campaigns</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeCampaigns.map((campaign) => (
                        <Card key={campaign.id} className="group relative overflow-hidden flex flex-col h-full border-white/10 hover:border-primary/50 transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none"></div>
                            {/* Placeholder Image generated deterministically based on ID */}
                            <div
                                className="h-48 bg-muted w-full object-cover bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url('https://images.unsplash.com/photo-${1639762681485 + campaign.id}-074b7f938ba0?q=80&w=800&auto=format&fit=crop')` }}
                            ></div>

                            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-md uppercase ${campaign.status === CampaignStatus.VOTING ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20' :
                                        campaign.status === CampaignStatus.ACTIVE ? 'bg-primary/20 text-primary border-primary/20' :
                                            'bg-white/10 text-white border-white/10'
                                        }`}>
                                        {campaign.status}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{campaign.title}</h3>
                                <p className="text-sm text-gray-300 line-clamp-2 mb-4">{campaign.objective}</p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full border-white/20 text-white hover:bg-white hover:text-black hover:border-white"
                                    onClick={() => onNavigate('campaign-details', campaign)}
                                >
                                    View Details
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ActivityIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400">
        <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export default Dashboard;
