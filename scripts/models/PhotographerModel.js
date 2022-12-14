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
        this._picture = `assets/photographers/${this._portrait}`
        if(data.media) {
            this._media = data.media
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
    get media() {
        return this._media ? this._media : []
    }
    get likes() {
        if(this._media) {
            return this._media.reduce((likes, media) => likes + media.likes, 0)
        }
    }
    
}