import alt from '../alt'
import UserActions from '../actions/UserActions'

class UserLoginStore {
    constructor() {
        this.user = {}

        this.bindActions(UserActions);
    }
    onLogin(user) {
        this.user = user
    }
}

export default alt.createStore(UserLoginStore)
