import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Activity, Clock, Trophy, Target, ShieldCheck, GitCommit, FileCode, Hash, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockUsers, mockContributions, mockCampaigns, mockTasks } from '@/data/mockData';

interface ProfileProps {
    onNavigate: (page: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
    // Mocking the logged-in user as User ID 1 (Alice Contributor)
    const user = mockUsers[0];

    // Derived stats
    const userContributions = mockContributions.filter(c => c.user_id === user.id);
    const approvedContributions = userContributions.filter(c => c.status === 'approved');
    const totalEarnings = approvedContributions.reduce((acc, curr) => {
        const task = mockTasks.find(t => t.id === curr.task_id);
        return acc + (task ? task.CP_value : 0);
    }, 0);

    const recentActivity = [
        { id: 1, type: 'EARN', amount: 150, source: 'Task: Playground Equipment', date: '2h ago', icon: Target },
        { id: 2, type: 'EARN', amount: 100, source: 'Task: Park Layout Sketch', date: '1d ago', icon: FileCode },
        { id: 3, type: 'BURN', amount: -650, source: 'Vote: Community Park Layout', date: '3d ago', icon: Flame },
        { id: 4, type: 'EARN', amount: 50, source: 'Task: Community Survey', date: '5d ago', icon: Hash },
    ];

    // Helper component for icon import (Flame wasn't imported initially)
    function Flame(props: any) {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-2.24-4.286-4-6 2.048 1.024 3.796 3.037 5 5 2.002-3.004 4.024-5.024 6-6-2.002 3.004-3.5 6-3.5 8.5a6 6 0 1 1-11-2.5c1.096 1.096 2.5 2.5 4 2.5z" />
            </svg>
        )
    }

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Header / Identity Card */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#111] to-black border border-white/5 p-8 md:p-12">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Avatar */}
                    <div className="relative group">
                        <div className="h-32 w-32 rounded-full p-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                            <div className="h-full w-full rounded-full bg-black border-4 border-black flex items-center justify-center overflow-hidden">
                                <span className="text-4xl font-bold font-display text-white">{user.name.charAt(0)}</span>
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-black rounded-full p-1.5 border border-white/10">
                            <ShieldCheck className="h-6 w-6 text-green-400 fill-green-400/20" />
                        </div>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
                            <h1 className="text-4xl font-bold font-display text-white">{user.name}</h1>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-gray-400">
                                {user.role}
                            </span>
                        </div>
                        <p className="text-gray-400 max-w-lg mb-6 flex items-center justify-center md:justify-start gap-2">
                            <Hash className="h-4 w-4 opacity-50" />
                            <span className="font-mono text-sm">0x71C...9A23</span>
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                                <Trophy className="h-5 w-5 text-indigo-400" />
                                <div>
                                    <div className="text-2xl font-bold text-white leading-none">{user.RP_balance}</div>
                                    <div className="text-[10px] uppercase tracking-widest text-indigo-300/70 font-bold mt-1">Reputation Score</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10">
                                <Target className="h-5 w-5 text-gray-400" />
                                <div>
                                    <div className="text-2xl font-bold text-white leading-none">{userContributions.length}</div>
                                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mt-1">Total Contributions</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-right hidden md:block">
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 gap-2" onClick={() => onNavigate('dashboard')}>
                            Return to Dashboard <ArrowUpRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Ledger / History */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white font-display">Reputation Ledger</h2>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">View Full History</Button>
                    </div>

                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group relative overflow-hidden rounded-xl bg-[#0c0c0c] border border-white/5 p-4 hover:border-white/10 transition-all"
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="flex items-center gap-4">
                                    <div className={`h-12 w-12 rounded-full flex items-center justify-center border ${activity.type === 'EARN'
                                            ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                            : 'bg-red-500/10 border-red-500/20 text-red-400'
                                        }`}>
                                        <activity.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-gray-200">{activity.source}</h4>
                                            <span className={`font-mono font-bold ${activity.type === 'EARN' ? 'text-green-400' : 'text-red-400'}`}>
                                                {activity.amount > 0 ? '+' : ''}{activity.amount} RP
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center mt-1">
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                {activity.type === 'EARN' ? 'Contribution Validated' : 'Voting Power Burned'}
                                            </span>
                                            <span className="text-xs text-gray-600 flex items-center gap-1">
                                                <Clock className="h-3 w-3" /> {activity.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Active Submissions / Status */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-white font-display">Recent Submissions</h2>
                    <Card className="bg-[#0c0c0c] border-white/5">
                        <CardContent className="p-0">
                            {userContributions.length > 0 ? (
                                <div className="divide-y divide-white/5">
                                    {userContributions.slice(0, 3).map((contrib) => {
                                        const taskKey = mockTasks.find(t => t.id === contrib.task_id);
                                        return (
                                            <div key={contrib.id} className="p-5 hover:bg-white/[0.02] transition-colors">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${contrib.status === 'approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                            contrib.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                                'bg-red-500/10 text-red-400 border-red-500/20'
                                                        }`}>
                                                        {contrib.status}
                                                    </span>
                                                    <span className="text-xs text-gray-500">{new Date(contrib.timestamp).toLocaleDateString()}</span>
                                                </div>
                                                <h4 className="font-medium text-gray-300 text-sm mb-3">
                                                    {taskKey?.description || 'Unknown Task'}
                                                </h4>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <FileCode className="h-3 w-3" />
                                                    <span className="truncate max-w-[150px]">{contrib.submission_proof}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    No active submissions found.
                                </div>
                            )}
                            <div className="p-4 border-t border-white/5">
                                <Button variant="ghost" className="w-full text-xs uppercase tracking-widest text-muted-foreground hover:text-white">
                                    View Repository
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Skill / Tag Cloud (Visual filler for now) */}
                    <div className="p-6 rounded-2xl border border-white/5 bg-[#0c0c0c]">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Verified Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Governance', 'Solidity', 'Design', 'Community Mgmt', 'Strategy'].map(skill => (
                                <span key={skill} className="px-3 py-1 rounded bg-white/5 border border-white/5 text-xs text-gray-400">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
