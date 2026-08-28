import { FormProvider } from "react-hook-form"
import { FormContainer } from "./FormContainer"
import { StepIndicator } from "./StepIndicator"
import { PersonalInfoStep } from "./steps/PersonalInfoStep"
import { BasicInsuranceStep } from "./steps/BasicInsuranceStep"
import { AdditionalInsuranceStep } from "./steps/AdditionalInsuranceStep"
import { ReviewModal } from "./ReviewModal"
import { PremiumSummaryCard } from "./PremiumSummaryCard"
import { ButtonPrimary, ButtonSecondary } from "../global/Buttons"
import { useInsuranceCatalog, useRegistrationFlow } from "./MultiStepForm.hooks"

export function MultiStepForm() {
  const { catalog, loading, error } = useInsuranceCatalog()
  const {
    form,
    step,
    busy,
    isReviewOpen,
    isSubmitting,
    submitted,
    handleNext,
    handleBack,
    openReview,
    closeReview,
    onSubmit,
  } = useRegistrationFlow()

  const formValues = form.getValues()

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
          <p className="text-slate-600 pb-8">
            Bedankt, {form.getValues("personal.firstName")}! We hebben je
            aanvraag ontvangen.
          </p>

          <a href="https://www.zorgenzekerheid.nl/home">
            <ButtonSecondary>Terug naar homepage</ButtonSecondary>
          </a>
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
            {step === 2 && (
              <BasicInsuranceStep plans={catalog.basicInsurance} />
            )}
            {step === 3 && (
              <AdditionalInsuranceStep addons={catalog.additionalInsurance} />
            )}

            <div className="sticky bottom-0 z-30 space-y-4 border-t border-slate-200 bg-white py-4">
              {step > 1 && !isReviewOpen && <PremiumSummaryCard />}

              <div
                className={`flex ${step === 1 ? "justify-end" : "justify-between"}`}
              >
                {step > 1 && (
                  <ButtonSecondary
                    type="button"
                    onClick={handleBack}
                    disabled={busy || isSubmitting}
                  >
                    Terug
                  </ButtonSecondary>
                )}

                {step < 3 ? (
                  <ButtonPrimary
                    type="button"
                    onClick={handleNext}
                    disabled={busy}
                  >
                    Volgende
                  </ButtonPrimary>
                ) : (
                  <ButtonPrimary
                    type="button"
                    onClick={openReview}
                    disabled={busy}
                  >
                    Overzicht en versturen
                  </ButtonPrimary>
                )}
              </div>
            </div>

            {isReviewOpen && formValues.basicInsurance && (
              <ReviewModal
                basicInsurance={formValues.basicInsurance}
                additionalInsurance={formValues.additionalInsurance}
                isSubmitting={isSubmitting}
                onCancel={closeReview}
              />
            )}
          </form>
        </FormProvider>
      )}
    </FormContainer>
  )
}
