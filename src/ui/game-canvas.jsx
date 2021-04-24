import { h } from 'preact';

import { Game } from '../entities/game';
import { useLayoutEffect } from 'preact/hooks';

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
