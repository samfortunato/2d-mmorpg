import { EntityManager } from '../../managers/entity-manager';

import { Entity } from '../entity';

import { TransformComponent } from '../../components/transform-component';

import { EmoteBubbleRenderer } from './emote-bubble-renderer';

export class EmoteBubble extends Entity {

  static create(senderId, emoteName) {
    EntityManager.addEntity(new EmoteBubble(senderId, emoteName));
  }

  constructor(senderId, emoteName) {
    super();

    this.renderer = new EmoteBubbleRenderer();

    this.components = [
      new TransformComponent(),
    ];

    this.senderId = senderId;
    this.emoteName = emoteName;
    this.currentFrame = 0;
    this.maxFrameLifespan = 90;
  }

  update() {
    this.currentFrame++;

    if (this.currentFrame > this.maxFrameLifespan) {
      EntityManager.deleteEntity(this.id);
    }
  }

  draw(ctx) {
    this.renderer.draw(this, ctx);
  }

}
