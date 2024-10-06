/*
  Very simple server that creates a game and allows players to join
  and send inputs to the game.
  Has many limitations and is not production ready.
*/

import type { GameMode } from "../src/libs/types";
import { generateKeys } from "../src/libs/utils";

type Player = {
  id: string;
  inputs: string[];
};
type Game = {
  inputs: string[];
  players: Player[];
};

const games = new Map<string, Game>();

const CORS_HEADERS = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST",
    "Access-Control-Allow-Headers": "Content-Type",
  },
};

const server = Bun.serve<{ gameId: string; mode: string; playerId?: string }>({
  fetch(req, server) {
    const url = new URL(req.url);

    if (url.pathname === "/room") {
      const gameId = url.searchParams.get("gameId");
      if (!gameId) {
        return new Response("Missing gameId", { status: 400, ...CORS_HEADERS });
      }

      const game = games.get(gameId);
      if (!game) {
        return new Response("Game not found", { status: 404, ...CORS_HEADERS });
      }

      const { players, inputs } = game;
      if (!players.find((p) => p.id === url.searchParams.get("playerId"))) {
        games.set(gameId, {
          ...game,
          players: [
            ...players,
            {
              id: url.searchParams.get("playerId") || "1",
              inputs: [],
            },
          ],
        });
      }

      const success = server.upgrade(req, {
        data: {
          gameId,
          players: games.get(gameId) || [],
        },
      });

      return success
        ? undefined
        : new Response("WebSocket upgrade error", {
            status: 400,
            ...CORS_HEADERS,
          });
    } else if (url.pathname === "/create-game") {
      const gameId = url.searchParams.get("gameId");
      const mode = url.searchParams.get("mode") ?? "easy";
      if (!gameId) {
        return new Response("Missing gameId", { status: 400, ...CORS_HEADERS });
      }
      games.set(gameId, {
        inputs: generateKeys(mode as GameMode),
        players: [],
      });
      console.log(JSON.stringify(games.get(gameId)));
      return new Response(JSON.stringify(games.get(gameId)), {
        status: 200,
        ...CORS_HEADERS,
      });
    }

    return new Response("Hello world", { status: 200, ...CORS_HEADERS });
  },
  websocket: {
    open(ws) {
      console.log("open", ws.data);
      // const msg = `${ws.data.username} has entered the chat`;
      // ws.subscribe("the-group-chat");
      // server.publish("the-group-chat", msg);
    },
    message(ws, message) {
      console.log("message", ws.data);
      // this is a group chat
      // so the server re-broadcasts incoming message to everyone
      // server.publish("the-group-chat", `${ws.data.username}: ${message}`);
    },
    close(ws) {
      console.log("close error");
      // const msg = `${ws.data.username} has left the chat`;
      // ws.unsubscribe("the-group-chat");
      // server.publish("the-group-chat", msg);
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
