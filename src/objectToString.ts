export default function objectToString(obj: Record<string, unknown>): string {
  const stringified = JSON.stringify(obj, null, "\t");
  // const s = stringified
  //   .replace(/\"color/g, "color")
  //   .replace(/\"custom/g, "custom")
  //   .replace(/]\"/g, "]");
  //
  // console.log(s);
  return stringified;
}
