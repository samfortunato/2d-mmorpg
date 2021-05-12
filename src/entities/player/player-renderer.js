import { EventManager } from '../../managers/event-manager';
import { Renderer } from '../renderer';
import { Entity } from '../entity';

import { TransformComponent } from '../../components/transform-component';
import { InfoComponent } from './components/info-component';

import { DIRECTIONS } from '../../constants/player';
import { CHANGE_PLAYER_SPRITE } from '../../constants/action-types/command';

export class PlayerRenderer extends Renderer {

  constructor() {
    super();

    this.img.src = './img/player.gif';

    this.playerTransform;
    this.playerInfo;

    EventManager.subscribeTo([CHANGE_PLAYER_SPRITE], this);
  }

  listen(event) {
    switch (event.type) {
      case CHANGE_PLAYER_SPRITE: {
        this.handleChangePlayerSprite(event);
        break;
      }

      default: break;
    }
  }

  draw(player, ctx) {
    switch (player.state.name) {
      case 'IDLE': {
        this.handleIdle(player, ctx);
        break;
      }

      case 'WALKING': {
        this.handleWalking(player, ctx);
        break;
      }

      default: break;
    }

    this.drawPlayerName(player, ctx);
  }

  handleIdle(player, ctx) {
    if (!this.playerTransform) this.playerTransform = Entity.getComponent(player, TransformComponent);

    switch (this.playerTransform.direction) {
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

    const [sx, sy, sw, sh] = this.currentCrop;

    ctx.drawImage(this.img, sx, sy, sw, sh, this.playerTransform.xPos, this.playerTransform.yPos, 64, 64);
  }

  handleWalking(player, ctx) {
    if (!this.playerTransform) this.playerTransform = Entity.getComponent(player, TransformComponent);

    this.maxFrame = 32;

    switch (this.playerTransform.direction) {
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

    const [sx, sy, sw, sh] = this.currentCrop;

    ctx.drawImage(this.img, sx, sy, sw, sh, this.playerTransform.xPos, this.playerTransform.yPos, 64, 64);

    this.updateFrame();
  }

  updateFrame() {
    this.currentFrame++;

    if (this.currentFrame > this.maxFrame) this.currentFrame = 0;
  }

  drawPlayerName(player, ctx) {
    if (!this.playerInfo) this.playerInfo = Entity.getComponent(player, InfoComponent);
    if (!this.playerTransform) this.playerTransform = Entity.getComponent(player, TransformComponent);

    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = '11px sans-serif';

    const playerName = this.playerInfo.name || player.id;
    const playerNameXPos = this.playerTransform.xPos + 1 + (64 / 2);
    const playerNameYPos = this.playerTransform.yPos - 10;

    ctx.fillText(playerName, playerNameXPos, playerNameYPos);
  }

  handleChangePlayerSprite(event) {
    this.img.src = event.playerSpriteUrl;

    localStorage.setItem('playerSpriteUrl', event.playerSpriteUrl);
  }

}
