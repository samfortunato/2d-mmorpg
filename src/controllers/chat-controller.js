import { dispatchGameEvent, EventManager } from '../managers/event-manager';
import { GlobalStateManager } from '../managers/global-state-manager';

import { sendEmote, sendMessage } from '../actions/chat';
import { enterCommand } from '../actions/command';

import { escapeHtml } from '../utils/escape-html';

import { RECEIVED_CHAT_MESSAGE } from '../constants/action-types/chat';
import { FIRE_KEY_PRESS } from '../constants/action-types/input';
import { EMOTE_IMAGE_URLS, EMOTE_MATCHER } from '../constants/chat';

export class ChatController {

  // static _instance = new ChatController();

  // static instance() { return this._instance; }

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

    const chatText = escapeHtml(this.chatboxInput.value);

    if (chatText) {
      if (chatText.startsWith('/')) {
        EventManager.instance().dispatch(enterCommand(chatText));
      } else {
        EventManager.instance().dispatch(sendMessage({
          type: 'chat',
          text: chatText,
          timeStamp: evt.timeStamp,
          playerId: GlobalStateManager.instance().getPlayerMetaInfo().id,
          name: GlobalStateManager.instance().getPlayerMetaInfo().name,
        }));

        this.appendNewChatMessage({
          name: GlobalStateManager.instance().getPlayerMetaInfo().name,
          text: chatText,
        });
      }

      this.chatboxInput.blur();
      this.chatboxInput.value = '';
    }
  }

  parseEmotes(chatText, senderId) {
    let parsedText = chatText;
    let urlOfFirstEmoteUsed;

    const usedEmotes = new Set(chatText.match(EMOTE_MATCHER));

    for (const emote of usedEmotes) {
      const emoteName = emote.split(':')[1];
      const emoteUrl = EMOTE_IMAGE_URLS[emoteName];

      if (emoteUrl) {
        const emoteHtml = `<img class="emote" src="${emoteUrl}" />`;
        parsedText = parsedText.replaceAll(emote, emoteHtml);
      }

      urlOfFirstEmoteUsed = emoteUrl;
    }

    if (urlOfFirstEmoteUsed) dispatchGameEvent(sendEmote(urlOfFirstEmoteUsed, senderId));

    return parsedText;
  }

  appendNewChatMessage(messageData) {
    let processedText = escapeHtml(messageData.text);
    processedText = this.parseEmotes(processedText, messageData.id);

    const chatMessage = document.createElement('li');
    chatMessage.className = 'chat-text';
    chatMessage.innerHTML = `${messageData.name}: ${processedText}`;

    this.chatboxList.appendChild(chatMessage);
    this.chatbox.scrollTop = this.chatbox.scrollHeight;
  }

  handleFireKeyPress(key) {
    if (key === 't' && document.activeElement !== this.chatboxInput) {
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
