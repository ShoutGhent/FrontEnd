import alt from '../alt'
import UserActions from '../actions/UserActions'
import WebStorage from '../services/WebStorage'

function getDefaults() {
    return {
        user: WebStorage.fromStore('user', {
            id: '',
            uuid: '',
            name: '',
            email: ''
        }),
        loggedIn: !! WebStorage.fromStore('jwt', false)
    }
}
class UserStore {
    constructor() {
        this.user = getDefaults().user
        this.loggedIn = getDefaults().loggedIn

        this.bindActions(UserActions)
    }
    _login(user) {
        this.user = user
        this.loggedIn = true
    }
    onLogin(data) {
        this._login(data.user)
    }
    onLoginUsingJwt(user) {
        this._login(user)
    }
    onLogout() {
        this.user = getDefaults().user
        this.loggedIn = getDefaults().loggedIn
    }
}

export default alt.createStore(UserStore)
