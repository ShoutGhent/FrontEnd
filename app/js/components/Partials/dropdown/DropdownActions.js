import alt from "../../../alt"

class DropdownActions {
    toggle(key) {
        setTimeout(() => this.dispatch(key), 0)
    }
    register(key) {
        setTimeout(() => this.dispatch(key), 0)
    }
    unRegister(key) {
        setTimeout(() => this.dispatch(key), 0)
    }
}

export default alt.createActions(DropdownActions)
