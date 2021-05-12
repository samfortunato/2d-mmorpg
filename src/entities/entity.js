export class Entity {

  static getComponent(entity, componentType) {
    return entity.components.find((component) => {
      return component instanceof componentType;
    });
  }

  constructor() {
    this.id = '';
    this.state = null;
    this.renderer = null;
    this.components = [];
  }

  listen() { }
  update() { }
  draw(ctx, canvas) { }

}
