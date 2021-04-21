import { GlobalStateManager } from '../managers/global-state-manager';
import { EventManager } from '../managers/event-manager';

import { Player } from '../entities/player';

import { DRAW_WITH_PEN } from '../constants/action-types/pen';

export class DrawController {

  static _instance = new DrawController();

  static instance() { return this._instance; }

  constructor() {
    this.drawings = [];

    this.setupCanvas();
    this.setupCtx();

    EventManager.instance().subscribeTo([DRAW_WITH_PEN], this);
  }

  update() {
    const entities = GlobalStateManager.instance().getEntities();

    this.clearCanvas();
    this.drawDrawings();
    this.drawEntities(entities);
  }

  listen(event) {
    switch (event.type) {
      case DRAW_WITH_PEN: {
        this.handleDrawWithPen(event.xPos, event.yPos);
      }

      default: break;
    }
  }

  setupCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 800;

    document.querySelector('main').prepend(this.canvas);
  }

  setupCtx() {
    this.ctx = this.canvas.getContext('2d');

    this.ctx.imageSmoothingEnabled = false;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'grey';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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

    this.ctx.drawImage(entity.sprite.img, sx, sy, sw, sh, entity.xPos, entity.yPos, 48, 64);
  }

  drawUsername(entity) {
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.font = '11px sans-serif';

    const text = entity.name || entity.id;
    this.ctx.fillText(text, entity.xPos + 1 + (48 / 2), entity.yPos - 10);
  }

  handleDrawWithPen(xPos, yPos) {
    this.drawings.push({ xPos, yPos });
  }

}
