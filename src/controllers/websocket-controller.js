import { EventManager } from '../managers/event-manager';

import { receivedChatMessage } from '../actions/chat';
import { updateEntities } from '../actions/entity';

import { PLAYER_MOVE } from '../constants/action-types/player';
import { SEND_MESSAGE } from '../constants/action-types/chat';

export class WebsocketController {

  constructor() {
    this.webSocket = new WebSocket('ws://3.90.50.129:8081'); // prod lol
    // this.webSocket = new WebSocket('ws://localhost:8081'); // local

    this.webSocket.addEventListener('message', this.handleMessage.bind(this));

    EventManager.instance().subscribeTo([PLAYER_MOVE, SEND_MESSAGE], this);
  }

  update() { }

  listen(event) {
    if (this.webSocket.readyState === this.webSocket.OPEN) {
      switch (event.type) {
        case PLAYER_MOVE: {
          this.sendMessage(event.playerInfo);
          break;
        }

        case SEND_MESSAGE: {
          this.sendMessage(event.messageData);
          break;
        }

        default: break;
      }
    }
  }

  handleMessage(evt) {
    const message = JSON.parse(evt.data);

    switch (message.type) {
      case 'chat': {
        EventManager.instance().dispatch(receivedChatMessage(message));
        break;
      }

      case 'player_data': {
        EventManager.instance().dispatch(updateEntities(message.players));
        break;
      }

      default: break;
    }
  }

  sendMessage(message) {
    this.webSocket.send(JSON.stringify(message));
  }

}
