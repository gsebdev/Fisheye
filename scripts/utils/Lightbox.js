export default class Lightbox {
  /**
     *
     * @param {String} selectedId
     * @param {Array} medias
     */
  constructor (selectedId, medias) {
    this._currentMediaIndex = medias.findIndex(media => media.id === selectedId)
    this._selectedId = selectedId
    this._medias = medias
    this._eventListeners = ['keydown', 'click']
    this._lightboxDOM = this.createDOM()
  }

  // methode permettant d'afficher la lightbox
  async init () {
    this.close()
    document.querySelector('main').appendChild(this._lightboxDOM)
    this.disableScroll()
    // insertion du média sélectionné lors du click d'ouverture
    await this.insertMedia(this._medias[this._currentMediaIndex].getMediaDOM())
    this._lightboxDOM.classList.remove('loading')
    // ajout des event listeners pour la navigation de la lightbox
    this._eventListeners.forEach(event => {
      this._lightboxDOM.addEventListener(event, this.handleLightboxEvent.bind(this))
    })
  }

  handleLightboxEvent (e) {
    e.preventDefault()
    e.stopImmediatePropagation()
    switch (e.which) {
      // Escape
      case 27:
        this.close()
        document.getElementById(this._selectedId).querySelector('a').focus()
        break
        // fleche de droite
      case 39:
        this.next()
        break
        // fleche de gauche
      case 37:
        this.prev()
        break
        // Tab (le focus reste en boucle dans les elements de navigation de la lightbox)
      case 9: {
        const interactiveEl = this._lightboxDOM.querySelectorAll('a:not(.disabled), img, video, button')
        const focusEl = this._lightboxDOM.querySelector(':focus')
        if (focusEl !== null) {
          const index = Array.from(interactiveEl).findIndex(el => el === focusEl)
          if (e.shiftKey) {
            if (index === 0) {
              interactiveEl[interactiveEl.length - 1].focus()
            } else {
              interactiveEl[index - 1].focus()
            }
          } else {
            if (index === interactiveEl.length - 1) {
              interactiveEl[0].focus()
            } else {
              interactiveEl[index + 1].focus()
            }
          }
        } else {
          interactiveEl[0].focus()
        }
        break
      }
      // Click gauche ou Enter
      case 1:
      case 13: {
        const el = e.target
        switch (el.className) {
          // click n'importe où dans l'image -> moitié gauche = image précédente / moitié droite = image suivante
          case 'lightbox__wrapper':
          case 'photograph-media': {
            e.offsetX < (el.offsetWidth / 2) ? this.prev() : this.next()
            break
          }
          case 'lightbox__close' :
          case 'lightbox':
            this.close()
            break
          case 'lightbox__next' :
            this.next()
            break
          case 'lightbox__previous':
            this.prev()
            break
          default:
            return false
        }
      }
    }
  }

  disableScroll () {
    document.body.style.overflow = 'hidden'
    document.querySelector('.lightbox').style.top = window.scrollY + 'px'
  }

  enableScroll () {
    document.body.style.overflow = 'auto'
  }

  createDOM () {
    const lightbox = document.createElement('div')
    lightbox.className = 'lightbox loading'
    const wrapper = document.createElement('div')
    wrapper.className = 'lightbox__wrapper'
    wrapper.id = 'lightbox-dialog'
    wrapper.setAttribute('aria-label', 'image closeup view')
    wrapper.setAttribute('role', 'dialog')
    wrapper.setAttribute('aria-modal', 'true')
    const prev = document.createElement('a')
    prev.href = '#'
    prev.className = 'lightbox__previous'
    prev.setAttribute('aria-label', 'Previous image')
    const next = document.createElement('a')
    next.href = '#'
    next.className = 'lightbox__next'
    next.setAttribute('aria-label', 'Next image')
    const close = document.createElement('button')
    close.className = 'lightbox__close'
    close.setAttribute('aria-label', 'Close dialog')
    const mediaContainer = document.createElement('div')
    mediaContainer.className = 'lightbox__media-container'

    wrapper.append(mediaContainer, prev, next, close)
    lightbox.appendChild(wrapper)

    return lightbox
  }

  // A chaque changement de média cette méthode est appelée
  async insertMedia () {
    // récupération du DOM du média à afficher
    const mediaDOM = this._medias[this._currentMediaIndex].getMediaDOM()
    const mediaTitle = document.createElement('p')
    mediaTitle.textContent = this._medias[this._currentMediaIndex].title
    mediaDOM.tabIndex = 0
    // mise en mode loading de la lightbox
    this._lightboxDOM.classList.add('loading')
    // Pause permettant la transition css (fade)
    await new Promise((resolve) => setTimeout(resolve, 200))
    // remplacement du média dans le container
    this._lightboxDOM.querySelector('.lightbox__media-container').replaceChildren(mediaDOM)
    this._lightboxDOM.querySelector('.lightbox__media-container').appendChild(mediaTitle)
    // pause permettant au média de s'afficher correctement
    await new Promise((resolve) => setTimeout(resolve, 100))
    // focus sur le média
    mediaDOM.focus()
    // gestion de l'affichage des flèche de naviagation (début et fin de la liste des médias)
    if (this._currentMediaIndex === this._medias.length - 1) {
      this._lightboxDOM.querySelector('.lightbox__next').classList.add('disabled')
    } else if (this._currentMediaIndex < this._medias.length - 1 && this._currentMediaIndex > 0) {
      this._lightboxDOM.querySelector('.lightbox__previous').classList.remove('disabled')
      this._lightboxDOM.querySelector('.lightbox__next').classList.remove('disabled')
    } else {
      this._lightboxDOM.querySelector('.lightbox__previous').classList.add('disabled')
    }
    // enlever le mode loading
    this._lightboxDOM.classList.remove('loading')
  }

  close () {
    const openedlightboxes = document.querySelectorAll('.lightbox')
    openedlightboxes.forEach(lightbox => {
      lightbox.remove()
    })
    this.enableScroll()
    // redirection du focus sur le media qui avait été clické lors de l'ouverture de la lightbox
    document.getElementById(this._selectedId).querySelector('a').focus()
  }

  async next () {
    if (this._currentMediaIndex < this._medias.length - 1) {
      this._currentMediaIndex += 1
      await this.insertMedia()
    }
  }

  async prev () {
    if (this._currentMediaIndex > 0) {
      this._currentMediaIndex -= 1
      await this.insertMedia()
    }
  }
}
