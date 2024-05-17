import round from "./round";

export default function rgbToHex({ r, g, b, a }: RGBA): string {
  if (a !== 1) {
    return `rgba(${[r, g, b]
      .map((n) => Math.round(n * 255))
      .join(", ")}, ${round(a)})`;
  }
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hex = [toHex(r), toHex(g), toHex(b)].join("");
  return `#${hex}`;
}

export function mapRgba({ r, g, b, a }: RGBA): RGBA {
  return {
    r: roundRGB(r),
    g: roundRGB(g),
    b: roundRGB(b),
    a: round(a),
  };
}

function roundRGB(value: number): number {
  return Math.round(value * 255);
}
