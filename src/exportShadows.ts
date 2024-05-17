import { mapRgba } from "./rgbToHex";
import round from "./round";

export default function exportShadows(modeId: string) {
  const effects = figma.getLocalEffectStyles();
  const shadowEffects = effects.map((effect) => {
    const { name, effects } = effect;
    const shadowEffects = effects.filter((item) => item.type === "DROP_SHADOW");
    return {
      name,
      shadow: dropShadowEffectsToCssShadow(
        shadowEffects as DropShadowEffect[],
        modeId
      ),
    };
  });
  return [
    "none",
    ...shadowEffects.map((item) => {
      return item.shadow;
    }),
  ];
}

function dropShadowEffectsToCssShadow(
  effects: DropShadowEffect[],
  modeId: string
) {
  const visibleEffects = effects.filter((item) => item.visible);
  return visibleEffects
    .map((item) => {
      const { offset, radius, spread, boundVariables } = item;
      let color = { r: 0, g: 0, b: 0, a: 1 };
      if (boundVariables?.color) {
        const colorVariable = figma.variables.getVariableById(
          boundVariables.color.id
        );
        if (colorVariable) {
          const value = colorVariable.valuesByMode[modeId];
          if (value) {
            color = mapRgba(value as RGBA);
          }
        }
      }

      const cssColor = `rgba(${round(color.r)}, ${round(color.g)}, ${round(
        color.b
      )}, ${round(color.a)})`;
      const cssShadow = `${offset.x}px ${offset.y}px ${radius}px ${spread}px ${cssColor}`;

      return cssShadow;
    })
    .join(", ");
}
