import request from 'superagent'
import WebStorage from '../services/WebStorage'
import { SERVER_URL } from '../consts'

class API {
    static options() {
        return {
            prefix: SERVER_URL
        }
    }
    static _send(verb, url, data, cb) {
        if ( ! url.match(/https?/)) {
            url = API.options().prefix + url.replace(API.options().prefix, "").replace(/^\s+/, "")
        }

        var req = request[verb](url)

        if (verb == "get") {
            req.query(data || {})
        } else {
            req.send(data || {})
        }

        req.set('Authorization', `Bearer ${WebStorage.fromStore('jwt')}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    if (res && res.body && res.body.error && res.body.error == "token_expired") {
                        if (err.message == "Unauthorized") {
                            WebStorage.remove('jwt')
                            WebStorage.remove('user')
                        }
                    }
                }
                if (res.body && res.body.token) {
                    WebStorage.toStore('jwt', res.body.token)
                }

                if (typeof cb == "function") {
                    cb(res.body, err)
                }
            })
    }
    static get(url, data, cb) {
        API._send("get", url, data, cb)
    }
    static post(url, data, cb) {
        API._send("post", url, data, cb)
    }
    static put(url, data, cb) {
        API._send("put", url, data, cb)
    }
    static delete(url, data, cb) {
        API._send("delete", url, data, cb)
    }

}

export default API
