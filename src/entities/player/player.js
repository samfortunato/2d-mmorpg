import { Entity } from '../entity';

import { IdleState } from './states/idle-state';

import { InfoComponent } from './components/info-component';
import { TransformComponent } from '../../components/transform-component';
import { InputComponent } from './components/input-component';
import { PlayerPhysicsComponent } from './components/player-physics-component';

import { PlayerRenderer } from './player-renderer';

export class Player extends Entity {

  constructor() {
    super();

    this.state = new IdleState();
    this.renderer = new PlayerRenderer();

    this.components = [
      new InfoComponent(),
      new TransformComponent(),
      new InputComponent(),
      new PlayerPhysicsComponent(),
    ];
  }

  update() {
    this.state.update(this);
    this.components.forEach(component => component.update?.(this));
  }

  draw(ctx) {
    this.renderer.draw(this, ctx);
  }

}
