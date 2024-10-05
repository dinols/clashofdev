import React from "react";

const Timer: React.FC = () => {
  const [time, setTime] = React.useState(5);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="z-20 absolute top-0 left-0 flex items-center justify-center h-full w-full bg-black/40">
      <span className="text-9xl font-bold text-white">{time}</span>
    </div>
  );
};

export default Timer;
