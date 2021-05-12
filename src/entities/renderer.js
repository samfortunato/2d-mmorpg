import { Entity } from './entity';

export class Renderer {

  img = new Image();
  currentCrop = [];
  currentFrame = 0;
  maxFrame = 0;

  /**
   * @param {Entity} entity
   * @param {CanvasRenderingContext2D} ctx
   * @param {HTMLCanvasElement} canvas
   */
  draw(entity, ctx, canvas) { }

}
