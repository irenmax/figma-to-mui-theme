import { variablesToObjects } from "./variablesToObjects";

export default function exportPalette(modeId: string) {
  const collections = figma.variables.getLocalVariableCollections();

  const paletteCollection = collections.find(
    (collection) => collection.name === "palette"
  );

  const variables = paletteCollection?.variableIds.map((id) =>
    figma.variables.getVariableById(id)
  );

  const styles = variablesToObjects(variables as Variable[], modeId);
  const { components, ...palette } = styles;
  return {
    components: components,
    palette: palette,
  };
}
