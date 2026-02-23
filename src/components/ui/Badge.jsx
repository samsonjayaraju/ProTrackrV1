import * as React from 'react';
import { cn } from '../../lib/utils';

function Badge({ className, variant = "default", ...props }) {
    return (
        <div
            className={cn(
                "inline-flex items-center rounded-lg px-2 py-1 text-xs font-bold border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-y-[-1px]",
                {
                    'bg-green-300 text-green-900 dark:bg-green-600 dark:text-white': variant === 'success',
                    'bg-[#FFD700] text-yellow-900 dark:bg-yellow-600 dark:text-white': variant === 'warning',
                    'bg-[#FE5C73] text-white': variant === 'danger',
                    'bg-[#FF6B35] text-white': variant === 'info',
                    'bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100': variant === 'default',
                },
                className
            )}
            {...props}
        />
    )
}

export { Badge }
