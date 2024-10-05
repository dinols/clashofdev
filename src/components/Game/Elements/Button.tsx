import React from "react";
import { twMerge } from "tailwind-merge";

const Button: React.FC<{
  onClick: () => void;
  title: string;
  className?: string;
}> = ({ title, className = "", onClick }) => {
  return (
    <button
      className={twMerge(
        "rounded-[60px] overflow-hidden flex items-center justify-center relative hover:scale-105 transition-all group bg-beige text-black font-semibold text-sm py-5 px-14",
        className
      )}
      onClick={onClick}
    >
      <span className="relative z-10">{title}</span>
      <div className="absolute z-0 bottom-0 h-full w-1/2 opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-300 rounded-[60px] bg-black/10"></div>
    </button>
  );
};

export default Button;
