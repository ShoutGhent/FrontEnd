import alt from "../../alt"

class HeaderActions {
    closeNavigation() {
        this.dispatch()
    }
    openNavigation() {
        this.dispatch()
    }
    toggleNavigation() {
        console.log("test")
        this.dispatch()
    }
}

export default alt.createActions(HeaderActions)
