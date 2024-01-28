export default function objectToString(obj: Record<string, unknown>): string {
  const stringified = JSON.stringify(obj, null, "\t");
  return stringified.replace(/"([^"]+)":/g, "$1:");
}
