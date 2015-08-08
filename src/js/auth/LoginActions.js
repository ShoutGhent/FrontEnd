import alt from "../alt"
import Redirecter from "../services/Redirecter"
import WebStorage from "../services/WebStorage"

class LoginActions {
    loginUser(jwt, user, redirect) {
        if (redirect) {
            Redirecter.toNext()
        }

        WebStorage.toStore('jwt', jwt)
        WebStorage.toStore('user', user)

        this.dispatch({ user, jwt })
    }

    logoutUser() {
        WebStorage.remove('jwt')
        WebStorage.remove('user')

        Redirecter.to('/auth/login')

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
