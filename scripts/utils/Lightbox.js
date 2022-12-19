class Lightbox {
    /**
     * 
     * @param {String} selectedId 
     * @param {Array} medias 
     */
    constructor(selectedId, medias) {
        this._currentMediaIndex = medias.findIndex(media => media.id == selectedId)
        this._medias = medias
        this._lightboxDOM = this.createDOM()
        this.init()
    }
    async init() {
        this.close()
        document.querySelector('main').appendChild(this._lightboxDOM)
        this.disableScroll()
        await this.insertMedia(this._medias[this._currentMediaIndex].getMediaDOM())
        this._lightboxDOM.classList.remove('loading')

    }
    disableScroll() {
        document.body.style.overflow = 'hidden'
        document.querySelector('.lightbox').style.top = window.scrollY + 'px'
    }
    enableScroll() {
        document.body.style.overflow = 'auto'
    }

    createDOM() {
        const lightbox = document.createElement('div')
        lightbox.className = 'lightbox loading'
        lightbox.addEventListener('click', this.close.bind(this))
        const wrapper = document.createElement('div')
        wrapper.className = 'lightbox__wrapper'
        wrapper.addEventListener('click', this.handleClick.bind(this))
        const prev = document.createElement('div')
        prev.className = 'lightbox__previous'
        const next = document.createElement('div')
        next.className = 'lightbox__next'
        const close = document.createElement('div')
        close.className = 'lightbox__close'
        const mediaContainer = document.createElement('div')
        mediaContainer.className = 'lightbox__media-container'
        
        wrapper.append(prev, mediaContainer, close, next)
        lightbox.appendChild(wrapper)
        
        return lightbox
    }

    handleClick(e) {
        e.stopImmediatePropagation()
        const el = e.target
        switch(el.className) {
            case 'lightbox__wrapper':
            case 'photograph-media': {
                e.offsetX < (el.offsetWidth / 2) ? this.prev() : this.next()
                break
            }
            case 'lightbox__close' :
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
    async insertMedia() {
        const mediaDOM = this._medias[this._currentMediaIndex].getMediaDOM()
        const mediaTitle = this._medias[this._currentMediaIndex].title
        this._lightboxDOM.classList.add('loading')
        await new Promise((resolve) => setTimeout(resolve, 200));
        this._lightboxDOM.querySelector('.lightbox__media-container').innerHTML = mediaDOM.outerHTML + '<p>' + mediaTitle + '</p>'
        await new Promise((resolve) => setTimeout(resolve, 100));

        if(this._currentMediaIndex === this._medias.length - 1) {
            this._lightboxDOM.querySelector('.lightbox__next').classList.add('disabled')
        } else if(this._currentMediaIndex < this._medias.length - 1 && this._currentMediaIndex > 0 ) {
            this._lightboxDOM.querySelector('.lightbox__previous').classList.remove('disabled')
            this._lightboxDOM.querySelector('.lightbox__next').classList.remove('disabled')
        }else {
            this._lightboxDOM.querySelector('.lightbox__previous').classList.add('disabled')
        }

        this._lightboxDOM.classList.remove('loading')
    }

    close() {
        const openedlightboxes = document.querySelectorAll('.lightbox')
        
        openedlightboxes.forEach(lightbox => {
            lightbox.remove()
        })

        this.enableScroll()
    }
    async next() {
        if(this._currentMediaIndex < this._medias.length - 1) {
            this._currentMediaIndex += 1
            await this.insertMedia()
        }
        
    }
    async prev() {
        if(this._currentMediaIndex > 0) {
            this._currentMediaIndex -= 1
            await this.insertMedia()
        }
    }
}