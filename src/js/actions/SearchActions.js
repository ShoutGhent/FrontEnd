import alt from "ShoutAlt"

import API from 'API'

class SearchActions {
    openSearch() {
        setTimeout(() => this.dispatch())
    }
    closeSearch() {
        setTimeout(() => this.dispatch())
    }
    resetResults() {
        setTimeout(() => this.dispatch())
    }
    updateSearchText(value) {
        if (value.trim()) {
            this.actions.fetchResults(value)
        }

        setTimeout(() => this.dispatch(value))
    }
    fetchResults(query) {
        API.get('groups/search', {q: query}, (data, res) => {
            setTimeout(() => this.dispatch(data))
        })
    }
}

export default alt.createActions(SearchActions)
