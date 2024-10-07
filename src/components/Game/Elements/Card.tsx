import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";

import type { Section } from "#/content/config";
import { useGameContext } from "#/components/Game/MachineContext";
import Sticker from "#/components/Global/Elements/Sticker";

const Card: React.FC<{
  data: Section;
  active: boolean;
}> = ({ data, active = false }) => {
  const { machineService } = useGameContext();

  useEffect(() => {
    if (active) {
      machineService.send({
        type: "SET_PLAYER",
        data: {
          character: data.character,
        },
      });
    }
  }, [active]);

  return (
    <div
      className={twMerge(
        "w-96 max-w-[95vw] aspect-[9/14] rounded-[60px] flex flex-col bg-red-600 p-12 gap-8 relative overflow-hidden",
        data.color === "pink" && "bg-pink-light",
        data.color === "blue" && "bg-blue-light",
        data.color === "purple" && "bg-purple-light",
        data.color === "green" && "bg-green-light",
        data.color === "mustard" && "bg-mustard-light",
        data.color === "orange" && "bg-orange-light",
        active && "shadow-glow"
      )}
    >
      <div
        className={twMerge(
          "absolute z-10 top-0 left-0 h-full w-full bg-black opacity-10 dark:opacity-30 pointer-events-none transition-all",
          active && "opacity-0 dark:opacity-0"
        )}
      ></div>
      <div className="flex items-start gap-6">
        <div className="flex flex-col gap-1 opacity-80 text-black font-medium text-xs">
          <span className="uppercase">nos héros</span>
          <span>/ {data.points} pts</span>
        </div>
        <div className="flex-1 flex items-start">
          <span className="font-bold uppercase text-xs">{data.title}</span>
        </div>
      </div>
      <div className="w-full aspect-[14/9] relative overflow-hidden rounded-xl">
        <img
          className={twMerge(
            "absolute h-full w-full top-0 left-0 object-cover object-center",
            active && "animate-pulse"
          )}
          src={`/sections/${data.character}.webp`}
        />
      </div>
      <div
        className="w-full opacity-60 dark:opacity-80 text-xs text-black leading-relaxed"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
      <div
        className={twMerge(
          "w-fit h-fit flex-none absolute -bottom-4 -right-4",
          active && "animate-pulse"
        )}
      >
        <Sticker className="h-32 w-32" color={data.color} name={data.icon} />
      </div>
    </div>
  );
};

export default Card;
