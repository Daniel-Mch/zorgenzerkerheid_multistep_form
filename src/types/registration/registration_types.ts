export interface PersonalInfo {
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  address: string
}

export interface Plan {
  id: string
  name: string
  price: number
  description: string
}

export type Addon = Plan

export interface InsuranceCatalog {
  basicInsurance: Plan[]
  additionalInsurance: Addon[]
}

export interface SubmissionPayload {
  personal: PersonalInfo
  basicInsurance: Plan
  additionalInsurance: Addon[]
}

export interface RegistrationFormValues {
  personal: PersonalInfo
  basicInsurance: Plan | null
  additionalInsurance: Addon[]
}
