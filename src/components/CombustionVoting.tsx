import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Flame, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CombustionVotingProps {
    campaignId: number;
    userCP: number;
    userRP: number;
    onVote: (cpBurned: number) => void;
}

const CombustionVoting: React.FC<CombustionVotingProps> = ({ campaignId, userCP, userRP, onVote }) => {
    const [burnAmount, setBurnAmount] = useState(0);
    const [isConfirming, setIsConfirming] = useState(false);

    // Formula: Power = CP + (0.2 * RP)
    const calculatePower = (cp: number) => {
        return Math.floor(cp + (0.2 * userRP));
    };

    const votingPower = calculatePower(burnAmount);
    const maxBurn = userCP;

    const handleVote = () => {
        if (burnAmount > 0) {
            setIsConfirming(true);
            // Simulate API call
            setTimeout(() => {
                onVote(burnAmount);
                setIsConfirming(false);
            }, 1500);
        }
    };

    return (
        <Card className="border-primary/20 bg-black/40 backdrop-blur-xl transition-all duration-500 hover:border-primary/40">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                    <Flame className="h-5 w-5 text-orange-500 animate-pulse" /> Combustion Engine
                </CardTitle>
                <CardDescription>
                    Allocate your <strong>Campaign Points (CP)</strong> to generate voting power.
                    <br />Remember: CP used is <strong>burned permanently</strong>.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
                {/* Power Visualization */}
                <div className="relative p-6 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-white/5 overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <ShieldCheck className="h-24 w-24 text-primary" />
                    </div>

                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <div className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Total Voting Power</div>
                            <div className="text-4xl font-bold font-display text-white tabular-nums">
                                {votingPower.toLocaleString()} <span className="text-lg text-primary">VP</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-muted-foreground">Impact Multiplier</div>
                            <div className="text-lg font-mono text-green-400">
                                {burnAmount > 0 ? ((votingPower / burnAmount).toFixed(2)) : "1.00"}x
                            </div>
                        </div>
                    </div>

                    {/* Formula Breakdown */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4 pt-4 border-t border-white/5 font-mono">
                        <span className="text-orange-400">{burnAmount} CP (Burn)</span>
                        <span>+</span>
                        <span className="text-blue-400">{(0.2 * userRP).toFixed(0)} RP (Weight)</span>
                    </div>
                </div>

                {/* Interaction Area */}
                <div className="space-y-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-medium">Select Amount to Burn</span>
                        <span className="text-white font-mono">Balance: {userCP.toLocaleString()} CP</span>
                    </div>

                    <Slider
                        value={[burnAmount]}
                        max={maxBurn}
                        step={1}
                        onValueChange={(vals) => setBurnAmount(vals[0])}
                        className="py-4"
                    />

                    <div className="flex justify-between gap-2">
                        {[0.25, 0.5, 0.75, 1].map((pct) => (
                            <Button
                                key={pct}
                                variant="outline"
                                size="sm"
                                className="flex-1 text-xs border-white/10 hover:bg-white/10"
                                onClick={() => setBurnAmount(Math.floor(maxBurn * pct))}
                            >
                                {pct * 100}%
                            </Button>
                        ))}
                    </div>

                    <div className="pt-4">
                        {isConfirming ? (
                            <Button disabled className="w-full h-12 bg-orange-600/20 text-orange-500 border border-orange-600/50 animate-pulse">
                                Igniting Protocol...
                            </Button>
                        ) : (
                            <Button
                                onClick={handleVote}
                                disabled={burnAmount === 0}
                                className={`w-full h-12 text-lg font-bold transition-all duration-300 ${burnAmount > 0
                                        ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 shadow-[0_0_20px_rgba(234,88,12,0.5)] border-0 text-white'
                                        : 'bg-muted text-muted-foreground'
                                    }`}
                            >
                                {burnAmount === 0 ? "Enter Amount to Vote" : `BURN ${burnAmount} CP & VOTE`}
                            </Button>
                        )}
                    </div>

                    <AnimatePresence>
                        {burnAmount > (maxBurn * 0.8) && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex items-start gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-sm"
                            >
                                <AlertTriangle className="h-5 w-5 shrink-0" />
                                <p>High burn warning. You are committing over 80% of your available CP. This action is irreversible.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </CardContent>
        </Card>
    );
};

export default CombustionVoting;
