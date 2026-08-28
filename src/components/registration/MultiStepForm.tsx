import { FormContainer } from "./FormContainer"
import { useInsuranceCatalog } from "./MultiStepForm.hooks"

export function MultiStepForm() {
  const { catalog, loading, error } = useInsuranceCatalog()

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
      {/* TODO: Wrap in formProvider and conditionally render form steps depending on formReducer step state */}
    </FormContainer>
  )
}
