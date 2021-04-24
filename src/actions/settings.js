import { CHANGE_VOLUME } from '../constants/action-types/settings';

export function changeVolume(volume) {
  return {
    type: CHANGE_VOLUME,
    volume,
  };
}
