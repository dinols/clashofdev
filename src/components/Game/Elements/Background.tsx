import React from "react";
import { useSelector } from "@xstate/react";

import { useGameContext } from "#/components/Game/MachineContext";

const Background = () => {
  const { machineService } = useGameContext();
  const mode = useSelector(machineService, (state) => state.context.mode);

  return (
    <div className="absolute z-0 top-0 left-0 h-full w-full pointer-events-none select-none">
      <div className="h-full w-full bg-black/60 z-10 absolute top-0 left-0"></div>
      <img
        src={`/game/${mode === "hard" ? "namek.webp" : "background.webp"}`}
        className="z-0 absolute top-0 left-0 h-full w-full object-cover object-center"
      />
    </div>
  );
};

export default Background;
