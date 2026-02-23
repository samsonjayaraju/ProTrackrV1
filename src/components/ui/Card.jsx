import * as React from 'react';
import { cn } from '../../lib/utils';

const Card = React.forwardRef(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "rounded-2xl bg-card-light dark:bg-card-dark border-2 border-gray-900 dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-y-[-2px]",
                className
            )}
            {...props}
        />
    )
)
Card.displayName = "Card"

const CardContent = React.forwardRef(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("p-6", className)} {...props} />
    )
)
CardContent.displayName = "CardContent"

export { Card, CardContent }
