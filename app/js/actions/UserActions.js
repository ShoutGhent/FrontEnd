import alt from "../alt"
import ApiActions from './ApiActions'
import WebStorage from '../services/WebStorage'
import RouterContainer from '../services/RouterContainer'

class UserActions extends ApiActions {
    login(payload) {
        super.post("auth/login", payload, (res, err) => {
            if ( ! err) {
                var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';

                this.dispatch(res)

                RouterContainer.get().transitionTo(nextPath)

                WebStorage.toStore('user', res.user)
                WebStorage.toStore('jwt', res.token)
            }
        })
    }
    loginUsingJwt(jwt) {
        super.post("auth/me", null, (res, err) => {
            if ( ! err) {
                var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';
                RouterContainer.get().transitionTo(nextPath)

                WebStorage.toStore('user', res)

                this.dispatch(res)

            }
        })
    }
    logout() {
        RouterContainer.get().transitionTo('login')

        WebStorage.remove('jwt')
        WebStorage.remove('user')

        this.dispatch()
    }
}

export default alt.createActions(UserActions)
