import variablesToPalette from "./variablesToPalette";

export default function exportPalette(modeId: string) {
  const collections = figma.variables.getLocalVariableCollections();

  const paletteCollection = collections.find(
    (collection) => collection.name === "palette"
  );

  const variables = paletteCollection?.variableIds.map((id) =>
    figma.variables.getVariableById(id)
  );
  return variablesToPalette(variables as Variable[], modeId);
}
