import { h, Fragment } from 'preact';

import { GameCanvas } from './game-canvas';
import { Hud } from './hud';
import { Chat } from './chat';
import { Settings } from './settings';

export function GameScreen() {
  return (
    <>
      <GameCanvas />
      <Hud />
      <Chat />
      <Settings />
    </>
  );
}
