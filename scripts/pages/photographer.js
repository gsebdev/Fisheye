async function getPhotographer(id) {
    return fetch('../../data/photographers.json')
        .then(res => {
            if(res.ok) {
                return res.json()}
            else {
                throw new Error(res.status )
            }})
        .then(data => {
            let photographerData = data.photographers.find(photographer => photographer.id == id)
            photographerData.medias = data.media.filter(media => media.photographerId == id)
            return photographerData

        })
        .catch(error => console.log('erreur de récupération des données ', error))
}

function displayHeaderData(photographerModel, mediasComponent) {
    const title = document.querySelector('h1')
    const location = document.querySelector('.photograph-header__location')
    const tagline = document.querySelector('.photograph-header__tagline')
    const portrait = document.querySelector('.photograph-portrait')
    const likes = document.querySelector('.photograph-header__likes')
    const price = document.querySelector('.photograph-header__price')

    title.textContent = photographerModel.name
    location.textContent = photographerModel.city + ', ' +  photographerModel.country
    tagline.textContent = photographerModel.tagline
    portrait.src = photographerModel.picture
    price.textContent = photographerModel.price + '€ / jour'
    
    function displayPhotographerLikes() {
        likes.childNodes[0].textContent = photographerModel.likes
        handleMediasLikesChange()
    } 

    function handleMediasLikesChange() {
       mediasComponent.photographerLikesChange.then(() => displayPhotographerLikes())
        
    }
    displayPhotographerLikes()
}

class MediasComponent {
    constructor(photographerModel) {
        this._filterComponent = new FilterSortBy('.sort-filter__menu', '.sort-filter__filter')
        this._filter = this._filterComponent.filterValue
        this._triggerLikesChange
        this._photographerModel = photographerModel
        this._photographerModel.medias = photographerModel.medias.map(media => {
            media.photographerName = photographerModel.name.split(' ')[0]
            media = new MediaFactory(media)
            media.likesChange.then(() => this.handleMediaLikesChange(media))
            return media
        })      
    }
    handleMediaLikesChange(media) {
        this._triggerLikesChange()
        media.likesChange.then(() =>this.handleMediaLikesChange(media))
        
    }
    handleFilterChange() {
        this._filterComponent.filterChange
            .then(() => {
                this._filter = this._filterComponent.filterValue
                this.renderMedias()   
            })
    } 
    get photographerLikesChange() {
        return new Promise(resolve => this._triggerLikesChange = resolve)
    }
    
    
    renderMedias() {
        const wrapper = document.querySelector('.photograph-medias__wrapper') 
        
        wrapper.classList.add('loading')

        this._photographerModel.medias.sort((a, b) => {
            if(a[this._filter] > b[this._filter]) {
                return 1
            }
            if(a[this._filter] < b[this._filter]) {
                return -1
            }
            return 0
        })
        if(this._filter !== 'title') {
            this._photographerModel.medias.reverse()
        }
        setTimeout(() => {
            wrapper.innerHTML = ''
            this._photographerModel.medias.forEach(media => {
                const cardDOM = media.getCardDOM()
                cardDOM.querySelector('.media-card__media-container').addEventListener('click', () => new Lightbox(media.id, this._photographerModel.medias))
                wrapper.appendChild(cardDOM)
            })}, 200)
        setTimeout(() => {wrapper.classList.remove('loading')}, 500)
        this.handleFilterChange()
    }
}



async function init() {
    const photographerID = new URL(document.location).searchParams.get('id');
    const photographerModel = new PhotographerModel(await getPhotographer(photographerID))
    const mediasComponent = new MediasComponent(photographerModel)
    const contactForm = () => new ContactForm('contact_modal', photographerModel.name)
    displayHeaderData(photographerModel, mediasComponent)
    mediasComponent.renderMedias()
    contactForm()


}

init()