export default function exportTextStyles() {
  const typographyStyles = figma.getLocalTextStyles();
  const fontStyles = typographyStyles.map(
    (style) =>
      ({
        name: style.name,
        fontFamily: style.fontName.family,
        fontWeight: mapFontStyleToWeight(style.fontName.style),
        fontSize: style.fontSize,
        lineHeight: lineHeightToString(style.lineHeight),
        letterSpacing: letterSpacintToString(style.letterSpacing),
      } as LocalStyle)
  );
  return splitStyles(fontStyles.filter((style) => !style.name.includes("_")));
}

function mapFontStyleToWeight(fontStyle: string) {
  switch (fontStyle) {
    case "Thin":
      return 100;
    case "ExtraLight":
      return 200;
    case "Light":
      return 300;
    case "Regular":
      return 400;
    case "Medium":
      return 500;
    case "SemiBold":
      return 600;
    case "Bold":
      return 700;
    case "ExtraBold":
      return 800;
    case "Black":
      return 900;
  }
}

function lineHeightToString(lineHeight: LineHeight) {
  if (lineHeight.unit === "PIXELS") {
    return `${lineHeight.value}px`;
  } else if (lineHeight.unit === "PERCENT") {
    return `${lineHeight.value}%`;
  } else {
    return "auto";
  }
}

function letterSpacintToString(letterSpacing: LetterSpacing) {
  if (letterSpacing.unit === "PIXELS") {
    return `${letterSpacing.value}px`;
  } else if (letterSpacing.unit === "PERCENT") {
    return `${letterSpacing.value}%`;
  } else {
    return "normal";
  }
}

function splitStyles(styles: LocalStyle[]) {
  const stylesObject: Record<string, unknown> = {};
  styles.forEach((style) => {
    const parts = style.name.split("/");
    let current = stylesObject;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part] as Record<string, unknown>;
    }
    const { name, ...value } = style as LocalStyle;
    current[parts[parts.length - 1]] = value;
  });
  return stylesObject;
}

type LocalStyle = {
  name: string;
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
  lineHeight: string;
  letterSpacing: string;
};
