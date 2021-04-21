import { DRAW_WITH_PEN } from '../constants/action-types/pen';

export function drawWithPen(xPos, yPos) {
  return {
    type: DRAW_WITH_PEN,
    xPos,
    yPos,
  };
}
