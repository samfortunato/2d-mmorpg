import { DIRECTIONS, STATES } from '../constants/player';

export class Sprite {

  constructor() {
    this.img = new Image();
    this.img.src = './img/player.gif';
    this.currentCrop = [64, 128, 64, 64];
    this.state = STATES.IDLE;
    this.direction = DIRECTIONS.DOWN;

    this.currentFrame = 0;
    this.maxFrame = 0;
  }

  update(direction, playerState) {
    this.state = playerState;
    this.direction = direction;

    switch (this.state) {
      case STATES.IDLE: {
        this.handleIdle();
        break;
      }

      case STATES.WALKING: {
        this.handleWalking();
        break;
      }

      default: break;
    }
  }

  handleIdle() {
    switch (this.direction) {
      case DIRECTIONS.UP: {
        this.currentCrop = [64, 0, 64, 64];
        break;
      }

      case DIRECTIONS.RIGHT: {
        this.currentCrop = [64, 64, 64, 64];
        break;
      }

      case DIRECTIONS.DOWN: {
        this.currentCrop = [64, 128, 64, 64];
        break;
      }

      case DIRECTIONS.LEFT: {
        this.currentCrop = [64, 192, 64, 64];
        break;
      }

      default: break;
    }
  }

  handleWalking() {
    this.maxFrame = 32;

    switch (this.direction) {
      case DIRECTIONS.UP: {
        if (this.currentFrame >= 0) this.currentCrop = [0, 0, 64, 64];
        if (this.currentFrame >= 8) this.currentCrop = [64, 0, 64, 64];
        if (this.currentFrame >= 16) this.currentCrop = [128, 0, 64, 64];
        if (this.currentFrame >= 24) this.currentCrop = [64, 0, 64, 64];

        break;
      }

      case DIRECTIONS.RIGHT: {
        if (this.currentFrame >= 0) this.currentCrop = [0, 64, 64, 64];
        if (this.currentFrame >= 8) this.currentCrop = [64, 64, 64, 64];
        if (this.currentFrame >= 16) this.currentCrop = [128, 64, 64, 64];
        if (this.currentFrame >= 24) this.currentCrop = [64, 64, 64, 64];

        break;
      }

      case DIRECTIONS.DOWN: {
        if (this.currentFrame >= 0) this.currentCrop = [0, 128, 64, 64];
        if (this.currentFrame >= 8) this.currentCrop = [64, 128, 64, 64];
        if (this.currentFrame >= 16) this.currentCrop = [128, 128, 64, 64];
        if (this.currentFrame >= 24) this.currentCrop = [64, 128, 64, 64];

        break;
      }

      case DIRECTIONS.LEFT: {
        if (this.currentFrame >= 0) this.currentCrop = [0, 192, 64, 64];
        if (this.currentFrame >= 8) this.currentCrop = [64, 192, 64, 64];
        if (this.currentFrame >= 16) this.currentCrop = [128, 192, 64, 64];
        if (this.currentFrame >= 24) this.currentCrop = [64, 192, 64, 64];

        break;
      }
    }

    this.updateFrame();
  }

  updateFrame() {
    this.currentFrame++;

    if (this.currentFrame > this.maxFrame) this.currentFrame = 0;
  }

}
