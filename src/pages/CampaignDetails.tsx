import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import CombustionVoting from '@/components/CombustionVoting';
import { Button } from '@/components/ui/button';
import { Campaign, Task, CampaignStatus } from '@/types';
import { mockTasks } from '@/data/mockData';
import { Calendar, CheckCircle2, CircleDashed, ArrowLeft, Send, Vote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CampaignDetailsProps {
    campaign: Campaign;
    onBack: () => void;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({ campaign, onBack }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'voting'>('overview');
    const availableTasks = mockTasks.filter(t => t.campaign_id === campaign.id);

    const getStatusColor = (status: string) => {
        switch (status) {
            case CampaignStatus.ACTIVE: return 'text-primary border-primary/50 bg-primary/10';
            case CampaignStatus.VOTING: return 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10';
            case CampaignStatus.COMPLETED: return 'text-green-400 border-green-400/50 bg-green-400/10';
            default: return 'text-muted-foreground border-white/10 bg-white/5';
        }
    };

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [submissionProof, setSubmissionProof] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success'>('idle');

    const handleOpenSubmission = (task: Task) => {
        setSelectedTask(task);
        setSubmissionProof('');
        setSubmissionStatus('idle');
    };

    const handleSubmitWork = () => {
        if (!selectedTask) return;

        setIsSubmitting(true);
        // Simulate network request
        setTimeout(() => {
            // Success animation trigger
            setIsSubmitting(false);
            setSubmissionStatus('success');
        }, 1000);
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <Button variant="ghost" className="mb-4 pl-0 hover:pl-2 transition-all gap-2 text-muted-foreground hover:text-white" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" /> Back to Campaigns
            </Button>

            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl glass-panel p-8 border-l-4 border-l-primary">
                <div className="flex justify-between items-start">
                    <div>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border mb-4 ${getStatusColor(campaign.status)}`}>
                            {campaign.status.toUpperCase()}
                        </div>
                        <h1 className="text-4xl font-bold font-display text-white mb-2">{campaign.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {campaign.timeline.start} — {campaign.timeline.end}</span>
                            <span className="flex items-center gap-1">Organizer ID: #{campaign.organizer_id}</span>
                        </div>
                    </div>
                    <div className="text-right hidden md:block">
                        <div className="text-sm text-muted-foreground">Total Bounty Pool</div>
                        <div className="text-2xl font-bold text-primary">{(campaign.budget || 5000).toLocaleString()} CP</div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-white/10 pb-1">
                {(['overview', 'tasks', 'voting'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === tab ? 'text-white' : 'text-muted-foreground hover:text-white'}`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        {activeTab === tab && (
                            <motion.div layoutId="activeTab" className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'overview' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Objective</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg leading-relaxed text-gray-300">
                                    {campaign.objective}
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'tasks' && (
                        <div className="grid gap-4">
                            {availableTasks.map((task) => (
                                <Card key={task.id} className="group hover:bg-white/5 transition-colors">
                                    <CardContent className="p-6 flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium text-white text-lg">{task.description}</h3>
                                            <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                                                <CircleDashed className="h-4 w-4" /> Pending Validation
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right mr-4">
                                                <div className="text-xs text-muted-foreground">Reward</div>
                                                <div className="text-xl font-bold text-primary">+{task.CP_value} CP</div>
                                            </div>
                                            <Button
                                                className="gap-2 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                                                onClick={() => handleOpenSubmission(task)}
                                            >
                                                Submit Work <Send className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {availableTasks.length === 0 && (
                                <div className="text-center py-12 text-muted-foreground">No tasks available for this campaign.</div>
                            )}
                        </div>
                    )}

                    {activeTab === 'voting' && (
                        <div className="space-y-8">
                            <CardDescription>
                                Voting Power is determined by your Campaign Points (Fuel) and Reputation Score (Weight).
                                <br />Current Status: <span className="text-white font-bold">{campaign.status.toUpperCase()}</span>
                            </CardDescription>

                            {campaign.status === CampaignStatus.VOTING ? (
                                <CombustionVoting
                                    campaignId={campaign.id}
                                    userCP={1250} // Mock user CP balance
                                    userRP={450}  // Mock user RP balance
                                    onVote={(amount) => {
                                        alert(`Protocol Ignited: ${amount} CP Burned. Vote Cast Successfully.`)
                                    }}
                                />
                            ) : (
                                <div className="text-center py-12 text-muted-foreground bg-black/20 rounded-lg border border-white/5">
                                    Voting is currently closed for this campaign.
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            <Dialog open={!!selectedTask} onOpenChange={(open) => {
                if (!open) {
                    setSelectedTask(null);
                    setSubmissionStatus('idle');
                }
            }}>
                <DialogContent className="sm:max-w-md">
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
                                    <DialogTitle>Submit Contribution</DialogTitle>
                                    <DialogDescription>
                                        Provide proof of your work for validation. This can be a link to a PR, a design file, or a document.
                                    </DialogDescription>
                                </DialogHeader>

                                {selectedTask && (
                                    <div className="space-y-4 py-4">
                                        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                            <span className="text-xs text-muted-foreground uppercase">Task</span>
                                            <div className="text-white font-medium">{selectedTask.description}</div>
                                            <div className="text-primary text-sm mt-1">Reward: {selectedTask.CP_value} CP</div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Proof of Work (URL or Description)</Label>
                                            <Textarea
                                                placeholder="https://github.com/..."
                                                className="resize-none h-32 bg-black/20 border-white/10"
                                                value={submissionProof}
                                                onChange={(e) => setSubmissionProof(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}

                                <DialogFooter>
                                    <Button variant="ghost" onClick={() => setSelectedTask(null)}>Cancel</Button>
                                    <Button onClick={handleSubmitWork} disabled={!submissionProof || isSubmitting}>
                                        {isSubmitting ? 'Submitting...' : 'Submit Contribution'}
                                    </Button>
                                </DialogFooter>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CampaignDetails;
