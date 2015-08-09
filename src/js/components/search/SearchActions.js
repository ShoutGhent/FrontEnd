import alt from "../../alt"

import API from '../../services/API'

class SearchActions {
    openSearch() {
        this.dispatch()
    }
    closeSearch() {
        this.dispatch()
    }
    toggleSearch() {
        this.dispatch()
    }
    resetResults() {
        this.dispatch()
    }
    updateSearchText(value) {
        if (value.trim()) {
            this.actions.fetchResults(value)
        }
        this.dispatch(value)
    }
    fetchResults(query) {
        API.get('groups/search', {q: query}, (data, res) => {
            this.dispatch(data)
        })
    }
}

export default alt.createActions(SearchActions)
