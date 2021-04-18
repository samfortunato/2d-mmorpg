import { EventManager } from '../managers/event-manager';
import { GlobalStateManager } from '../managers/global-state-manager';

import { sendMessage } from '../actions/chat';
import { changePlayerName, changePlayerSprite } from '../actions/command';

import { RECEIVED_CHAT_MESSAGE } from '../constants/action-types/chat';
import { FIRE_KEY_PRESS } from '../constants/action-types/input';

export class ChatController {

  static _instance = new ChatController();

  static instance() { return this._instance; }

  constructor() {
    this.chatbox = document.querySelector('#chatbox');
    this.chatboxList = document.querySelector('#chatbox ul');
    this.chatboxField = document.querySelector('#chatbox-field');
    this.chatboxInput = document.querySelector('#chatbox-input');

    this.chatboxField.addEventListener('submit', this.processMessage.bind(this));

    EventManager.instance().subscribeTo([FIRE_KEY_PRESS, RECEIVED_CHAT_MESSAGE], this);
  }

  update() { }

  listen(event) {
    switch (event.type) {
      case FIRE_KEY_PRESS: {
        this.handleFireKeyPress(event.key);
        break;
      }

      case RECEIVED_CHAT_MESSAGE: {
        this.processReceivedMessage(event.messageData);
        break;
      }

      default: break;
    }
  }

  processMessage(evt) {
    evt.preventDefault();

    if (this.chatboxInput.value) {
      if (/^\/nick/.test(this.chatboxInput.value)) {
        const playerName = this.chatboxInput.value.split('/nick ')[1];

        EventManager.instance().dispatch(changePlayerName(playerName));

      } else if (/^\/yeb/.test(this.chatboxInput.value)) {
        EventManager.instance().dispatch(changePlayerSprite('./img/jeb.gif'));

      } else if (/^\/resetsprite/.test(this.chatboxInput.value)) {
        EventManager.instance().dispatch(changePlayerSprite('./img/characters.gif'));

      } else {
        EventManager.instance().dispatch(sendMessage({
          type: 'chat',
          text: this.chatboxInput.value,
          timeStamp: evt.timeStamp,
          playerId: GlobalStateManager.instance().getPlayerMetaInfo().id,
          name: GlobalStateManager.instance().getPlayerMetaInfo().name,
        }));

        this.appendNewChatMessage({
          name: GlobalStateManager.instance().getPlayerMetaInfo().name,
          text: this.chatboxInput.value,
        });
      }


      this.chatboxInput.blur();
      this.chatboxInput.value = '';
    }
  }

  appendNewChatMessage(message) {
    const chatMessage = document.createElement('li');
    chatMessage.textContent = `${message.name}: ${message.text}`;

    this.chatboxList.appendChild(chatMessage);
    this.chatbox.scrollTop = this.chatbox.scrollHeight;
  }

  handleFireKeyPress(key) {
    if (key === 't' && document.activeElement !== this.chatboxInput) {
      // TODO: might have to send whole InputEvent obj in event...
      // evt.preventDefault();

      this.chatboxInput.focus();
      this.chatboxInput.value = '';
    }

    if (key === '/' && document.activeElement !== this.chatboxInput) {
      this.chatboxInput.focus();
      this.chatboxInput.value = '/';
    }

    if (key === 'Escape') {
      this.chatboxInput.blur();
      this.chatboxInput.value = '';
    }
  }

  processReceivedMessage(messageData) {
    if (messageData.id !== GlobalStateManager.instance().getPlayerId()) {
      this.appendNewChatMessage(messageData);
    }
  }

}
