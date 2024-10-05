import React from "react";
import { useSelector } from "@xstate/react";

import { useGameContext } from "#/components/Game/MachineContext";
import Slider from "#/components/Game/Elements/Slider";
import Button from "#/components/Game/Elements/Button";

const Select: React.FC = () => {
  const { machineService } = useGameContext();

  return (
    <div className="h-full w-full bg-transparent">
      <div className="container mx-auto h-full px-4 xs:px-8 py-8 flex flex-col items-center justify-between">
        <h1 className="font-bold text-beige text-xs">PICK A CHAMPION !</h1>
        <Slider />
        <div className="flex gap-4">
          <Button
            title="Select Champion"
            onClick={() => {
              machineService.send({
                type: "CONFIRM_SELECTION",
                data: {},
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Select;
