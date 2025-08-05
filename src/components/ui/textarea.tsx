import * as React from "react"

import { cn } from "../../lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "elq:flex elq:min-h-[80px] elq:w-full elq:rounded-md elq:border elq:border-slate-200 elq:bg-white elq:px-3 elq:py-2 elq:text-sm elq:ring-offset-white elq:placeholder:text-slate-500 elq:focus-visible:outline-none elq:focus-visible:ring-2 elq:focus-visible:ring-[#6f33b7] elq:focus-visible:ring-offset-2 elq:disabled:cursor-not-allowed elq:disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }