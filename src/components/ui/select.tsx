import { forwardRef, type SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            'flex h-12 w-full rounded-xl border border-navy-200/60 bg-white px-4 py-2.5 text-sm text-navy-800 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 appearance-none',
            className
          )}
          ref={ref}
          defaultValue=""
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="absolute top-1/2 -translate-y-1/2 end-3 text-navy-300 pointer-events-none"
        />
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Select }
