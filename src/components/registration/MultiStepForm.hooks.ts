import { useEffect, useReducer, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type {
  InsuranceCatalog,
  RegistrationFormValues,
} from "../../types/registration/registration_schemas"
import { registrationFormSchema } from "../../types/registration/registration_schemas"
import { getInsuranceCatalog } from "../../api/registration/getInsuranceCatalog"
import { submitApplication } from "../../api/registration/submitApplication"
import { formReducer } from "../../state/registration/formReducer"
import { buildSubmissionPayload } from "../../state/registration/buildSubmissionPayload"
import {
  clearPersistedFormState,
  loadPersistedFormState,
  savePersistedFormState,
} from "../../state/registration/formPersistence"

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
  const [isReviewOpen, setIsReviewOpen] = useState(false)
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
      if (isValid) dispatch({ type: "NEXT" })
    } finally {
      setBusy(false)
    }
  }

  function handleBack() {
    if (busy) return
    dispatch({ type: "BACK" })
  }

  async function openReview() {
    if (busy) return
    setBusy(true)
    try {
      const isValid = await form.trigger()
      if (isValid) setIsReviewOpen(true)
    } finally {
      setBusy(false)
    }
  }

  function closeReview() {
    setIsReviewOpen(false)
  }

  async function onSubmit(values: RegistrationFormValues) {
    if (isSubmitting) return
    const payload = buildSubmissionPayload(values)
    if (!payload) return

    setIsSubmitting(true)
    try {
      await submitApplication(payload)
      clearPersistedFormState()
      setIsReviewOpen(false)
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    form,
    step: state.step,
    busy,
    isReviewOpen,
    isSubmitting,
    submitted,
    handleNext,
    handleBack,
    openReview,
    closeReview,
    onSubmit,
  }
}
