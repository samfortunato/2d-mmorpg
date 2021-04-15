class DrawController {

  constructor() {
    this.setupCanvas();
    this.setupCtx();
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

  drawPlayer(entity) {
    const text = entity.name || 'foo';
    const fillStyle = entity.color || 'black';
    const width = entity.width || 32;
    const height = entity.height || 32;

    this.ctx.fillStyle = fillStyle;
    this.ctx.fillRect(entity.xPos, entity.yPos, width, height);

    this.ctx.fillText(text, entity.xPos, entity.yPos - 10);
  }

}

export default new DrawController();
