class FilterSortBy {

    constructor() {
        this._currentFilterElement = document.querySelector('.sort-filter__filter[aria-selected=true]')
        this.currentFilterValue = this._currentFilterElement.getAttribute('data-value')
        this._isExpanded = false
        this._menu = document.querySelector('.sort-filter__menu')
        this._filters = this._menu.querySelectorAll('.sort-filter__filter')
        this._button = document.querySelector('.sort-filter__button')
        this._buttonIcon = document.querySelector('.sort-filter__dropdown-icon')
        this._triggerFilterChange

        this._filters.forEach(filter => filter.addEventListener('keydown', this.handleKeyDown.bind(this)))
        this._filters.forEach(filter => filter.addEventListener('click', this.handleFilterClick.bind(this)))
        this._buttonIcon.addEventListener('click', this.handleButtonEvent.bind(this))
        this._button.addEventListener('keydown', this.handleButtonEvent.bind(this))
        this._button.addEventListener('click', this.handleButtonEvent.bind(this))
    }


    handleButtonEvent(e) {
        if(e.type === 'keydown') {
            switch(e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault()
                    if(this._currentFilterElement.nextElementSibling) {
                        this.switchSelectedFilter(this._currentFilterElement.nextElementSibling)
                    }
                    return false
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault()
                    if(this._currentFilterElement.previousElementSibling) {
                        this.switchSelectedFilter(this._currentFilterElement.previousElementSibling)
                    }
                    return false
                case 'Enter':
                    e.preventDefault()
                    e.stopPropagation()
                    break
                default:
                    return false
            }
        }

        if(this._isExpanded) {
            this.closeFilterMenu()
            if(e.key === 'Enter') {
                this._button.focus()
            }
        } else {
            
            this.openFilterMenu()
            if(e.key === 'Enter') {
                this._currentFilterElement.focus()
            }
        }
    }
    handleKeyDown(e) {
        e.preventDefault()
        e.stopPropagation()
        switch(e.key) {
            case 'ArrowUp':
                
                if(e.target.previousElementSibling) {
                    e.target.previousElementSibling.focus()
                }else {
                    e.target.parentElement.lastElementChild.focus()
                }
                break
            case 'ArrowDown':
                
                if(e.target.nextElementSibling) {
                    e.target.nextElementSibling.focus()
                }else {
                    e.target.parentElement.firstElementChild.focus()
                }
                break
            case 'Enter':
                this.handleFilterClick(e)
                this._button.focus()
            case 'Escape':
            case 'Tab':
                this.closeFilterMenu()
                this._button.focus()
                break
        }
    }
    handleFilterClick(e) {
            const clickedFilter = e.target
            const selected = clickedFilter.getAttribute('aria-selected')
            if(selected === 'false') {
                this.switchSelectedFilter(clickedFilter)
            } else {
                this.closeFilterMenu()
            }
    }
    switchSelectedFilter(newFilterElement) {
        this._currentFilterElement.setAttribute('aria-selected', false)
        newFilterElement.setAttribute('aria-selected', true)
        this._currentFilterElement = newFilterElement
        this.currentFilterValue = newFilterElement.getAttribute('data-value')
        //this._currentFilterElement.parentNode.prepend(this._currentFilterElement)
        this._button.childNodes[0].textContent = this._currentFilterElement.textContent
        this.closeFilterMenu()
        this._triggerFilterChange(this.currentFilterValue)


    }
    closeFilterMenu() {
        this._menu.classList.remove('dropped-down')
        this._isExpanded = false
    }
    openFilterMenu() {
        this._menu.classList.add('dropped-down')
        this._isExpanded = true
    }

    get filterChange() {
        return new Promise(resolve => {
            this._triggerFilterChange = resolve
        })
    }
    get filterValue() {
        return this.currentFilterValue
    }
}