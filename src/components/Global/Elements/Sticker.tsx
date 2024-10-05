import React from "react";
import { twJoin, twMerge } from "tailwind-merge";

import { Color } from "#/libs/types";

const Sticker: React.FC<{
  name: string;
  color?: string;
  size?: "large" | "medium" | "small" | "tiny";
  className?: string;
}> = ({ name, color = "black", size, className = "" }) => {
  return (
    <div
      className={twMerge(
        "rounded-full flex items-center justify-center",
        size === "large" && "h-32 w-32 lg:h-80 lg:w-80",
        size === "medium" && "h-16 w-16 lg:h-20 lg:w-20",
        size === "small" && "h-10 w-10",
        size === "tiny" && "h-8 w-8",
        Color.black === color && "bg-black dark:bg-beige",
        Color.blue === color && "bg-blue-mid",
        Color.pink === color && "bg-pink-mid",
        Color.green === color && "bg-green-mid",
        Color.mustard === color && "bg-mustard-mid",
        Color.purple === color && "bg-purple-mid",
        Color.orange === color && "bg-orange-mid",
        className
      )}
    >
      <div
        style={{
          maskImage: `url('/icons/${name}.svg')`,
          WebkitMaskImage: `url('/icons/${name}.svg')`,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
        className={twJoin(
          "h-1/2 w-1/2",
          Color.black === color && "bg-white dark:bg-black",
          Color.blue === color && "bg-blue-light",
          Color.pink === color && "bg-pink-light",
          Color.green === color && "bg-green-light",
          Color.mustard === color && "bg-mustard-light",
          Color.purple === color && "bg-purple-light",
          Color.orange === color && "bg-orange-light"
        )}
      ></div>
    </div>
  );
};

export default Sticker;
