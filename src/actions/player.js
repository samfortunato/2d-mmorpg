import { PLAYER_MOVE } from '../constants/action-types/player';

export function playerMove(playerInfo) {
  return {
    type: PLAYER_MOVE,
    playerInfo,
  };
};
