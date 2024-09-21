// COLOR PALETTE
export enum Color {
  blue = 'blue',
  green = 'green',
  mustard = 'mustard',
  orange = 'orange',
  pink = 'pink',
  purple = 'purple',
  black = 'black',
}

// JURY
export enum Jury {
  LLCoolChris_ = 'LLCoolChris_',
  maislina_ = 'maislina_',
  sometimecrea = 'sometimecrea',
}

// GLOBAL STORE
export type AlpineStore = {
  hovering: boolean;
  darkTheme: boolean;
  cursor?: Jury;
  scrollProgress: number;
  toggleTheme: () => void;
  toggleCursor: () => void;
};
