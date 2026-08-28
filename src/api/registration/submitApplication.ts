import type { SubmissionPayload } from "../../types/registration/registration_types"

export async function submitApplication(
  payload: SubmissionPayload,
): Promise<{ ok: true }> {
  console.log("POST /api/applications", payload)
  await new Promise((resolve) => setTimeout(resolve, 600))
  return { ok: true }
}
