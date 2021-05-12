import { GlobalStateManager } from '../../../managers/global-state-manager';
import { Entity } from '../../entity';

import { Player } from '../player';

import { TransformComponent } from '../../../components/transform-component';
import { PhysicsComponent } from '../../../components/physics-component';

import { DIRECTIONS } from '../../../constants/player';

export class InputComponent {

  playerTransform = null;
  playerPhysics = null;

  /** @param {Player} player */
  update(player) {
    if (!this.playerTransform) this.playerTransform = Entity.getComponent(player, TransformComponent);
    if (!this.playerPhysics) this.playerPhysics = Entity.getComponent(player, PhysicsComponent);

    switch (player.state.name) {
      case 'WALKING': {
        this.handleWalking();
        break;
      }

      default: break;
    }
  }

  handleWalking() {
    const pressedKeys = GlobalStateManager.instance().getPressedKeys();
    const deltaTime = GlobalStateManager.instance().getDeltaTime();

    if (document.activeElement !== document.querySelector('#chatbox-input')) {
      if (pressedKeys['ArrowUp'] || pressedKeys['w']) {
        this.playerTransform.yPos -= this.playerPhysics.speed * deltaTime;
        this.playerTransform.direction = DIRECTIONS.UP;
      }

      if (pressedKeys['ArrowRight'] || pressedKeys['d']) {
        this.playerTransform.xPos += this.playerPhysics.speed * deltaTime;
        this.playerTransform.direction = DIRECTIONS.RIGHT;
      }

      if (pressedKeys['ArrowDown'] || pressedKeys['s']) {
        this.playerTransform.yPos += this.playerPhysics.speed * deltaTime;
        this.playerTransform.direction = DIRECTIONS.DOWN;
      }

      if (pressedKeys['ArrowLeft'] || pressedKeys['a']) {
        this.playerTransform.xPos -= this.playerPhysics.speed * deltaTime;
        this.playerTransform.direction = DIRECTIONS.LEFT;
      }
    }
  }

}
