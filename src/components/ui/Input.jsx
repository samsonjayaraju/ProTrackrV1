import * as React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(
    ({ className, type, icon, ...props }, ref) => {
        return (
            <div className="relative flex items-center w-full">
                {icon && (
                    <div className="absolute left-4 flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-12 w-full rounded-xl border-2 border-gray-900 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-gray-900 dark:focus-visible:border-white disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 text-gray-900 dark:text-white shadow-sm",
                        icon && "pl-12",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
