class FilterSortBy {

    constructor() {
        this._currentFilterElement = document.querySelector('.sort-filter__filter[aria-selected=true]')
        this.currentFilterValue = this._currentFilterElement.getAttribute('data-value')
        this._isExpanded = false
        this._menu = document.querySelector('.sort-filter__menu')
        this._filters = this._menu.querySelectorAll('.sort-filter__filter')
        this._button = document.querySelector('.sort-filter__button')
        
        this._eventListeners = ['keydown', 'click']
        this._eventListeners.forEach(event => {
            this._filters.forEach(filter => filter.addEventListener(event, this.handleFiltersEvent.bind(this)))
            this._button.addEventListener(event, this.handleButtonEvent.bind(this))
        })
    }


    handleButtonEvent(e) {
        switch(e.which) {
            //arrow right and down
            case 39:
            case 40:
                e.preventDefault()
                if(this._currentFilterElement.nextElementSibling) {
                    this.switchSelectedFilter(this._currentFilterElement.nextElementSibling)
                }
                break
            //arrow left and up
            case 37:
            case 38:
                e.preventDefault()
                if(this._currentFilterElement.previousElementSibling) {
                    this.switchSelectedFilter(this._currentFilterElement.previousElementSibling)
                }
                break
            //key enter and click left
            case 13:
            case 1:
                e.preventDefault()
                e.stopPropagation()
                if(this._isExpanded) {
                    this.closeFilterMenu()
                    if(e.which === 13) {this._button.focus()}
                }else{ 
                    this.openFilterMenu()
                    this.switchFilterFocus(this._currentFilterElement)
                }
                break
            default:
                return false
        }
    }
    handleFiltersEvent(e) {
        e.preventDefault()
        e.stopPropagation()
        switch(e.which) {
            //up arrow key
            case 38:
                
                if(e.target.previousElementSibling) {
                    this.switchFilterFocus(e.target.previousElementSibling)
                }else {
                    this.switchFilterFocus(e.target.parentElement.lastElementChild)
                }
                break
            //down arrow key
            case 40:
                
                if(e.target.nextElementSibling) {
                    this.switchFilterFocus(e.target.nextElementSibling)
                }else {
                    this.switchFilterFocus(e.target.parentElement.firstElementChild)
                }
                break
            //Enter and click left
            case 13:
            case 1:
                if(e.target.getAttribute('aria-selected') === 'false') {
                    this.switchSelectedFilter(e.target)
                } else {
                    this.closeFilterMenu()
                }
                if(e.which === 13) {
                   this._button.focus() 
                }
            //Escape and Tab keys
            case 9:
            case 27:
                this.closeFilterMenu()
                this._button.focus()
                break
            default:
                return false
        }
    }
    switchSelectedFilter(newFilterElement) {
        this._currentFilterElement.setAttribute('aria-selected', false)
        newFilterElement.setAttribute('aria-selected', true)
        this._currentFilterElement = newFilterElement
        this._currentFilterElement.parentElement.setAttribute('aria-activedescendant', this._currentFilterElement.id)
        this.currentFilterValue = newFilterElement.getAttribute('data-value')
        this._button.childNodes[0].textContent = this._currentFilterElement.textContent
        this.closeFilterMenu()
        this._menu.dispatchEvent(new Event('change'))


    }
    switchFilterFocus(target) {
        target.focus()
        if(target === this._filters[0]) {
            this._menu.classList.add('dropdown-focus')
        } else {
            this._menu.classList.remove('dropdown-focus')
        }
    }
    closeFilterMenu() {
        this._menu.classList.remove('dropped-down')
        this._menu.classList.remove('dropdown-focus')
        this._isExpanded = false
        this._button.setAttribute('aria-expanded', this._isExpanded)
        document.onclick = null
        this._menu.onmouseover = null

    }
    openFilterMenu() {
        this._menu.classList.add('dropped-down')
        this._isExpanded = true
        this._button.setAttribute('aria-expanded', this._isExpanded)
        document.onclick = (e) => {
            if(!this._menu.contains(e.target)) {
                this.closeFilterMenu()
            }
        }
        this._menu.onmouseover = (e) => {
                this.switchFilterFocus(e.target)
            }
    }

    set change(callback) {
        this._menu.addEventListener('change', callback)
    }
    get value() {
        return this.currentFilterValue
    }
}