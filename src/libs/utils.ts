import type { GameMode } from "./types";

export const generateRandomString = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length })
    .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
    .join("");
};

export const modeKeysDefinition = {
  hard: 20,
  medium: 14,
  easy: 10,
};

const alphabet = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i)
);
const arrows = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
export const allKeys = [...arrows, ...alphabet];

export const generateKeys = (mode: GameMode): string[] => {
  const length = modeKeysDefinition[mode];

  const keys = [...arrows];

  // Add some letters to the keys if the mode is not easy
  if (mode === "hard") {
    keys.push(...alphabet);
  } else if (mode === "medium") {
    keys.push("a", "d");
  }
  return Array.from({ length }).map(() => {
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
