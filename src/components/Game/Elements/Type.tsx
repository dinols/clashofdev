import React from "react";
import { useSelector } from "@xstate/react";
import { twMerge } from "tailwind-merge";

import { useGameContext } from "#/components/Game/MachineContext";

const GameType: React.FC = () => {
  const { machineService } = useGameContext();
  const currentType = useSelector(
    machineService,
    (state) => state.context.type
  );

  return (
    <div className="bg-white relative shadow-inner border-black/20 border flex items-center p-1 rounded-full w-fit">
      <div
        className={twMerge(
          "w-32 rounded-full absolute h-7 bg-black transition-all",
          currentType === "solo" && "left-1",
          currentType === "multiplayer" && "left-[132px]"
        )}
      ></div>
      {["solo", "multiplayer"].map((type) => (
        <button
          key={type}
          onClick={() =>
            machineService.send({
              type: "SELECT_SETTINGS",
              data: {
                type,
              },
            })
          }
          className={twMerge(
            "cursor-pointer relative h-7 w-32 uppercase text-black font-semibold text-sm transition-all",
            type === currentType && "text-white"
          )}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default GameType;
