const { Game } = require('./src/entities/game.js');

// const Player from './src/entities/player.js');

// const canvas = document.createElement('canvas');
// canvas.width = 800;
// canvas.height = 800;
// const ctx = canvas.getContext('2d');
// document.querySelector('main').prepend(canvas);

// const player = new Player();

// let entities = {
//   [player.id]: player,
// };

// const pressedKeys = {};
// document.addEventListener('keydown', (evt) => pressedKeys[evt.key] = true);
// document.addEventListener('keyup', (evt) => pressedKeys[evt.key] = false);

// const webSocket = new WebSocket('ws://3.90.50.129:8081'); // prod
// // const webSocket = new WebSocket('ws://localhost:8081'); // local (lawl)
// webSocket.addEventListener('message', (evt) => {
//   const message = JSON.parse(evt.data);

//   if (message.type === 'chat') {
//     processChatMessage(evt);
//   } else {
//     storeOtherPlayers(evt);
//   }
// });

// function processInput() {
//   if (document.activeElement !== document.querySelector('#chatbox-input')) {
//     if (pressedKeys.ArrowUp || pressedKeys.w) player.yPos -= player.speed;
//     if (pressedKeys.ArrowRight || pressedKeys.d) player.xPos += player.speed;
//     if (pressedKeys.ArrowDown || pressedKeys.s) player.yPos += player.speed;
//     if (pressedKeys.ArrowLeft || pressedKeys.a) player.xPos -= player.speed;
//   }

//   if (webSocket.readyState === webSocket.OPEN) {
//     webSocket.send(JSON.stringify({
//       id: player.id,
//       name: player.name,
//       xPos: player.xPos,
//       yPos: player.yPos,
//       updatedAt: Date.now()
//     }));
//   }
// }

// function storeOtherPlayers(evt) {
//   const { players } = JSON.parse(evt.data);

//   entities = {
//     [player.id]: player,
//     ...players,
//   };
// }

// function drawEntities(entities) {
//   for (const entity of Object.values(entities)) {
//     if (entity.id !== player.id) {
//       drawEntity(new Player(entity));
//     }
//   }
// }

// function drawEntity(entity) {
//   ctx.drawImage(entity.sprite.img, 48, 128, 48, 64, entity.xPos, entity.yPos, 48, 64);

//   ctx.fillStyle = 'black';
//   ctx.textAlign = 'center';
//   ctx.font = '11px sans-serif';
//   const text = entity.name || entity.id;
//   ctx.fillText(text, entity.xPos + 1 + (48 / 2), entity.yPos - 10);
// }

// function runGame() {
//   processInput();

//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.fillStyle = 'grey';
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   drawEntity(player);
//   drawEntities(entities);

//   requestAnimationFrame(runGame);
// }

// runGame();

// const chatbox = document.querySelector('#chatbox');
// const chatboxList = document.querySelector('#chatbox ul');
// const chatboxField = document.querySelector('#chatbox-field');
// const chatboxInput = document.querySelector('#chatbox-input');
// chatboxField.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   if (chatboxInput.value) {
//     if (/^\/nick/.test(chatboxInput.value)) {
//       const name = chatboxInput.value.split('/nick ')[1];
//       player.name = name;
//       localStorage.setItem('name', name);
//     } else {
//       webSocket.send(JSON.stringify({
//         type: 'chat',
//         text: chatboxInput.value,
//         timeStamp: evt.timeStamp,
//         id: player.id,
//         name: player.name,
//       }));

//       appendNewChatMessage({ text: chatboxInput.value, name: player.name });
//     }

//     chatboxInput.blur();
//     chatboxInput.value = '';
//   }
// });

// function appendNewChatMessage(message) {
//   const chatMessage = document.createElement('li');
//   chatMessage.textContent = `${message.name}: ${message.text}`;

//   chatboxList.appendChild(chatMessage);
//   chatbox.scrollTop = chatbox.scrollHeight;
// }

// document.addEventListener('keydown', (evt) => {
//   if (evt.key === 't' && document.activeElement !== chatboxInput) {
//     evt.preventDefault();

//     chatboxInput.focus();
//     chatboxInput.value = '';
//   }

//   if (evt.key === '/' && document.activeElement !== chatboxInput) {
//     chatboxInput.focus();
//   }

//   if (evt.key === 'Escape') {
//     chatboxInput.value = '';
//     chatboxInput.blur();
//   }
// });

// function processChatMessage(evt) {
//   const message = JSON.parse(evt.data);

//   if (message.id !== player.id) {
//     console.log({ messageId: message.id, playerId: player.id });

//     appendNewChatMessage(message);
//   }
// }

new Game().start();
