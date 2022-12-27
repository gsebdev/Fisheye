class PhotographerPage {
    constructor(photographerFactory) {
        this._photographerFactory = photographerFactory
        this._photographerFactory.medias = photographerFactory.medias.map(media => {
            media.photographerName = photographerFactory.name.split(' ')[0]
            media = new MediaFactory(media)
            return media
        })
        this._header = this._photographerFactory.getDOM()
        document.querySelector('main').prepend(this._header)
        this._filter = new FilterSortBy()
        this._contactForm = new ContactForm('contact_modal', this._photographerFactory.name)
        this._filter.change = this.renderMedias.bind(this)
        this.renderMedias()
        
    }
    
    renderMedias() { 
        const wrapper = document.querySelector('.photograph-medias__wrapper')
        wrapper.classList.add('loading')

        this._photographerFactory.medias.sort((a, b) => {
            if(a[this._filter.value] > b[this._filter.value]) {
                return 1
            }
            if(a[this._filter.value] < b[this._filter.value]) {
                return -1
            }
            return 0
        })
        if(this._filter.value !== 'title') {
            this._photographerFactory.medias.reverse()
        }
        setTimeout(() => {
            wrapper.innerHTML = ''
            this._photographerFactory.medias.forEach(media => {
                const cardDOM = media.getCardDOM()
                cardDOM.querySelector('.media-card__media-container').addEventListener('click', (e) => {
                    e.preventDefault()
                    new Lightbox(media.id, this._photographerFactory.medias)
                })
                cardDOM.querySelector('.media-card__likes').addEventListener('change', () => { this._photographerFactory.updateLikes() })
                wrapper.appendChild(cardDOM)
            })}, 200)
        setTimeout(() => {wrapper.classList.remove('loading')}, 500)
    }
    
}



async function init() {
    const photographerID = new URL(document.location).searchParams.get('id');
    const photographerFactory = new PhotographerFactory(await getPhotographers(photographerID))
    new PhotographerPage(photographerFactory)
}

init()