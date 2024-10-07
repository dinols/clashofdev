import React from "react";
import { useSelector } from "@xstate/react";

import { useGameContext } from "#/components/Game/MachineContext";
import Slider from "#/components/Game/Elements/Slider";
import Button from "#/components/Game/Elements/Button";
import Details from "#/components/Game/Elements/Details";

const Select: React.FC = () => {
  const { machineService } = useGameContext();
  const type = useSelector(machineService, (state) => state.context.type);
  const code = useSelector(machineService, (state) => state.context.code);
  const otherPlayer = useSelector(machineService, (state) =>
    state.context.players.find((player) => player.id !== state.context.playerId)
  );
  const isHost = useSelector(
    machineService,
    (state) =>
      state.context.players.find(
        (player) => player.id === state.context.playerId
      )?.host
  );

  return (
    <div className="h-full w-full bg-transparent relative">
      <Details />
      <div className="container mx-auto h-full px-4 xs:px-8 py-8 flex flex-col items-center justify-between">
        <h1 className="font-bold text-beige text-xs">PICK A CHAMPION !</h1>
        <Slider />
        <div className="flex flex-col items-center gap-1">
          {type === "multiplayer" && (
            <>
              <span className="text-beige text-sm">
                Démarre la partie dès que ton adversaire a choisi son champion !
              </span>
              {isHost && (
                <span className="text-beige text-sm mb-4">
                  Lien à partager :{" "}
                  <span className="font-bold">
                    {import.meta.env.PUBLIC_URL}/finale/{code}/{otherPlayer?.id}
                  </span>
                </span>
              )}
            </>
          )}
          <Button
            disabled={!isHost}
            title={
              type === "multiplayer" ? "Confirm Select" : "Select Champion"
            }
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
