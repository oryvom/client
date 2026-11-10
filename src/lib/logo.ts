import fs from "node:fs";
import path from "node:path";

const extensions = new Set([".svg", ".png", ".webp", ".jpg", ".jpeg"]);

function readLogoFiles(): string[] {
  const directory = path.join(process.cwd(), "public", "logo");
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((file) => {
      if (file.startsWith(".")) return false;
      return extensions.has(path.extname(file).toLowerCase());
    })
    .sort((a, b) => a.localeCompare(b));
}

function choose(files: string[], variant: "on-dark" | "on-light"): string | null {
  if (files.length === 0) return null;

  const match = (needles: string[]) =>
    files.find((file) => needles.some((needle) => file.toLowerCase().includes(needle)));

  if (variant === "on-dark") {
    const preferred = match(["white", "light", "inverse", "ondark", "on-dark"]);
    if (preferred) return `/logo/${preferred}`;
  } else {
    const preferred = match(["dark", "navy", "colour", "color", "onlight", "on-light"]);
    if (preferred) return `/logo/${preferred}`;
    const neutral = files.find(
      (file) => !/white|light|inverse|ondark|on-dark/.test(file.toLowerCase()),
    );
    if (neutral) return `/logo/${neutral}`;
  }

  const svg = files.find((file) => file.toLowerCase().endsWith(".svg"));
  return `/logo/${svg ?? files[0]}`;
}

const files = readLogoFiles();

export const logoSources: { onDark: string | null; onLight: string | null } = {
  onDark: choose(files, "on-dark"),
  onLight: choose(files, "on-light"),
};
