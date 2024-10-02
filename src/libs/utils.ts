import type { GameMode } from './types';

export const generateRandomString = (length: number): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length })
    .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
    .join('');
};

export const generateKeys = (mode: GameMode): string[] => {
  const definition = {
    hard: 16,
    medium: 14,
    easy: 10,
  };

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  );

  const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  // Add some letters to the keys if the mode is not easy
  if (mode !== 'easy') {
    keys.push(
      ...alphabet
        .sort(() => Math.random() - 0.5)
        .slice(0, mode === 'hard' ? alphabet.length : 2)
    );
  }

  return Array.from({ length }, () => {
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  });
};
