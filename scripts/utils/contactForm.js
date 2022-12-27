class ContactForm{
    constructor(modalId, name){
        this._modalID = modalId
        this._modalEl = document.querySelector('#' + this._modalID)
        this._formEl = document.querySelector('#' + this._modalID + ' form')
        this._errors = null
        this._data = {}
        this._sent = false
        this._closeButton = document.querySelector('.' + this._modalID + '__close')

        this._closeButton.addEventListener('click', this.close.bind(this))
        document.querySelector('*[data-target=' + this._modalID + ']').addEventListener('click', this.open.bind(this))
        this._modalEl.querySelector('h2').insertAdjacentHTML('beforeend', '<br>' + name)
        this._modalEl.querySelector('button[type=submit]').addEventListener('click', this.handleSubmit.bind(this))
        this._modalEl.addEventListener('keydown', this.handleKeydownEvent.bind(this))

    }
    close(e) {
      e.preventDefault()
        document.querySelector('#' + this._modalID).classList.remove('open')
        document.body.style.overflow = 'auto'
        this.reset()
    }
    open() {
        this.reset()
        const modal = document.querySelector('#' + this._modalID)
        modal.classList.add('open')
        modal.style.top = window.scrollY + 'px'
        modal.querySelector('.modal').focus()
        document.body.style.overflow = 'hidden'

    }
    reset() {
        this._formEl.querySelectorAll('input:not([type=submit]), textarea').forEach(input => {
            input.value = ''
        })
        this._formEl.classList.remove('sending', 'sending--success')
        this._formEl.querySelector('*[type=submit]').textContent = 'Envoyer'
    }

    handleKeydownEvent(e){
      const firstFocusableEl = this._modalEl.querySelector('*[role=dialog], button, a, input, textarea')
      if(e.which === 9 && e.target === this._closeButton && e.shiftKey === false) {
        e.preventDefault()
        firstFocusableEl.focus()
      }
      if(e.which === 9 && e.target === firstFocusableEl && e.shiftKey === true) {
        e.preventDefault()
        this._closeButton.focus()
      }
    }
    handleSubmit (e) {
        e.preventDefault()

        if(this._sent === true) {
            this.close()
        } else {
            if (this.validateAllData()) {
                this.send(this._data)
            } else {
                this._errors = true
                this._formEl.querySelectorAll('input:not([type=submit]), textarea').forEach(el => el.addEventListener('input', (e) => {
                    this.validateSingleData(e.target)
                }))
            }
        }
        
      }
    
      validateAllData () {
        const inputs = document.querySelectorAll('#' + this._modalID + ' input, #' + this._modalID + ' textarea')
        let errors = 0
    
        inputs.forEach(input => {
          this.validateSingleData(input) ? errors += 0 : errors += 1
        })
        if (errors === 0) {
          return true
        } else {
          return false
        }
      }
    
      validateSingleData (input) {
        let errorMsg
        switch (input.type) {

          case 'text':
            errorMsg = 'Veuillez entrer au minimum 2 caractères !'
            if (input.value.length < 2) {
              this.displayError(input.parentElement, errorMsg)
              return false
            } else {
              this.hideError(input.parentElement)
              this._data[input.name] = input.value
              return true
            }

          case 'email':
            errorMsg = 'Adresse Email invalide, merci de modifier'
            if (!input.value.match(/^([\w.-]+)@([\w-]+)((\.(\w){2,6})+)$/)) {
              this.displayError(input.parentElement, errorMsg)
              return false
            } else {
              this.hideError(input.parentElement)
              this._data[input.name] = input.value
              return true
            }

            case 'textarea':
                errorMsg = 'Veuillez entrer au minimum 10 caractères !'
                if (input.value.length < 10) {
                this.displayError(input.parentElement, errorMsg)
                return false
                } else {
                this.hideError(input.parentElement)
                this._data[input.name] = input.value
                return true
                }

          
        }
      }
    
      displayError (el, errorMsg) {
        el.setAttribute('data-error', errorMsg)
        el.setAttribute('data-error-visible', true)
      }
    
      hideError (el) {
        el.setAttribute('data-error-visible', false)
      }
    
      displayLoading () {
        const submitBtn = this._formEl.querySelector('*[type=submit]')
    
        this._formEl.classList.add('sending')
        submitBtn.textContent = 'Envoi...'
      }
    
      displaySuccessMsg (msg) {
        this._sent = true
        this.reset()
        const formHeight = this._formEl.offsetHeight
        const submitBtn = this._formEl.querySelector('*[type=submit]')
        this._formEl.querySelector('.success-msg').innerHTML = msg
        this._formEl.classList.add('sending--success')
        this._formEl.style.height = formHeight + 'px'
        
        submitBtn.textContent = 'Fermer'
      }

      send (data) {
        this.displayLoading()
        setTimeout(() => {
            this.displaySuccessMsg('Votre message<br>a bien été envoyé !')
        }, 2000)
        
        console.log(data)
    
      }
    
}