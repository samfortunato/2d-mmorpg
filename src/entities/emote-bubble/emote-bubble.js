import { EntityManager } from '../../managers/entity-manager';

import { Entity } from '../entity';

import { TransformComponent } from '../../components/transform-component';

import { EmoteBubbleRenderer } from './emote-bubble-renderer';

export class EmoteBubble extends Entity {

  constructor() {
    super();

    this.renderer = new EmoteBubbleRenderer();

    this.components = [
      new TransformComponent(),
    ];

    this.currentFrame = 0;
    this.maxFrame = 90;
  }

  update() {
    // this.components.forEach(component => component.update?.());

    this.currentFrame++;

    if (this.currentFrame > this.maxFrame) {
      EntityManager.deleteEntity(this.id);
    }
  }

}
