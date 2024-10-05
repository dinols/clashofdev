import React from 'react';
import { Transition, SwitchTransition } from 'react-transition-group';
import { useSelector } from '@xstate/react';
import gsap from 'gsap';

import { extractStateValue } from '#/libs/utils';
import { useGameContext } from '#/components/Game/MachineContext';

import Lobby from '#/components/Game/Screens/Lobby';
import Loading from '#/components/Game/Screens/Loading';
import Game from '#/components/Game/Screens/Game';
import Result from '#/components/Game/Screens/Result';
import Select from '#/components/Game/Screens/Select';

const components: Record<string, React.FC> = {
  loading: Loading,
  lobby: Lobby,
  connecting: Lobby,
  select: Select,
  game: Game,
  result: Result,
};

const Screens = () => {
  const { machineService } = useGameContext();
  const value = useSelector(machineService, (state) =>
    extractStateValue(state.value)
  );

  return (
    <SwitchTransition>
      <Transition
        key={value}
        timeout={500}
        onEnter={(node: Element) => {
          gsap.set(node, { autoAlpha: 0, scale: 0.8, xPercent: -100 });
          gsap
            .timeline({
              paused: true,
            })
            .to(node, { autoAlpha: 1, xPercent: 0, duration: 0.45 })
            .to(node, { scale: 1, duration: 0.45 })
            .play();
        }}
        onExit={(node) => {
          gsap
            .timeline({ paused: true })
            .to(node, { scale: 0.8, duration: 0.4 })
            .to(node, { xPercent: 100, autoAlpha: 0, duration: 0.4 })
            .play();
        }}
      >
        {components[value] ? React.createElement(components[value]) : null}
      </Transition>
    </SwitchTransition>
  );
};

export default Screens;
