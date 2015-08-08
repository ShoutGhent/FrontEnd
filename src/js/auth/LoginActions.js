import alt from "../alt"
import Redirect from "../services/Redirect"
import WebStorage from "../services/WebStorage"

class LoginActions {
    loginUser(jwt, user, redirect) {
        if (redirect) {
            Redirect.toNext()
        }

        WebStorage.toStore('jwt', jwt)
        WebStorage.toStore('user', user)

        this.dispatch({ user, jwt })
    }

    logoutUser() {
        WebStorage.remove('jwt')
        WebStorage.remove('user')

        Redirect.to('/auth/login')

        this.dispatch()
    }

    changeUserInformation(data) {
        let user = WebStorage.fromStore('user')
        for(var key in data) {
            user[key] = data[key]
        }
        WebStorage.toStore('user', user)
        this.dispatch({ user })
    }
}

export default alt.createActions(LoginActions)
