import uuid from 'uuid';

export class Player {

  constructor() {
    this.id = uuid.v4();
    this.name = this.id;

    this.xPos = 100;
    this.yPos = 100;
    this.width = 32;
    this.height = 32;

    this.speed = 3;

    this.color = 'black';
  }

}
