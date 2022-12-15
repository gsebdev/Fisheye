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
            photographerData.media = data.media.filter(media => media.photographerId == id)
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

async function handleFilterChange(medias, FilterInstance) {
    FilterInstance.filterChange
        .then(filter => {
            displayMedias(medias, filter)
            handleFilterChange(medias, FilterInstance)
        })
}

function displayMedias(medias, filter) {
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


    const wrapper = document.querySelector('.photograph-medias')
    wrapper.querySelectorAll('p').forEach(p => p.remove())
    medias.forEach(media => {
        const p = document.createElement('p')
        p.textContent = media.date + ' /likes:' + media.likes + ' /title:' + media.title
        wrapper.appendChild(p)
    })
}

async function init() {
    const photographer = await getPhotographer(photographerID)
    displayHeaderData(photographer)
   const filters = new FilterSortBy('.sort-filter__menu', '.sort-filter__filter')
   displayMedias(photographer.media, filters.filterValue)
   handleFilterChange(photographer.media, filters)

}

init()