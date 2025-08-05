import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "elq:inline-flex elq:items-center elq:justify-center elq:whitespace-nowrap elq:rounded-md elq:text-sm elq:font-medium elq:ring-offset-white elq:transition-colors elq:focus-visible:outline-none elq:focus-visible:ring-2 elq:focus-visible:ring-slate-950 elq:focus-visible:ring-offset-2 elq:disabled:pointer-events-none elq:disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "elq:bg-slate-900 elq:text-slate-50 elq:hover:bg-slate-900/90",
        destructive:
          "elq:bg-red-500 elq:text-slate-50 elq:hover:bg-red-500/90",
        outline:
          "elq:border elq:border-slate-200 elq:bg-white elq:hover:bg-slate-100 elq:hover:text-slate-900",
        secondary:
          "elq:bg-slate-100 elq:text-slate-900 elq:hover:bg-slate-100/80",
        ghost: "elq:hover:bg-slate-100 elq:hover:text-slate-900",
        link: "elq:text-slate-900 elq:underline-offset-4 elq:hover:underline",
        primary: "bg-primary elq:text-white elq:hover:bg-primary/90",
      },
      size: {
        default: "elq:h-10 elq:px-4 elq:py-2",
        sm: "elq:h-9 elq:rounded-md elq:px-3",
        lg: "elq:h-11 elq:rounded-md elq:px-8",
        icon: "elq:h-10 elq:w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }