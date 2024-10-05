import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { twMerge } from "tailwind-merge";

import { Color } from "#/libs/types";

const cursorsMap: Record<string, Color> = {
  maislina_: Color.orange,
  LLCoolChris_: Color.blue,
  sometimecrea: Color.pink,
};

const Cursor: React.FC<{
  follower?: boolean;
  hidable?: boolean;
  name?: string;
  className?: string;
  side?: "left" | "right";
  color?: Color;
}> = (props) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [{ name, isRightSide }, setCursor] = useState<{
    name: string;
    isRightSide: boolean;
  }>({
    name: props.name ?? "",
    isRightSide: props.side === "right",
  });

  useEffect(() => {
    if (props.follower && cursorRef.current) {
      const onMouseMove = (e: MouseEvent) => {
        setCursor((prev) => ({
          ...prev,
          isRightSide: e.clientX > window.innerWidth * 0.5,
        }));
        gsap.to(cursorRef.current, {
          duration: 0.1,
          x: e.clientX,
          y: e.clientY,
          xPercent: e.clientX > window.innerWidth * 0.5 ? -100 : 0,
          position: "fixed",
          top: 0,
          left: 0,
          opacity: !!name ? 1 : 0,
          transformOrigin: "top right",
          ease: "power2.out",
        });
      };

      const onChangeCursor = (e: any) => {
        if (e.detail) {
          document.body.classList.add("hide-cursor");
        } else {
          document.body.classList.remove("hide-cursor");
        }

        setCursor((prev) => ({
          ...prev,
          name: e.detail,
        }));

        const cursorsToHide = document.querySelectorAll(`[data-hidable]`);
        cursorsToHide.forEach((cursor) => {
          if (cursor.getAttribute("data-hidable") === e.detail) {
            gsap.to(cursor, {
              duration: 0.2,
              opacity: 0,
              ease: "power2.out",
            });
          } else {
            gsap.to(cursor, {
              duration: 0.2,
              opacity: 1,
              ease: "power2.out",
            });
          }
        });
      };

      window.addEventListener("change-cursor", onChangeCursor);
      window.addEventListener("mousemove", onMouseMove);
      return () => {
        window.removeEventListener("change-cursor", onChangeCursor);
        window.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, [props.follower, name]);

  return (
    <div
      ref={cursorRef}
      data-hidable={props.hidable && props.name}
      className={twMerge(
        "z-50 group gap pointer-events-none relative flex flex-col flex-none h-fit w-fit",
        cursorsMap[name] === Color.blue && "text-blue-mid",
        cursorsMap[name] === Color.pink && "text-pink-mid",
        cursorsMap[name] === Color.green && "text-green-mid",
        cursorsMap[name] === Color.mustard && "text-mustard-mid",
        cursorsMap[name] === Color.purple && "text-purple-mid",
        cursorsMap[name] === Color.orange && "text-orange-mid",
        props.color === Color.blue && "text-blue-mid",
        props.color === Color.pink && "text-pink-mid",
        props.color === Color.green && "text-green-mid",
        props.color === Color.mustard && "text-mustard-mid",
        props.color === Color.purple && "text-purple-mid",
        props.color === Color.orange && "text-orange-mid",
        isRightSide ? "items-end" : "items-start",
        props.follower && "fixed top-0 opacity-0 left-0",
        props.className
      )}
    >
      <div
        style={{
          maskImage: `url('/icons/cursor.svg')`,
          WebkitMaskImage: `url('/icons/cursor.svg')`,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
        className={twMerge(
          "h-4 w-4 bg-current scale-x-[-1]",
          isRightSide && "scale-x-[1]"
        )}
      ></div>
      <div
        className={twMerge(
          "relative -mt-5 -ml-1 rounded-full px-2 py-1 border-2 rounded-tl-none text-xs font-medium text-white top-4 left-5",
          cursorsMap[name] === Color.blue && "border-blue-dark bg-blue-mid",
          cursorsMap[name] === Color.pink && "border-pink-dark bg-pink-mid",
          cursorsMap[name] === Color.green && "border-green-dark bg-green-mid",
          cursorsMap[name] === Color.mustard &&
            "border-mustard-dark bg-mustard-mid",
          cursorsMap[name] === Color.purple &&
            "border-purple-dark bg-purple-mid",
          cursorsMap[name] === Color.orange &&
            "border-orange-dark bg-orange-mid",
          props.color === Color.blue && "border-blue-dark bg-blue-mid",
          props.color === Color.pink && "border-pink-dark bg-pink-mid",
          props.color === Color.green && "border-green-dark bg-green-mid",
          props.color === Color.mustard && "border-mustard-dark bg-mustard-mid",
          props.color === Color.purple && "border-purple-dark bg-purple-mid",
          props.color === Color.orange && "border-orange-dark bg-orange-mid",
          isRightSide && "rounded-tr-none rounded-tl-full left-auto right-5"
        )}
      >
        @{name}
      </div>
    </div>
  );
};

export default Cursor;
