const WebSocket = require('ws');

class Player {
  updatedAt;
  xPos;
  yPos;

  constructor(id) {
    this.id = id;
  }
}

const webSocketServer = new WebSocket.Server({ port: 8081 });
const players = {};

webSocketServer.on('connection', (webSocket) => {
  webSocket.on('message', (message) => {
    const parsed = JSON.parse(message);

    let payload;

    if (parsed.type === 'chat') {
      const chatData = { type: 'chat', text: parsed.text, timeStamp: parsed.timeStamp, playerId: parsed.playerId };

      payload = JSON.stringify(chatData);
    } else {
      players[parsed.id] = players[parsed.id] || new Player(parsed.id);
      players[parsed.id].xPos = parsed.xPos;
      players[parsed.id].yPos = parsed.yPos;
      players[parsed.id].updatedAt = parsed.updatedAt;

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
    if (Date.now() - player.updatedAt > 100) {
      delete players[player.id];
    }
  }
}
