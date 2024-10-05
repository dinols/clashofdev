import { setup, assign, fromCallback } from "xstate";
import type { EventObject } from "xstate";
import type { MachineContext, MachineEvents, Player } from "./types";
import { generateRandomString, generateKeys } from "./utils";

const connectToWebsocket = fromCallback<
  EventObject,
  {
    code: string;
  }
>(({ input, sendBack }) => {
  const { code } = input;

  const socket = new WebSocket(
    `${import.meta.env.PUBLIC_WS_URL!}/room/${code}`
  );

  socket.onopen = () => {
    sendBack({
      type: "CONNECTION_SUCCESS",
      socket,
    });
  };

  socket.onerror = (error) => {
    sendBack({
      type: "CONNECTION_ERROR",
    });
  };
});

const listenToWebsocket = fromCallback<
  EventObject,
  {
    socket?: WebSocket;
  }
>(({ input, sendBack }) => {
  const { socket } = input;

  if (!socket) {
    sendBack({ type: "CONNECTION_FAILURE" });
    return;
  }

  const messageHandler = (event: MessageEvent) => {
    if (event.data === "ping") return;
    const parsed = JSON.parse(event.data);

    switch (parsed.type) {
      case "status":
        sendBack({
          type: "STATUS",
          data: parsed.data,
        });
        break;
      default:
        console.log(parsed.data);
        break;
    }
  };

  const closeConnectionHandler = () => {
    sendBack({ type: "CONNECTION_FAILURE" });
  };

  socket?.addEventListener("close", closeConnectionHandler);
  socket?.addEventListener("message", messageHandler);

  return () => {
    socket?.removeEventListener("message", messageHandler);
    socket?.removeEventListener("close", closeConnectionHandler);
  };
});

