import React from 'react';
import { cn } from '@/lib/utils';
import { Flame, Shield } from 'lucide-react';

type PointType = 'CP' | 'RP';

interface PointBadgeProps {
    type: PointType;
    amount: number;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'outline' | 'solid';
    showIcon?: boolean;
    showLabel?: boolean;
    className?: string;
}

/**
 * PointBadge - Consistent visual representation of CP and RP
 * 
 * CP (Campaign Points): Orange/Amber with Flame icon
 * RP (Reputation Points): Blue/Purple with Shield icon
 */
export const PointBadge: React.FC<PointBadgeProps> = ({
    type,
    amount,
    size = 'md',
    variant = 'default',
    showIcon = true,
    showLabel = true,
    className,
}) => {
    const isCP = type === 'CP';

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs gap-1',
        md: 'px-3 py-1 text-sm gap-1.5',
        lg: 'px-4 py-1.5 text-base gap-2',
    };

    const iconSizes = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
    };

    const variantClasses = {
        CP: {
            default: 'bg-orange-500/10 border border-orange-500/20 text-orange-400',
            outline: 'border-2 border-orange-500/40 text-orange-400 bg-transparent',
            solid: 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-0',
        },
        RP: {
            default: 'bg-blue-500/10 border border-blue-500/20 text-blue-400',
            outline: 'border-2 border-blue-500/40 text-blue-400 bg-transparent',
            solid: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0',
        },
    };

    const Icon = isCP ? Flame : Shield;

    return (
        <div
            className={cn(
                'inline-flex items-center rounded-full font-bold font-mono',
                sizeClasses[size],
                variantClasses[type][variant],
                className
            )}
        >
            {showIcon && <Icon className={iconSizes[size]} />}
            <span className="tabular-nums">{amount.toLocaleString()}</span>
            {showLabel && <span className="font-sans">{type}</span>}
        </div>
    );
};

/**
 * PointDisplay - Shows both CP and RP together
 */
interface PointDisplayProps {
    cp: number;
    rp: number;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'outline' | 'solid';
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}

export const PointDisplay: React.FC<PointDisplayProps> = ({
    cp,
    rp,
    size = 'md',
    variant = 'default',
    orientation = 'horizontal',
    className,
}) => {
    const containerClasses = orientation === 'horizontal'
        ? 'flex items-center gap-3'
        : 'flex flex-col gap-2';

    return (
        <div className={cn(containerClasses, className)}>
            <PointBadge type="CP" amount={cp} size={size} variant={variant} />
            <PointBadge type="RP" amount={rp} size={size} variant={variant} />
        </div>
    );
};

/**
 * PointChange - Shows point change with +/- indicator
 */
interface PointChangeProps {
    type: PointType;
    amount: number;
    change: number;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const PointChange: React.FC<PointChangeProps> = ({
    type,
    amount,
    change,
    size = 'md',
    className,
}) => {
    const isPositive = change > 0;
    const isCP = type === 'CP';

    return (
        <div className={cn('flex items-center gap-2', className)}>
            <PointBadge type={type} amount={amount} size={size} />
            <span
                className={cn(
                    'text-sm font-bold font-mono',
                    isPositive ? 'text-green-400' : 'text-red-400'
                )}
            >
                {isPositive ? '+' : ''}{change.toLocaleString()}
            </span>
        </div>
    );
};
