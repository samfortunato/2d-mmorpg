import { EventManager } from '../managers/event-manager';

import { drawWithPen } from '../actions/pen';

export class PenController {

  static _instance = new PenController();

  static instance() { return this._instance; }

  constructor() {
    this.isDrawing = false;

    // document.addEventListener('mousedown', this.startDrawing.bind(this));
    // document.addEventListener('mousemove', this.drawWithPen.bind(this));
    // document.addEventListener('mouseup', this.stopDrawing.bind(this));
  }

  update() { }

  startDrawing(evt) {
    evt.preventDefault();

    this.isDrawing = true;
  }

  /** @param {MouseEvent} evt */
  drawWithPen(evt) {
    evt.preventDefault();

    if (this.isDrawing) {
      EventManager.dispatch(drawWithPen(evt.clientX, evt.clientY));
    }
  }

  stopDrawing(evt) {
    evt.preventDefault();

    this.isDrawing = false;
  }

}
