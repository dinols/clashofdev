import type { GameMode } from "./types";

export const generateRandomString = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length })
    .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
    .join("");
};

export const modeKeysDefinition = {
  hard: 16,
  medium: 14,
  easy: 10,
};

export const generateKeys = (mode: GameMode): string[] => {
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  );

  const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  // Add some letters to the keys if the mode is not easy
  if (mode !== "easy") {
    keys.push(
      ...alphabet
        .sort(() => Math.random() - 0.5)
        .slice(0, mode === "hard" ? alphabet.length : 2)
    );
  }

  return Array.from({ length }, () => {
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  });
};

export const extractStateValue = (value: any): string => {
  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  return Object.keys(value)[0] ?? "";
};
