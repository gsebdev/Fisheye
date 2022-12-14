class PhotographerCard {
    /**
     * 
     * @param {Object} photographer 
     */
    constructor(photographer) {
        this._photographer = photographer
    }

    getPhotographerCard() {
        
        const article = document.createElement( 'article' )
        article.className = 'photographer-card'

        const link = document.createElement('a')
        link.className = 'photographer-card__link'
        link.href =  `photographer.html?id=${this._photographer.id}`
      

        const img = document.createElement('img')
        img.src = this._photographer.picture
        img.className = 'photograph-portrait'

        const h2 = document.createElement( 'h2')
        h2.className = 'photographer-card__name'
        h2.textContent = this._photographer.name

        const location = document.createElement('p')
        location.className = 'photographer-card__location'
        location.textContent = this._photographer.country + ', ' + this._photographer.city

        const tagLineEl = document.createElement('p')
        tagLineEl.className = 'photographer-card__tagline'
        tagLineEl.textContent = this._photographer.tagline

        const priceEl = document.createElement('p')
        priceEl.className = 'photographer-card__price'
        priceEl.textContent = this._photographer.price + '€/jour'

        link.append(img, h2, location, tagLineEl, priceEl);
        article.append(link)

        return (article)
    }
    
}