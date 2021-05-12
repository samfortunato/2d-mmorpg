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
    EventManager.subscribeTo([
      PRESSED_KEYS_UPDATE,
      CHANGE_PLAYER_NAME,
      UPDATE_ENTITIES,
    ], this);
  }

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

  setDeltaTime(deltaTime) {
    this.state.deltaTime = deltaTime;
  }

  setPressedKeys(pressedKeys) {
    this.state.pressedKeys = pressedKeys;
  }

  setEntities(entities) {
    const otherPlayers = Object.values(entities);
    const newEntities = {};

    for (const otherPlayer of otherPlayers) {
      if (otherPlayer.id !== this.state.player.id) {
        newEntities[otherPlayer.id] = this.state.entities[otherPlayer.id] || new Player(otherPlayer);
        newEntities[otherPlayer.id].updateParams(otherPlayer);
      }
    }

    newEntities[this.state.player.id] = this.state.player;

    this.state.entities = newEntities;
  }

  setPlayerName(playerName) {
    this.state.player.name = playerName;

    localStorage.setItem('playerName', playerName);
  }

  getDeltaTime() {
    return this.state.deltaTime;
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
    };
  }

  getPlayerPos() {
    return {
      xPos: this.state.player.xPos,
      yPos: this.state.player.yPos,
    };
  }

  getPressedKeys() {
    return this.state.pressedKeys;
  }

}
