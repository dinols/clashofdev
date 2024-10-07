import React from "react";
import Logo from "#/components/Game/Elements/Logo";

const Lobby: React.FC = () => {
  return (
    <div className="h-full w-full overflow-hidden flex items-center justify-center bg-purple-light">
      <Logo />
    </div>
  );
};

export default Lobby;
