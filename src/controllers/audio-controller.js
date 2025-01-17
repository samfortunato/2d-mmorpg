import { EventManager } from '../managers/event-manager';

import { TOGGLE_MUSIC } from '../constants/action-types/command';
import { CHANGE_VOLUME } from '../constants/action-types/settings';

export class AudioController {

  static _instance = new AudioController();

  static instance() { return this._instance; }

  constructor() {
    this.audioPlayer = document.createElement('audio');
    this.audioPlayer.src = './audio/earthbound.mp3';
    this.audioPlayer.loop = true;

    this.playing = false;
    this.hasPlayedForFirstTime = false;

    EventManager.instance().subscribeTo([TOGGLE_MUSIC, CHANGE_VOLUME], this);
  }

  update() { }

  listen(event) {
    switch (event.type) {
      case TOGGLE_MUSIC: {
        this.audioPlayer.src = event.audioUrl;

        if (!this.playing) {
          this.audioPlayer.play();
          this.playing = true;
        } else {
          this.audioPlayer.pause();
          this.playing = false;
        }

        break;
      }

      case CHANGE_VOLUME: {
        this.audioPlayer.volume = event.volume;
        break;
      }

      default: break;
    }
  }

}
