import { GlobalStateManager } from '../managers/global-state-manager';

import { Player } from '../entities/player';

export class DrawController {

  constructor() {
    this.setupCanvas();
    this.setupCtx();
  }

  update() {
    const entities = GlobalStateManager.instance().getEntities();

    this.clearCanvas();
    this.drawEntities(entities);
  }

  setupCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 800;

    document.querySelector('main').prepend(this.canvas);
  }

  setupCtx() {
    this.ctx = this.canvas.getContext('2d');
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'grey';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawEntities(entities) {
    for (const entity of Object.values(entities)) {
      const playerEntity = new Player(entity);

      this.drawEntity(playerEntity);
      this.drawUsername(playerEntity);
    }
  }

  drawEntity(entity) {
    this.ctx.drawImage(entity.sprite.img, 48, 128, 48, 64, entity.xPos, entity.yPos, 48, 64);
  }

  drawUsername(entity) {
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.font = '11px sans-serif';
    const text = entity.name || entity.id;
    this.ctx.fillText(text, entity.xPos + 1 + (48 / 2), entity.yPos - 10);
  }

}
