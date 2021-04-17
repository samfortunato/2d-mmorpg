const STATES = {
  IDLE: 'IDLE',
  WALKING: 'WALKING',
}

class Sprite {

  constructor() {
    this.currentFrame = 0;
    this.state = STATES.IDLE;
    this.img = new Image();
    this.img.src = './img/characters.gif';
    this.currentCrop = [48, 128, 48, 64];

    this.playerInfo = {};
  }

  update(direction) {
    switch (direction) {
      case 'UP': {
        this.currentCrop = [48, 0, 48, 64];
        break;
      }

      case 'RIGHT': {
        this.currentCrop = [48, 64, 48, 64];
        break;
      }

      case 'DOWN': {
        this.currentCrop = [48, 128, 48, 64];
        break;
      }

      case 'LEFT': {
        this.currentCrop = [48, 192, 48, 64];
        break;
      }

      default: break;
    }
  }

}

module.exports = Sprite;
