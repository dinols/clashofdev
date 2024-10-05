import React from "react";
import { useSelector } from "@xstate/react";

import { useGameContext } from "#/components/Game/MachineContext";
import Slider from "#/components/Game/Elements/Slider";

const Lobby: React.FC = () => {
  const { sections, machineService } = useGameContext();

  return (
    <div className="h-full w-full bg-transparent">
      <div className="container h-full px-4 xs:px-8 py-10 lg:py-5 flex flex-col items-center justify-between">
        <h1 className="font-bold text-beige text-xs">CLASH TIME!</h1>
        <div className="w-[1024px] h-52 bg-beige rounded-[60px]"></div>
        <div className="flex gap-4">Buttons</div>
      </div>
    </div>
  );
};

export default Lobby;
