export default class ContactForm {
  constructor (modalId, name) {
    this._modalID = modalId
    this._errors = null
    this._data = {}
    this._sent = false

    this._modalEl = document.querySelector('#' + this._modalID)
    this._formEl = document.querySelector('#' + this._modalID + ' form')
    this._closeButton = document.querySelector('.' + this._modalID + '__close')
    this._openButton = document.querySelector('*[data-target=' + this._modalID + ']')
    this._submitButton = this._modalEl.querySelector('button[type=submit]')

    this._modalEl.querySelector('h2').insertAdjacentHTML('beforeend', '<br>' + name)

    this._closeButton.addEventListener('click', this.close.bind(this))
    this._openButton.addEventListener('click', this.open.bind(this))
    this._submitButton.addEventListener('click', this.handleSubmit.bind(this))
    this._modalEl.addEventListener('keydown', this.handleKeydownEvent.bind(this))
  }

  close (e) {
    e.preventDefault()
    document.querySelector('#' + this._modalID).classList.remove('open')
    document.body.style.overflow = 'auto'
    this.reset()
    this._openButton.focus()
  }

  open () {
    this.reset()
    this._sent = false
    const modal = document.querySelector('#' + this._modalID)
    modal.classList.add('open')
    modal.style.top = window.scrollY + 'px'
    modal.querySelector('.modal').focus()
    document.body.style.overflow = 'hidden'
    this._formEl.style.height = 'auto'
  }

  reset () {
    this._formEl.querySelectorAll('input:not([type=submit]), textarea').forEach(input => {
      input.value = ''
      this.hideError(input.parentElement)
    })
    this._formEl.classList.remove('sending', 'sending--success')
    this._submitButton.textContent = 'Envoyer'
    this._submitButton.removeAttribute('aria-describedby')
    this._submitButton.setAttribute('aria-label', 'Envoyer')
  }

  handleKeydownEvent (e) {
    const firstFocusableEl = this._modalEl.querySelector('*[role=dialog], button, a, input, textarea')
    if (e.which === 9 && e.target === this._closeButton && e.shiftKey === false) {
      e.preventDefault()
      firstFocusableEl.focus()
    }
    if (e.which === 9 && e.target === firstFocusableEl && e.shiftKey === true) {
      e.preventDefault()
      this._closeButton.focus()
    }
    if (e.which === 27) {
      this.close(e)
    }
  }

  handleSubmit (e) {
    e.preventDefault()

    if (this._sent === true) {
      this.close(e)
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
    el.setAttribute('aria-invalid', true)
    el.setAttribute('aria-description', errorMsg)
    el.querySelector('input, textarea').setAttribute('aria-invalid', true)
    el.querySelector('input, textarea').setAttribute('aria-description', errorMsg)
    this._submitButton.setAttribute('aria-description', 'Envoi impossible, le formulaire contient des erreurs')
  }

  hideError (el) {
    el.removeAttribute('aria-invalid', false)
    el.removeAttribute('aria-description', '')
    el.querySelector('input, textarea').removeAttribute('aria-invalid', false)
    el.querySelector('input, textarea').removeAttribute('aria-description', '')
    this._submitButton.removeAttribute('aria-description')
  }

  displayLoading () {
    this._formEl.classList.add('sending')
    this._submitButton.textContent = 'Envoi...'
    this._submitButton.setAttribute('aria-label', 'Envoi de votre message')
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
    submitBtn.setAttribute('aria-label', 'Close contact form')
    submitBtn.setAttribute('aria-describedby', 'modal-contact-success-msg')
  }

  send (data) {
    this.displayLoading()
    setTimeout(() => {
      this.displaySuccessMsg('Votre message<br>a bien été envoyé !')
    }, 2000)

    console.log(data)
  }
}
