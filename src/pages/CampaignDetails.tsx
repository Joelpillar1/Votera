import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Campaign, Task, CampaignStatus } from '@/types';
import { mockTasks } from '@/data/mockData';
import { Calendar, CheckCircle2, CircleDashed, ArrowLeft, Send, Vote, Clock, Award, ShieldCheck, AlertCircle, FileText, ChevronRight, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CombustionVoting from '@/components/CombustionVoting';
import { CPTooltip, RPTooltip, QuadraticFundingTooltip } from '@/components/ui/tooltip-term';
import { PointBadge } from '@/components/ui/point-badge';

interface CampaignDetailsProps {
    campaign: Campaign;
    onBack: () => void;
    onResults?: () => void;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({ campaign, onBack, onResults }) => {
    const availableTasks = mockTasks.filter(t => t.campaign_id === campaign.id);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [submissionProof, setSubmissionProof] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success'>('idle');
    const [isJoined, setIsJoined] = useState(false); // Mock joint status
    const [activeTab, setActiveTab] = useState<'tasks' | 'timeline'>('tasks');

    // Mock user points (in real app, get from context/props)
    const userRP = 450;
    const minRP = 10;
    const hasEnoughRP = userRP >= minRP;

    // Calculate days remaining
    const daysLeft = Math.ceil((new Date(campaign.timeline.end).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    const isExpired = daysLeft < 0;

    const [voteSuccess, setVoteSuccess] = useState<{ show: boolean; amount: number }>({ show: false, amount: 0 });

    const handleOpenSubmission = (task: Task) => {
        setSelectedTask(task);
        setSubmissionProof('');
        setSubmissionStatus('idle');
    };

    const handleSubmitWork = () => {
        if (!selectedTask) return;
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmissionStatus('success');
        }, 1000);
    };

    const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-2">
            <Icon className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold font-display text-white">{title}</h2>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-24 animate-in fade-in duration-500">
            {/* Navigation */}
            <Button variant="ghost" className="pl-0 hover:pl-2 transition-all gap-2 text-muted-foreground hover:text-white mb-2" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" /> Back to Registry
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-12">

                    {/* 1. Overview Section */}
                    <section>
                        <div className="flex flex-col gap-4 mb-8">
                            <div className="flex items-start justify-between">
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${campaign.status === CampaignStatus.ACTIVE ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                    campaign.status === CampaignStatus.VOTING ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                        'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                    }`}>
                                    {campaign.status === CampaignStatus.ACTIVE ? 'Contribution Phase' :
                                        campaign.status === CampaignStatus.VOTING ? 'Voting Phase' : 'Ended'}
                                </div>
                                <span className="text-xs font-mono text-gray-500">ID: #{campaign.id}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold font-display text-white leading-tight">{campaign.title}</h1>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm text-gray-300 font-mono">{campaign.timeline.start} — {campaign.timeline.end}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                    <Award className="h-4 w-4 text-yellow-500" />
                                    <span className="text-sm text-yellow-100 font-bold">
                                        {campaign.budget ? `${campaign.budget.toLocaleString()}` : '5,000'} <CPTooltip>CP</CPTooltip> Pool
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5">
                            <p className="text-lg text-gray-300 leading-relaxed indent-0 first-letter:text-3xl first-letter:font-bold first-letter:text-white first-letter:mr-1">
                                {campaign.objective}
                            </p>
                            <p className="mt-4 text-gray-400 leading-relaxed">
                                This initiative seeks to empower contributors by validating meaningful work through a decentralized consensus mechanism. Your participation directly impacts the ecosystem's growth and governance.
                            </p>
                        </div>

                        {/* Error State: Insufficient RP */}
                        {!hasEnoughRP && campaign.status === CampaignStatus.ACTIVE && (
                            <Alert variant="warning" className="mt-6">
                                <AlertTitle>Insufficient Reputation</AlertTitle>
                                <AlertDescription>
                                    You need at least {minRP} <RPTooltip>RP</RPTooltip> to join this campaign.
                                    You currently have {userRP} RP. Participate in other campaigns to build your reputation.
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Error State: Campaign Expired */}
                        {isExpired && (
                            <Alert variant="error" className="mt-6">
                                <AlertTitle>Campaign Ended</AlertTitle>
                                <AlertDescription>
                                    This campaign ended {Math.abs(daysLeft)} days ago. You can no longer submit contributions.
                                </AlertDescription>
                            </Alert>
                        )}
                    </section>

                    {/* Navigation Tabs */}
                    <div className="flex border-b border-white/10 mb-8">
                        <button
                            onClick={() => setActiveTab('tasks')}
                            className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'tasks'
                                ? 'border-primary text-white'
                                : 'border-transparent text-gray-500 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                Tasks & Bounties
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('timeline')}
                            className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'timeline'
                                ? 'border-primary text-white'
                                : 'border-transparent text-gray-500 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Timeline
                            </div>
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[400px]">
                        {activeTab === 'timeline' ? (
                            <section className="animate-in slide-in-from-left-4 duration-300 fade-in">
                                <div className="relative pt-2 pb-8 pl-4">
                                    {/* Vertical Line */}
                                    <div className="absolute left-[16px] top-3 bottom-0 w-px bg-white/10"></div>

                                    {/* Step 1: Start (Green Ring) */}
                                    <div className="relative pl-12 mb-12 group">
                                        <div className="absolute left-0 top-1 h-8 w-8 flex items-center justify-center z-10">
                                            <div className="h-4 w-4 rounded-full bg-[#0a0a0a] border-2 border-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]"></div>
                                        </div>
                                        <h3 className="text-white font-bold text-lg mb-1 group-hover:text-green-400 transition-colors">Campaign Launch</h3>
                                        <p className="text-sm text-green-500/80 font-mono mb-2">{campaign.timeline.start}</p>
                                        <p className="text-gray-400 leading-relaxed max-w-lg">
                                            The campaign objective is defined and the initial bounty pool is seeded. The contribution phase officially opens for all verified participants.
                                        </p>
                                    </div>

                                    {/* Step 2: Contribution Deadline (Blue Ring) */}
                                    <div className="relative pl-12 mb-12 group">
                                        <div className="absolute left-0 top-1 h-8 w-8 flex items-center justify-center z-10">
                                            <div className={`h-4 w-4 rounded-full bg-[#0a0a0a] border-2 ${campaign.status === CampaignStatus.ACTIVE ? 'border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]' : 'border-gray-700'}`}></div>
                                        </div>
                                        <h3 className={`font-bold text-lg mb-1 ${campaign.status === CampaignStatus.ACTIVE ? 'text-blue-400' : 'text-gray-400'}`}>Contribution Period Ends</h3>
                                        <p className="text-sm text-gray-500 font-mono mb-2">Approaching Deadline</p>
                                        <p className="text-gray-400 leading-relaxed max-w-lg">
                                            All tasks must be submitted and validated. No further submissions will be accepted after this point as the protocol prepares for the governance vote.
                                        </p>
                                    </div>

                                    {/* Step 3: Voting (Gray/Purple Ring) */}
                                    <div className="relative pl-12 group">
                                        <div className="absolute left-0 top-1 h-8 w-8 flex items-center justify-center z-10">
                                            <div className={`h-4 w-4 rounded-full bg-[#0a0a0a] border-2 ${campaign.status === CampaignStatus.VOTING ? 'border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]' : 'border-white/20'}`}></div>
                                        </div>
                                        <h3 className={`font-bold text-lg mb-1 ${campaign.status === CampaignStatus.VOTING ? 'text-purple-400' : 'text-gray-400'}`}>Governance Vote</h3>
                                        <p className="text-sm text-gray-500 font-mono mb-2">{campaign.timeline.end}</p>
                                        <p className="text-gray-400 leading-relaxed max-w-lg">
                                            The community votes on the impact and distribution of the bounty pool using Quadratic Funding. Points are distributed based on consensus.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        ) : (
                            <section className="animate-in slide-in-from-right-4 duration-300 fade-in">
                                <div className="grid gap-4">
                                    {availableTasks.length > 0 ? availableTasks.map((task) => (
                                        <div key={task.id} className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-xl bg-[#0a0a0a] border border-white/5 hover:border-primary/30 transition-all hover:shadow-lg gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white group-hover:text-primary transition-colors">{task.description}</h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400 font-mono">Open</span>
                                                        <span className="text-xs text-gray-500">Requires verification</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                                <div className="text-right">
                                                    <span className="block text-[10px] uppercase text-gray-500 font-bold tracking-wider">Bounty</span>
                                                    <span className="block text-lg font-bold text-yellow-400">{task.CP_value} CP</span>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-white/10 hover:bg-white/5 hover:text-white hover:border-white/20"
                                                    onClick={() => handleOpenSubmission(task)}
                                                >
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-white/5">
                                            <p className="text-gray-400">No specific tasks listed. Check back later.</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    {/* Organizer Card */}
                    <Card className="bg-[#0a0a0a] border-white/5">
                        <CardContent className="p-6">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Organizer</h3>
                            <div className="flex items-center gap-4 mb-4">
                                {campaign.organizer?.avatar ? (
                                    <img src={campaign.organizer.avatar} alt={campaign.organizer.name} className="h-16 w-16 rounded-2xl object-cover border border-white/10" />
                                ) : (
                                    <div className="h-16 w-16 rounded-2xl bg-gray-800 flex items-center justify-center text-2xl font-bold text-white">
                                        {campaign.title.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <div className="text-lg font-bold text-white">{campaign.organizer?.name || 'Community'}</div>
                                    <div className="flex items-center gap-1 text-green-400 text-xs font-medium">
                                        <ShieldCheck className="h-3 w-3" /> Verified Organizer
                                    </div>
                                </div>
                            </div>
                            <Button className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white">
                                View Profile
                            </Button>
                        </CardContent>
                    </Card>

                    {/* 4. Rules Section */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5">
                            <div className="flex items-center gap-2 mb-4">
                                <AlertCircle className="h-4 w-4 text-blue-400" />
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Participation Rules</h3>
                            </div>
                            <ul className="space-y-3">
                                {['Must hold a minimum of 10 Reputation Points (RP).', 'Submissions must be original work.', 'Multiple submissions allowed per user.', 'Github verification required for code tasks.'].map((rule, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                        <span className="block h-1.5 w-1.5 mt-1.5 rounded-full bg-blue-500/50 shrink-0"></span>
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 5. Voting Rules */}
                        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5">
                            <div className="flex items-center gap-2 mb-4">
                                <Vote className="h-4 w-4 text-purple-400" />
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Voting Mechanics</h3>
                            </div>
                            <p className="text-sm text-gray-400 mb-4">
                                This campaign uses <QuadraticFundingTooltip><strong>Quadratic Funding</strong></QuadraticFundingTooltip>. Your vote cost increases exponentially, ensuring fair distribution.
                            </p>
                            <div className="bg-white/5 p-3 rounded-lg flex justify-between items-center text-sm">
                                <span className="text-gray-400">1 Vote</span>
                                <span className="text-white font-mono">1 <CPTooltip>CP</CPTooltip></span>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg flex justify-between items-center text-sm mt-2">
                                <span className="text-gray-400">10 Votes</span>
                                <span className="text-white font-mono">100 <CPTooltip>CP</CPTooltip></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Voting Component (Only show if Voting Phase) */}
            {campaign.status === CampaignStatus.VOTING && (
                <section id="voting-section" className="mt-12 pt-12 border-t border-white/5">
                    <SectionHeader icon={Vote} title="Cast Your Vote" />
                    <CombustionVoting
                        campaignId={campaign.id}
                        userCP={1250}
                        userRP={450}
                        onVote={(amount) => {
                            setVoteSuccess({ show: true, amount });
                        }}
                    />
                </section>
            )}

            {/* 6. Sticky CTA Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-[#050505]/90 backdrop-blur-xl z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="hidden md:flex flex-col">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Current Phase</span>
                        <span className="text-white font-medium">{campaign.status === CampaignStatus.ACTIVE ? 'Contribution Open' : 'Voting in Progress'}</span>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        {campaign.status === CampaignStatus.ACTIVE ? (
                            <>
                                {!isJoined ? (
                                    <Button onClick={() => setIsJoined(true)} className="flex-1 md:flex-none h-12 px-8 text-base bg-white text-black hover:bg-gray-200 font-bold">
                                        Join Campaign
                                    </Button>
                                ) : (
                                    <Button
                                        className="flex-1 md:flex-none h-12 px-8 text-base bg-primary hover:bg-primary/90 text-white font-bold"
                                        onClick={() => document.querySelector('section:nth-of-type(3)')?.scrollIntoView({ behavior: 'smooth' })} // Scroll to tasks
                                    >
                                        Submit Task
                                    </Button>
                                )}
                            </>
                        ) : campaign.status === CampaignStatus.VOTING ? (
                            <Button
                                className="flex-1 md:flex-none h-12 px-8 text-base bg-purple-600 hover:bg-purple-700 text-white font-bold animate-pulse"
                                onClick={() => document.getElementById('voting-section')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Start Voting
                            </Button>
                        ) : (
                            <Button
                                className="flex-1 md:flex-none h-12 px-8 bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-400 border border-green-500/20 font-bold"
                                onClick={() => onResults && onResults()}
                            >
                                <Trophy className="mr-2 h-4 w-4" /> View Results
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Submission Logic (Using existing state) */}
            <Dialog open={!!selectedTask} onOpenChange={(open) => {
                if (!open) {
                    setSelectedTask(null);
                    setSubmissionStatus('idle');
                }
            }}>
                <DialogContent className="sm:max-w-md bg-[#0a0a0a] border-white/10">
                    <AnimatePresence mode="wait">
                        {submissionStatus === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col items-center justify-center p-6 text-center space-y-4"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
                                    className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-2"
                                >
                                    <CheckCircle2 className="h-10 w-10" />
                                </motion.div>
                                <h2 className="text-2xl font-bold text-white">Submission Received!</h2>
                                <p className="text-gray-400">
                                    Your proof of work has been securely recorded. Validators will review your contribution shortly.
                                </p>
                                <Button className="mt-4 w-full" onClick={() => setSelectedTask(null)}>
                                    Return to Campaign
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <DialogHeader>
                                    <DialogTitle className="text-white">Submit Contribution</DialogTitle>
                                    <DialogDescription className="text-gray-400">
                                        Provide proof of your work for validation. This can be a link to a PR, a design file, or a document.
                                    </DialogDescription>
                                </DialogHeader>

                                {selectedTask && (
                                    <div className="space-y-4 py-4">
                                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Selected Task</span>
                                            <div className="text-white font-medium mt-1">{selectedTask.description}</div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <div className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-bold">+{selectedTask.CP_value} CP</div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-white">Proof of Work</Label>
                                            <Textarea
                                                placeholder="Paste URL or describe your submission..."
                                                className="resize-none h-32 bg-black/40 border-white/10 text-white focus:border-primary/50"
                                                value={submissionProof}
                                                onChange={(e) => setSubmissionProof(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}

                                <DialogFooter>
                                    <Button variant="ghost" onClick={() => setSelectedTask(null)} className="text-gray-400 hover:text-white">Cancel</Button>
                                    <Button onClick={handleSubmitWork} disabled={!submissionProof || isSubmitting} className="bg-primary text-white hover:bg-primary/90">
                                        {isSubmitting ? 'Submitting...' : 'Submit Contribution'}
                                    </Button>
                                </DialogFooter>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </DialogContent>
            </Dialog>

            {/* Vote Success Modal */}
            <Dialog open={voteSuccess.show} onOpenChange={(open) => {
                if (!open) setVoteSuccess(prev => ({ ...prev, show: false }));
            }}>
                <DialogContent className="sm:max-w-md glass-panel border-white/10 p-0 overflow-hidden">
                    <div className="flex flex-col items-center justify-center p-8 text-center space-y-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            className="h-24 w-24 bg-primary/20 rounded-full flex items-center justify-center text-primary shadow-[0_0_30px_rgba(109,40,217,0.4)]"
                        >
                            <Vote className="h-12 w-12" />
                        </motion.div>

                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold font-display text-white">Protocol Ignited!</h2>
                            <p className="text-muted-foreground text-lg">
                                You have successfully cast your vote.
                            </p>
                        </div>

                        <div className="py-3 px-6 bg-primary/10 border border-primary/20 rounded-xl flex flex-col items-center">
                            <span className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">Impact Cost</span>
                            <span className="text-2xl font-bold text-white flex items-center gap-2">
                                {voteSuccess.amount} <span className="text-primary">CP</span> 🔥
                            </span>
                        </div>

                        <Button
                            className="w-full h-12 text-base"
                            size="lg"
                            onClick={() => setVoteSuccess(prev => ({ ...prev, show: false }))}
                        >
                            Continue
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CampaignDetails;
