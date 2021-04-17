import { RECEIVED_CHAT_MESSAGE, SEND_MESSAGE } from '../constants/action-types/chat';

export function receivedChatMessage(messageData) {
  return {
    type: RECEIVED_CHAT_MESSAGE,
    messageData,
  };
};

export function sendMessage(messageData) {
  return {
    type: SEND_MESSAGE,
    messageData,
  };
};
