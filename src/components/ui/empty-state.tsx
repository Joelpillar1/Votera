import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Button } from './button';

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

/**
 * EmptyState - Display when no data is available
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
    icon: Icon,
    title,
    description,
    action,
    className,
}) => {
    return (
        <div className={cn(
            'flex flex-col items-center justify-center text-center p-12 rounded-2xl border-2 border-dashed border-white/10 bg-white/5',
            className
        )}>
            {Icon && (
                <div className="mb-4 p-4 rounded-full bg-white/5">
                    <Icon className="h-8 w-8 text-gray-500" />
                </div>
            )}
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-400 max-w-md mb-6">{description}</p>
            {action && (
                <Button onClick={action.onClick} variant="outline">
                    {action.label}
                </Button>
            )}
        </div>
    );
};
