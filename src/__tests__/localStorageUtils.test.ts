import { describe, it, expect, beforeEach, vi } from "vitest"
import { getSafeFromLocalStorage } from "../localStorageUtils"

describe("getSafeFromLocalStorage", () => {
  // Setup and teardown
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it("should return null when key does not exist", () => {
    const result = getSafeFromLocalStorage("nonexistent-key")
    expect(result).toBeNull()
  })

  it("should handle boolean values stored as strings", () => {
    localStorage.setItem("bool-true", "true")
    localStorage.setItem("bool-false", "false")

    expect(getSafeFromLocalStorage("bool-true")).toBe(true)
    expect(getSafeFromLocalStorage("bool-false")).toBe(false)
  })

  it("should parse and return valid JSON data", () => {
    const testData = { name: "John", age: 30 }
    localStorage.setItem("user", JSON.stringify(testData))

    const result = getSafeFromLocalStorage<typeof testData>("user")
    expect(result).toEqual(testData)
  })

  it("should return string data when content is not JSON", () => {
    const testString = "Hello, World!"
    localStorage.setItem("greeting", testString)

    const result = getSafeFromLocalStorage("greeting")
    expect(result).toBe(testString)
  })

  it("should handle invalid JSON and return as string", () => {
    const invalidJson = "{ invalid json }"
    localStorage.setItem("invalid", invalidJson)

    const result = getSafeFromLocalStorage("invalid")
    expect(result).toBe(invalidJson)
  })

  it("should call failureCallback when JSON parsing fails", () => {
    const failureCallback = vi.fn()
    const invalidJson = "{ invalid json }"
    localStorage.setItem("invalid", invalidJson)

    getSafeFromLocalStorage("invalid", failureCallback)
    expect(failureCallback).toHaveBeenCalled()
  })

  it("should handle and remove corrupted data", () => {
    const key = "corrupted"

    // Spy on localStorage methods
    const mockRemoveItem = vi.spyOn(localStorage, "removeItem")
    const mockGetItem = vi.spyOn(localStorage, "getItem")

    // Mock getItem to throw an error
    mockGetItem.mockImplementation(() => {
      throw new Error("Corrupted data")
    })

    const result = getSafeFromLocalStorage(key)

    expect(result).toBeNull()
    expect(mockRemoveItem).toHaveBeenCalledWith(key)

    // Cleanup
    mockGetItem.mockRestore()
    mockRemoveItem.mockRestore()
  })

  it("should handle undefined or null JSON values", () => {
    localStorage.setItem("null-value", JSON.stringify(null))
    localStorage.setItem("undefined-value", JSON.stringify(undefined))

    const result1: string | null | boolean = getSafeFromLocalStorage("null-value")
    const result2: string | null | boolean = getSafeFromLocalStorage("undefined-value")

    expect(result1).toBe("null")
    expect(result2).toBeNull()
  })
})
