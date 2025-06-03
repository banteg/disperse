import { BaseError } from "viem";
import { describe, expect, it } from "vitest";
import { formatError, isUserRejection } from "../errors";

describe("formatError", () => {
  it("should format BaseError with shortMessage", () => {
    const error = new BaseError("Full error message", {
      cause: new Error("Cause"),
    });
    error.shortMessage = "Short message";

    expect(formatError(error)).toBe("Short message");
  });

  it("should format BaseError without shortMessage", () => {
    const error = new BaseError("Full error message");

    expect(formatError(error)).toBe("Full error message");
  });

  it("should format regular Error", () => {
    const error = new Error("Regular error");

    expect(formatError(error)).toBe("Regular error");
  });

  it("should format string error", () => {
    expect(formatError("String error")).toBe("String error");
  });

  it("should handle unknown error types", () => {
    expect(formatError(null)).toBe("An unexpected error occurred");
    expect(formatError(undefined)).toBe("An unexpected error occurred");
    expect(formatError(123)).toBe("An unexpected error occurred");
    expect(formatError({})).toBe("An unexpected error occurred");
  });
});

describe("isUserRejection", () => {
  it("should detect user rejection in BaseError", () => {
    const error = new BaseError("User rejected the request");
    expect(isUserRejection(error)).toBe(true);
  });

  it("should detect user denial in BaseError", () => {
    const error = new BaseError("User denied transaction signature");
    expect(isUserRejection(error)).toBe(true);
  });

  it("should detect user rejection in regular Error", () => {
    const error = new Error("User rejected the request");
    expect(isUserRejection(error)).toBe(true);
  });

  it("should return false for non-rejection errors", () => {
    expect(isUserRejection(new Error("Network error"))).toBe(false);
    expect(isUserRejection("Some string")).toBe(false);
    expect(isUserRejection(null)).toBe(false);
    expect(isUserRejection(undefined)).toBe(false);
  });
});
