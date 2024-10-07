import React from "react";
import { useSelector } from "@xstate/react";

import { useGameContext } from "#/components/Game/MachineContext";
import Key from "#/components/Game/Elements/Key";

const Keys: React.FC = () => {
  const { machineService } = useGameContext();
  const keys = useSelector(machineService, (state) => state.context.keys);
  const playerInputs = useSelector(
    machineService,
    (state) =>
      state.context.players.find(
        (player) => player.id === state.context.playerId
      )!.inputs
  );

  return (
    <div
      style={{
        marginLeft: -playerInputs.length * 126,
      }}
      className="flex items-center gap-10 transition-all duration-300"
    >
      {keys.map((key, index) => {
        if (index === playerInputs.length) {
          return (
            <>
              <div
                key={"glow" + index.toString()}
                className="shadow-glow flex-none w-[106px] h-[106px] rounded-[10px] bg-white/20 border-2 border-dashed border-beige"
              ></div>
              <div key={index.toString()} className="w-fit flex-none">
                <Key character={key} />
              </div>
            </>
          );
        }
        return (
          <div key={index.toString()} className="w-fit flex-none">
            <Key
              character={key}
              error={
                !!playerInputs[index] &&
                playerInputs[index].toLowerCase() !== key.toLowerCase()
              }
              success={
                !!playerInputs[index] &&
                playerInputs[index].toLowerCase() === key.toLowerCase()
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default Keys;
