import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        className={cn(
          'h-5 w-5 rounded-lg border-2 border-navy-300 text-teal-500 focus:ring-2 focus:ring-teal-300 focus:ring-offset-1 transition-colors cursor-pointer accent-teal-500',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
