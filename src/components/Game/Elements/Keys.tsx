import React from "react";

import Key from "#/components/Game/Elements/Key";

const Keys: React.FC = () => {
  return (
    <div className="flex items-center gap-10">
      <Key character="ArrowUp" />
      <Key character="ArrowLeft" />
      <Key character="ArrowRight" />
      <Key character="ArrowDown" />
    </div>
  );
};

export default Keys;
