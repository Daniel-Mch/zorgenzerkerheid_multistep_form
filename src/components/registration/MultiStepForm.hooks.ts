import { useEffect, useState } from "react"
import type { InsuranceCatalog } from "../../types/registration/registration_types"
import { getInsuranceCatalog } from "../../api/registration/getInsuranceCatalog"

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
