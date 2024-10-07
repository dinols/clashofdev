import React from "react";
import { useSelector } from "@xstate/react";
import { twMerge } from "tailwind-merge";

import { useGameContext } from "#/components/Game/MachineContext";
import Timer from "#/components/Game/Elements/Timer";

const Score: React.FC = () => {
  const { machineService } = useGameContext();
  const mode = useSelector(machineService, (state) => state.context.mode);
  const type = useSelector(machineService, (state) => state.context.type);
  const keys = useSelector(machineService, (state) => state.context.keys);
  const inputs = useSelector(machineService, (state) =>
    state.context.players
      .filter((f) => f.id !== "opponent")
      .map((player) => ({
        correct: player.inputs.filter(
          (input, index) => input === state.context.keys[index]
        ).length,
        incorrect: player.inputs.filter(
          (input, index) => input !== state.context.keys[index]
        ).length,
      }))
  );
  const isStarted = useSelector(machineService, (state) =>
    state.matches({
      game: "playing",
    })
  );

  if (type === "multiplayer") {
    return (
      <div className="flex items-start gap-10">
        <div className="rounded-xl font-bold flex items-center justify-center shadow-glow bg-green-light text-black text-3xl w-32 py-2">
          {inputs[0].correct}
        </div>
        <div className="rounded-xl font-bold flex items-center justify-center shadow-glow bg-orange-mid text-white text-3xl w-32 py-2">
          {inputs[0].incorrect}
        </div>
        <img
          src="/game/swords.webp"
          className="h-16 w-16 object-contain object-center"
        />
        <div className="rounded-xl font-bold flex items-center justify-center shadow-glow bg-green-light text-black text-3xl w-32 py-2">
          {inputs[1]?.correct ?? 0}
        </div>
        <div className="rounded-xl font-bold flex items-center justify-center shadow-glow bg-orange-mid text-white text-3xl w-32 py-2">
          {inputs[1]?.incorrect ?? 0}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-10">
      <div className="flex items-center gap-x-8 gap-y-4 flex-wrap justify-end w-[420px]">
        {Array.from({ length: keys.length / 2 }).map((_, index) => (
          <div
            key={index}
            className={twMerge(
              "rounded-full h-12 w-12 bg-gray transition-all",
              inputs[0].correct > index && "bg-green-light shadow-glow"
            )}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2 items-center">
        <img
          src="/game/swords.webp"
          className="h-16 w-16 object-contain object-center"
        />
        {isStarted && (
          <Timer initialTime={mode === "hard" ? 10 : 30} className="text-4xl" />
        )}
      </div>
      <div className="flex-row-reverse flex items-center gap-x-8 gap-y-4 flex-wrap justify-end w-[420px]">
        {Array.from({ length: keys.length / 2 }).map((_, index) => (
          <div
            key={index}
            className={twMerge(
              "rounded-full h-12 w-12 bg-gray transition-all",
              inputs[0].incorrect > index && "bg-orange-mid shadow-glow"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Score;
