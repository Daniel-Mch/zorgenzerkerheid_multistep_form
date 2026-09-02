import { submissionPayloadSchema } from "../../types/registration/registration_schemas"
import type {
  RegistrationFormValues,
  SubmissionPayload,
} from "../../types/registration/registration_schemas"

export function buildSubmissionPayload(
  values: RegistrationFormValues,
): SubmissionPayload | null {
  const result = submissionPayloadSchema.safeParse(values)
  return result.success ? result.data : null
}
