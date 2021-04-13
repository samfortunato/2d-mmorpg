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

    players[parsed.id] = players[parsed.id] || new Player(parsed.id);
    players[parsed.id].xPos = parsed.xPos;
    players[parsed.id].yPos = parsed.yPos;
    players[parsed.id].updatedAt = parsed.updatedAt;

    purgeOfflinePlayers();

    webSocket.send(JSON.stringify({ players }));
  });
});

function purgeOfflinePlayers() {
  for (const player of Object.values(players)) {
    if (Date.now() - player.updatedAt > 100) {
      console.log({ offline: true, players });

      delete players[player.id];
    }
  }
}
