export type Step = 1 | 2 | 3

export const MIN_STEP: Step = 1
export const MAX_STEP: Step = 3

export interface FormState {
  step: Step
}

export type FormAction = { type: "NEXT" } | { type: "BACK" }

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "NEXT":
      return state.step >= MAX_STEP
        ? state
        : { step: (state.step + 1) as Step }
    case "BACK":
      return state.step <= MIN_STEP
        ? state
        : { step: (state.step - 1) as Step }
    default:
      return state
  }
}
