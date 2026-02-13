import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Flame, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CPTooltip, RPTooltip, BurnTooltip, VotingPowerTooltip } from '@/components/ui/tooltip-term';
import { PointBadge } from '@/components/ui/point-badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface CombustionVotingProps {
    campaignId: number;
    userCP: number;
    userRP: number;
    onVote: (cpBurned: number) => void;
}

const CombustionVoting: React.FC<CombustionVotingProps> = ({ campaignId, userCP, userRP, onVote }) => {
    const [burnAmount, setBurnAmount] = useState(0);
    const [isConfirming, setIsConfirming] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    // Formula: Power = CP + (0.2 * RP)
    const calculatePower = (cp: number) => {
        return Math.floor(cp + (0.2 * userRP));
    };

    const votingPower = calculatePower(burnAmount);
    const maxBurn = userCP;

    const handleShowPreview = () => {
        if (burnAmount > 0) {
            setShowPreview(true);
        }
    };

    const handleConfirmVote = () => {
        setShowPreview(false);
        setIsConfirming(true);
        // Simulate API call
        setTimeout(() => {
            onVote(burnAmount);
            setIsConfirming(false);
        }, 1500);
    };

    const handleCancelPreview = () => {
        setShowPreview(false);
    };

    return (
        <>
            {/* Preview Modal */}
            <Dialog open={showPreview} onOpenChange={setShowPreview}>
                <DialogContent className="sm:max-w-md bg-[#0a0a0a] border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Review Your Allocation</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Confirm the details before casting your vote
                        </DialogDescription>
                    </DialogHeader>

                    {/* Allocation Summary */}
                    <div className="space-y-3 bg-white/5 rounded-xl p-6 border border-white/10 my-4">
                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-4">You are allocating:</div>

                        {/* CP Burn */}
                        <div className="flex items-center justify-between py-2 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <Flame className="h-4 w-4 text-orange-400" />
                                <span className="text-sm text-gray-400">CP to Burn</span>
                            </div>
                            <span className="text-lg font-bold text-orange-400 font-mono">{burnAmount.toLocaleString()} CP</span>
                        </div>

                        {/* RP Contribution */}
                        <div className="flex items-center justify-between py-2 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-blue-400" />
                                <span className="text-sm text-gray-400">RP Bonus</span>
                            </div>
                            <span className="text-lg font-bold text-blue-400 font-mono">+{(0.2 * userRP).toFixed(0)} Power</span>
                        </div>

                        {/* Total Voting Power */}
                        <div className="flex items-center justify-between py-3 bg-primary/10 rounded-lg px-4 mt-2">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                <span className="text-sm font-bold text-white">Total Voting Power</span>
                            </div>
                            <span className="text-2xl font-bold text-primary font-mono">{votingPower.toLocaleString()} VP</span>
                        </div>
                    </div>

                    <DialogFooter className="flex-row gap-3">
                        <Button
                            variant="outline"
                            onClick={handleCancelPreview}
                            className="flex-1 border-white/10 hover:bg-white/5"
                        >
                            Go Back
                        </Button>
                        <Button
                            onClick={handleConfirmVote}
                            className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold"
                        >
                            <Flame className="h-4 w-4 mr-2" />
                            Confirm Vote
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Main Voting Card */}
            <Card className="border-white/10 bg-[#0a0a0a]">
                <CardHeader className="border-b border-white/5 pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-white text-xl mb-1">
                                <Flame className="h-5 w-5 text-orange-500" /> Cast Your Vote
                            </CardTitle>
                            <CardDescription className="text-gray-400 text-sm">
                                <BurnTooltip>Burn</BurnTooltip> <CPTooltip>CP</CPTooltip> to generate <VotingPowerTooltip>voting power</VotingPowerTooltip>. This action is permanent.
                            </CardDescription>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Balance</div>
                            <PointBadge type="CP" amount={userCP} size="lg" variant="solid" />
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        {/* Burn Amount */}
                        <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <Flame className="h-4 w-4 text-orange-400" />
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider"><BurnTooltip showIcon={false}>Burning</BurnTooltip></span>
                            </div>
                            <div className="text-2xl font-bold text-orange-400 font-mono tabular-nums">
                                {burnAmount.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 mt-1"><CPTooltip showIcon={false}>CP</CPTooltip></div>
                        </div>

                        {/* RP Bonus */}
                        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/5 border border-blue-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <ShieldCheck className="h-4 w-4 text-blue-400" />
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider"><RPTooltip showIcon={false}>RP</RPTooltip> Bonus</span>
                            </div>
                            <div className="text-2xl font-bold text-blue-400 font-mono tabular-nums">
                                +{(0.2 * userRP).toFixed(0)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Power</div>
                        </div>

                        {/* Total Voting Power */}
                        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-green-500/5 border border-primary/20">
                            <div className="flex items-center gap-2 mb-2">
                                <ShieldCheck className="h-4 w-4 text-primary" />
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider"><VotingPowerTooltip showIcon={false}>Total Power</VotingPowerTooltip></span>
                            </div>
                            <div className="text-2xl font-bold text-primary font-mono tabular-nums">
                                {votingPower.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">VP</div>
                        </div>
                    </div>

                    {/* Multiplier Badge */}
                    {burnAmount > 0 && (
                        <div className="flex items-center justify-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Multiplier</span>
                                <span className="text-lg font-bold text-green-400 font-mono">
                                    {((votingPower / burnAmount).toFixed(2))}x
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Slider Controls */}
                    <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400 font-medium">Select Amount</span>
                            <span className="text-sm text-white font-mono font-bold">{burnAmount} CP</span>
                        </div>

                        <Slider
                            value={[burnAmount]}
                            max={maxBurn}
                            step={1}
                            onValueChange={(vals) => setBurnAmount(vals[0])}
                            className="py-2"
                        />

                        {/* Quick Select */}
                        <div className="grid grid-cols-4 gap-2">
                            {[0.25, 0.5, 0.75, 1].map((pct) => (
                                <Button
                                    key={pct}
                                    variant="outline"
                                    size="sm"
                                    className="border-white/10 hover:bg-white/5 hover:border-primary/30 text-xs"
                                    onClick={() => setBurnAmount(Math.floor(maxBurn * pct))}
                                >
                                    {pct * 100}%
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Vote Button */}
                    <div className="space-y-3 pt-2">
                        {isConfirming ? (
                            <Button disabled className="w-full h-14 bg-orange-600/20 text-orange-400 border border-orange-600/30">
                                <Flame className="h-5 w-5 mr-2 animate-spin" />
                                Processing Vote...
                            </Button>
                        ) : (
                            <Button
                                onClick={handleShowPreview}
                                disabled={burnAmount === 0}
                                className={`w-full h-14 text-base font-bold transition-all duration-300 ${burnAmount > 0
                                    ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 shadow-lg shadow-orange-600/20 border-0 text-white'
                                    : 'bg-white/5 text-gray-600 border border-white/10 cursor-not-allowed'
                                    }`}
                            >
                                {burnAmount === 0 ? (
                                    <>Select Amount to Vote</>
                                ) : (
                                    <>
                                        <Flame className="h-5 w-5 mr-2" />
                                        Burn {burnAmount.toLocaleString()} CP & Cast Vote
                                    </>
                                )}
                            </Button>
                        )}

                        {/* High Burn Warning */}
                        <AnimatePresence>
                            {burnAmount > (maxBurn * 0.8) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20"
                                >
                                    <AlertTriangle className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-sm font-bold text-yellow-400 mb-1">High Burn Warning</div>
                                        <p className="text-xs text-yellow-200/80">
                                            You're committing over 80% of your CP. This action is permanent and cannot be reversed.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default CombustionVoting;
