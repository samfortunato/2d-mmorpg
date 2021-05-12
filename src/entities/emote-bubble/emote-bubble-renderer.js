import { Renderer } from '../renderer';

export class EmoteBubbleRenderer extends Renderer {

  draw(emoteBubble, ctx) {
    // const sender = GlobalStateManager.instance().getEntities()[this.latestEmoteSenderId] || GlobalStateManager.instance().getPlayerPos();
    const { xPos: senderXPos, yPos: senderYPos } = sender;

    const emoteWidth = this.latestEmote.width * 0.25;
    const emoteHeight = this.latestEmote.height * 0.25;
    const emoteImgOffset = (emoteWidth - 64) / 2;
    const emoteXPos = senderXPos - emoteImgOffset;
    const emoteYPos = senderYPos - 64;

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(emoteXPos - 5, emoteYPos - 5, emoteWidth + 10, emoteHeight + 10);

    this.ctx.imageSmoothingEnabled = true;
    this.ctx.drawImage(this.latestEmote, emoteXPos, emoteYPos, emoteWidth, emoteHeight);
    this.ctx.imageSmoothingEnabled = false;
  }

}
