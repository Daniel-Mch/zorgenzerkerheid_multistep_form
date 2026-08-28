import type { Step } from "../../state/registration/formReducer"

const STEPS: Array<{ step: Step; label: string }> = [
  { step: 1, label: "Persoonlijke informatie" },
  { step: 2, label: "Basis pakket" },
  { step: 3, label: "Extra dekking" },
]

interface StepIndicatorProps {
  currentStep: Step
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <ol className="flex gap-2 sm:gap-4" aria-label="Voortgang">
      {STEPS.map(({ step, label }) => {
        const isCurrent = step === currentStep
        const isComplete = step < currentStep

        return (
          <li
            key={step}
            aria-current={isCurrent ? "step" : undefined}
            className={`flex flex-1 flex-col gap-1 border-t-4 pt-2 text-xs sm:text-sm ${
              isCurrent || isComplete
                ? "border-primary text-primary"
                : "border-slate-200 text-slate-400"
            }`}
          >
            <span className="font-medium">Stap {step}</span>
            <span>{label}</span>
          </li>
        )
      })}
    </ol>
  )
}
