import LoginActions from './LoginActions'
import API from '../services/API'

class AuthService {
    login(payload, cb) {
        API.post("auth/login", payload, (res, err) => {
            if ( ! err) {
                let { token, user } = res

                LoginActions.loginUser(token, user, true)
            }

            if (cb) cb(res, err)
        })
    }
    fetchCurrentUser(jwt, cb) {
        API.get("users/me", null, (res, err) => {
            if ( ! err) {
                LoginActions.loginUser(jwt, res.user, false)
            }

            if (cb) cb(res, err)
        })
    }
    register(payload, cb) {
        API.post("auth/register", payload, (res, err) => {
            if ( ! err) {
                let { token, user } = res

                LoginActions.loginUser(token, user, true)
            }

            if (cb) cb(res, err)
        })
    }
    logout(cb) {
        LoginActions.logoutUser()

        if (cb) cb()
    }
}

export default new AuthService()
