import request from 'superagent'
import WebStorage from '../services/WebStorage'

class ApiActions {
    static options() {
        return {
            prefix: "http://api.shout.app/"
        }
    }
    static _refreshToken(token, cb) {
        ApiActions._send('get', 'auth/token/refresh', { token: token }, cb)
    }
    static _send(verb, url, data, cb) {
        request[verb](ApiActions.options().prefix + url)
            .send(data || {})
            .set('Authorization', `Bearer ${WebStorage.fromStore('jwt')}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    if (res && res.body && res.body.error && res.body.error == "token_expired") {
                        ApiActions._refreshToken(WebStorage.fromStore('jwt'), (res, err) => {
                            if (err) {
                                // @TODO: cleanup, redirect to login page
                                if (err.message == "Unauthorized") {
                                    WebStorage.remove('jwt')
                                    WebStorage.remove('user')
                                }
                            }
                        })
                    }
                }
                if (res.body.token) {
                    WebStorage.toStore('jwt', res.body.token)
                }

                if (typeof cb == "function") {
                    cb(res.body, err)
                }
            })
    }
    static get(url, data, cb) {
        ApiActions._send("get", url, data, cb)
    }
    static post(url, data, cb) {
        ApiActions._send("post", url, data, cb)
    }
    static put(url, data, cb) {
        ApiActions._send("put", url, data, cb)
    }
    static delete(url, data, cb) {
        ApiActions._send("delete", url, data, cb)
    }

}

export default ApiActions
