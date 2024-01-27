import variablesToPalette from "./variablesToPalette";

const collections = figma.variables.getLocalVariableCollections();

const paletteCollection = collections.find(
  (collection) => collection.name === "palette"
);

const palettes: Record<string, unknown> = {};

paletteCollection?.modes.forEach((mode) => {
  const variables = paletteCollection?.variableIds.map((id) =>
    figma.variables.getVariableById(id)
  );

  palettes[mode.name] = variablesToPalette(
    variables as Variable[],
    mode?.modeId
  );
});

console.log(palettes);

figma.closePlugin();
