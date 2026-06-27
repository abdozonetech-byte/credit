import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.97]',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-br from-navy-700 to-navy-600 text-white shadow-lg shadow-navy-700/20 hover:shadow-xl hover:shadow-navy-700/30 hover:-translate-y-0.5',
        secondary:
          'bg-gradient-to-br from-gold-500 to-gold-400 text-white shadow-lg shadow-gold-500/25 hover:shadow-xl hover:shadow-gold-500/35 hover:-translate-y-0.5',
        outline:
          'border-2 border-navy-200 text-navy-700 bg-white/60 hover:bg-white hover:border-navy-300',
        ghost:
          'text-navy-600 hover:bg-navy-50',
      },
      size: {
        sm: 'h-10 px-5 text-sm',
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
        xl: 'h-16 px-10 text-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
