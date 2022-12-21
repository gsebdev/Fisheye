class PhotographerModel {
    /**
     * 
     * @param {Object} data 
     */
    constructor(data) {
        this._id = data.id
        this._name = data.name
        this._city = data.city
        this._country = data.country
        this._tagline = data.tagline
        this._price = data.price
        this._portrait = data.portrait
        this._picture = `assets/photographers/thumbnails/${this._portrait}`
        if(data.medias) {
            this._medias = data.medias
        }
    }
    get id() {
        return this._id
    }
    get name() {
        return this._name
    }
    get city() {
        return this._city
    }
    get country() {
        return this._country
    }
    get tagline() {
        return this._tagline
    }
    get price() {
        return this._price
    }
    get portrait() {
        return this._portrait
    }
    get picture() {
        return this._picture
    }
    get medias() {
        return this._medias ? this._medias : []
    }
    get likes() {
        if(this._medias) {
            return this._medias.reduce((likes, media) => likes + media.likes, 0)
        }
    }
    set medias(medias) {
        this._medias = medias
    }

    getPhotographerCard() {
        const article = document.createElement( 'article' )
        article.className = 'photographer-card'
        article.id = this._id

        const link = document.createElement('a')
        link.className = 'photographer-card__link'
        link.href =  `photographer.html?id=${this._id}`
        link.setAttribute('aria-labelledby', this._id + '-name')
        link.setAttribute('aria-describedby', this._id + '-description')
      

        const img = document.createElement('img')
        img.src = this._picture
        img.className = 'photograph-portrait'
        img.setAttribute('alt', '')
        

        const h2 = document.createElement( 'h2')
        h2.className = 'photographer-card__name'
        h2.textContent = this._name
        h2.id = this._id + '-name'

        link.append(img, h2)

        const paragraphContainer = document.createElement('p')
        paragraphContainer.className = 'photographer-card__text-container'
        paragraphContainer.id = this._id + '-description'

        const location = document.createElement('span')
        location.className = 'photographer-card__location'
        location.textContent = this._country + ', ' + this._city

        const tagLineEl = document.createElement('span')
        tagLineEl.className = 'photographer-card__tagline'
        tagLineEl.textContent = this._tagline

        const priceEl = document.createElement('span')
        priceEl.className = 'photographer-card__price'
        priceEl.textContent = this._price + '€/jour'
        
        paragraphContainer.append(location, tagLineEl, priceEl)

        article.append(link, paragraphContainer)

        return (article)
    }
    
}