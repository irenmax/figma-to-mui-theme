import rgbToHex from "./rgbToHex";

export function variablesToObjects(
  variables: Variable[],
  modeId: string | undefined
): Record<string, unknown> {
  if (!modeId) return {};
  const result: Record<string, unknown> = {};
  for (const v of variables) {
    if (v.name.startsWith("_")) {
      continue;
    }
    const parts = v.name.split("/");

    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part] as Record<string, unknown>;
    }

    const value: VariableValue = v.valuesByMode[modeId];

    if (isVariableAlias(value)) {
      const variable = figma.variables.getVariableById(value.id);
      if (variable) {
        current[parts[parts.length - 1]] = formatVariableAlias(variable.name);
      }
      continue;
    }

    if (isRGBA(value)) {
      current[parts[parts.length - 1]] = rgbToHex(value);
    } else {
      current[parts[parts.length - 1]] = value;
    }
  }
  return result;
}

function isRGBA(value: VariableValue): value is RGBA {
  return (
    typeof value === "object" &&
    "r" in value &&
    "g" in value &&
    "b" in value &&
    "a" in value
  );
}

function isVariableAlias(value: VariableValue): value is VariableAlias {
  return (
    typeof value === "object" &&
    "id" in value &&
    value.type === "VARIABLE_ALIAS"
  );
}

function formatVariableAlias(value: string): string {
  if (value.includes("material/")) {
    const name = value.replace("material/", "colors/");
    return name
      .replace(/\/([^/]+)$/, (match, p1) => `[${p1}]`)
      .replace(/\//g, ".");
  }

  return value
    .replace(/\/([^/]+)$/, (match, p1) => `[${p1}]`)
    .replace(/\//g, ".");
}
