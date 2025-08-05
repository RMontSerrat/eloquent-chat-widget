import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "elq:inline-flex elq:items-center elq:rounded-full elq:border elq:px-2.5 elq:py-0.5 elq:text-xs elq:font-semibold elq:transition-colors elq:focus:outline-none elq:focus:ring-2 elq:focus:ring-slate-950 elq:focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "elq:border-transparent elq:bg-slate-900 elq:text-slate-50 elq:hover:bg-slate-900/80",
        secondary:
          "elq:border-transparent elq:bg-slate-100 elq:text-slate-900 elq:hover:bg-slate-100/80",
        destructive:
          "elq:border-transparent elq:bg-red-500 elq:text-slate-50 elq:hover:bg-red-500/80",
        outline: "elq:text-slate-950",
        online: "elq:border-transparent elq:bg-green-100 elq:text-green-800",
        offline: "elq:border-transparent elq:bg-red-100 elq:text-red-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }