import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    label?: string;
}

const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
};

/**
 * Spinner - Loading indicator
 */
export const Spinner: React.FC<SpinnerProps> = ({
    size = 'md',
    className,
    label
}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <Loader2
                className={cn('animate-spin text-primary', sizeClasses[size], className)}
            />
            {label && (
                <span className="text-sm text-gray-400">{label}</span>
            )}
        </div>
    );
};

/**
 * LoadingOverlay - Full screen loading overlay
 */
interface LoadingOverlayProps {
    message?: string;
    transparent?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
    message = 'Loading...',
    transparent = false
}) => {
    return (
        <div className={cn(
            'fixed inset-0 z-50 flex items-center justify-center',
            transparent ? 'bg-black/50' : 'bg-black/80',
            'backdrop-blur-sm'
        )}>
            <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-[#0a0a0a] border border-white/10">
                <Spinner size="xl" />
                <p className="text-white font-medium">{message}</p>
            </div>
        </div>
    );
};

/**
 * ButtonSpinner - Small spinner for buttons
 */
export const ButtonSpinner: React.FC<{ className?: string }> = ({ className }) => {
    return <Loader2 className={cn('h-4 w-4 animate-spin', className)} />;
};
