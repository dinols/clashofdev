import React from "react";
import { useSelector } from "@xstate/react";
import { twMerge } from "tailwind-merge";

import { Jury } from "#/libs/types";
import { useGameContext } from "#/components/Game/MachineContext";
import Sticker from "#/components/Global/Elements/Sticker";
import Cursor from "#/components/Global/Elements/Cursor";

const Details: React.FC = () => {
  const { machineService } = useGameContext();
  const value = useSelector(machineService, (state) => state.value);

  return (
    <div className="absolute z-50 h-screen w-screen pointer-events-none select-none">
      <img
        src="/sticker-cod-alt.png"
        className={twMerge(
          "absolute top-1/2 left-1/2 transform -translate-x-[532px] -translate-y-[360px]",
          value === "select" && "-translate-y-[380px] scale-75 xl:scale-90"
        )}
      />
      <Sticker
        name="star"
        color="green"
        size="tiny"
        className={twMerge(
          "absolute top-1/2 left-1/2 opacity-0",
          typeof value === "string" &&
            ["result", "lobby"].indexOf(value) >= 0 &&
            "opacity-100",
          value === "lobby" && "-translate-x-[64px]"
        )}
      />
      <Sticker
        name="flash"
        color="blue"
        size="small"
        className={twMerge("absolute top-24 right-[15%] translate-x-[64px]")}
      />
      <div
        className={twMerge(
          "absolute pointer-events-auto left-1/2 transform -translate-x-[660px] bottom-[25%] -rotate-6",
          value === "select" && "bottom-[20%]"
        )}
        onClick={() => {
          window.dispatchEvent(
            new CustomEvent("change-cursor", { detail: Jury.sometimecrea })
          );
        }}
      >
        <Cursor
          name={Jury.sometimecrea}
          side="right"
          className="pointer-events-auto"
          hidable
        />
      </div>
      <div
        className={twMerge(
          "absolute left-1/2 bottom-[10%] transform translate-x-[512px] -rotate-12",
          value === "select" && "bottom-[12%]"
        )}
        onClick={() => {
          window.dispatchEvent(
            new CustomEvent("change-cursor", { detail: Jury.maislina_ })
          );
        }}
      >
        <Cursor
          name={Jury.maislina_}
          side="right"
          hidable
          className="pointer-events-auto"
        />
      </div>
      <div
        className={twMerge(
          "absolute left-1/2 transform translate-x-[480px] top-[20%] -rotate-12",
          value === "select" && "top-[10%] left-1/3"
        )}
        onClick={() => {
          window.dispatchEvent(
            new CustomEvent("change-cursor", { detail: Jury.LLCoolChris_ })
          );
        }}
      >
        <Cursor
          name={Jury.LLCoolChris_}
          hidable
          className="pointer-events-auto"
        />
      </div>
    </div>
  );
};

export default Details;
