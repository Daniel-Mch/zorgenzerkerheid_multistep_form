import { Controller, useFormContext } from "react-hook-form"
import { SelectableCard } from "../../global/SelectableCard"
import type {
  Plan,
  RegistrationFormValues,
} from "../../../types/registration/registration_types"

interface BasicInsuranceStepProps {
  plans: Plan[]
}

export function BasicInsuranceStep({ plans }: BasicInsuranceStepProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegistrationFormValues>()

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-slate-900">
        Kies je basisverzekering
      </h2>

      <Controller
        name="basicInsurance"
        control={control}
        render={({ field }) => (
          <div className="space-y-3">
            {plans.map((plan) => (
              <SelectableCard
                key={plan.id}
                type="radio"
                name="basicInsurance"
                title={plan.name}
                description={plan.description}
                price={plan.price}
                checked={field.value?.id === plan.id}
                onChange={() => field.onChange(plan)}
              />
            ))}
          </div>
        )}
      />

      {errors.basicInsurance && (
        <p className="text-sm text-red-600">
          {errors.basicInsurance.message}
        </p>
      )}
    </div>
  )
}
