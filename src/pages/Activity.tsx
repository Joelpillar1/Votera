import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Trophy, Clock, ArrowDownLeft, FileText, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data for Activities
const mockActivities = [
    {
        id: 'act-1',
        type: 'vote',
        title: 'Voted on VIP-1: Increase Campaign Fee',
        timestamp: '2 hours ago',
        value: '-100 CP',
        description: 'Burned CP to cast 100 votes in favor.',
        status: 'completed',
        hash: '0x123...abc'
    },
    {
        id: 'act-2',
        type: 'earn',
        title: 'Campaign Reward: DeFi Education',
        timestamp: '1 day ago',
        value: '+500 CP',
        description: 'Completed "Module 3: Liquidity Pools" task.',
        status: 'completed',
        hash: '0x456...def'
    },
    {
        id: 'act-3',
        type: 'submission',
        title: 'Submitted Task: Write Documentation',
        timestamp: '2 days ago',
        value: 'Pending',
        description: 'Waiting for organizer validation.',
        status: 'pending',
        hash: '0x789...ghi'
    },
    {
        id: 'act-4',
        type: 'reputation',
        title: 'Reputation Update: Cycle 12',
        timestamp: '1 week ago',
        value: '+50 RP',
        description: 'Consistency bonus awarded for 5 active weeks.',
        status: 'completed',
        hash: '0xabc...123'
    },
    {
        id: 'act-5',
        type: 'vote',
        title: 'Voted on VIP-2: Hackathon Category',
        timestamp: '1 week ago',
        value: '-250 CP',
        description: 'Burned CP to cast 250 votes in favor.',
        status: 'completed',
        hash: '0xdef...456'
    }
];

const Activity: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'votes' | 'earnings' | 'tasks'>('all');

    const filteredActivities = mockActivities.filter(item => {
        if (filter === 'all') return true;
        if (filter === 'votes' && item.type === 'vote') return true;
        if (filter === 'earnings' && (item.type === 'earn' || item.type === 'reputation')) return true;
        if (filter === 'tasks' && item.type === 'submission') return true;
        return false;
    });

    const getIcon = (type: string) => {
        switch (type) {
            case 'vote': return <Flame className="h-5 w-5 text-orange-500" />;
            case 'earn': return <ArrowDownLeft className="h-5 w-5 text-green-400" />;
            case 'reputation': return <Trophy className="h-5 w-5 text-yellow-500" />;
            case 'submission': return <FileText className="h-5 w-5 text-blue-400" />;
            default: return <Clock className="h-5 w-5 text-gray-500" />;
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display text-white">Activity Log</h1>
                    <p className="text-muted-foreground mt-1">Your on-chain footprint within the Voterax protocol.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 border-b border-white/10 pb-4 overflow-x-auto">
                {[
                    { id: 'all', label: 'All Events' },
                    { id: 'votes', label: 'Combustion Votes' },
                    { id: 'earnings', label: 'Rewards & RP' },
                    { id: 'tasks', label: 'Task Submissions' }
                ].map((f) => (
                    <button
                        key={f.id}
                        onClick={() => setFilter(f.id as any)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${filter === f.id
                                ? 'bg-white text-black'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Timeline List */}
            <div className="space-y-4 relative">
                {/* Vertical Line for timeline */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>

                {filteredActivities.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <div className="relative pl-0 md:pl-20">
                            {/* Timestamp Marker (Desktop) */}
                            <div className="hidden md:flex absolute left-0 top-6 w-16 text-xs text-gray-500 justify-end">
                                {item.timestamp.split(' ')[0]} {item.timestamp.split(' ')[1]}
                            </div>

                            {/* Dot on Line (Desktop) */}
                            <div className="hidden md:block absolute left-[30px] top-6 h-3 w-3 rounded-full bg-[#0A0A0A] border-2 border-white/20 z-10 translate-x-[-50%]"></div>

                            <Card className="group hover:bg-white/5 transition-colors border-white/10">
                                <CardContent className="p-5 flex items-start gap-4">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-white/5 border border-white/10 ${item.type === 'vote' ? 'group-hover:border-orange-500/50 group-hover:bg-orange-500/10' :
                                            item.type === 'earn' ? 'group-hover:border-green-500/50 group-hover:bg-green-500/10' :
                                                'group-hover:border-blue-500/50 group-hover:bg-blue-500/10'
                                        }`}>
                                        {getIcon(item.type)}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-white text-base">{item.title}</h3>
                                            <div className={`text-sm font-mono font-bold ${item.value.startsWith('+') ? 'text-green-400' :
                                                    item.value.startsWith('-') ? 'text-orange-400' : 'text-gray-400'
                                                }`}>
                                                {item.value}
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-400 mt-1">{item.description}</p>

                                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 font-mono">
                                            <span className="md:hidden">{item.timestamp}</span>
                                            <span className="flex items-center gap-1">
                                                TX: <span className="text-indigo-400 hover:underline cursor-pointer">{item.hash}</span>
                                            </span>
                                            <span className={`flex items-center gap-1 uppercase ${item.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                                                }`}>
                                                {item.status === 'completed' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Activity;
