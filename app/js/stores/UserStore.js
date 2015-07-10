import alt from '../alt'
import UserActions from '../actions/UserActions'

class UserStore {
    constructor() {
        this.currentUser = {
            name: ''
        }

        this.bindActions(UserActions);
    }
    onLogin(user) {
        this.currentUser = user
    }
}

export default alt.createStore(UserStore)
