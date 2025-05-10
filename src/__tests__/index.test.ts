import { describe, it, expect } from "vitest"
import * as frontendKit from "../index"

describe("index exports", () => {
  it("should export getSafeFromLocalStorage", () => {
    expect(frontendKit.getSafeFromLocalStorage).toBeDefined()
    expect(typeof frontendKit.getSafeFromLocalStorage).toBe("function")
  })

  it("should export FailureCallback type", () => {
    // Create a function that matches the FailureCallback type
    const callback: frontendKit.FailureCallback = () => {}
    expect(typeof callback).toBe("function")
  })

  it("should have all expected exports", () => {
    const exports = Object.keys(frontendKit)
    expect(exports).toContain("getSafeFromLocalStorage")
  })
})
