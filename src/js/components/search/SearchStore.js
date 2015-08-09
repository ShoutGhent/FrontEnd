import alt from '../../alt'

import SearchActions from './SearchActions'

class SearchStore {
    constructor() {
        this.isOpen = false
        this.searchText = ''

        this.results = []

        this.bindActions(SearchActions)
    }
    onOpenSearch() {
        this.isOpen = true
    }
    onCloseSearch() {
        this.isOpen = false
        this.searchText = ''
        this.results = []
    }
    onToggleSearch() {
        this.isOpen = ! this.isOpen

        if ( ! this.isOpen) {
            this.searchText = ''
            this.result = []
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
