import { FIRE_KEY_PRESS, PRESSED_KEYS_UPDATE } from '../constants/action-types/input';

export function fireKeyPress(key) {
  return {
    type: FIRE_KEY_PRESS,
    key,
  };
};

export function pressedKeysUpdate(pressedKeys) {
  return {
    type: PRESSED_KEYS_UPDATE,
    pressedKeys,
  };
};
