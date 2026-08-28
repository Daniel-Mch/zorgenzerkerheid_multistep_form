import { formatCurrency } from "../../utils/formatCurrency"

interface SelectableCardProps {
  type: "radio" | "checkbox"
  name: string
  title: string
  description: string
  price: number
  checked: boolean
  onChange: (checked: boolean) => void
}

export function SelectableCard({
  type,
  name,
  title,
  description,
  price,
  checked,
  onChange,
}: SelectableCardProps) {
  return (
    <label
      className={`flex cursor-pointer items-start justify-between gap-4 rounded-lg border p-4 transition-colors ${
        checked
          ? "border-blue-600 bg-blue-50"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <span className="flex items-start gap-3">
        <input
          type={type}
          name={name}
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-1 h-4 w-4 accent-blue-600"
        />
        <span>
          <span className="block font-semibold text-slate-900">{title}</span>
          <span className="block text-sm text-slate-600">{description}</span>
        </span>
      </span>
      <span className="whitespace-nowrap font-semibold text-slate-900">
        {formatCurrency(price)} p/m
      </span>
    </label>
  )
}
