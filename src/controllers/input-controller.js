import { EventManager } from '../managers/event-manager';

import { pressedKeysUpdate, fireKeyPress } from '../actions/input';

export class InputController {

  constructor() {
    this.pressedKeys = {};

    document.addEventListener('keydown', evt => this.fireKeydown(evt.key));
    document.addEventListener('keyup', evt => this.fireKeyUp(evt.key));
  }

  update() { }

  fireKeydown(key) {
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
