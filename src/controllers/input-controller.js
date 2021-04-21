import { EventManager } from '../managers/event-manager';
import { AudioController } from './audio-controller';

import { pressedKeysUpdate, fireKeyPress } from '../actions/input';

import { toggleMusic } from '../actions/command';

export class InputController {

  constructor() {
    this.pressedKeys = {};

    document.addEventListener('keydown', evt => this.fireKeydown(evt.key));
    document.addEventListener('keyup', evt => this.fireKeyUp(evt.key));
  }

  update() { }

  fireKeydown(key) {
    // TODO: refactor to not a dumb way of doing this
    if (!AudioController.instance().hasPlayedForFirstTime) {
      EventManager.instance().dispatch(toggleMusic('./audio/earthbound.mp3'));

      AudioController.instance().hasPlayedForFirstTime = true;
    }

    this.pressedKeys[key] = true;

    EventManager.instance().dispatch(fireKeyPress(key));
    EventManager.instance().dispatch(pressedKeysUpdate(this.pressedKeys));
  }

  fireKeyUp(key) {
    this.pressedKeys[key] = false;

    EventManager.instance().dispatch(pressedKeysUpdate(this.pressedKeys));
  }

  isKeyPressed(key) {
    return this.pressedKeys[key] === true;
  }

}
