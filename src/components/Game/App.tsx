import React from "react";

import type { Section } from "#/content/config";
import { MachineProvider } from "#/components/Game/MachineContext";
import Screens from "#/components/Game/Screens";
import Mobile from "#/components/Game/Screens/Mobile";

const App: React.FC<{
  sections: Section[];
  code: string | null;
}> = (props) => {
  return (
    <MachineProvider {...props}>
      <main className="h-screen w-full overflow-hidden absolute top-0 left-0 flex flex-col">
        <h1 className="invisible absolute">Clash of Dev - La finale</h1>
        <div className="h-full w-full relative hidden lg:flex flex-col">
          <Screens />
        </div>
        <div className="h-full w-full relative flex flex-col lg:hidden">
          <Mobile />
        </div>
      </main>
    </MachineProvider>
  );
};

export default App;
