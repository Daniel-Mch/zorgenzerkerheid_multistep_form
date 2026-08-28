export type ButtonVariant = "primary" | "secondary"

const baseButtonClassName =
  "rounded-lg px-4 py-2 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

const variantClassNames: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:brightness-90",
  secondary: "border border-slate-300 text-slate-700 hover:bg-slate-50",
}

export function getButtonClassName(
  variant: ButtonVariant = "primary",
  className = "",
) {
  return `${baseButtonClassName} ${variantClassNames[variant]} ${className}`.trim()
}
