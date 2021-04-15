class ChatController {

  constructor() {
    this.chatbox = document.querySelector('#chatbox');
    this.chatboxList = document.querySelector('#chatbox ul');
    this.chatboxField = document.querySelector('#chatbox-field');
    this.chatboxInput = document.querySelector('#chatbox-input');

    this.chatboxField.addEventListener('submit', this.processMessage.bind(this));
  }

  processMessage(evt) {
    evt.preventDefault();

    if (this.chatboxInput.value) {
      if (/^\/nickname/.test(this.chatboxInput.value)) {
        const name = this.chatboxInput.value.split('/nickname ')[1];
        player.name = name;
      }

      webSocket.send(JSON.stringify({
        type: 'chat',
        text: this.chatboxInput.value,
        timeStamp: evt.timeStamp,
        playerId: player.id,
        name: player.name,
      }));

      this.chatboxInput.blur();
      appendNewChatMessage({ text: this.chatboxInput.value, timeStamp: evt.timeStamp });
      this.chatboxInput.value = '';
    }
  }

  appendNewChatMessage(message) {
    const chatMessage = document.createElement('li');
    chatMessage.textContent = `${message.timeStamp}: ${message.text}`;

    this.chatboxList.appendChild(chatMessage);
    this.chatbox.scrollTop = this.chatbox.scrollHeight;
  }

  processChatMessage(evt) {
    const message = JSON.parse(evt.data);

    if (message.playerId !== player.id) {
      this.appendNewChatMessage(message);
    }
  }

}

export default new ChatController();
