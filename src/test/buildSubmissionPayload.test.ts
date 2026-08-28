import { describe, expect, it } from "vitest"
import { buildSubmissionPayload } from "../state/registration/buildSubmissionPayload"
import type { RegistrationFormValues } from "../types/registration/registration_types"

const personal = {
  firstName: "Jan",
  lastName: "Jansen",
  dateOfBirth: "1990-05-20",
  email: "jan@example.com",
  address: "Teststraat 1",
}

const basicInsurance = {
  id: "basis",
  name: "Basis",
  price: 145.45,
  description: "Essentiële ziektekosten dekking",
}

const additionalInsurance = [
  { id: "dental", name: "Tandarts", price: 12.5, description: "Tandarts" },
]

describe("buildSubmissionPayload", () => {
  it("builds the payload when a basic insurance plan is selected", () => {
    const values: RegistrationFormValues = {
      personal,
      basicInsurance,
      additionalInsurance,
    }

    expect(buildSubmissionPayload(values)).toEqual({
      personal,
      basicInsurance,
      additionalInsurance,
    })
  })

  it("returns null when no basic insurance plan is selected", () => {
    const values: RegistrationFormValues = {
      personal,
      basicInsurance: null,
      additionalInsurance: [],
    }

    expect(buildSubmissionPayload(values)).toBeNull()
  })
})
