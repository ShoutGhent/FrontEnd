import alt from "../../../alt"

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
    updateSearchText(value) {
        this.dispatch(value)
    }
}

export default alt.createActions(SearchActions)
