/**
 * Coarse "quacks like an error" test.
 */
export function isError(value: any): value is Error {
  return (
    typeof value === "object" &&
    value != null &&
    typeof value.message === "string" &&
    typeof value.name === "string" &&
    value.name.endsWith("Error")
  );
}
