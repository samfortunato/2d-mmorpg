import { CHANGE_PLAYER_NAME, CHANGE_PLAYER_SPRITE } from '../constants/action-types/command';

export function changePlayerName(playerName) {
  return {
    type: CHANGE_PLAYER_NAME,
    playerName,
  };
};

export function changePlayerSprite(playerSpriteUrl) {
  return {
    type: CHANGE_PLAYER_SPRITE,
    playerSpriteUrl,
  };
};
