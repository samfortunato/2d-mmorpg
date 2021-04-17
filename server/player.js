exports.Player = class Player {

  constructor(data) {
    this.id = data.id;
    this.xPos = data.xPos;
    this.yPos = data.yPos;
    this.updatedAt = data.updatedAt;
    this.name = data.name;
  }

}
