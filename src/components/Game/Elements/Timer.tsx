import React from "react";
import { twMerge } from "tailwind-merge";

const Timer: React.FC<{
  className?: string;
  initialTime?: number;
  hasOverlay?: boolean;
}> = ({ className, initialTime = 3, hasOverlay = false }) => {
  const [time, setTime] = React.useState(initialTime);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (hasOverlay)
    return (
      <div className="z-20 absolute top-0 left-0 flex items-center justify-center h-full w-full bg-black/40">
        <span className="text-9xl font-bold text-white">{time}</span>
      </div>
    );

  return (
    <span className={twMerge("text-9xl font-bold text-white", className)}>
      {time}
    </span>
  );
};

export default Timer;
