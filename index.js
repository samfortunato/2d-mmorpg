const { default: uuid } = require('uuid/dist/v4');

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 800;
const ctx = canvas.getContext('2d');
document.querySelector('main').prepend(canvas);

const player = new (class Player {
  id = uuid();
  name = '';

  xPos = 100;
  yPos = 100;
  width = 32;
  height = 32;
  color = 'black';

  speed = 3;
});
player.name = player.id;

let entities = {
  [player.id]: player,
};

const pressedKeys = {};
document.addEventListener('keydown', (evt) => pressedKeys[evt.key] = true);
document.addEventListener('keyup', (evt) => pressedKeys[evt.key] = false);

const webSocket = new WebSocket('ws://3.90.50.129:8081'); // prod
// const webSocket = new WebSocket('ws://localhost:8081'); // local (lawl)
webSocket.addEventListener('message', (evt) => {
  const message = JSON.parse(evt.data);

  if (message.type === 'chat') {
    processChatMessage(evt);
  } else {
    storeOtherPlayers(evt);
  }
});

function processInput() {
  if (document.activeElement !== document.querySelector('#chatbox-input')) {
    if (pressedKeys.ArrowUp || pressedKeys.w) player.yPos -= player.speed;
    if (pressedKeys.ArrowRight || pressedKeys.d) player.xPos += player.speed;
    if (pressedKeys.ArrowDown || pressedKeys.s) player.yPos += player.speed;
    if (pressedKeys.ArrowLeft || pressedKeys.a) player.xPos -= player.speed;
  }

  if (webSocket.readyState === webSocket.OPEN) {
    webSocket.send(JSON.stringify({
      id: player.id,
      name: player.name,
      xPos: player.xPos,
      yPos: player.yPos,
      updatedAt: Date.now()
    }));
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
  const text = entity.name || 'foo';
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

const chatbox = document.querySelector('#chatbox');
const chatboxList = document.querySelector('#chatbox ul');
const chatboxField = document.querySelector('#chatbox-field');
const chatboxInput = document.querySelector('#chatbox-input');
chatboxField.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (chatboxInput.value) {
    if (/^\/nick/.test(chatboxInput.value)) {
      const name = chatboxInput.value.split('/nick ')[1];
      player.name = name;
    } else {
      webSocket.send(JSON.stringify({
        type: 'chat',
        text: chatboxInput.value,
        timeStamp: evt.timeStamp,
        playerId: player.id,
        name: player.name,
      }));

      appendNewChatMessage({ text: chatboxInput.value, name: player.name });
    }

    chatboxInput.blur();
    chatboxInput.value = '';
  }
});

function appendNewChatMessage(message) {
  const chatMessage = document.createElement('li');
  chatMessage.textContent = `${message.name}: ${message.text}`;

  chatboxList.appendChild(chatMessage);
  chatbox.scrollTop = chatbox.scrollHeight;
}

document.addEventListener('keydown', (evt) => {
  if (evt.key === 't' && document.activeElement !== chatboxInput) {
    evt.preventDefault();

    chatboxInput.focus();
    chatboxInput.value = '';
  }

  if (evt.key === '/' && document.activeElement !== chatboxInput) {
    chatboxInput.focus();
  }

  if (evt.key === 'Escape') {
    chatboxInput.value = '';
    chatboxInput.blur();
  }
});

function processChatMessage(evt) {
  const message = JSON.parse(evt.data);

  if (message.playerId !== player.id) {
    appendNewChatMessage(message);
  }
}
