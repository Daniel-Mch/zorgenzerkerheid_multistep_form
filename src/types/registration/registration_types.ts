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
