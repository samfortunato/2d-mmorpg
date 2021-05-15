import { Renderer } from '../renderer';
import { EntityManager } from '../../managers/entity-manager';
import { Entity } from '../entity';

import { TransformComponent } from '../../components/transform-component';

import { EMOTE_IMAGE_URLS } from '../../constants/chat';

export class EmoteBubbleRenderer extends Renderer {

  constructor() {
    super();

    this.opacity = 0;
  }

  draw(emoteBubble, ctx) {
    const sender = EntityManager.entities[emoteBubble.senderId];
    const { xPos: senderXPos, yPos: senderYPos } = Entity.getComponent(sender, TransformComponent);

    this.img.src = EMOTE_IMAGE_URLS[emoteBubble.emoteName];

    const emoteWidth = this.img.width * 0.25;
    const emoteHeight = this.img.height * 0.25;
    const emoteImgOffset = (emoteWidth - 64) / 2;
    const emoteXPos = senderXPos - emoteImgOffset;
    const emoteYPos = senderYPos - 64;

    if (this.currentFrame < 5) {
      this.opacity > 1 ?
        this.opacity = 1 :
        this.opacity += 0.2;
    }

    if (this.currentFrame >= 85) {
      this.opacity < 0 ?
        this.opacity = 0 :
        this.opacity -= 0.2;
    }

    ctx.save();

    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = 'white';
    ctx.fillRect(emoteXPos - 5, emoteYPos - 5, emoteWidth + 10, emoteHeight + 10);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(this.img, emoteXPos, emoteYPos, emoteWidth, emoteHeight);

    ctx.restore();

    this.currentFrame++;
  }

}
