import { variablesToObjects } from "./variablesToObjects";

export default function exportColors() {
  const collections = figma.variables.getLocalVariableCollections();

  const colorsCollection = collections.find(
    (collection) => collection.name === "colors"
  );

  const variables = colorsCollection?.variableIds.map((id) =>
    figma.variables.getVariableById(id)
  );
  const customColorVariables = variables?.filter((v) =>
    v?.name.startsWith("custom/")
  );

  const defaultModeId = colorsCollection?.defaultModeId;

  return variablesToObjects(customColorVariables as Variable[], defaultModeId)
    .custom as Record<string, unknown>;
}
