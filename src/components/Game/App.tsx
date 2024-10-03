import React from 'react';

import type { Section } from '#/content/config';
import { MachineProvider } from '#/components/Game/MachineContext';
import Screens from '#/components/Game/Screens';

const App: React.FC<{
  sections: Section[];
  code: string | null;
}> = ({ code, sections }) => {
  return (
    <MachineProvider code={code} sections={sections}>
      <div className="h-screen w-full overflow-hidden absolute top-0 left-0">
        <Screens />
      </div>
    </MachineProvider>
  );
};

export default App;
