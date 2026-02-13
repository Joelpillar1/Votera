import * as React from "react"
import { cn } from "@/lib/utils"

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-white/5", className)}
            {...props}
        />
    )
}

/**
 * SkeletonCard - Skeleton for card components
 */
function SkeletonCard({ className }: { className?: string }) {
    return (
        <div className={cn("rounded-xl border border-white/5 bg-[#0a0a0a] p-6 space-y-4", className)}>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
        </div>
    );
}

/**
 * SkeletonCampaignCard - Skeleton for campaign cards
 */
function SkeletonCampaignCard({ className }: { className?: string }) {
    return (
        <div className={cn("rounded-xl border border-white/5 bg-[#0a0a0a] overflow-hidden", className)}>
            <Skeleton className="h-48 w-full rounded-none" />
            <div className="p-6 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex gap-2 pt-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-24" />
                </div>
            </div>
        </div>
    );
}

/**
 * SkeletonTable - Skeleton for table rows
 */
function SkeletonTable({ rows = 5, className }: { rows?: number; className?: string }) {
    return (
        <div className={cn("space-y-2", className)}>
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-white/5">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                </div>
            ))}
        </div>
    );
}

/**
 * SkeletonStats - Skeleton for stat cards
 */
function SkeletonStats({ count = 3, className }: { count?: number; className?: string }) {
    return (
        <div className={cn("grid gap-4", className)}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-[#0a0a0a] p-6 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-3 w-20" />
                </div>
            ))}
        </div>
    );
}

export { Skeleton, SkeletonCard, SkeletonCampaignCard, SkeletonTable, SkeletonStats }
