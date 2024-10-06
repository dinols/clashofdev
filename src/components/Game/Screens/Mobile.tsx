import React from "react";
import { useSelector } from "@xstate/react";

import { modeKeysDefinition } from "#/libs/utils";
import { useGameContext } from "#/components/Game/MachineContext";
import Difficulty from "#/components/Game/Elements/Difficulty";
import Type from "#/components/Game/Elements/Type";
import Key from "#/components/Game/Elements/Key";
import Player from "#/components/Game/Elements/Player";
import Button from "#/components/Game/Elements/Button";

const Lobby: React.FC = () => {
  const { machineService } = useGameContext();
  const mode = useSelector(machineService, (state) => state.context.mode);
  const type = useSelector(machineService, (state) => state.context.type);

  return (
    <div className="h-full w-full bg-transparent">
      <div className="container mx-auto h-full px-4 xs:px-8 py-12 flex flex-col gap-12 items-center justify-between">
        <span className="font-bold text-beige text-xs">CLASH TIME!</span>
        <div className="w-[480px] overflow-hidden max-w-[90vw] flex-1 py-12 px-8 flex flex-col gap-8 bg-beige rounded-[60px] relative">
          <div className="flex items-center justify-between">
            <span className="uppercase text-xs opacity-80 text-black">
              / FINALE02
            </span>
            <div className="w-20 relative flex items-center">
              <img src="/sticker-cod.png" className="absolute right-0" />
            </div>
          </div>
          <div className="text-3xl xs:text-4xl pb-20 flex-1 text-black text-center font-semibold flex flex-wrap w-full text-pretty items-center relative">
            Oops ! Le gameplay est réservé aux joueurs PC (ehoui)...
          </div>
          <div className="absolute w-fit h-fit bottom-0 left-0 transform -translate-x-1/3 translate-y-[40%] rotate-[12deg]">
            <Player lost character="secrets" />
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            title="Go Back !"
            onClick={() => {
              window.location.href = "/";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Lobby;
