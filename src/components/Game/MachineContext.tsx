import React, { createContext, useContext, useState } from 'react';
import { useActorRef, useSelector } from '@xstate/react';
import type { InterpreterFrom } from 'xstate';

import type { Section } from '#/content/config';
import { machine } from '#/libs/machine';

export const MachineContext = createContext({
  machineService: {} as InterpreterFrom<typeof machine>,
  sections: [] as Section[],
});

export const useGameContext = () => useContext(MachineContext);

export const MachineProvider: React.FC<{
  code: string | null;
  sections: Section[];
  children: React.ReactNode;
}> = ({ code, sections, children }) => {
  const machineService = useActorRef(machine({ code }));

  return (
    <MachineContext.Provider value={{ machineService, sections }}>
      {children}
    </MachineContext.Provider>
  );
};
