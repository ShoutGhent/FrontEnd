import alt from "../alt"

class UserActions {
    login(user) {
        var payload = user
        this.dispatch(payload)
    }
}

export default alt.createActions(UserActions)
