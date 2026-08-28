import { useEffect, useReducer, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type {
  InsuranceCatalog,
  RegistrationFormValues,
  SubmissionPayload,
} from "../../types/registration/registration_types"
import { registrationFormSchema } from "../../types/registration/registration_schemas"
import { getInsuranceCatalog } from "../../api/registration/getInsuranceCatalog"
import { submitApplication } from "../../api/registration/submitApplication"
import { formReducer } from "../../state/registration/formReducer"
import {
  clearPersistedFormState,
  loadPersistedFormState,
  savePersistedFormState,
} from "../../state/registration/formPersistence"

// "Volgende" and the step 3 submit button occupy the same spot in the layout.
// If the click that advances the step is the first half of a double-click, the
// second click lands on whatever now sits there - on step 2 that's the submit
// button, so it submits before the user can touch step 3. Keeping the button
// disabled for a beat after every transition swallows that phantom click.
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

interface UseInsuranceCatalogResult {
  catalog: InsuranceCatalog | null
  loading: boolean
  error: string | null
}

export function useInsuranceCatalog(): UseInsuranceCatalogResult {
  const [catalog, setCatalog] = useState<InsuranceCatalog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    getInsuranceCatalog()
      .then((data) => {
        if (!cancelled) setCatalog(data)
      })
      .catch(() => {
        if (!cancelled)
          setError(
            "Het was niet mogelijk om de verzekeringgegevens te laden. Neem contact met de klantenservice.",
          )
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { catalog, loading, error }
}

export function useRegistrationFlow() {
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

  return {
    form,
    step: state.step,
    busy,
    isSubmitting,
    submitted,
    handleNext,
    handleBack,
    onSubmit,
  }
}
