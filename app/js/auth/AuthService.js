import LoginActions from './LoginActions'
import API from '../services/API'

class AuthService {
    login(payload) {
        API.post("auth/login", payload, (res, err) => {
            if ( ! err) {
                let { token, user } = res

                LoginActions.loginUser(token, user)
            }
        })
    }
    loginUsingJwt(jwt) {
        API.post("auth/me", null, (res, err) => {
            if ( ! err) {
                LoginActions.loginUser(jwt, res)
            }
        })
    }
    logout() {
        LoginActions.logoutUser()
    }
}

export default new AuthService()
