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

const server = Bun.serve<{
  game: Game;
  playerId: string;
  gameId: string;
}>({
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

      const { players } = game;
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
          game: games.get(gameId),
          playerId: url.searchParams.get("playerId"),
          gameId,
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
      return new Response(JSON.stringify(games.get(gameId)), {
        status: 200,
        ...CORS_HEADERS,
      });
    }

    return new Response("Hello world", { status: 200, ...CORS_HEADERS });
  },
  websocket: {
    open(ws) {
      // Player connected, broadcast the current game status
      ws.subscribe(ws.data.gameId);
      server.publish(
        ws.data.gameId,
        JSON.stringify({
          type: "status",
          data: {
            keys: ws.data.game.inputs,
            players: ws.data.game.players,
          },
        })
      );
      setInterval(() => {
        ws.send(JSON.stringify({ type: "ping" }));
      }, 15000);
    },
    message(ws, message) {
      // Rebroadcast the message to all players
      const { type, data } = JSON.parse(message as string);
      server.publish(
        ws.data.gameId,
        JSON.stringify({
          type,
          data,
        })
      );
    },
    close(ws) {
      console.log("close error", ws.data);
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
