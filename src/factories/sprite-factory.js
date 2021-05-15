import { ImageBuilder } from '../utils/image-builder';

import { CHARACTER_SPRITE_URLS } from '../constants/sprites';

export class SpriteFactory {

  static spriteFlyweights = {};

  static getSprite(spriteName) {
    this.spriteFlyweights[spriteName] =
      this.spriteFlyweights[spriteName] ||
      ImageBuilder.buildFromUrl(CHARACTER_SPRITE_URLS[spriteName]);

    return this.spriteFlyweights[spriteName];
  }

}
