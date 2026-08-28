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
