import { GlobalStateManager } from '../../../managers/global-state-manager';

import { Player } from '../player';

import { IdleState } from './idle-state';

export class WalkingState {

  name = 'WALKING';

  /** @param {Player} player */
  update(player) {
    if (this.isNotWalking()) {
      player.state = new IdleState();
    }
  }

  isNotWalking() {
    const pressedKeys = GlobalStateManager.instance().getPressedKeys();

    return !pressedKeys.ArrowUp && !pressedKeys.w &&
      !pressedKeys.ArrowRight && !pressedKeys.d &&
      !pressedKeys.ArrowDown && !pressedKeys.s &&
      !pressedKeys.ArrowLeft && !pressedKeys.a;
  }

}
