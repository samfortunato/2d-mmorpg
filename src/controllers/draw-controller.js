import { GlobalStateManager } from '../managers/global-state-manager';
import { EventManager } from '../managers/event-manager';

import { Entity } from '../entities/entity';

import { DRAW_WITH_PEN } from '../constants/action-types/pen';
import { SEND_EMOTE } from '../constants/action-types/chat';

const BackgroundImage = new Image();
BackgroundImage.src = './img/bg.gif';

export class DrawController {

  constructor() {
    this.drawings = [];
    this.latestEmote = new Image();
    this.latestEmoteSenderId = '';
    this.emoteCooldown = 0;

    this.setupCanvas();
    this.setupCtx();

    EventManager.subscribeTo([DRAW_WITH_PEN, SEND_EMOTE], this);
  }

  update() {
    const entities = GlobalStateManager.instance().getEntities();

    this.clearCanvas();
    this.drawDrawings();
    this.drawEntities(entities);
    this.drawEmote();
  }

  listen(event) {
    switch (event.type) {
      case DRAW_WITH_PEN: {
        this.handleDrawWithPen(event.xPos, event.yPos);
        break;
      }

      case SEND_EMOTE: {
        this.handleSendEmote(event.emoteUrl, event.senderId);
        break;
      }

      default: break;
    }
  }

  setupCanvas() {
    this.canvas = document.querySelector('canvas');
    this.canvas.width = 800;
    this.canvas.height = 700;
  }

  setupCtx() {
    this.ctx = this.canvas.getContext('2d');

    this.ctx.imageSmoothingEnabled = false;
  }

  prepareToDraw() {
    this.clearCanvas();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(BackgroundImage, 0, 0);
  }

  /** @param {Entity} entity */
  draw(entity) {
    entity.draw(this.ctx, this.canvas);
  }

  drawDrawings() {
    for (const drawing of this.drawings) {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(drawing.xPos, drawing.yPos, 3, 3);
    }
  }

  drawEntities(entities) {
    for (const entity of Object.values(entities)) {
      entity.sprite.update(entity.direction, entity.state);

      this.drawEntity(entity);
      this.drawUsername(entity);
    }
  }

  drawEntity(entity) {
    const [sx, sy, sw, sh] = entity.sprite.currentCrop;

    this.ctx.drawImage(entity.sprite.img, sx, sy, sw, sh, entity.xPos, entity.yPos, 64, 64);
  }

  drawEmote() {
    if (this.emoteCooldown > 0) {
      const sender = GlobalStateManager.instance().getEntities()[this.latestEmoteSenderId] || GlobalStateManager.instance().getPlayerPos();
      const { xPos: senderXPos, yPos: senderYPos } = sender;

      const emoteWidth = this.latestEmote.width * 0.25;
      const emoteHeight = this.latestEmote.height * 0.25;
      const emoteImgOffset = (emoteWidth - 64) / 2;
      const emoteXPos = senderXPos - emoteImgOffset;
      const emoteYPos = senderYPos - 64;

      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(emoteXPos - 5, emoteYPos - 5, emoteWidth + 10, emoteHeight + 10);

      this.ctx.imageSmoothingEnabled = true;
      this.ctx.drawImage(this.latestEmote, emoteXPos, emoteYPos, emoteWidth, emoteHeight);
      this.ctx.imageSmoothingEnabled = false;

      this.emoteCooldown--;
    }
  }

  drawUsername(entity) {
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.font = '11px sans-serif';

    const text = entity.name || entity.id;
    this.ctx.fillText(text, entity.xPos + 1 + (64 / 2), entity.yPos - 10);
  }

  handleDrawWithPen(xPos, yPos) {
    this.drawings.push({ xPos, yPos });
  }

  handleSendEmote(emoteUrl, senderId) {
    this.emoteCooldown = 90;

    this.latestEmote.src = emoteUrl;
    this.latestEmoteSenderId = senderId;
  }

}
