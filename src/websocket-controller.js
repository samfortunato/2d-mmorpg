class WebsocketController {

  constructor() {
    this.webSocket = new WebSocket('ws://3.90.50.129:8081');

    this.webSocket.addEventListener('message', this.processMessage.bind(this));
  }

  processMessage(evt) {
    const message = JSON.parse(evt.data);

    if (message.type === 'chat') {
      processChatMessage(evt);
    } else {
      storeOtherPlayers(evt);
    }
  }

  sendMessage(message) {
    this.webSocket.send(message);
  }

}
