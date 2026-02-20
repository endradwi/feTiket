import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "../../lib/utils"
import React from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "./Button"

function Input({ className, type, variant, startContent, endContent, ...props }) {
  const [showPassword, setShowPassword] = React.useState(false)
  const isWrapped = !!startContent || !!endContent || variant === "password"
  const Comp = isWrapped ? "div" : React.Fragment
  const wrapperProps = isWrapped ? { className: "relative w-full flex items-center" } : {}
  return (
    <Comp {...wrapperProps}>
    <InputPrimitive
      type={variant === "password" ? (showPassword ? "text" : "password") : type}
      data-slot="input"
      className={cn(
        "dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 h-8 rounded-lg border bg-transparent px-2.5 py-1 text-base transition-colors file:h-6 file:text-sm file:font-medium focus-visible:ring-3 aria-invalid:ring-3 md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        variant === "password" && "pr-9",
        className
      )}
      {...props}
    />
    {startContent && (
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground flex items-center justify-center pointer-events-none">
        {startContent}
      </div>
    )}
    {endContent && variant !== "password" && (
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground flex items-center justify-center pointer-events-none">
        {endContent}
      </div>
    )}
    {variant === "password" && (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </Button>
    )}
    </Comp>
  )
}

export { Input }
