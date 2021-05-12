const https = require('https');
const { IncomingMessage, ServerResponse } = require('http');
const fs = require('fs');
const WebSocket = require('ws');

const { Player } = require('./player');

class WebsocketController {

  constructor() {
    // // prod
    // this.httpsServer = https.createServer({
    //   cert: fs.readFileSync('/etc/letsencrypt/live/server.superatomic.net/fullchain.pem'),
    //   key: fs.readFileSync('/etc/letsencrypt/live/server.superatomic.net/privkey.pem'),
    //   ca: fs.readFileSync('/etc/letsencrypt/live/server.superatomic.net/chain.pem'),
    // }, this.handleRequest.bind(this));

    // this.webSocketServer = new WebSocket.Server({ server: this.httpsServer });
    // this.webSocketServer.on('connection', this.processConnection.bind(this));
    // this.webSocketServer.on('error', this.logError.bind(this));

    // this.players = {};

    // this.httpsServer.listen(8081);


    // local
    this.webSocketServer = new WebSocket.Server({ port: 8081 });
    this.webSocketServer.on('connection', this.processConnection.bind(this));
    this.webSocketServer.on('error', this.logError.bind(this));

    this.players = {};
  }

  /**
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   */
  handleRequest(req, res) {
    if (/^\/health$/.test(req.url)) {
      res.statusCode = 200;

      res.end(JSON.stringify({ status: 'OK' }));
    }
  }

  /** @param {WebSocket} webSocket */
  processConnection(webSocket, request, client) {
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

  logError(err) {
    console.error(err);
  }

}

new WebsocketController();
