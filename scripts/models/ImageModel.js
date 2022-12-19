class ImageModel {
    /**
     * 
     * @param {Object} image 
     */
    constructor(image) {
        this._id = image.id
        this._photographerId = image.photographerId
        this._title = image.title
        this._thumbSrc = `assets/photographers/thumbnails/${image.photographerName}/${image.image}`
        this._src = `assets/photographers/${image.photographerName}/${image.image}`
        this._likes = image.likes
        this._date = image._date
        this._liked = false
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

        const imageContainer = document.createElement('div')
        imageContainer.className = 'media-card__media-container'

        const image = document.createElement('img')
        image.className = 'media-card__media'
        image.src = this._thumbSrc

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
        })
        
        imageContainer.appendChild(image)
        
        bottomContainer.append(title, likes)
        article.append(imageContainer, bottomContainer)

        return article
    }
    getMediaDOM() {
        const image = document.createElement('img')
        image.className = 'photograph-media'
        image.src = this._src

        return image
    }
}