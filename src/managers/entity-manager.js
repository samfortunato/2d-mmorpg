import { v4 as generateUuid } from 'uuid';

export class EntityManager {

  static entityIds = [];
  static entities = {};

  static addEntity(entity) {
    entity.id = this.generateUniqueEntityId();

    this.entities[entity.id] = entity;
    this.entityIds.push(entity.id);
  }

  static generateUniqueEntityId() {
    let uniqueId = generateUuid();

    while (this.entities[uniqueId]) {
      uniqueId = generateUuid();
    }

    return uniqueId;
  }

  static deleteEntity(entityId) {
    delete this.entities[entityId];

    this.entityIds = this.entityIds.filter(id => id !== entityId);
  }

}
