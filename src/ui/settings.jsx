import { h } from 'preact';
import { useState } from 'preact/hooks';

import { useAppContext } from './contexts/app';

import { dispatchGameEvent } from '../managers/event-manager';
import { toggleMusic } from '../actions/command';
import { changeVolume } from '../actions/settings';

export function Settings() {
  const [volume, setVolume] = useState(1);
  const { appContext, setAppContext } = useAppContext();

  function handleToggleMusic() {
    dispatchGameEvent(toggleMusic('./audio/earthbound.mp3'));
  }

  function handleVolumeChange(evt) {
    const newVolume = Number(evt.target.value);

    setVolume(newVolume);
    dispatchGameEvent(changeVolume(newVolume));
  }

  function handleCloseSettings() {
    setAppContext(prevContext => ({ ...prevContext, isSettingsOpen: false }));
  }

  if (!appContext.isSettingsOpen) return null;

  return (
    <div id="modal-bg">
      <aside id="settings">
        <h2>Settings</h2>

        <ul>
          <li>
            Music
            <button type="button" onClick={handleToggleMusic}>Toggle</button>
          </li>

          <li>
            Volume
            <input type="range" value={volume} min="0" max="1" step="0.01" onInput={handleVolumeChange} />
          </li>
        </ul>

        <button type="button" onClick={handleCloseSettings}>OK</button>
      </aside>
    </div>
  );
}
