import { v4 as uuid } from 'uuid';

import { EventManager } from '../managers/event-manager';
import { GlobalStateManager } from '../managers/global-state-manager';
import { playerMove } from '../actions/player';

import Sprite from './sprite';

export class Player {

  constructor(params = {}) {
    this.id = params.id || uuid();
    this.name = params.name || localStorage.getItem('playerName') || this.id;

    this.xPos = params.xPos || 100;
    this.yPos = params.yPos || 100;
    this.direction = params.direction || 'DOWN';
    this.speed = 4;

    this.sprite = new Sprite();
  }

  update() {
    const pressedKeys = GlobalStateManager.instance().getPressedKeys();

    if (document.activeElement !== document.querySelector('#chatbox-input')) {
      if (pressedKeys['ArrowUp'] || pressedKeys['w']) {
        this.yPos -= this.speed;
        this.direction = 'UP';
      }

      if (pressedKeys['ArrowRight'] || pressedKeys['d']) {
        this.xPos += this.speed;
        this.direction = 'RIGHT';
      }

      if (pressedKeys['ArrowDown'] || pressedKeys['s']) {
        this.yPos += this.speed;
        this.direction = 'DOWN';
      }

      if (pressedKeys['ArrowLeft'] || pressedKeys['a']) {
        this.xPos -= this.speed;
        this.direction = 'LEFT';
      }
    }

    EventManager.instance().dispatch(playerMove({
      id: this.id,
      name: this.name,
      xPos: this.xPos,
      yPos: this.yPos,
      direction: this.direction,
      updatedAt: Date.now(),
    }));

    this.sprite.update(this.direction);
  }

}
