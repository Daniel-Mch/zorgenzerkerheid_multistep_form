import { useFormContext, useWatch } from "react-hook-form"
import { formatCurrency } from "../../utils/formatCurrency"
import type { RegistrationFormValues } from "../../types/registration/registration_types"

export function PremiumSummaryCard() {
  const { control } = useFormContext<RegistrationFormValues>()
  const basicInsurance = useWatch({ control, name: "basicInsurance" })
  const additionalInsurance = useWatch({ control, name: "additionalInsurance" })

  const total =
    (basicInsurance?.price ?? 0) +
    additionalInsurance.reduce((sum, addon) => sum + addon.price, 0)

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-primary px-4 py-3 text-white">
      <div className="space-y-1 text-sm">
        <p>
          <span className="font-semibold">Basis pakket:</span>{" "}
          {basicInsurance ? basicInsurance.name : "Nog niet gekozen"}
        </p>
        <p>
          <span className="font-semibold">Extras:</span>{" "}
          {additionalInsurance.length > 0
            ? additionalInsurance.map((addon) => addon.name).join(", ")
            : "Geen"}
        </p>
      </div>
      <div className="text-right">
        <p className="text-xs text-blue-200">Per maand</p>
        <p className="text-lg font-semibold">{formatCurrency(total)}</p>
      </div>
    </div>
  )
}
