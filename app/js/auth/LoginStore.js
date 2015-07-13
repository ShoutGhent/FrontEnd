import alt from '../alt'
import LoginActions from './LoginActions'

class LoginStore {
    constructor() {
        this.user = null
        this.jwt = null
        this.loggedIn = false

        this.bindActions(LoginActions)
    }

    onLoginUser(payload) {
        let { token, user } = payload

        this.jwt = token
        this.user = user
        this.loggedIn = true
    }

    onLogoutUser() {
        this.user = null
        this.loggedIn = false
    }
}

export default alt.createStore(LoginStore)
