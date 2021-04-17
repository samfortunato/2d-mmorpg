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
    this.currentCrop = [0, 0, 0, 0];

    this.playerInfo = {};
  }

  update(playerInfo) {
    this.playerInfo = playerInfo;

    switch (this.state) {
      case STATES.IDLE: {
        this.updateIdle();
        break;
      }

      case STATES.WALKING: {
        this.updateWalking();
        break;
      }

      default: return;
    }
  }

  updateIdle() {
    this.currentCrop = [0, 0, 32, 32];
  }

  updateWalking() {

  }

}

module.exports = Sprite;
