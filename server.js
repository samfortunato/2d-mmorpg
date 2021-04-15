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
        playerId: parsed.playerId,
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
