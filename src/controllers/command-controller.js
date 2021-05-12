import { EventManager } from '../managers/event-manager';

import { changePlayerName, changePlayerSprite, toggleMusic } from '../actions/command';

import { ENTER_COMMAND } from '../constants/action-types/command';

export class CommandController {

  static _instance = new CommandController();

  static instance() { return this._instance; }

  constructor() {
    EventManager.subscribeTo([ENTER_COMMAND], this);
  }

  listen(event) {
    const { command } = event;

    if (/^\/nick/.test(command)) {
      const playerName = command.split('/nick ')[1].slice(0, 20);

      EventManager.dispatch(changePlayerName(playerName));

    } else if (/^\/n$/.test(command)) {
      EventManager.dispatch(changePlayerSprite('./img/n.gif'));

    } else if (/^\/i$/.test(command)) {
      EventManager.dispatch(changePlayerSprite('./img/i.gif'));

    } else if (/^\/g$/.test(command)) {
      EventManager.dispatch(changePlayerSprite('./img/g.gif'));

    } else if (/^\/e$/.test(command)) {
      EventManager.dispatch(changePlayerSprite('./img/ewalking.gif'));

    } else if (/^\/r$/.test(command)) {
      EventManager.dispatch(changePlayerSprite('./img/r.gif'));

    } else if (/^\/yeb$/.test(command)) {
      EventManager.dispatch(changePlayerSprite('./img/jeb.gif'));

    } else if (/^\/yebguac$/.test(command)) {
      EventManager.dispatch(changePlayerSprite('./img/jebguac.gif'));

    } else if (/^\/mac$/.test(command)) {
      EventManager.dispatch(changePlayerSprite('./img/boxdog.gif'));

    } else if (/^\/resetsprite$/.test(command)) {
      EventManager.dispatch(changePlayerSprite('./img/player.gif'));

    } else if (/^\/audio$/.test(command)) {
      EventManager.dispatch(toggleMusic('./audio/earthbound.mp3'));
    }
  }

}
