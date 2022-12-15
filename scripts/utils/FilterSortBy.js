class FilterSortBy {
    /**
     * 
     * @param {String} menuSelector 
     * @param {String} filterSelector
     */
    constructor(menuSelector, filterSelector) {
        this._currentFilterElement = document.querySelector(filterSelector + '[data-selected=true]')
        this.currentFilterValue = this._currentFilterElement.getAttribute('data-value')
        this._isExpanded = false
        this._menu = document.querySelector(menuSelector)
        this._filters = document.querySelectorAll(filterSelector)
        this._triggerFilterChange
        this._filters.forEach(filter => {
            filter.addEventListener('click', this.handleFilterClick.bind(this))
        })
        document.querySelector('.sort-filter__dropdown-icon').addEventListener('click', this.handleFilterClick.bind(this))
    }
    handleFilterClick(e) {
        if(this._isExpanded) {
            const clickedFilter = e.target
            const selected = clickedFilter.getAttribute('data-selected')

            selected === 'false' ? 
                this.switchSelectedFilter(clickedFilter) : 
                this.closeFilterMenu()
                

        } else {

            this.openFilterMenu()

        }
    }
    switchSelectedFilter(newFilterElement) {
        this._currentFilterElement.setAttribute('data-selected', false)
        newFilterElement.setAttribute('data-selected', true)
        this._currentFilterElement = newFilterElement
        this.currentFilterValue = newFilterElement.getAttribute('data-value')
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