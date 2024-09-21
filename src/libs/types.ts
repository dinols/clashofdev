export enum Color {
  blue = 'blue',
  green = 'green',
  mustard = 'mustard',
  orange = 'orange',
  pink = 'pink',
  purple = 'purple',
  black = 'black',
}

export enum Jury {
  LLCoolChris_ = 'LLCoolChris_',
  maislina_ = 'maislina_',
  sometimecrea = 'sometimecrea',
}

export type AlpineStore = {
  hovering: boolean;
  alternateTheme: boolean;
  cursor?: Jury;
  scrollProgress: number;
  toggleTheme: () => void;
  toggleCursor: () => void;
};
