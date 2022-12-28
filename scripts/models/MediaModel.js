export default class MediaModel {
  /**
     *
     * @param {Object} media
     */
  constructor (media) {
    this._id = media.id
    this._photographerId = media.photographerId
    this._title = media.title
    this._likes = media.likes
    this._date = media._date
    this._changeCallbackFunc = null
    try {
      this._liked = JSON.parse(localStorage.getItem(this._id))
      if (this._liked === true) {
        this._likes += 1
      }
    } catch (error) {
      console.log(error)
      this._liked = false
    }
  }

  get id () {
    return this._id
  }

  get photographerId () {
    return this._photographerId
  }

  get title () {
    return this._title
  }

  get likes () {
    return this._likes
  }

  get date () {
    return this._date
  }

  getDefaultCardDOM () {
    const article = document.createElement('article')
    article.id = this._id
    article.className = 'media-card'

    const imageContainer = document.createElement('a')
    imageContainer.href = '#'
    imageContainer.className = 'media-card__media-container'

    const bottomContainer = document.createElement('div')
    bottomContainer.className = 'media-card__bottom-container'

    const title = document.createElement('h2')
    title.className = 'media-card__title'
    title.textContent = this._title

    const likes = document.createElement('span')
    const icon = document.createElement('span')
    icon.className = 'heart-icon'
    icon.setAttribute('aria-label', 'likes')
    icon.setAttribute('role', 'img')
    likes.className = 'media-card__likes'
    likes.textContent = this._likes
    likes.append(icon)
    this._liked === true ? likes.setAttribute('data-liked', true) : likes.setAttribute('data-liked', false)
    likes.addEventListener('click', () => {
      if (this._liked === true) {
        this._likes -= 1
        this._liked = false
        likes.setAttribute('data-liked', false)
      } else {
        this._likes += 1
        this._liked = true
        likes.setAttribute('data-liked', true)
      }
      likes.childNodes[0].textContent = this._likes
      this.saveLikeToLocalStorage(this._liked)
      likes.dispatchEvent(new Event('change'))
    })

    bottomContainer.append(title, likes)
    article.append(imageContainer, bottomContainer)

    return article
  }

  saveLikeToLocalStorage (val) {
    try {
      localStorage.setItem(this._id, JSON.stringify(val))
    } catch (error) {
      console.log(error)
    }
  }

  get change () {
    return this._changeCallbackFunc
  }

  set change (callbackFunc) {
    this._changeCallbackFunc = callbackFunc
    document.querySelector('.media-card__likes').addEventListener('change', callbackFunc)
  }
}
