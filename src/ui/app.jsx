import { h } from 'preact';

import { GameCanvas } from './game-canvas';
import { Hud } from './hud';
import { Chat } from './chat';
import { Settings } from './settings';
import { AppContextProvider } from './contexts/app';

export function App() {
  return (
    <AppContextProvider>
      <main>
        <GameCanvas />
        <Hud />
        <Chat />
        <Settings />
      </main>
    </AppContextProvider>
  );
}
