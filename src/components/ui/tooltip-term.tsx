import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { HelpCircle } from 'lucide-react';

interface TooltipTermProps {
    term: string;
    definition: string;
    learnMoreUrl?: string;
    children?: React.ReactNode;
    showIcon?: boolean;
}

/**
 * TooltipTerm - A component for displaying inline help tooltips for terminology
 * 
 * Usage:
 * <TooltipTerm term="CP" definition="Campaign Points earned for participation">
 *   Campaign Points
 * </TooltipTerm>
 */
export const TooltipTerm: React.FC<TooltipTermProps> = ({
    term,
    definition,
    learnMoreUrl,
    children,
    showIcon = false,
}) => {
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="inline-flex items-center gap-1 border-b border-dotted border-gray-500 cursor-help hover:border-primary transition-colors">
                        {children || term}
                        {showIcon && <HelpCircle className="h-3 w-3 text-gray-500" />}
                    </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                    <div className="space-y-2">
                        <div>
                            <div className="font-bold text-white mb-1">{term}</div>
                            <p className="text-sm text-gray-300 leading-relaxed">{definition}</p>
                        </div>
                        {learnMoreUrl && (
                            <a
                                href={learnMoreUrl}
                                className="text-xs text-primary hover:text-primary/80 underline inline-block"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Learn more →
                            </a>
                        )}
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

// Predefined tooltips for common Voterax terms
export const CPTooltip: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <TooltipTerm
        term="Campaign Points (CP)"
        definition="Points earned for participating in and completing campaign tasks. CP can be burned to cast votes."
        learnMoreUrl="#"
    >
        {children || 'CP'}
    </TooltipTerm>
);

export const RPTooltip: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <TooltipTerm
        term="Reputation Points (RP)"
        definition="Persistent points that accumulate across all campaigns, reflecting your long-term credibility and contribution history."
        learnMoreUrl="#"
    >
        {children || 'RP'}
    </TooltipTerm>
);

export const BurnTooltip: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <TooltipTerm
        term="Burn Mechanism"
        definition="When you vote, your CP is permanently consumed (burned). This ensures voting power reflects active participation and prevents unlimited influence."
        learnMoreUrl="#"
    >
        {children || 'Burn'}
    </TooltipTerm>
);

export const VotingPowerTooltip: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <TooltipTerm
        term="Voting Power"
        definition="Your total influence in a vote, calculated as: CP + (0.2 × RP). This balances fresh participation with long-term reputation."
        learnMoreUrl="#"
    >
        {children || 'Voting Power'}
    </TooltipTerm>
);

export const QuadraticFundingTooltip: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <TooltipTerm
        term="Quadratic Funding"
        definition="A voting mechanism where the cost of additional votes increases exponentially, ensuring fair distribution and preventing vote buying."
        learnMoreUrl="#"
    >
        {children || 'Quadratic Funding'}
    </TooltipTerm>
);
