import { h } from 'preact';
import { useLayoutEffect } from 'preact/hooks';

import { Game } from '../game';

let game;

export function GameCanvas() {
  useLayoutEffect(startGame, []);

  function startGame() {
    game = new Game();

    game.start();

    return endGame;
  }

  // TODO: see if this works (solves login speed problem? removes game if navigate away from game page?)?
  function endGame() {
    game = null;
  }

  return (
    <canvas></canvas>
  );
}
