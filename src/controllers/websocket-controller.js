import { EventManager } from '../managers/event-manager';

import { receivedChatMessage } from '../actions/chat';
import { updateEntities } from '../actions/entity';

import { PLAYER_MOVE } from '../constants/action-types/player';
import { SEND_MESSAGE } from '../constants/action-types/chat';

export class WebsocketController {

  constructor() {
    try {
      // try accessing the ec2 server URL with wws
      // this.webSocket = new WebSocket('wss://server.superatomic.net'); // prod lol
      this.webSocket = new WebSocket('ws://localhost:8081'); // local

      this.webSocket.addEventListener('message', this.handleMessage.bind(this));
      this.webSocket.addEventListener('error', this.handleError.bind(this));
    } catch (err) {
      this.handleError(err);
    }

    EventManager.subscribeTo([PLAYER_MOVE, SEND_MESSAGE], this);
  }

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
        EventManager.dispatch(receivedChatMessage(message));
        break;
      }

      case 'player_data': {
        EventManager.dispatch(updateEntities(message.players));
        break;
      }

      default: break;
    }
  }

  sendMessage(message) {
    this.webSocket.send(JSON.stringify(message));
  }

  handleError(err) {
    console.error(err);
  }

}
