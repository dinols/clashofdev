import React from "react";

import type { Section } from "#/content/config";
import { MachineProvider } from "#/components/Game/MachineContext";
import Screens from "#/components/Game/Screens";

const App: React.FC<{
  sections: Section[];
  code: string | null;
}> = (props) => {
  return (
    <MachineProvider {...props}>
      <main className="h-screen w-full overflow-hidden absolute top-0 left-0 flex flex-col">
        <h1 className="invisible absolute">Clash of Dev - La finale</h1>
        <Screens />
      </main>
    </MachineProvider>
  );
};

export default App;
