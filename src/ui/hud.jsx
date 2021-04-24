import { h } from 'preact';

import { useAppContext } from './contexts/app';

export function Hud() {
  const { setAppContext } = useAppContext();

  function handleOpenSettings() {
    setAppContext(prevAppContext => ({ ...prevAppContext, isSettingsOpen: true }));
  }

  return (
    <nav id="hud">
      <button type="button" onClick={handleOpenSettings}>Settings</button>
    </nav>
  );
}
