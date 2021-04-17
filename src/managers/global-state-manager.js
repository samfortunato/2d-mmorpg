import { EventManager } from './event-manager';

import { CHANGE_PLAYER_NAME } from '../constants/action-types/command';
import { PRESSED_KEYS_UPDATE } from '../constants/action-types/input';
import { UPDATE_ENTITIES } from '../constants/action-types/entity';

import { Player } from '../entities/player';

export class GlobalStateManager {

  static _instance = new GlobalStateManager();

  state = {
    pressedKeys: {},
  };

  static instance() {
    if (!this._instance.state.player) this._instance.state.player = new Player();

    if (!this._instance.state.entities) this._instance.state.entities = {
      [this._instance.state.player.id]: this._instance.state.player,
    };

    return this._instance;
  }

  constructor() {
    EventManager.instance().subscribeTo([
      PRESSED_KEYS_UPDATE,
      CHANGE_PLAYER_NAME,
      UPDATE_ENTITIES,
    ], this);
  }

  update() { }

  listen(event) {
    switch (event.type) {
      case PRESSED_KEYS_UPDATE: {
        this.setPressedKeys(event.pressedKeys);
        break;
      }

      case UPDATE_ENTITIES: {
        this.setEntities(event.entities);
        break;
      }

      case CHANGE_PLAYER_NAME: {
        this.setPlayerName(event.playerName);
        break;
      }

      default: break;
    }
  }

  setPressedKeys(pressedKeys) {
    this.state.pressedKeys = pressedKeys;
  }

  setEntities(entities) {
    this.state.entities = {
      ...entities,
      [this.state.player.id]: this.state.player,
    };
  }

  setPlayerName(playerName) {
    this.state.player.name = playerName;

    localStorage.setItem('playerName', playerName);
  }

  getEntities() {
    return this.state.entities;
  }

  getPlayerId() {
    return this.state.player.id;
  }

  getPlayerMetaInfo() {
    return {
      id: this.state.player.id,
      name: this.state.player.name,
    }
  }

  getPressedKeys() {
    return this.state.pressedKeys;
  }

}
