import { CHANGE_PLAYER_NAME, CHANGE_PLAYER_SPRITE, ENTER_COMMAND, TOGGLE_MUSIC } from '../constants/action-types/command';

export function enterCommand(command) {
  return {
    type: ENTER_COMMAND,
    command,
  };
}

export function changePlayerName(playerName) {
  return {
    type: CHANGE_PLAYER_NAME,
    playerName,
  };
}

export function changePlayerSprite(playerSpriteUrl) {
  return {
    type: CHANGE_PLAYER_SPRITE,
    playerSpriteUrl,
  };
}

export function toggleMusic(audioUrl) {
  return {
    type: TOGGLE_MUSIC,
    audioUrl,
  };
}
