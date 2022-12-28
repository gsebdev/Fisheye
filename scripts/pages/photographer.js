import { MediaFactory } from '../factories/MediaFactory'
import { PhotographerFactory } from '../factories/PhotographerFactory'
import getPhotographers from '../api/api'
import FilterSortBy from '../utils/FilterSortBy'
import Lightbox from '../utils/Lightbox'
import ContactForm from '../utils/contactForm'

class PhotographerPage {
  constructor (photographerFactory) {
    this._photographerFactory = photographerFactory
    // Chaque objet 'media' récupéré dans le fichier json est transformé en un objet Media avec des méthodes permettant de générer le DOM grâce à la factory Media
    this._photographerFactory.medias = photographerFactory.medias.map(media => {
      media.photographerName = photographerFactory.name.split(' ')[0]
      media = new MediaFactory(media)
      return media
    })
    // méthode permettant de générer le DOM du header du photographe
    this._header = this._photographerFactory.getDOM()
    // insertion du DOM du header photographe dans le html
    document.querySelector('main').prepend(this._header)
    // initialisation du filtre de tri et du formulaire de contact
    this._filter = new FilterSortBy()
    this._contactForm = new ContactForm('contact_modal', this._photographerFactory.name)
    this._filter.change = this.renderMedias.bind(this)
  }

  renderMedias () {
    const wrapper = document.querySelector('.photograph-medias__wrapper')
    // ajout de la classe 'loading' pendant le rendu des médias
    wrapper.classList.add('loading')
    // tri de l'ordre des médias en fonction de la valeur du filtre
    this._photographerFactory.medias.sort((a, b) => {
      if (a[this._filter.value] > b[this._filter.value]) {
        return 1
      }
      if (a[this._filter.value] < b[this._filter.value]) {
        return -1
      }
      return 0
    })
    if (this._filter.value !== 'title') {
      this._photographerFactory.medias.reverse()
    }
    setTimeout(() => {
      // reset du wrapper
      wrapper.innerHTML = ''
      // pour chaque media....
      this._photographerFactory.medias.forEach(media => {
        const cardDOM = media.getCardDOM()
        // ajout d'un event listener lors du click sur le média permettant d'ouvrir la Lightbox
        cardDOM.querySelector('.media-card__media-container').addEventListener('click', (e) => {
          e.preventDefault()
          const lightbox = new Lightbox(media.id, this._photographerFactory.medias)
          lightbox.init()
        })
        // ajout d'un event listener change sur chaque media permettant d'écouter une modification du 'like' puis de mettre à jour le total des likes dans le header photographe
        cardDOM.querySelector('.media-card__likes').addEventListener('change', () => { this._photographerFactory.updateLikes() })
        // le DOM de chaque média est inséré dans le wrapper
        wrapper.appendChild(cardDOM)
      })
    }, 200)
    // lorsque tous les médias ont été affichés -> la classe loading est enlevée, le timeout permet une transition fluide
    setTimeout(() => { wrapper.classList.remove('loading') }, 500)
  }
}

async function init () {
  const photographerID = new URL(document.location).searchParams.get('id')
  const photographerFactory = new PhotographerFactory(await getPhotographers(photographerID))
  const photographerPage = new PhotographerPage(photographerFactory)
  photographerPage.renderMedias()
}

init()
