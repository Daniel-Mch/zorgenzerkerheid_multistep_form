import { z } from "zod"

const planSchema = z.object({
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

export const registrationFormSchema = z
  .object({
    personal: personalInfoSchema,
    basicInsurance: planSchema.nullable(),
    additionalInsurance: z.array(planSchema),
  })
  .refine((data) => data.basicInsurance !== null, {
    message: "Selecteer een basisverzekering",
    path: ["basicInsurance"],
  })
