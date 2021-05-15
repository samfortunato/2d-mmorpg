import { GlobalStateManager } from './managers/global-state-manager';
import { EntityManager } from './managers/entity-manager';
import { InputManager } from './managers/input-manager';
import { EventManager } from './managers/event-manager';

import { WebsocketController } from './controllers/websocket-controller';
import { DrawController } from './controllers/draw-controller';
import { ChatController } from './controllers/chat-controller';
import { AudioController } from './controllers/audio-controller';
import { CommandController } from './controllers/command-controller';

import { Player } from './entities/player/player';

export class Game {

  constructor() {
    this.handlers = [
      GlobalStateManager.instance(),
      InputManager.instance(),
      new WebsocketController(),
      new ChatController(),
      CommandController.instance(),
      AudioController.instance(),
    ];

    this.eventManager = EventManager.instance();
    this.drawManager = new DrawController();

    this.previousTime = 0;

    this.addPlayer();
  }

  start(timestamp) {
    GlobalStateManager.instance().setDeltaTime((timestamp - this.previousTime) / 1000);

    this.processEvents();
    this.update();
    this.draw();

    this.previousTime = timestamp;

    requestAnimationFrame(this.start.bind(this));
  }

  processEvents() {
    this.eventManager.update();
  }

  update() {
    EntityManager.entityIds.forEach((entityId) => {
      EntityManager.entities[entityId].update?.();
    });
  }

  draw() {
    this.drawManager.prepareToDraw();

    EntityManager.entityIds.forEach((entityId) => {
      if (EntityManager.entities[entityId].draw) {
        this.drawManager.draw(EntityManager.entities[entityId]);
      }
    });
  }

  addPlayer() {
    const player = new Player();

    EntityManager.addEntity(player);
    EntityManager.playerId = player.id;
  }

}
