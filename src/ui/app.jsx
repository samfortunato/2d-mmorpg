import { h } from 'preact';

import { GameCanvas } from './game-canvas';
import { Hud } from './hud';
import { Chat } from './chat';

export function App() {
  return (
    <main>
      <GameCanvas />
      <Hud />
      <Chat />
    </main>
  );
}
