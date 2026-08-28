import type { Step } from "./formReducer"
import type { RegistrationFormValues } from "../../types/registration/registration_types"

const STORAGE_KEY = "zz-registration-form"

export interface PersistedFormState {
  step: Step
  values: RegistrationFormValues
}

export function loadPersistedFormState(): PersistedFormState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed: unknown = JSON.parse(raw)
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("step" in parsed) ||
      !("values" in parsed) ||
      typeof (parsed as { step: unknown }).step !== "number" ||
      typeof (parsed as { values: unknown }).values !== "object"
    ) {
      return null
    }

    return parsed as PersistedFormState
  } catch {
    return null
  }
}

export function savePersistedFormState(state: PersistedFormState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage unavailable (e.g. private browsing) - draft simply won't persist
  }
}

export function clearPersistedFormState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
