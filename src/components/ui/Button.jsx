import * as React from 'react';
import { cn } from '../../lib/utils';

const Button = React.forwardRef(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-xl font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 active:translate-y-1 active:shadow-none",
                    {
                        'bg-primary text-white border-2 border-gray-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]': variant === 'primary',
                        'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-900 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700': variant === 'secondary' || variant === 'outline',
                        'bg-[#FE5C73] text-white border-2 border-gray-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]': variant === 'danger',
                        'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white': variant === 'ghost',
                        'h-9 px-4 text-sm': size === 'sm',
                        'h-12 px-6 text-base': size === 'md',
                        'h-14 px-8 text-lg': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
