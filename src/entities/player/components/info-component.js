import { EventManager } from '../../../managers/event-manager';

import { CHANGE_PLAYER_NAME } from '../../../constants/action-types/command';

export class InfoComponent {

  constructor() {
    this.name = localStorage.getItem('playerName') || '';

    EventManager.subscribeTo([CHANGE_PLAYER_NAME], this);
  }

  listen(event) {
    switch (event.type) {
      case CHANGE_PLAYER_NAME: {
        this.handleChangePlayerName(event.playerName);
        break;
      }

      default: break;
    }
  }

  update(player) {
    if (!this.name) this.name = player.id;
  }

  handleChangePlayerName(playerName) {
    this.name = playerName;
  }

}
