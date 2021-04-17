import { GlobalStateManager } from '../managers/global-state-manager';
import { EventManager } from '../managers/event-manager';

import { InputController } from '../controllers/input-controller';
import { WebsocketController } from '../controllers/websocket-controller';
import { DrawController } from '../controllers/draw-controller';
import { ChatController } from '../controllers/chat-controller';

export class Game {

  constructor() {
    this.handlers = [
      GlobalStateManager.instance(),
      new InputController(),
      new WebsocketController(),
      EventManager.instance(),
      new DrawController(),
      ChatController.instance(),
    ];
  }

  start() {
    const entities = GlobalStateManager.instance().getEntities();

    Object.values(entities).forEach(entity => {
      if (entity.update) entity.update();
    });

    this.handlers.forEach(handler => handler.update());

    requestAnimationFrame(this.start.bind(this));
  }

}
