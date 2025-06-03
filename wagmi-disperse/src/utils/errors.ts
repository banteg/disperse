import { BaseError } from "viem";

export function formatError(error: unknown): string {
  if (error instanceof BaseError) {
    return error.shortMessage || error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unexpected error occurred";
}

export function isUserRejection(error: unknown): boolean {
  if (error instanceof BaseError) {
    return error.message.includes("User rejected") || error.message.includes("User denied");
  }
  if (error instanceof Error) {
    return error.message.includes("User rejected") || error.message.includes("User denied");
  }
  return false;
}
