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
  const { sections, machineService } = useGameContext();
  const mode = useSelector(machineService, (state) => state.context.mode);
  const type = useSelector(machineService, (state) => state.context.type);

  return (
    <div className="h-full w-full bg-transparent">
      <div className="container mx-auto h-full px-4 xs:px-8 py-10 lg:py-5 flex flex-col items-center justify-between">
        <h1 className="font-bold text-beige text-xs">CLASH TIME!</h1>
        <div className="w-[1024px] py-12 px-16 flex flex-col gap-8 bg-beige rounded-[60px] relative">
          <div className="flex items-center justify-between">
            <span className="uppercase text-xs opacity-80 text-black">
              / Règlesdujeu
            </span>
            <Type />
            <Difficulty />
            <div className="w-20 relative flex items-center">
              <img src="/sticker-cod.png" className="absolute right-0" />
            </div>
          </div>
          <div className="text-9xl text-black font-semibold flex flex-wrap items-center relative">
            <span className="w-3/4">Règles</span>
            <span className="w-1/4">du</span>
            <span>Clash</span>
            {mode !== "easy" && (
              <div className="absolute top-2 left-[400px] transform -rotate-[0deg]">
                <Key character="B" />
              </div>
            )}
            <div className="absolute top-24 left-[420px] transform -rotate-[20deg]">
              <Key character="ArrowUp" />
            </div>
            <div className="absolute top-6 left-[480px] transform rotate-[10deg]">
              <Key character="ArrowRight" />
            </div>
            {mode !== "easy" && (
              <>
                <div className="absolute top-24 left-[540px] transform -rotate-[40deg]">
                  <Key character="A" />
                </div>
              </>
            )}
            {mode === "hard" && (
              <div className="absolute top-2 left-[560px] transform -rotate-[0deg]">
                <Key character="Z" />
              </div>
            )}
          </div>
          <div className="opacity-60 text-black font-medium">
            Que serait Clash of Dev sans un <b>réel Clash ?</b> Une réelle
            bataille ?
          </div>
          {type === "multiplayer" ? (
            <div className="opacity-80 text-black font-medium w-[420px]">
              Fais le <b>plus haut score</b> à temps pour vaincre{" "}
              <b>ton adversaire</b>
              <br />
              <br />
              <br />
              <b>Que le/la meilleur·e gagne !</b>
            </div>
          ) : (
            <div className="opacity-80 text-black font-medium w-[420px]">
              Exécute la{" "}
              <b>bonne combinaison des {modeKeysDefinition[mode]} touches</b> à
              temps pour vaincre <b>LE SUR-BOOSTED</b>, aka ton lead tech un peu
              chiant. <br />
              <br />
              <b>Montre nous tes skills !</b>
            </div>
          )}
          <div className="absolute w-fit h-fit right-0 bottom-0">
            <Player character="boosted" />
          </div>
          {type === "multiplayer" && (
            <div className="absolute w-fit h-fit right-24 bottom-0">
              <Player character="boosted" />
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <Button
            title="Start the game"
            onClick={() => {
              machineService.send({
                type: "CONFIRM_LOBBY",
                data: {},
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Lobby;
