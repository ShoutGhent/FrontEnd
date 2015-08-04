import alt from '../../alt'
import HeaderActions from './HeaderActions'

class HeaderStore {
    constructor() {
        this.isOpen = false

        this.bindActions(HeaderActions)
    }
    onCloseNavigation() {
        this.isOpen = false
    }
    onOpenNavigation() {
        this.isOpen = true
    }
    onToggleNavigation() {
        this.isOpen = ! this.isOpen
    }
}

export default alt.createStore(HeaderStore, "HeaderStore")
