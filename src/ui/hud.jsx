import { h } from 'preact';

import { dispatchGameEvent } from '../managers/event-manager';
import { toggleMusic } from '../actions/command';

export function Hud() {
  function handleToggleMusic() {
    dispatchGameEvent(toggleMusic('./audio/earthbound.mp3'));
  }

  return (
    <nav id="hud">
      <button type="button" onClick={handleToggleMusic}>Toggle Music</button>
    </nav>
  );
}
