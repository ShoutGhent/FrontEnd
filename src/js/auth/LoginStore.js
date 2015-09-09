import alt from '../alt'
import LoginActions from './LoginActions'
import WebStore from '../services/WebStorage'

class LoginStore {
    constructor() {
        this.user = WebStore.fromStore('user', null)
        this.jwt = WebStore.fromStore('user', null)

        this.bindActions(LoginActions)
    }

    static isLoggedIn() {
        return !! this.getState().user
    }

    static isMine(id) {
        return id == this.getState().user.id
    }

    onLoginUser(payload) {
        let { token, user } = payload

        this.jwt = token
        this.user = user
    }

    onLogoutUser() {
        this.user = null
        this.jwt = null
    }

    onChangeUserInformation(payload) {
        let { user } = payload
        this.user = user
    }

    onChangeRadius(radius) {
        this.user.radius = radius
    }

    onGetGeolocation(user) {
        this.user = user
    }

    onResetLocation() {
        this.user.location = null
    }
}

export default alt.createStore(LoginStore, "LoginStore")