export const machine = ({ code = null }: { code: string | null }) =>
  setup({
    types: {
      events: {} as MachineEvents,
      context: {} as MachineContext,
    },
    actors: {
      connectToWebsocket,
      listenToWebsocket,
    },
    actions: {
      setError: assign({
        error: ({ event }) => event.data.error,
      }),
      selectSettings: assign({
        type: ({ event, context }) =>
          "type" in event.data ? event.data.type : context.type,
        mode: ({ event, context }) =>
          "mode" in event.data ? event.data.mode : context.mode,
      }),
      setCode: assign({
        code: ({ context }) => {
          if (context.type === "solo") return null;
          return generateRandomString(6).toUpperCase();
        },
      }),
      setPlayer: assign({
        players: ({ context, event }) => {
          const [self] = context.players;

          return [
            {
              ...self,
              id: self.id ?? generateRandomString(12),
              name: event.data.name,
              character: event.data.character,
            },
            ...context.players.slice(1),
          ];
        },
      }),
      confirmSelection: assign(({ context }) => {
        if (context.type === "multiplayer") return context;
        return {
          ...context,
          players: [
            ...context.players,
            {
              id: "opponent",
              name: "Opponent",
              character: "boosted",
              score: 0,
              inputs: [],
            },
          ],
        };
      }),
      setKeys: assign({
        keys: ({ context, event }) => {
          if (context.type === "multiplayer") return context.keys;
          return generateKeys(context.mode);
        },
        players: ({ context }) => {
          return context.players.map((player) => ({
            ...player,
            inputs: [],
          }));
        },
      }),
      setTime: assign({
        startAt: new Date().getTime() + 5000,
      }),
      setScore: assign({
        players: ({ context }) => {
          if (context.type === "multiplayer") return context.players;

          const [self] = context.players;
          const total = self.inputs.reduce((acc, input, index) => {
            return acc + (input === context.keys[index] ? 1 : 0);
          }, 0);

          return [
            {
              ...self,
              score: self.score + (total > context.keys.length / 2 ? 1 : 0),
            },
            {
              ...context.players[1],
              score:
                context.players[1].score +
                (total <= context.keys.length / 2 ? 1 : 0),
            },
          ];
        },
      }),
      pressedKey: assign({
        players: ({ context, event }) => {
          const [self, opponent] = context.players;

          // TODO Emit health loss, do not append if incorrect

          if (event.data.opponent) {
            return [
              self,
              {
                ...opponent,
                inputs: [...opponent.inputs, event.data.key],
              },
            ];
          }

          return [
            {
              ...self,
              inputs: [...self.inputs, event.data.key],
            },
            opponent,
          ];
        },
      }),
      resetSettings: assign({
        type: "solo",
        mode: "easy",
        keys: [],
        players: [],
        startAt: new Date().getTime(),
      }),
      wsStatus: assign({
        type: ({ event, context }) =>
          "type" in event.data ? event.data.type : context.type,
        mode: ({ event, context }) =>
          "mode" in event.data ? event.data.mode : context.mode,
        players: ({ event, context }) =>
          "players" in event.data ? event.data.players : context.players,
        keys: ({ event, context }) =>
          "keys" in event.data ? event.data.keys : context.keys,
        startAt: ({ event, context }) =>
          "startAt" in event.data ? event.data.startAt : context.startAt,
      }),
    },
    guards: {
      isStarted: ({ context }) => {
        return new Date().getTime() > context.startAt;
      },
      isCompleted: ({ context }) => {
        return context.players
          .filter((f) => f.id !== "opponent")
          .every((player) => player.inputs.length === context.keys.length);
      },
      isEnded: ({ context }) => {
        return context.players.some((player) => player.score === 5);
      },
      isHost: ({ context }) => {
        return !!context.players[0]?.host;
      },
      playersSelected: ({ context }) => {
        return context.players.every((player) => player.character);
      },
      isMultiplayer: ({ context }) => {
        return context.type === "multiplayer";
      },
      hasCode: ({ context }) => {
        return !!context.code;
      },
    },
  }).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QGMD2EDEBhA8gOTwFEsAVASXwH0AxAQTIBkBVAJUIG0AGAXUVAAdUsAJYAXYagB2fEAA9EAFgBMAGhABPRAA4AjADoArJ2MmjSgJwKdBgL421aCHoA2qAEZv1GAMqEGxEkpfEnI8AHFvLl4kEEERcSkZeQQdJX0lAGZUgy0lADZzJU4srTVNBAKlPQB2HQyFXK1OLRaDczsHdBd3T2x8ajIWAFlKBhwAIXGATSiZOLEJaRjkhQUMvRNOJSsdc3NOPLqyxCKq7b29pWrzHRbqrQ6QR26PL1w8AeHRien2HWiBEIFollic8pxDHklAZ6kpdM0MscEFo2hsMnlVgprhiDHVHs80JJJGBkOJJFA+gQAhQ8EEmFgsIRvJEeHMgQklqBkgZVBpEDpOEY9PkLOZaqtcvd8V1CcTScJyZSiKQaZRCCwWDgWLMYvMOUlFGsNiZtjpdvtDoi+QhoVVqgoLtVquixQ97E8ulAAIYAWzAPhItBITBZANi7MWBpS1nWxTqGS2cLFqSR1U41RqDr2CjyPIMBgx0qc3r9elgYGcJNEPkIgQACgxaFN1TrAfFI6CEOYeXoMemdFDbuZDkixeYaloMastjCFG0i3oS2AyxWq5TPiNfP4VfhW+H2yCufyBesstDuxkitctNUkSf9ILzJP7QY56tbO7nku9PwvQBXctMD3PUOyPaMbhqeoHW2BQDknO8in0Z1uzWKE7kyBdv34ZwvXUBUKQAaUIKY6zYZlgIjQ85EQcEDA2e5bk4PZ02UcwEIxYUB2aGFoU4HRqkw31l2w3D8IwCiD05aiEHtLQ9AaVYMi0DJzHRNoDDvB08kMFF9h5VJnQyQTSxEvDFT+MMQKo5JZPkrRFOU1Tc27O9LwhTIUIyaoMX42pjOXAAnOA-2casyMDFgSAk4EpOSM1ij0M91Lc69b2tHQGgzG5CgTZ1OCsFp-L0ILYBC6sAAkcCGDhWV1SjYrBCEC2hWF4WUpEMQzc49kOSxvIEx5JHQOAZEcNlJKjABaPIkWm41NgW4w4QXVxXnGmKoyxJFcghM0xThBplLPBdZSrfD1v1TtlCRNIM2qIxjCaLzhzaN1OmLISLtA6T8wzdNdCaZj7QsVMURqOM6i0G57hzIry0rUkvusxBXT0Ro0isLTBTS8oBSaSDuzyS8cXtHQit-ADICRhqUgyHJEvu1ImJhpiNOtG91iKLI6ksK8b3JnCzKgamoyhdY1nugx7QdA5VNc3M9AHQp8oLZQ5yKkqypFzsnwhWp0UvOoeSuUp0odBQ0bpm8bgBqc7DsIA */
    id: "cod",
    context: {
      code,
      error: null,
      socket: null,
      type: "solo",
      mode: "easy",
      keys: [],
      players: [],
      startAt: new Date().getTime(),
    },
    initial: "loading",
    states: {
      loading: {
        after: {
          1500: [
            {
              target: "#cod.connecting",
              guard: "hasCode",
            },
            {
              target: "#cod.lobby",
            },
          ],
        },
      },
      lobby: {
        entry: ["resetSettings"],
        on: {
          SELECT_SETTINGS: {
            actions: ["selectSettings", "setCode"],
          },
          CONFIRM_LOBBY: [
            {
              target: "#cod.connecting",
              guard: "isMultiplayer",
            },
            {
              target: "#cod.game.paused",
            },
          ],
        },
      },
      connecting: {
        invoke: {
          id: "connectToWebsocket",
          src: "connectToWebsocket",
          input: ({ context: { code } }) => ({ code: code! }),
        },
        on: {
          CONNECTION_SUCCESS: {
            target: "#cod.select",
            actions: assign({
              socket: ({ event }) => event.data.socket,
            }),
          },
          CONNECTION_ERROR: {
            target: "#cod.lobby",
          },
        },
      },
      select: {
        on: {
          SET_PLAYER: {
            actions: ["setPlayer"],
          },
          CONFIRM_SELECTION: {
            target: "#cod.game.paused",
            actions: ["confirmSelection", "setKeys", "setTime"],
          },
        },
      },
      game: {
        initial: "paused",
        states: {
          paused: {
            always: {
              target: "#cod.game.playing",
              guard: "isStarted",
            },
          },
          playing: {
            always: [
              {
                target: "#cod.result",
                guard: "isEnded",
              },
              {
                target: "#cod.game.paused",
                guard: "isCompleted",
                actions: ["setScore", "setTime", "setKeys"],
              },
            ],
            on: {
              KEYPRESS: {
                actions: ["pressedKey"],
              },
            },
          },
        },
        on: {
          STATUS: {
            actions: ["wsStatus"],
          },
        },
      },
      result: {
        on: {
          RESTART: {
            target: "#cod.game.paused",
            guard: "isHost",
          },
          HOME: {
            target: "#cod.lobby",
            guard: "isHost",
          },
        },
      },
    },
    on: {
      CONNECTION_FAILURE: {
        target: "#cod.lobby",
      },
    },
  });
