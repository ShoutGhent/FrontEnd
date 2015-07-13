import alt from "../alt"
import WebStorage from "../services/WebStorage"
import RouterContainer from "../services/RouterContainer"

class LoginActions {
    loginUser(jwt, user) {
        WebStorage.toStore('jwt', jwt)
        WebStorage.toStore('user', user)

        RouterContainer.get().transitionTo(
            RouterContainer.get().getCurrentQuery().nextPath || '/'
        )

        this.dispatch({ user, jwt })
    }
    logoutUser() {
        WebStorage.remove('jwt')
        WebStorage.remove('user')

        RouterContainer.get().transitionTo('/auth/login')

        this.dispatch()
    }
}

export default alt.createActions(LoginActions)
