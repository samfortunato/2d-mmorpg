const WebSocket = require('ws');

class Player {

  constructor(data) {
    this.id = data.id;
    this.xPos = data.xPos;
    this.yPos = data.yPos;
    this.updatedAt = data.updatedAt;
    this.name = data.name;
  }

}

const webSocketServer = new WebSocket.Server({ port: 8081 });
const players = {};

webSocketServer.on('connection', (webSocket) => {
  webSocket.on('message', (message) => {
    const parsed = JSON.parse(message);

    let payload;

    if (parsed.type === 'chat') {
      const chatData = {
        type: 'chat',
        text: parsed.text,
        timeStamp: parsed.timeStamp,
        id: parsed.id,
        name: parsed.name,
      };

      payload = JSON.stringify(chatData);
    } else {
      players[parsed.id] = new Player(parsed);

      purgeOfflinePlayers();

      payload = JSON.stringify({ players });
    }

    webSocketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    })
  });
});

function purgeOfflinePlayers() {
  for (const player of Object.values(players)) {
    if (Date.now() - player.updatedAt > 1000) {
      delete players[player.id];
    }
  }
}

class WebsocketController {

  constructor() {
    this.webSocketServer = new WebSocket.Server({ port: 8081 });
    this.players = {};

    this.webSocketServer.on('connection', webSocket => this.processConnection(webSocket));
  }

  processConnection(webSocket) {
    webSocket.on('message', message => this.processMessage(message));
  }

  processMessage(message) {
    const parsed = JSON.parse(message);

    let payload;

    if (parsed.type === 'chat') {
      payload = this.parseChatMessage(parsed);
    } else {
      this.processPlayers(parsed);

      payload = this.getPlayerStats();
    }

    this.sendPayload(payload);
  }

  parseChatMessage(parsed) {
    const chatData = {
      type: 'chat',
      text: parsed.text,
      timeStamp: parsed.timeStamp,
      id: parsed.id,
      name: parsed.name,
    };

    const payload = JSON.stringify(chatData);

    return payload;
  }

  getPlayerStats() {
    return JSON.stringify({ type: 'entity_update', players: this.players });
  }

  processPlayers(parsed) {
    players[parsed.id] = new Player(parsed);

    purgeOfflinePlayers();
  }

  sendPayload(payload) {
    this.webSocketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }

  purgeOfflinePlayers() {
    for (const player of Object.values(players)) {
      if (Date.now() - player.updatedAt > 1000) {
        delete players[player.id];
      }
    }
  }

}

// new WebsocketController();
