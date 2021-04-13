const { default: uuid } = require('uuid/dist/v4');

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 800;
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

const player = new (class Player {
  id = uuid();

  xPos = 100;
  yPos = 100;
  width = 32;
  height = 32;
  color = 'black';

  speed = 3;
});

let entities = {
  [player.id]: player,
};

const pressedKeys = {};
document.addEventListener('keydown', (evt) => pressedKeys[evt.key] = true);
document.addEventListener('keyup', (evt) => pressedKeys[evt.key] = false);

const webSocket = new WebSocket('ws://localhost:8081');
webSocket.addEventListener('message', evt => storeOtherPlayers(evt));

function processInput() {
  if (pressedKeys.ArrowUp) player.yPos -= player.speed;
  if (pressedKeys.ArrowRight) player.xPos += player.speed;
  if (pressedKeys.ArrowDown) player.yPos += player.speed;
  if (pressedKeys.ArrowLeft) player.xPos -= player.speed;

  if (webSocket.readyState === webSocket.OPEN) {
    webSocket.send(JSON.stringify({ id: player.id, xPos: player.xPos, yPos: player.yPos, updatedAt: Date.now() }));
  }
}

function storeOtherPlayers(evt) {
  const { players } = JSON.parse(evt.data);

  entities = {
    [player.id]: player,
    ...players,
  };
}

function drawEntities(entities) {
  for (const entity of Object.values(entities)) {
    if (entity.id !== player.id) {
      drawEntity(entity);
    }
  }
}

function drawEntity(entity) {
  const text = entity.id || 'foo';
  const fillStyle = entity.color || 'black';
  const width = entity.width || 32;
  const height = entity.height || 32;

  ctx.fillStyle = fillStyle;
  ctx.fillRect(entity.xPos, entity.yPos, width, height);

  ctx.fillText(text, entity.xPos, entity.yPos - 10);
}

function runGame() {
  processInput();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'grey';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawEntity(player);
  drawEntities(entities);

  requestAnimationFrame(runGame);
}

runGame();
