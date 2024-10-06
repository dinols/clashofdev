import React from "react";
import { useSelector } from "@xstate/react";

import { modeKeysDefinition } from "#/libs/utils";
import { useGameContext } from "#/components/Game/MachineContext";
import Difficulty from "#/components/Game/Elements/Difficulty";
import Type from "#/components/Game/Elements/Type";
import Key from "#/components/Game/Elements/Key";
import Player from "#/components/Game/Elements/Player";
import Button from "#/components/Game/Elements/Button";

const Result: React.FC = () => {
  const { machineService } = useGameContext();
  const self = useSelector(
    machineService,
    (state) =>
      state.context.players.find(
        (player) => player.id === state.context.playerId
      )!
  );
  const opponent = useSelector(
    machineService,
    (state) =>
      state.context.players.find(
        (player) => player.id !== state.context.playerId
      )!
  );

  return (
    <div className="h-full w-full bg-transparent">
      <div className="container mx-auto h-full px-4 xs:px-8 py-8 flex flex-col items-center justify-between">
        <span className="font-bold text-beige text-xs">FIN DE LA PARTIE !</span>
        <div className="w-[1024px] overflow-hidden py-12 px-16 flex flex-col gap-10 bg-beige rounded-[60px] relative">
          <div className="flex items-center justify-between">
            <span className="uppercase text-xs opacity-80 text-black">
              / Grandgagnant
            </span>
            <div className="w-20 relative flex items-center">
              <img src="/sticker-cod.png" className="absolute right-0" />
            </div>
          </div>
          <div className="text-9xl max-w-[760px] text-black font-semibold flex text-justify flex-wrap items-center relative">
            {self.winner ? "You are the winner!" : "You are the loser!"}
          </div>
          <div className="opacity-60 text-black font-medium">
            {self.winner ? "Oh wow ! Quel BOSS! " : "( La honte )"}
          </div>
          {self.winner ? (
            <div className="opacity-80 text-black font-medium w-[420px]">
              Bravo tu as remis ton lead un peu trop confiant à sa place !<br />
              <br />
              On rejoue ?
            </div>
          ) : (
            <div className="opacity-80 text-black font-medium w-[420px]">
              Tu ne peux pas rester sur une défaite, tu te dois de te défendre
              contre ce système pyramidal de merde
              <br />
              <br />
              On rejoue ?
            </div>
          )}
          <div className="absolute w-fit h-fit right-20 bottom-0">
            <Player
              character={self.winner ? self.character : opponent.character}
            />
          </div>
          <div className="absolute w-fit h-fit bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 rotate-[25deg]">
            <Player
              lost
              character={self.winner ? opponent.character : self.character}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            title="Rejouer"
            disabled={!self.host}
            onClick={() => {
              machineService.send({ type: "RESTART", data: {} });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Result;
