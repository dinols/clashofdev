import React from 'react';
import { useSelector } from '@xstate/react';

import { useGameContext } from '#/components/Game/MachineContext';

const App: React.FC = () => {
  const { machineService } = useGameContext();
  const context = useSelector(machineService, (state) => state.context);

  return (
    <div>
      <h1>Welcome to Clash of Dev</h1>
      <p>{JSON.stringify(context)}</p>
    </div>
  );
};

export default App;
