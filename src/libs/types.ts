// COLOR PALETTE
export enum Color {
  blue = "blue",
  green = "green",
  mustard = "mustard",
  orange = "orange",
  pink = "pink",
  purple = "purple",
  black = "black",
}

// JURY
export enum Jury {
  LLCoolChris_ = "LLCoolChris_",
  maislina_ = "maislina_",
  sometimecrea = "sometimecrea",
}

// GLOBAL STORE
export type AlpineStore = {
  hovering: boolean;
  darkTheme: boolean;
  cursor: number;
  scrollProgress: number;
  toggleTheme: () => void;
  toggleCursor: () => void;
};

// GAME STATE MACHINE
export type GameMode = "hard" | "medium" | "easy";
export type GameType = "solo" | "multiplayer";
export type Player = {
  id: string;
  name: string;
  character: string;
  inputs: string[];
  host?: boolean;
  completedAt?: number;
};

export type MachineContext = {
  // App
  socket: WebSocket | null;
  error: string | null;
  // Game settings
  code: string | null;
  playerId: string;
  type: GameType;
  mode: GameMode;
  players: Player[];
  // Round definition
  keys: string[];
  startAt: number;
};

export type MachineEvents = {
  type:
    | "CONNECTION_SUCCESS"
    | "CONNECTION_FAILURE"
    | "CONNECTION_ERROR"
    | "STATUS"
    | "SET_ERROR"
    | "SELECT_SETTINGS"
    | "SET_PLAYER"
    | "CONFIRM_LOBBY"
    | "CONFIRM_SELECTION"
    | "KEYPRESS"
    | "RESTART"
    | "HOME";
  data: Record<string, any>;
};
