import { FormContainer } from "./FormContainer"
import { useInsuranceCatalog } from "./MultiStepForm.hooks"

export function MultiStepForm() {
  const { catalog, loading, error } = useInsuranceCatalog()

  console.log(catalog, loading, error)

  return (
    <FormContainer>
      <h1 className="text-2xl font-semibold text-slate-900">
        Verzekering afsluiten
      </h1>
    </FormContainer>
  )
}
