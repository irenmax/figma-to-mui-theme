# figma-to-mui-theme

This Figma plugin is a quick proof of concept for generating a usable theme and styles for MUI from variables provided by a file that is built on the [MUI for Figma](https://mui.com/store/items/figma-react/) library.

⚠️ This plugin currently only works for color palettes and does not support other styles yet (typography, effects, etc.).

## Setup Variable Collections

To produces a usable result, the varialbe collections need to be restructured a bit:

### Custom colors

If you use custom colors, move the existing material colors to a variable group called `material`: For example, rename `amber` to `material/amber` and Figma orders them into groups.  
Your custom colors should then be put inside the `customColors` group.

### Paper elevation

The MUI library in Figma contains different colors for elevation levels, but those do not exist in a MUI theme palette. Remove the `background/paper-elevation-x` variables. Add one variable `background/paper` which defines the paper background.

## Run the Plugin

1. run `npm setup`
2. Go to Figma and open a file
3. From the _Figma_ menu in the top left, select **Plugins** -> **Development** -> **Import plugin from manifest**
4. Select the `manifest.json` from this project
5. Now you can find the plugin in your _Plugins_ panel in design and dev mode.
