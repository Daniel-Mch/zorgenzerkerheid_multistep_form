import { describe, expect, it } from "vitest"
import {
  formReducer,
  type FormState,
} from "../state/registration/formReducer"

describe("formReducer", () => {
  it("advances to the next step on NEXT", () => {
    expect(formReducer({ step: 1 }, { type: "NEXT" })).toEqual({ step: 2 })
  })

  it("goes back to the previous step on BACK", () => {
    expect(formReducer({ step: 2 }, { type: "BACK" })).toEqual({ step: 1 })
  })

  it("does not advance past the last step", () => {
    expect(formReducer({ step: 3 }, { type: "NEXT" })).toEqual({ step: 3 })
  })

  it("does not go back before the first step", () => {
    expect(formReducer({ step: 1 }, { type: "BACK" })).toEqual({ step: 1 })
  })

  it("walks through all three steps and back", () => {
    let state: FormState = { step: 1 }
    state = formReducer(state, { type: "NEXT" })
    state = formReducer(state, { type: "NEXT" })
    expect(state).toEqual({ step: 3 })

    state = formReducer(state, { type: "BACK" })
    state = formReducer(state, { type: "BACK" })
    expect(state).toEqual({ step: 1 })
  })
})
