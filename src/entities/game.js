import { GlobalStateManager } from '../managers/global-state-manager';
import { EventManager } from '../managers/event-manager';

import { InputController } from '../controllers/input-controller';
// import { AuthController } from '../controllers/auth-controller';
import { WebsocketController } from '../controllers/websocket-controller';
import { DrawController } from '../controllers/draw-controller';
import { ChatController } from '../controllers/chat-controller';
import { AudioController } from '../controllers/audio-controller';

export class Game {

  constructor() {
    this.handlers = [
      GlobalStateManager.instance(),
      new InputController(),
      // new AuthController(),
      new WebsocketController(),
      EventManager.instance(),
      new DrawController(),
      ChatController.instance(),
      AudioController.instance(),
    ];

    this.previousTime = 0;
  }

  start(timestamp) {
    GlobalStateManager.instance().setDeltaTime((timestamp - this.previousTime) / 1000);

    this.handlers.forEach(handler => handler.update());

    const entities = GlobalStateManager.instance().getEntities();
    Object.values(entities).forEach(entity => {
      if (entity.update) entity.update();
    });

    this.previousTime = timestamp;

    requestAnimationFrame(this.start.bind(this));
  }

}
