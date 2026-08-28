import type {
  RegistrationFormValues,
  SubmissionPayload,
} from "../../types/registration/registration_types"

export function buildSubmissionPayload(
  values: RegistrationFormValues,
): SubmissionPayload | null {
  if (!values.basicInsurance) return null

  return {
    personal: values.personal,
    basicInsurance: values.basicInsurance,
    additionalInsurance: values.additionalInsurance,
  }
}
