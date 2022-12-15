class VideoModel {
    /**
     * 
     * @param {Object} video 
     */
    constructor(video) {
        this._id = video.id
        this._photographerId = video.photographerId
        this._title = video.title
        this._src = `assets/photographers/${video.photographerName}/${video.video}`
        this._likes = video.likes
        this._date = video._date
    }
    get id() {
        return this._id
    }
    get photographerId() {
        return this._photographerId
    }
    get title() {
        return this._title
    }
    get src() {
        return this._src
    }
    get likes() {
        return this._likes
    }
    get date() {
        return this._date
    }

    createDOM() {
        const article = document.createElement('article')
        article.className = 'media-card'

        const videoContainer = document.createElement('div')
        videoContainer.className = 'media-card__media-container video'

        const video = document.createElement('video')
        video.className = 'media-card__media'
        const source = document.createElement('source')
        source.src = this._src
        source.type = 'video/mp4'
        video.append(source)

        const bottomContainer = document.createElement('div')
        bottomContainer.className = 'media-card__bottom-container'

        const title = document.createElement('h2')
        title.className = 'media-card__title'
        title.textContent = this._title

        const likes = document.createElement('span')
        const icon = document.createElement('span')
        likes.className = 'media-card__likes'
        likes.textContent = this._likes
        
        videoContainer.appendChild(video)
        likes.append(icon)
        bottomContainer.append(title, likes)
        article.append(videoContainer, bottomContainer)

        return article

    }
}