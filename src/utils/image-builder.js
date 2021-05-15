export class ImageBuilder {

  static buildFromUrl(imageUrl) {
    const image = new Image();
    image.src = imageUrl;

    return image;
  }

}
