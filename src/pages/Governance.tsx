import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockCampaigns } from '@/data/mockData'; // We can reuse campaigns as "Proposals" for now or create new mock data
import { CampaignStatus } from '@/types';
import { Vote, FileText, Activity, Clock, ThumbsUp, ThumbsDown, MessageSquare, AlertCircle, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface GovernanceProps {
    onNavigate: (page: string, data?: any) => void;
}

// Mock Proposals Data (since it wasn't in the original mockData)
const mockProposals = [
    {
        id: 'prop-1',
        title: 'VIP-1: Increase Campaign Creation Fee to 500 CP',
        status: 'active',
        proposer: 'CoreTeam.eth',
        description: 'To reduce spam campaigns, we propose increasing the creation burn fee from 100 CP to 500 CP. This ensures only serious organizers deploy contracts.',
        votesFor: 15403,
        votesAgainst: 420,
        endTime: '2d 14h',
        category: 'Protocol'
    },
    {
        id: 'prop-2',
        title: 'VIP-2: Add "Hackathon" Category',
        status: 'passed',
        proposer: 'DevGuild',
        description: 'Introduce a specialized campaign template for Hackathons with multi-stage judging and prize distribution logic.',
        votesFor: 25000,
        votesAgainst: 10,
        endTime: 'Ended',
        category: 'Feature'
    },
    {
        id: 'prop-3',
        title: 'VIP-3: Treasury Allocation Q3',
        status: 'failed',
        proposer: 'Treasury.eth',
        description: 'Allocate 50,000 USDC from the treasury for marketing initiatives in the APAC region.',
        votesFor: 4000,
        votesAgainst: 12000,
        endTime: 'Ended',
        category: 'Finance'
    }
];

const Governance: React.FC<GovernanceProps> = ({ onNavigate }) => {
    const [filter, setFilter] = useState<'all' | 'active' | 'passed' | 'failed'>('all');

    const filteredProposals = mockProposals.filter(p => filter === 'all' || p.status === filter);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-primary border-primary/50 bg-primary/10';
            case 'passed': return 'text-green-400 border-green-400/50 bg-green-400/10';
            case 'failed': return 'text-red-400 border-red-400/50 bg-red-400/10';
            default: return 'text-gray-400 border-white/10 bg-white/5';
        }
    };

    const [selectedProposal, setSelectedProposal] = useState<typeof mockProposals[0] | null>(null);
    const [voteAmount, setVoteAmount] = useState([10]);
    const [voteSide, setVoteSide] = useState<'for' | 'against'>('for');
    const [voteStatus, setVoteStatus] = useState<'idle' | 'voting' | 'success'>('idle');

    const handleVote = () => {
        if (!selectedProposal) return;
        setVoteStatus('voting');
        // Simulate API call
        setTimeout(() => {
            setVoteStatus('success');
        }, 1500);
    };

    const handleClose = () => {
        setSelectedProposal(null);
        setVoteStatus('idle');
        setVoteAmount([10]);
        setVoteSide('for');
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Voting Modal */}
            <Dialog open={!!selectedProposal} onOpenChange={(open) => !open && handleClose()}>
                <DialogContent className="sm:max-w-md bg-[#0a0a0a] border-white/10">
                    <AnimatePresence mode="wait">
                        {voteStatus === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center justify-center py-6 text-center space-y-4"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
                                    className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50 mb-2"
                                >
                                    <div className="text-green-500">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                </motion.div>

                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">Vote Recorded!</h2>
                                    <p className="text-gray-400 text-sm">Your influence has been chemically bonded to the protocol.</p>
                                </div>

                                <div className="w-full bg-white/5 rounded-lg border border-white/10 p-4 mt-4 space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Proposal</span>
                                        <span className="text-white font-mono">{selectedProposal?.id}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Verdict</span>
                                        <span className={`font-bold uppercase ${voteSide === 'for' ? 'text-green-400' : 'text-red-400'}`}>
                                            {voteSide}
                                        </span>
                                    </div>
                                    <div className="bg-black/40 rounded p-2 flex justify-between items-center text-sm border border-white/5">
                                        <span className="text-gray-400 flex items-center gap-2">
                                            <Flame className="h-3 w-3 text-primary" /> Burned
                                        </span>
                                        <span className="text-primary font-bold font-mono">{voteAmount[0]} CP</span>
                                    </div>
                                </div>

                                <Button className="w-full mt-4" onClick={handleClose}>
                                    Done
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
                                    <DialogTitle>Combustion Voting</DialogTitle>
                                    <DialogDescription>
                                        Choose how much CP you want to burn to support this proposal.
                                    </DialogDescription>
                                </DialogHeader>

                                {selectedProposal && (
                                    <div className="space-y-6 py-4">
                                        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                            <span className="text-xs text-muted-foreground uppercase">Proposal</span>
                                            <div className="text-white font-medium line-clamp-2">{selectedProposal.title}</div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between">
                                                <Label>Combustion Amount (Burn)</Label>
                                                <span className="font-mono text-primary font-bold">{voteAmount[0]} CP</span>
                                            </div>
                                            <Slider
                                                defaultValue={[10]}
                                                max={450}
                                                step={10}
                                                className="py-4"
                                                onValueChange={setVoteAmount}
                                            />
                                            <p className="text-xs text-gray-500 text-center">
                                                You are burning <span className="text-white font-bold">{voteAmount[0]} CP</span> to cast this vote. <br />
                                                This action is irreversible.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <DialogFooter>
                                    <Button variant="ghost" onClick={handleClose} disabled={voteStatus === 'voting'}>Cancel</Button>
                                    <Button
                                        className="w-full sm:w-auto bg-green-600 hover:bg-green-500"
                                        onClick={handleVote}
                                        disabled={voteStatus === 'voting'}
                                    >
                                        {voteStatus === 'voting' ? (
                                            <span className="flex items-center gap-2"><div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Burning...</span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Confirm & Burn <Flame className="h-4 w-4" />
                                            </span>
                                        )}
                                    </Button>
                                </DialogFooter>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </DialogContent>
            </Dialog>

            {/* Header / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 md:col-span-2 space-y-2">
                    <h1 className="text-4xl font-bold font-display text-white">Campaign Forum</h1>
                    <p className="text-muted-foreground text-lg">
                        Shape the future of the protocol. Your Reputation Points (RP) determine your influence.
                    </p>
                </div>
                <Card className="bg-gradient-to-br from-indigo-900/20 to-black border-indigo-500/20">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <div className="text-sm text-indigo-300 font-medium mb-1">Your Voting Power</div>
                            <div className="text-3xl font-bold text-white flex items-baseline gap-2">
                                450 <span className="text-sm text-gray-400 font-normal">RP</span>
                            </div>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <Vote className="h-6 w-6" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex gap-2 border-b border-white/10 pb-4">
                {(['all', 'active', 'passed', 'failed'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === f
                            ? 'bg-white text-black'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)} <span className="text-xs opacity-50 ml-1">({mockProposals.filter(p => f === 'all' || p.status === f).length})</span>
                    </button>
                ))}
            </div>

            {/* Proposals List */}
            <div className="space-y-4">
                {filteredProposals.map((proposal, i) => (
                    <motion.div
                        key={proposal.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="group hover:border-white/20 transition-all cursor-pointer">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Status Badge */}
                                    <div className="flex flex-col items-center justify-start pt-1 min-w-[80px]">
                                        <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border mb-2 w-full text-center ${getStatusColor(proposal.status)}`}>
                                            {proposal.status}
                                        </div>
                                        <div className="text-xs text-gray-500 font-mono">{proposal.id}</div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{proposal.title}</h3>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                                                <Clock className="h-3 w-3" /> {proposal.endTime}
                                            </div>
                                        </div>

                                        <p className="text-gray-400 text-sm leading-relaxed">{proposal.description}</p>

                                        {/* Voting Progress Bar */}
                                        <div className="pt-2 space-y-2">
                                            <div className="flex justify-between text-xs font-medium">
                                                <span className="text-green-400 flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> {((proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100).toFixed(1)}% For</span>
                                                <span className="text-red-400 flex items-center gap-1"><ThumbsDown className="h-3 w-3" /> {((proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst)) * 100).toFixed(1)}% Against</span>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden flex">
                                                <div className="bg-green-500 h-full" style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}></div>
                                                <div className="bg-red-500 h-full" style={{ width: `${(proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}></div>
                                            </div>
                                            <div className="text-xs text-gray-600 text-right font-mono">
                                                Total Votes: {(proposal.votesFor + proposal.votesAgainst).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Area */}
                                    <div className="flex flex-col justify-between items-end border-l border-white/5 pl-6 min-w-[140px]">
                                        <div className="text-xs text-gray-500 mb-2">Proposer</div>
                                        <div className="flex items-center gap-2 text-sm text-white font-medium mb-auto">
                                            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500"></div>
                                            {proposal.proposer}
                                        </div>

                                        <Button
                                            size="sm"
                                            className="w-full gap-2 mt-4"
                                            disabled={proposal.status !== 'active'}
                                            onClick={() => setSelectedProposal(proposal)}
                                        >
                                            {proposal.status === 'active' ? 'Vote Now' : 'View Results'}
                                            {proposal.status === 'active' && <Vote className="h-3 w-3" />}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Info Box */}
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 flex items-start gap-4">
                <AlertCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-200">
                    <span className="font-bold text-blue-100">Governance Rule #4:</span> You must have at least 50 RP to create a new proposal.
                    Voting requires burning CP (Combustion). Ensure you have sufficient CP balance before participating.
                </div>
            </div>
        </div>
    );
};

export default Governance;
