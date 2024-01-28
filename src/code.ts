import exportPalette from "./exportPalette";
import getPaletteModes from "./getPaletteModes";

const exportTheme = (modeId: string) => {
  const modes = getPaletteModes();
  const palette = exportPalette(modeId);
  return palette;
};

const exportFile = (modeId: string) => {
  const theme = exportTheme(modeId);
  console.log(theme);
  figma.ui.postMessage({ type: "EXPORT_MESSAGE", body: theme });
};

figma.ui.onmessage = (e: { type: string; body: string }) => {
  console.log("code received message", e);
  if (e.type === "EXPORT") {
    exportFile(e.body);
  }
};

figma.showUI(__uiFiles__["export"], {
  width: 800,
  height: 1000,
  themeColors: true,
});

const modes = getPaletteModes();
figma.ui.postMessage({ type: "MODES", body: modes });
