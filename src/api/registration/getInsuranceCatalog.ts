import { insuranceCatalogSchema } from "../../types/registration/registration_schemas"
import type { InsuranceCatalog } from "../../types/registration/registration_types"

export async function getInsuranceCatalog(): Promise<InsuranceCatalog> {
  const response = await fetch(`${import.meta.env.BASE_URL}data.json`)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const data = await response.json()
  return insuranceCatalogSchema.parse(data)
}
