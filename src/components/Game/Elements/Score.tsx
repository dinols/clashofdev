import React from "react";
import { useSelector } from "@xstate/react";

import { useGameContext } from "#/components/Game/MachineContext";

const Score: React.FC = () => {
  const { machineService } = useGameContext();
  const type = useSelector(machineService, (state) => state.context.type);
  const keys = useSelector(machineService, (state) => state.context.keys);
  const inputs = useSelector(machineService, (state) =>
    state.context.players.map((player) => player.inputs)
  );

  return (
    <div className="flex items-center gap-10">
      <div>Score 1</div>
      <img
        src="/game/swords.webp"
        className="h-16 w-16 object-contain object-center"
      />
      <div>Score 2</div>
    </div>
  );
};

export default Score;
