import { CHANGE_PLAYER_NAME } from '../constants/action-types/command';

export function changePlayerName(playerName) {
  return {
    type: CHANGE_PLAYER_NAME,
    playerName,
  };
};
