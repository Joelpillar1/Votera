import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react"

const alertVariants = cva(
    "relative w-full rounded-xl border p-4 [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
    {
        variants: {
            variant: {
                default: "bg-white/5 border-white/10 text-foreground",
                info: "bg-blue-500/10 border-blue-500/20 text-blue-100 [&>svg]:text-blue-400",
                success: "bg-green-500/10 border-green-500/20 text-green-100 [&>svg]:text-green-400",
                warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-100 [&>svg]:text-yellow-400",
                error: "bg-red-500/10 border-red-500/20 text-red-100 [&>svg]:text-red-400",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const Alert = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & {
        dismissible?: boolean
        onDismiss?: () => void
    }
>(({ className, variant, dismissible, onDismiss, children, ...props }, ref) => {
    const [dismissed, setDismissed] = React.useState(false)

    const handleDismiss = () => {
        setDismissed(true)
        onDismiss?.()
    }

    if (dismissed) return null

    const Icon = {
        default: Info,
        info: Info,
        success: CheckCircle2,
        warning: AlertTriangle,
        error: AlertCircle,
    }[variant || 'default']

    return (
        <div
            ref={ref}
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
        >
            <Icon className="h-5 w-5" />
            <div className="flex-1">{children}</div>
            {dismissible && (
                <button
                    onClick={handleDismiss}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-label="Dismiss"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn("mb-1 font-bold leading-none tracking-tight", className)}
        {...props}
    />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm leading-relaxed [&_p]:leading-relaxed opacity-90", className)}
        {...props}
    />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
