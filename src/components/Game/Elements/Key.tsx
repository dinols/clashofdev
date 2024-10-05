import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import gsap from "gsap";

const Key: React.FC<{
  character: string;
  error?: boolean;
  success?: boolean;
}> = ({ error, success, character }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (success) {
      gsap.to(ref.current?.querySelector("svg:last-child")!, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    }
  }, [success]);

  return (
    <div
      ref={ref}
      className={twMerge(
        "bg-white border border-black/5 rounded-[10px] shadow-inner-key w-[106px] h-[106px] flex items-center justify-center text-gray relative",
        success && "text-green-mid bg-green-light",
        error && "text-orange-mid bg-orange-light"
      )}
    >
      {character.startsWith("Arrow") ? (
        <svg
          width="19"
          height="42"
          viewBox="0 0 19 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={twMerge(
            "transform rotate-0",
            character === "ArrowRight" && "rotate-90",
            character === "ArrowDown" && "rotate-180",
            character === "ArrowLeft" && "-rotate-90"
          )}
        >
          <g filter="url(#filter0_i_2117_321)">
            <path
              d="M17 9.6L9.5 2M9.5 2L2 9.6M9.5 2L9.5 40"
              stroke="currentColor"
              strokeWidth="3.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <filter
              id="filter0_i_2117_321"
              x="0.0999756"
              y="0.100098"
              width="18.8"
              height="45.7998"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_2117_321"
              />
            </filter>
          </defs>
        </svg>
      ) : (
        <span className="text-3xl uppercase font-semibold">{character}</span>
      )}
      {success && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="145"
          height="150"
          viewBox="0 0 145 150"
          fill="none"
          className="absolute -mt-4 opacity-0 scale-75"
        >
          <circle cx="32" cy="8" r="5" fill="#ECFFCE" />
          <circle cx="123.5" cy="18.5" r="2.5" fill="#ECFFCE" />
          <circle cx="121.5" cy="147.5" r="2.5" fill="#ECFFCE" />
          <circle cx="129.5" cy="140.5" r="1.5" fill="#ECFFCE" />
          <circle cx="17.5" cy="1.5" r="1.5" fill="#ECFFCE" />
          <circle cx="140" cy="34" r="5" fill="#ECFFCE" />
          <circle cx="8" cy="19" r="8" fill="#ECFFCE" />
        </svg>
      )}
    </div>
  );
};

export default Key;
