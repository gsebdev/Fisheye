import MediaModel from './MediaModel'
export default class ImageModel extends MediaModel {
  /**
     *
     * @param {Object} image
     */
  constructor (image) {
    super(image)
    this._thumbSrc = `assets/photographers/thumbnails/${image.photographerName}/${image.image}`
    this._src = `assets/photographers/${image.photographerName}/${image.image}`
  }

  get src () {
    return this._src
  }

  getCardDOM () {
    const article = this.getDefaultCardDOM()

    const image = document.createElement('img')
    image.className = 'media-card__media'
    image.src = this._thumbSrc
    image.alt = this._title + ', closeup view'
    image.setAttribute('aria-describedby', this._id + '-likes')

    article.querySelector('.media-card__media-container').append(image)

    return article
  }

  getMediaDOM () {
    const image = document.createElement('img')
    image.className = 'photograph-media'
    image.src = this._src
    image.alt = this._title

    return image
  }
}
