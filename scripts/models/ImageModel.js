class ImageModel {
    /**
     * 
     * @param {Object} image 
     */
    constructor(image) {
        this._id = image.id
        this._photographerId = image.photographerId
        this._title = image.title
        this._src = `assets/photographers/thumbnails/${image.photographerName}/${image.image}`
        this._likes = image.likes
        this._date = image._date
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

        const imageContainer = document.createElement('div')
        imageContainer.className = 'media-card__media-container'

        const image = document.createElement('img')
        image.className = 'media-card__media'
        image.src = this.src

        const bottomContainer = document.createElement('div')
        bottomContainer.className = 'media-card__bottom-container'

        const title = document.createElement('h2')
        title.className = 'media-card__title'
        title.textContent = this._title

        const likes = document.createElement('span')
        const icon = document.createElement('span')
        likes.className = 'media-card__likes'
        likes.textContent = this._likes
        
        imageContainer.appendChild(image)
        likes.append(icon)
        bottomContainer.append(title, likes)
        article.append(imageContainer, bottomContainer)

        return article



    }
}