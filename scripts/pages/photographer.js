const photographerID = new URL(document.location).searchParams.get('id');

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

function displayHeaderData(photographer) {
    const photographerModel = new PhotographerModel(photographer)
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
    likes.innerHTML = photographerModel.likes + ' <img src="assets/icons/heart.svg" alt="likes">'
}

function mediasComponent(photographer) {
    const medias = photographer.medias.map(media => {
        media
        media.photographerName = photographer.name.split(' ')[0]
        const mediaFactory = new MediaFactory(media)
        media.cardDOM = mediaFactory.createDOM()
        return media
        
    })
    const filterComponent = new FilterSortBy('.sort-filter__menu', '.sort-filter__filter')
    let filter = filterComponent.filterValue
    displayMedias()
    handleFilterChange()

    function handleFilterChange() {
        filterComponent.filterChange
            .then(() => {
                filter = filterComponent.filterValue
                displayMedias()
                handleFilterChange()
            })
    }
    
    function displayMedias() {
        const wrapper = document.querySelector('.photograph-medias__wrapper') 

        medias.sort((a, b) => {
            if(a[filter] > b[filter]) {
                return 1
            }
            if(a[filter] < b[filter]) {
                return -1
            }
            return 0
        })
        if(filter !== 'title') {
            medias.reverse()
        }

        wrapper.innerHTML = ''
        medias.forEach(media => {
            wrapper.appendChild(media.cardDOM)
        })
    }
}


async function init() {
    const photographer = await getPhotographer(photographerID)
    displayHeaderData(photographer)
    mediasComponent(photographer)


}

init()