import { EventManager } from './event-manager';
import { AudioController } from '../controllers/audio-controller';

import { pressedKeysUpdate, fireKeyPress } from '../actions/input';

import { toggleMusic } from '../actions/command';

export class InputManager {

  static _instance = new InputManager();

  static instance() { return this._instance; }

  constructor() {
    this.pressedKeys = {};

    document.addEventListener('keydown', evt => this.fireKeydown(evt.key));
    document.addEventListener('keyup', evt => this.fireKeyUp(evt.key));
  }

  fireKeydown(key) {
    // TODO: refactor to not a dumb way of doing this
    if (!AudioController.instance().hasPlayedForFirstTime) {
      // EventManager.dispatch(toggleMusic('./audio/earthbound.mp3'));

      AudioController.instance().hasPlayedForFirstTime = true;
    }

    this.pressedKeys[key] = true;

    EventManager.dispatch(fireKeyPress(key));
    EventManager.dispatch(pressedKeysUpdate(this.pressedKeys));
  }

  fireKeyUp(key) {
    this.pressedKeys[key] = false;

    EventManager.dispatch(pressedKeysUpdate(this.pressedKeys));
  }

  isKeyPressed(key) {
    return this.pressedKeys[key] === true;
  }

}
