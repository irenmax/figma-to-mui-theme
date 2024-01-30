export default function exportShadows() {
  const effects = figma.getLocalEffectStyles();
  const shadowEffects = effects.map((effect) => {
    const { name, effects } = effect;
    const shadowEffects = effects.filter((item) => item.type === "DROP_SHADOW");
    return {
      name,
      shadow: dropShadowEffectsToCssShadow(shadowEffects as DropShadowEffect[]),
    };
  });
  const shadows = shadowEffects.reduce((acc: Record<number, string>, item) => {
    const name = item.name.replace("elevation/", "");
    acc[+name] = item.shadow;
    return acc;
  }, {});
  return {
    0: "none",
    ...shadows,
  };
}

function dropShadowEffectsToCssShadow(effects: DropShadowEffect[]) {
  const visibleEffects = effects.filter((item) => item.visible);
  return visibleEffects
    .map((item) => {
      const { offset, radius, spread, color } = item;

      const cssColor = `rgba(${color.r}, ${color.g}, ${
        color.b
      }, ${color.a.toFixed(2)})`;
      const cssShadow = `${offset.x}px ${offset.y}px ${radius}px ${spread}px ${cssColor}`;

      return cssShadow;
    })
    .join(", ");
}
