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
        try {
            this._liked = JSON.parse(localStorage.getItem(this._id))
            if(this._liked === true ) {
                this._likes += 1
            }
        } catch (error) {
            console.log(error)
            this._liked = false
        }
        this._triggerLikesChange
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
    get likesChange() {
        return new Promise(resolve => {
            this._triggerLikesChange = resolve
        })
    }

    getCardDOM() {
        const article = document.createElement('article')
        article.id = this._id
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
        icon.className = 'heart-icon'
        likes.className = 'media-card__likes'
        likes.textContent = this._likes
        likes.append(icon)
        this._liked === true ? likes.setAttribute('data-liked', true) : likes.setAttribute('data-liked', false)
        likes.addEventListener('click', () => {
            if(this._liked === true) {
                
                this._likes -= 1
                this._liked = false
                likes.setAttribute('data-liked', false)
            } else {
                this._likes += 1
                this._liked = true
                likes.setAttribute('data-liked', true)
            }
            likes.childNodes[0].textContent = this._likes
            this._triggerLikesChange()
            this.saveLikeToLocalStorage(this._liked)
        })
        
        videoContainer.appendChild(video)
        likes.append(icon)
        bottomContainer.append(title, likes)
        article.append(videoContainer, bottomContainer)

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
    saveLikeToLocalStorage(val) {
        try {
            localStorage.setItem(this._id, JSON.stringify(val))
        }catch(error) {
            console.log(error)
        }
    }

}