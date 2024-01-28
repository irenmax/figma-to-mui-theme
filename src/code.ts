import exportColors from "./exportColors";
import exportPalette from "./exportPalette";
import getPaletteModes from "./getPaletteModes";
import objectToString from "./objectToString";

const exportTheme = (modeId: string) => {
  const palette = exportPalette(modeId);
  const colors = exportColors();

  const functionString = `
  import colors from '@mui/material/colors';

  const customColors = ${objectToString(colors)};

  export function components() {
    return ${objectToString(palette.components as Record<string, unknown>)}
    
  } 

  export function theme() {
    return {
      palette: ${objectToString(palette.palette)},
    }
  }
  `;

  return functionString;
};

const exportFile = (modeId: string) => {
  const theme = exportTheme(modeId);
  figma.ui.postMessage({ type: "EXPORT_MESSAGE", body: theme });
};

const initModes = () => {
  const modes = getPaletteModes();
  figma.ui.postMessage({ type: "MODES", body: modes });
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

initModes();
