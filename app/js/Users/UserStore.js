import alt from '../alt'
import UserActions from './UserActions'

class UserStore {
    constructor() {
        this.currentUser = {}

        this.bindActions(UserActions);
    }
    onLogin(user) {
        this.currentUser = user
    }
}

export default alt.createStore(UserStore)
