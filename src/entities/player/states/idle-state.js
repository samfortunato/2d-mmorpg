import { GlobalStateManager } from '../../../managers/global-state-manager';

import { Player } from '../player';

import { WalkingState } from './walking-state';

export class IdleState {

  name = 'IDLE';

  /** @param {Player} player */
  update(player) {
    if (this.isWalking()) {
      player.state = new WalkingState();
    }
  }

  isWalking() {
    const pressedKeys = GlobalStateManager.instance().getPressedKeys();

    return pressedKeys.ArrowUp || pressedKeys.w ||
      pressedKeys.ArrowRight || pressedKeys.d ||
      pressedKeys.ArrowDown || pressedKeys.s ||
      pressedKeys.ArrowLeft || pressedKeys.a;
  }

}
