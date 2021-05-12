import { v4 as generateUuid } from 'uuid';

import { EventManager } from '../managers/event-manager';
import { GlobalStateManager } from '../managers/global-state-manager';
import { playerMove } from '../actions/player';

import { Sprite } from './sprite';

import { CHANGE_PLAYER_SPRITE } from '../constants/action-types/command';
import { DIRECTIONS, STATES } from '../constants/player';

export class Player {

  constructor(params = {}) {
    this.id = params.id || generateUuid();
    this.name = params.name || localStorage.getItem('playerName') || this.id;

    this.xPos = params.xPos || 100;
    this.yPos = params.yPos || 100;
    this.direction = params.direction || DIRECTIONS.DOWN;
    this.speed = 240;
    this.state = params.state || STATES.IDLE;

    this.sprite = new Sprite();
    this.sprite.img.src = params.spriteUrl || localStorage.getItem('playerSpriteUrl') || './img/player.gif';

    EventManager.subscribeTo([CHANGE_PLAYER_SPRITE], this);
  }

  listen(event) {
    if (this.id !== GlobalStateManager.instance().getPlayerId()) return;

    switch (event.type) {
      case CHANGE_PLAYER_SPRITE: {
        this.handleSpriteChange(event.playerSpriteUrl);
      }

      default: break;
    }
  }

  update() {
    if (this.id !== GlobalStateManager.instance().getPlayerId()) return;

    const pressedKeys = GlobalStateManager.instance().getPressedKeys();
    const deltaTime = GlobalStateManager.instance().getDeltaTime();

    if (document.activeElement !== document.querySelector('#chatbox-input')) {
      if (pressedKeys['ArrowUp'] || pressedKeys['w']) {
        this.yPos -= this.speed * deltaTime;
        this.direction = DIRECTIONS.UP;
        this.state = STATES.WALKING;
      }

      if (pressedKeys['ArrowRight'] || pressedKeys['d']) {
        this.xPos += this.speed * deltaTime;
        this.direction = DIRECTIONS.RIGHT;
        this.state = STATES.WALKING;
      }

      if (pressedKeys['ArrowDown'] || pressedKeys['s']) {
        this.yPos += this.speed * deltaTime;
        this.direction = DIRECTIONS.DOWN;
        this.state = STATES.WALKING;
      }

      if (pressedKeys['ArrowLeft'] || pressedKeys['a']) {
        this.xPos -= this.speed * deltaTime;
        this.direction = DIRECTIONS.LEFT;
        this.state = STATES.WALKING;
      }
    }

    if (this.isNotMoving()) {
      this.state = STATES.IDLE;
    }

    // this.sprite.update(this.direction, this.state);

    EventManager.dispatch(playerMove({
      id: this.id,
      name: this.name,
      xPos: this.xPos,
      yPos: this.yPos,
      direction: this.direction,
      spriteUrl: this.sprite.img.src,
      state: this.state,
      currentFrame: this.sprite.currentFrame,
      updatedAt: Date.now(),
    }));
  }

  isNotMoving() {
    const pressedKeys = GlobalStateManager.instance().getPressedKeys();

    return (
      (!pressedKeys['ArrowUp'] && !pressedKeys['w']) &&
      (!pressedKeys['ArrowRight'] && !pressedKeys['d']) &&
      (!pressedKeys['ArrowDown'] && !pressedKeys['s']) &&
      (!pressedKeys['ArrowLeft'] && !pressedKeys['a'])
    );
  }

  handleSpriteChange(playerSpriteUrl) {
    this.sprite.img.src = playerSpriteUrl;

    localStorage.setItem('playerSpriteUrl', playerSpriteUrl);
  }

  updateParams(params) {
    this.id = params.id || generateUuid();
    this.name = params.name || localStorage.getItem('playerName') || this.id;

    this.xPos = params.xPos || 100;
    this.yPos = params.yPos || 100;
    this.direction = params.direction || DIRECTIONS.DOWN;
    this.speed = 240;
    this.state = params.state || STATES.IDLE;

    this.sprite = new Sprite();
    this.sprite.img.src = params.spriteUrl || localStorage.getItem('playerSpriteUrl') || './img/characters.gif';
    this.sprite.currentFrame = params.currentFrame || 0;
  }

}
