import React, { useEffect } from "react";
import { useSelector } from "@xstate/react";

import { allKeys } from "#/libs/utils";
import { useGameContext } from "#/components/Game/MachineContext";
import Timer from "#/components/Game/Elements/Timer";
import Background from "#/components/Game/Elements/Background";
import Keys from "#/components/Game/Elements/Keys";
import Player from "#/components/Game/Elements/Player";

const Game: React.FC = () => {
  const { machineService } = useGameContext();
  const isStarting = useSelector(machineService, (state) =>
    state.matches({
      game: "paused",
    })
  );
  const isStarted = useSelector(machineService, (state) =>
    state.matches({
      game: "playing",
    })
  );

  useEffect(() => {
    if (isStarted) {
      const onKeyPress = (event: KeyboardEvent) => {
        if (
          allKeys.includes(event.key) ||
          allKeys.includes(event.key.toLowerCase())
        ) {
          machineService.send({
            type: "KEYPRESS",
            data: {
              key: event.key,
            },
          });
        }
      };

      window.addEventListener("keydown", onKeyPress);
      return () => {
        window.removeEventListener("keydown", onKeyPress);
      };
    }
  }, [isStarted]);
  const [self, opponent] = useSelector(machineService, (state) => {
    return [
      state.context.players.find(
        (player) => player.id === state.context.playerId
      )!,
      state.context.players.find(
        (player) => player.id !== state.context.playerId
      )!,
    ];
  });

  return (
    <div className="flex-none flex flex-col justify-end gap-10 p-10 h-full w-full overflow-hidden relative">
      {isStarting && <Timer />}
      <Background />
      <div className="relative flex items-center justify-between">
        <Player id={self.id} username={self.name} character={self.character} />
        <Player
          id={opponent.id}
          username={opponent.name}
          character={opponent.character}
        />
      </div>
      <div className="relative pl-20">
        <Keys />
      </div>
    </div>
  );
};

export default Game;
