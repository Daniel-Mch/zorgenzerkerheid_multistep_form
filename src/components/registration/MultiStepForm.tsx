import { FormProvider } from "react-hook-form"
import { FormContainer } from "./FormContainer"
import { StepIndicator } from "./StepIndicator"
import { PersonalInfoStep } from "./steps/PersonalInfoStep"
import { BasicInsuranceStep } from "./steps/BasicInsuranceStep"
import { AdditionalInsuranceStep } from "./steps/AdditionalInsuranceStep"
import { useInsuranceCatalog, useRegistrationFlow } from "./MultiStepForm.hooks"

export function MultiStepForm() {
  const { catalog, loading, error } = useInsuranceCatalog()
  const {
    form,
    step,
    busy,
    isSubmitting,
    submitted,
    handleNext,
    handleBack,
    onSubmit,
  } = useRegistrationFlow()

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-5">
        <p>Pakketen worden geladen…</p>
      </div>
    )
  }

  if (error || !catalog) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-5">
        <p role="alert" className="text-red-600">
          {error ?? "Verzekering data niet beschikbaar"}
        </p>
      </div>
    )
  }

  return (
    <FormContainer>
      <h1 className="text-2xl font-semibold text-slate-900">
        Verzekering afsluiten
      </h1>

      {submitted ? (
        <div className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">
            Aanvraag verstuurd!
          </h2>
          <p className="text-slate-600">
            Bedankt, {form.getValues("personal.firstName")}! We hebben je
            aanvraag ontvangen.
          </p>
        </div>
      ) : (
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-8"
            noValidate
          >
            <StepIndicator currentStep={step} />

            {step === 1 && <PersonalInfoStep />}
            {step === 2 && <BasicInsuranceStep plans={catalog.basicInsurance} />}
            {step === 3 && (
              <AdditionalInsuranceStep addons={catalog.additionalInsurance} />
            )}

            <div
              className={`flex ${step === 1 ? "justify-end" : "justify-between"}`}
            >
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={busy || isSubmitting}
                  className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Terug
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={busy}
                  className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Volgende
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={busy || isSubmitting}
                  className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Versturen…" : "Bevestigen en versturen"}
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      )}
    </FormContainer>
  )
}
