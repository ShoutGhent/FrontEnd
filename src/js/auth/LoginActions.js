import alt from "../alt"
import WebStorage from "../services/WebStorage"
import RouterContainer from "../services/RouterContainer"

class LoginActions {
    loginUser(jwt, user, redirect) {
        if (redirect) {
            RouterContainer.get().transitionTo(
                RouterContainer.get().getCurrentQuery().nextPath || '/'
            )
        }

        WebStorage.toStore('jwt', jwt)
        WebStorage.toStore('user', user)

        this.dispatch({ user, jwt })
    }

    logoutUser() {
        WebStorage.remove('jwt')
        WebStorage.remove('user')

        RouterContainer.get().transitionTo('/auth/login')

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
