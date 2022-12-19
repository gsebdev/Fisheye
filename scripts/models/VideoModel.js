class VideoModel extends MediaModel {
    
    constructor(video) {
        super(video)
        this._src = `assets/photographers/${video.photographerName}/${video.video}`
    }
    
    get src() {
        return this._src
    }

    getCardDOM() {
        const article = this.getDefaultCardDOM()

        const video = document.createElement('video')
        video.className = 'media-card__media'
        const source = document.createElement('source')
        source.src = this._src
        source.type = 'video/mp4'
        video.append(source)

        const mediaContainer = article.querySelector('.media-card__media-container')
        mediaContainer.classList.add('video')
        mediaContainer.append(video)

        return article

    }
    getMediaDOM() {
        const video = document.createElement('video')
        video.controls = true
        video.autoplay = true
        video.muted = true
        video.className = 'photograph-media'

        const source = document.createElement('source')
        source.src = this._src
        source.type = 'video/mp4'
        video.append(source)

        return video
    }
    

}