export default function objectToString(obj: Record<string, unknown>): string {
  return JSON.stringify(obj, null, "\t");
}
