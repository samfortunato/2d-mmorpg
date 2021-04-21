exports.Player = class Player {

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.xPos = data.xPos;
    this.yPos = data.yPos;
    this.direction = data.direction;
    this.state = data.state;
    this.spriteUrl = data.spriteUrl;
    this.currentFrame = data.currentFrame;
    this.updatedAt = data.updatedAt;
  }

}
