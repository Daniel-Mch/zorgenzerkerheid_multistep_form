import { Controller, useFormContext } from "react-hook-form"
import { SelectableCard } from "../../global/SelectableCard"
import type {
  Addon,
  RegistrationFormValues,
} from "../../../types/registration/registration_types"

interface AdditionalInsuranceStepProps {
  addons: Addon[]
}

export function AdditionalInsuranceStep({
  addons,
}: AdditionalInsuranceStepProps) {
  const { control } = useFormContext<RegistrationFormValues>()

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-slate-900">Extra dekking</h2>

      <Controller
        name="additionalInsurance"
        control={control}
        render={({ field }) => (
          <div className="space-y-3">
            {addons.map((addon) => {
              const checked = field.value.some(
                (selected) => selected.id === addon.id,
              )

              return (
                <SelectableCard
                  key={addon.id}
                  type="checkbox"
                  name="additionalInsurance"
                  title={addon.name}
                  description={addon.description}
                  price={addon.price}
                  checked={checked}
                  onChange={(isChecked) => {
                    field.onChange(
                      isChecked
                        ? [...field.value, addon]
                        : field.value.filter(
                            (selected) => selected.id !== addon.id,
                          ),
                    )
                  }}
                />
              )
            })}
          </div>
        )}
      />
    </div>
  )
}
