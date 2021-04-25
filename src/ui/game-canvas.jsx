import { h } from 'preact';
import { useLayoutEffect } from 'preact/hooks';

import { Game } from '../entities/game';

let game;

export function GameCanvas() {
  useLayoutEffect(startGame, []);

  function startGame() {
    game = new Game();

    game.start();
  }

  return (
    <canvas></canvas>
  );
}
