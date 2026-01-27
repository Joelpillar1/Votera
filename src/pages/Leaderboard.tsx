import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockUsers } from '@/data/mockData';
import { User, UserRole } from '@/types';
import { Trophy, Medal, Crown, Star, UserCircle, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Leaderboard: React.FC = () => {
    const [timeframe, setTimeframe] = useState<'all-time' | 'monthly' | 'weekly'>('all-time');
    const [category, setCategory] = useState<'all' | 'dev' | 'design' | 'gov'>('all');

    // Simulate different rankings based on category (shuffling mock data slightly for demo)
    const getFilteredUsers = () => {
        let users = [...mockUsers];
        if (category === 'dev') users = users.filter(u => u.role !== 'Organizer'); // Just a mock filter
        if (category === 'design') users = users.filter((_, i) => i % 2 === 0);
        return users.sort((a, b) => b.RP_balance - a.RP_balance);
    };

    const sortedUsers = getFilteredUsers();
    const topUsers = sortedUsers.slice(0, 3);
    const otherUsers = sortedUsers.slice(3);

    const getRankIcon = (index: number) => {
        switch (index) {
            case 0: return <Crown className="h-6 w-6 text-yellow-500 fill-yellow-500/20" />;
            case 1: return <Medal className="h-6 w-6 text-slate-300 fill-slate-300/20" />;
            case 2: return <Medal className="h-6 w-6 text-amber-700 fill-amber-700/20" />;
            default: return <span className="font-mono text-muted-foreground w-6 text-center">{index + 1}</span>;
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="text-4xl font-bold font-display text-white mb-2 flex items-center gap-3">
                        <Trophy className="h-8 w-8 text-primary" /> Global Leaderboard
                    </h1>
                    <p className="text-muted-foreground max-w-lg">
                        Recognizing the most impactful contributors across the ecosystem. Reputation is mathematically proven, not bought.
                    </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                    {/* Timeframe Toggles */}
                    <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
                        {(['weekly', 'monthly', 'all-time'] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTimeframe(t)}
                                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${timeframe === t
                                    ? 'bg-white/10 text-white border border-white/10 shadow-sm'
                                    : 'text-muted-foreground hover:text-white'
                                    }`}
                            >
                                {t.replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="border-b border-white/10 flex gap-6">
                {[
                    { id: 'all', label: 'All Contributors' },
                    { id: 'dev', label: 'Developers' },
                    { id: 'design', label: 'Designers' },
                    { id: 'gov', label: 'Governance' }
                ].map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setCategory(cat.id as any)}
                        className={`pb-4 text-sm font-medium transition-colors relative ${category === cat.id ? 'text-white' : 'text-muted-foreground hover:text-white'
                            }`}
                    >
                        {cat.label}
                        {category === cat.id && (
                            <motion.div layoutId="activeCat" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary" />
                        )}
                    </button>
                ))}
            </div>

            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-12 pt-8">
                {[topUsers[1], topUsers[0], topUsers[2]].map((user, i) => {
                    if (!user) return null;
                    const rank = user === topUsers[0] ? 1 : user === topUsers[1] ? 2 : 3;
                    const height = rank === 1 ? 'h-72' : rank === 2 ? 'h-60' : 'h-52';
                    const gradient = rank === 1 ? 'from-yellow-500/20' : rank === 2 ? 'from-slate-500/20' : 'from-amber-700/20';
                    const border = rank === 1 ? 'border-yellow-500/30' : 'border-white/10';

                    return (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative flex flex-col justify-end ${rank === 1 ? 'order-2' : rank === 2 ? 'order-1' : 'order-3'}`}
                        >
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent z-0" />
                            <div className={`glass-panel border-t-4 ${border} flex flex-col items-center justify-center p-6 ${height} relative overflow-hidden group hover:border-white/20 transition-all`}>
                                <div className={`absolute inset-0 bg-gradient-to-t ${gradient} to-transparent opacity-30 group-hover:opacity-50 transition-opacity`}></div>

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="mb-6 transform group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                                        {getRankIcon(rank - 1)}
                                    </div>
                                    <div className="h-20 w-20 rounded-full bg-black/50 border-2 border-white/10 flex items-center justify-center mb-4 shadow-xl">
                                        <span className="text-2xl font-bold text-white">{user.name.charAt(0)}</span>
                                    </div>
                                    <div className="text-xl font-bold text-white text-center line-clamp-1">{user.name}</div>
                                    <div className="text-sm text-primary font-mono font-bold mt-1">{user.RP_balance.toLocaleString()} RP</div>
                                    <div className="mt-3 text-xs text-green-400 bg-green-950/30 px-2 py-0.5 rounded border border-green-500/20">
                                        Top 1%
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* List View */}
            <Card className="glass-panel border-white/10 bg-[#0c0c0c]">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Rankings</CardTitle>
                        <span className="text-xs text-muted-foreground uppercase tracking-widest">Global • {timeframe}</span>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-white/5">
                        {otherUsers.map((user, i) => (
                            <motion.div
                                key={user.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (i * 0.05) }}
                                className="flex items-center justify-between p-4 px-6 hover:bg-white/[0.03] transition-colors cursor-pointer group"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="font-mono text-muted-foreground w-8 text-center text-lg">{i + 4}</div>
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/5 flex items-center justify-center text-white font-bold text-sm">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-medium text-white group-hover:text-primary transition-colors">{user.name}</div>
                                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                                            <span>{user.role}</span>
                                            <span className="h-1 w-1 rounded-full bg-gray-600"></span>
                                            <span className="text-green-500">+{Math.floor(Math.random() * 50)} RP this week</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-white font-mono text-lg">{user.RP_balance.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Reputation</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Leaderboard;
