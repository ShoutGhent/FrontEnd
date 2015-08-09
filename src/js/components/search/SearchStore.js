import alt from '../../alt'

import SearchActions from './SearchActions'

class SearchStore {
    constructor() {
        this.isOpen = false
        this.searchText = ''

        this.results = []

        this.bindActions(SearchActions)
    }
    onResetResults() {
        this.results = []
    }
    onOpenSearch() {
        this.isOpen = true
    }
    onCloseSearch() {
        this.isOpen = false
        this.searchText = ''
    }
    onToggleSearch() {
        this.isOpen = ! this.isOpen

        if ( ! this.isOpen) {
            this.searchText = ''
        }
    }
    onUpdateSearchText(text) {
        this.searchText = text
    }
    onFetchResults(results) {
        this.results = results.data
    }
}

export default alt.createStore(SearchStore, "SearchStore")
