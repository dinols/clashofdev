import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useSelector } from "@xstate/react";

import { useGameContext } from "#/components/Game/MachineContext";

const Player: React.FC<{
  id?: string;
  username?: string;
  character: string;
}> = ({ id, character, username }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(true);

  const { machineService } = useGameContext();
  const type = useSelector(machineService, (state) => state.context.type);

  useEffect(() => {
    if (!id) return;

    const onPlayerError = () => {
      if (!animationComplete) return;

      setAnimationComplete(false);

      gsap.set(ref.current?.querySelector("img:last-child")!, {
        autoAlpha: 0.4,
      });
      gsap.fromTo(
        ref.current,
        { autoAlpha: 1 },
        {
          autoAlpha: 0,
          repeat: 5,
          yoyo: true,
          duration: 0.15,
          ease: "elastic.inOut",
          onComplete: () => {
            setAnimationComplete(true);
            gsap.set(ref.current?.querySelector("img:last-child")!, {
              autoAlpha: 0,
            });
          },
        }
      );
    };

    window.addEventListener(`${id}-error`, onPlayerError);
    return () => {
      window.removeEventListener(`${id}-error`, onPlayerError);
    };
  }, [animationComplete]);

  return (
    <div className="relative flex flex-col items-center w-fit">
      {type === "multiplayer" && (
        <div className="bg-beige text-black text-xs font-bold py-2 px-4 rounded-2xl">
          {username}
        </div>
      )}
      <div
        ref={ref}
        className="relative h-[420px] w-[420px] flex items-center justify-center"
      >
        <img
          src={`/game/${character}.webp`}
          className="absolute select-none pointer-events-none"
        />
        <img
          src={`/game/${character}_overlay.webp`}
          className="absolute opacity-0 z-10 select-none pointer-events-none transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default Player;
