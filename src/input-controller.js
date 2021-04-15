class InputController {

  constructor() {
    this.pressedKeys = {};

    document.addEventListener('keydown', evt => this.pressedKeys[evt.key] = true);
    document.addEventListener('keyup', evt => this.pressedKeys[evt.key] = false);
  }

  isKeyPressed(key) {
    return this.pressedKeys[key] === true;
  }

}

export default new InputController();
