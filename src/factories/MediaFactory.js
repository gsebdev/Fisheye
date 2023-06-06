import ImageModel from '../models/ImageModel'
import VideoModel from '../models/VideoModel'

class MediaFactory {
  /**
     *
     * @param {Object} media
     */
  constructor (media) {
    if (Object.prototype.hasOwnProperty.call(media, 'image')) {
      return new ImageModel(media)
    } else if (Object.prototype.hasOwnProperty.call(media, 'video')) {
      return new VideoModel(media)
    } else {
      throw new Error('Format média inconnu')
    }
  }
}

export { MediaFactory }
