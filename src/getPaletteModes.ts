export default function getPaletteModes(): Array<{
  modeId: string;
  name: string;
}> {
  const collections = figma.variables.getLocalVariableCollections();
  const paletteCollection = collections.find(
    (collection) => collection.name === "palette"
  );
  const modes = paletteCollection?.modes;
  if (modes && modes.length >= 1) {
    return modes;
  }
  return [
    {
      modeId: "default",
      name: "Default",
    },
  ];
}
