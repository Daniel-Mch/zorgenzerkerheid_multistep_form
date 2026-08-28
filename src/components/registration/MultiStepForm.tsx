import { useEffect, useReducer, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormContainer } from "./FormContainer"
import { StepIndicator } from "./StepIndicator"
import { PersonalInfoStep } from "./steps/PersonalInfoStep"
import { BasicInsuranceStep } from "./steps/BasicInsuranceStep"
import { AdditionalInsuranceStep } from "./steps/AdditionalInsuranceStep"
import { useInsuranceCatalog } from "./MultiStepForm.hooks"
import { formReducer } from "../../state/registration/formReducer"
import {
  clearPersistedFormState,
  loadPersistedFormState,
  savePersistedFormState,
} from "../../state/registration/formPersistence"
import { registrationFormSchema } from "../../types/registration/registration_schemas"
import type {
  RegistrationFormValues,
  SubmissionPayload,
} from "../../types/registration/registration_types"
import { submitApplication } from "../../api/registration/submitApplication"

const STEP_TRANSITION_GUARD_MS = 350

function createDefaultFormValues(): RegistrationFormValues {
  return {
    personal: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      address: "",
    },
    basicInsurance: null,
    additionalInsurance: [],
  }
}

export function MultiStepForm() {
  const { catalog, loading, error } = useInsuranceCatalog()
  const [persisted] = useState(() => loadPersistedFormState())
  const [state, dispatch] = useReducer(formReducer, {
    step: persisted?.step ?? 1,
  })
  const [busy, setBusy] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: persisted?.values ?? createDefaultFormValues(),
    mode: "onBlur",
  })

  useEffect(() => {
    savePersistedFormState({ step: state.step, values: form.getValues() })
    const subscription = form.watch((values) => {
      savePersistedFormState({
        step: state.step,
        values: values as RegistrationFormValues,
      })
    })
    return () => subscription.unsubscribe()
  }, [state.step, form])

  async function handleNext() {
    if (busy) return
    setBusy(true)
    try {
      const field = state.step === 1 ? "personal" : "basicInsurance"
      const isValid = await form.trigger(field)
      if (!isValid) return
      dispatch({ type: "NEXT" })
      await new Promise((resolve) =>
        setTimeout(resolve, STEP_TRANSITION_GUARD_MS),
      )
    } finally {
      setBusy(false)
    }
  }

  function handleBack() {
    if (busy) return
    dispatch({ type: "BACK" })
  }

  async function onSubmit(values: RegistrationFormValues) {
    if (isSubmitting || !values.basicInsurance) return

    const payload: SubmissionPayload = {
      personal: values.personal,
      basicInsurance: values.basicInsurance,
      additionalInsurance: values.additionalInsurance,
    }

    setIsSubmitting(true)
    try {
      await submitApplication(payload)
      clearPersistedFormState()
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <StepIndicator currentStep={state.step} />

            {state.step === 1 && <PersonalInfoStep />}
            {state.step === 2 && (
              <BasicInsuranceStep plans={catalog.basicInsurance} />
            )}
            {state.step === 3 && (
              <AdditionalInsuranceStep addons={catalog.additionalInsurance} />
            )}

            <div
              className={`flex ${state.step === 1 ? "justify-end" : "justify-between"}`}
            >
              {state.step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={busy || isSubmitting}
                  className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Terug
                </button>
              )}

              {state.step < 3 ? (
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
