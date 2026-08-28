import { describe, expect, it } from "vitest"
import {
  insuranceCatalogSchema,
  personalInfoSchema,
  registrationFormSchema,
} from "../types/registration/registration_schemas"

const validPersonal = {
  firstName: "Jan",
  lastName: "Jansen",
  dateOfBirth: "1990-05-20",
  email: "jan@example.com",
  address: "Teststraat 1",
}

const validPlan = {
  id: "basis",
  name: "Basis",
  price: 145.45,
  description: "Essentiële ziektekosten dekking",
}

describe("personalInfoSchema", () => {
  it("accepts a fully filled-in form", () => {
    expect(personalInfoSchema.safeParse(validPersonal).success).toBe(true)
  })

  it("rejects an empty first name", () => {
    const result = personalInfoSchema.safeParse({
      ...validPersonal,
      firstName: "",
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Voornaam is verplicht")
    }
  })

  it("rejects an invalid email address", () => {
    const result = personalInfoSchema.safeParse({
      ...validPersonal,
      email: "not-an-email",
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Voer een geldig e-mailadres in",
      )
    }
  })
})

describe("registrationFormSchema", () => {
  it("accepts a fully completed registration", () => {
    const result = registrationFormSchema.safeParse({
      personal: validPersonal,
      basicInsurance: validPlan,
      additionalInsurance: [],
    })
    expect(result.success).toBe(true)
  })

  it("rejects a missing basic insurance selection", () => {
    const result = registrationFormSchema.safeParse({
      personal: validPersonal,
      basicInsurance: null,
      additionalInsurance: [],
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["basicInsurance"])
      expect(result.error.issues[0].message).toBe(
        "Selecteer een basisverzekering",
      )
    }
  })

  it("surfaces nested personal info errors", () => {
    const result = registrationFormSchema.safeParse({
      personal: { ...validPersonal, email: "not-an-email" },
      basicInsurance: validPlan,
      additionalInsurance: [],
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(
        result.error.issues.some(
          (issue) => issue.path.join(".") === "personal.email",
        ),
      ).toBe(true)
    }
  })
})

describe("insuranceCatalogSchema", () => {
  it("accepts a well-formed catalog", () => {
    const result = insuranceCatalogSchema.safeParse({
      basicInsurance: [validPlan],
      additionalInsurance: [validPlan],
    })
    expect(result.success).toBe(true)
  })

  it("rejects a plan with a non-numeric price", () => {
    const result = insuranceCatalogSchema.safeParse({
      basicInsurance: [{ ...validPlan, price: "not-a-number" }],
      additionalInsurance: [],
    })
    expect(result.success).toBe(false)
  })

  it("rejects a catalog missing the additionalInsurance list", () => {
    const result = insuranceCatalogSchema.safeParse({
      basicInsurance: [validPlan],
    })
    expect(result.success).toBe(false)
  })
})
