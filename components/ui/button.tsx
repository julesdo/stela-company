import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "relative",                            // nécessaire pour ::before/::after :contentReference[oaicite:0]{index=0}
    "group",                               // hover group pour pseudo-éléments :contentReference[oaicite:1]{index=1}
    "overflow-hidden",
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "whitespace-nowrap",
    "rounded-xl",                          // coins généreux
    "text-base",                           // taille de texte plus douce
    "font-semibold",
    "uppercase",
    "transition-all",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "[&_svg]:pointer-events-none",
    "[&_svg:not([class*='size-'])]:size-4",
    "shrink-0",
    "[&_svg]:shrink-0",
    "outline-none",
    "focus-visible:border-[var(--color-ring)]",           // focus utilise la variable ring :contentReference[oaicite:2]{index=2}
    "focus-visible:ring-[var(--color-ring)]/50",
    "focus-visible:ring-[3px]",
    "aria-invalid:ring-[var(--color-destructive)]/20",
    "dark:aria-invalid:ring-[var(--color-destructive)]/40",
    "aria-invalid:border-[var(--color-destructive)]",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--color-primary)]",                  // fond primaire :contentReference[oaicite:3]{index=3}
          "text-white",     // texte primaire :contentReference[oaicite:4]{index=4}
          "shadow-md",
          "hover:bg-[var(--color-primary)]/90",
          "active:scale-95",                             // feedback haptique :contentReference[oaicite:5]{index=5}
        ],
        destructive: [
          "bg-[var(--color-destructive)]",
          "text-white",
          "shadow-md",
          "hover:bg-[var(--color-destructive)]/90",
          "active:scale-95",
        ],
        outline: [
          "border",
          "border-[var(--color-border)]",               // bordure thématique :contentReference[oaicite:6]{index=6}
          "bg-[var(--color-background)]",
          "text-[var(--color-foreground)]",
          "shadow-sm",
          "hover:bg-[var(--color-secondary)]/10",       // accent pastel :contentReference[oaicite:7]{index=7}
          "hover:text-[var(--color-secondary-foreground)]",
          "active:scale-95",
        ],
        secondary: [
          "bg-[var(--color-secondary)]",
          "text-[var(--color-secondary-foreground)]",
          "shadow-sm",
          "hover:bg-[var(--color-secondary)]/90",
          "active:scale-95",
        ],
        ghost: [
          "bg-transparent",
          "text-[var(--color-foreground)]",
          "hover:bg-[var(--color-accent)]/10",
          "hover:text-[var(--color-accent-foreground)]",
          "active:scale-95",
        ],
        link: [
          "bg-transparent",
          "text-[var(--color-primary)]",
          "underline-offset-4",
          "hover:underline",
          "active:scale-95",
        ],
      },
      size: {
        default: [
          "h-10",
          "px-6",
          "py-2",
          "has-[>svg]:px-4",
        ],
        sm: [
          "h-8",
          "px-4",
          "py-1.5",
          "text-sm",
          "has-[>svg]:px-3",
        ],
        lg: [
          "h-12",
          "px-8",
          "py-3",
          "text-lg",
          "has-[>svg]:px-5",
        ],
        icon: ["h-10", "w-10", "p-0"],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
