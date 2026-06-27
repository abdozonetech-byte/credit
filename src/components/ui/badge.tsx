import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide transition-colors',
  {
    variants: {
      variant: {
        navy: 'bg-navy-100 text-navy-700',
        gold: 'bg-gold-100 text-gold-600',
        teal: 'bg-teal-100 text-teal-600',
        outline: 'border border-navy-200 text-navy-600',
      },
    },
    defaultVariants: {
      variant: 'navy',
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span className={cn(badgeVariants({ variant }), className)} ref={ref} {...props} />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
