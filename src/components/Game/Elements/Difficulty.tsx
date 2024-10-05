import React from "react";
import { useSelector } from "@xstate/react";
import { twMerge } from "tailwind-merge";

import { useGameContext } from "#/components/Game/MachineContext";

const Difficulty: React.FC = () => {
  const { machineService } = useGameContext();
  const mode = useSelector(machineService, (state) => state.context.mode);

  return (
    <div className="bg-white shadow-inner flex items-center p-1 rounded-full w-fit">
      <div
        className={twMerge(
          "w-20 rounded-full absolute h-7 bg-black transition-all",
          mode === "easy" && "left-1 bg-green-mid",
          mode === "medium" && "left-[84px] bg-purple-mid",
          mode === "hard" && "left-[164px] bg-orange-mid"
        )}
      ></div>
      {["easy", "medium", "hard"].map((difficulty) => (
        <button
          key={difficulty}
          onClick={() =>
            machineService.send({
              type: "SELECT_SETTINGS",
              data: {
                mode: difficulty,
              },
            })
          }
          className={twMerge(
            "cursor-pointer relative h-7 w-20 uppercase text-black font-semibold text-sm transition-all",
            difficulty === mode && "text-white"
          )}
        >
          {difficulty}
        </button>
      ))}
    </div>
  );
};

export default Difficulty;
