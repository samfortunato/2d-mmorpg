const WebSocket = require('ws');

const { Player } = require('./player');

class WebsocketController {

  constructor() {
    this.webSocketServer = new WebSocket.Server({ port: 80 });
    this.players = {};

    this.webSocketServer.on('connection', this.processConnection.bind(this));
  }

  processConnection(webSocket) {
    webSocket.on('message', this.processMessage.bind(this));
  }

  processMessage(message) {
    const parsed = JSON.parse(message);

    let payload;

    switch (parsed.type) {
      case 'chat': {
        payload = this.parseChatMessage(parsed);
        break;
      }

      default: {
        this.processPlayers(parsed);
        payload = this.getCurrentPlayerData()

        break;
      }
    }

    this.sendPayload(payload);
  }

  parseChatMessage(parsed) {
    return {
      type: 'chat',
      text: parsed.text,
      timeStamp: parsed.timeStamp,
      id: parsed.playerId,
      name: parsed.name,
    };
  }

  getCurrentPlayerData() {
    return {
      type: 'player_data',
      players: this.players,
    };
  }

  processPlayers(parsed) {
    this.players[parsed.id] = new Player(parsed);

    this.purgeOfflinePlayers();
  }

  sendPayload(payload) {
    const serialized = JSON.stringify(payload);

    this.webSocketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(serialized);
      }
    });
  }

  purgeOfflinePlayers() {
    for (const player of Object.values(this.players)) {
      if (Date.now() - player.updatedAt > 1000) {
        delete this.players[player.id];
      }
    }
  }

}

new WebsocketController();
