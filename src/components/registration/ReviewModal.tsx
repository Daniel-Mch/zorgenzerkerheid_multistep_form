import { useEffect } from "react"
import { formatCurrency } from "../../utils/formatCurrency"
import { ButtonPrimary, ButtonSecondary } from "../global/Buttons"
import type { Addon, Plan } from "../../types/registration/registration_schemas"

interface ReviewModalProps {
  basicInsurance: Plan
  additionalInsurance: Addon[]
  isSubmitting: boolean
  onCancel: () => void
}

export function ReviewModal({
  basicInsurance,
  additionalInsurance,
  isSubmitting,
  onCancel,
}: ReviewModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onCancel])

  const total =
    basicInsurance.price +
    additionalInsurance.reduce((sum, addon) => sum + addon.price, 0)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
      >
        <h2
          id="review-modal-title"
          className="text-lg font-semibold text-slate-900"
        >
          Controleer je keuzes
        </h2>

        <div className="mt-4 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-500">
              Basis pakket
            </h3>
            <div className="mt-1 flex justify-between text-slate-900">
              <span>{basicInsurance.name}</span>
              <span>{formatCurrency(basicInsurance.price)}</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-500">
              Extra dekking
            </h3>
            {additionalInsurance.length > 0 ? (
              <ul className="mt-1 space-y-1">
                {additionalInsurance.map((addon) => (
                  <li
                    key={addon.id}
                    className="flex justify-between text-slate-900"
                  >
                    <span>{addon.name}</span>
                    <span>{formatCurrency(addon.price)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-slate-500">Geen extra dekking</p>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 font-semibold text-slate-900">
          <span>Totaal per maand</span>
          <span>{formatCurrency(total)}</span>
        </div>

        <div className="mt-6 space-y-2">
          <ButtonPrimary type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Versturen…" : "Versturen"}
          </ButtonPrimary>
          <ButtonSecondary
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="w-full"
          >
            Wijzigen
          </ButtonSecondary>
        </div>
      </div>
    </div>
  )
}
