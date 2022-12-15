class MediaFactory {
    /**
     * 
     * @param {Object} media 
     */
    constructor(media) {

        if(media.hasOwnProperty('image')) {

            return new ImageModel(media)

        } else if(media.hasOwnProperty('video') ){

            return new VideoModel(media)

        } else {

            throw 'Format média inconnu'
        }
    }

}