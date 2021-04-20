import { v4 as generateUuid } from 'uuid';

import { EventManager } from '../managers/event-manager';
import { GlobalStateManager } from '../managers/global-state-manager';
import { playerMove } from '../actions/player';
import { CHANGE_PLAYER_SPRITE } from '../constants/action-types/command';

import Sprite from './sprite';

export class Player {

  constructor(params = {}) {
    this.id = params.id || generateUuid();
    this.name = params.name || localStorage.getItem('playerName') || this.id;

    this.xPos = params.xPos || 100;
    this.yPos = params.yPos || 100;
    this.direction = params.direction || 'DOWN';
    this.speed = 240;

    this.sprite = new Sprite();
    this.sprite.img.src = params.spriteUrl || './img/characters.gif';

    EventManager.instance().subscribeTo([CHANGE_PLAYER_SPRITE], this);
  }

  listen(event) {
    switch (event.type) {
      case CHANGE_PLAYER_SPRITE: {
        this.handleSpriteChange(event.playerSpriteUrl);
      }

      default: break;
    }
  }

  update() {
    const deltaTime = GlobalStateManager.instance().getDeltaTime();
    const pressedKeys = GlobalStateManager.instance().getPressedKeys();

    if (document.activeElement !== document.querySelector('#chatbox-input')) {
      if (pressedKeys['ArrowUp'] || pressedKeys['w']) {
        this.yPos -= this.speed * deltaTime;
        this.direction = 'UP';
      }

      if (pressedKeys['ArrowRight'] || pressedKeys['d']) {
        this.xPos += this.speed * deltaTime;
        this.direction = 'RIGHT';
      }

      if (pressedKeys['ArrowDown'] || pressedKeys['s']) {
        this.yPos += this.speed * deltaTime;
        this.direction = 'DOWN';
      }

      if (pressedKeys['ArrowLeft'] || pressedKeys['a']) {
        this.xPos -= this.speed * deltaTime;
        this.direction = 'LEFT';
      }
    }

    EventManager.instance().dispatch(playerMove({
      id: this.id,
      name: this.name,
      xPos: this.xPos,
      yPos: this.yPos,
      direction: this.direction,
      spriteUrl: this.sprite.img.src,
      updatedAt: Date.now(),
    }));

    this.sprite.update(this.direction);
  }

  handleSpriteChange(playerSpriteUrl) {
    this.sprite.img.src = playerSpriteUrl;
  }

}
