import type { ButtonHTMLAttributes } from "react"
import { getButtonClassName, type ButtonVariant } from "./buttonStyles"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={getButtonClassName(variant, className)} {...props} />
  )
}

export function ButtonPrimary(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <Button variant="primary" {...props} />
}

export function ButtonSecondary(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return <Button variant="secondary" {...props} />
}
