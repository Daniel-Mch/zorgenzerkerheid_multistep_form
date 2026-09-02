import { z } from "zod"

export const planSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
})

export const insuranceCatalogSchema = z.object({
  basicInsurance: z.array(planSchema),
  additionalInsurance: z.array(planSchema),
})

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "Voornaam is verplicht"),
  lastName: z.string().min(1, "Achternaam is verplicht"),
  dateOfBirth: z.string().min(1, "Geboortedatum is verplicht"),
  email: z.email("Voer een geldig e-mailadres in"),
  address: z.string().min(1, "Adres is verplicht"),
})

const registrationBaseSchema = z.object({
  personal: personalInfoSchema,
  basicInsurance: planSchema.nullable(),
  additionalInsurance: z.array(planSchema),
})

export const registrationFormSchema = registrationBaseSchema.refine(
  (data) => data.basicInsurance !== null,
  {
    message: "Selecteer een basisverzekering",
    path: ["basicInsurance"],
  },
)

export const submissionPayloadSchema = registrationBaseSchema.extend({
  basicInsurance: planSchema,
})

export type PersonalInfo = z.infer<typeof personalInfoSchema>
export type Plan = z.infer<typeof planSchema>
export type Addon = Plan
export type InsuranceCatalog = z.infer<typeof insuranceCatalogSchema>
export type RegistrationFormValues = z.infer<typeof registrationFormSchema>
export type SubmissionPayload = z.infer<typeof submissionPayloadSchema>
