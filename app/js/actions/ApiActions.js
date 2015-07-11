import request from 'superagent'
import WebStorage from '../services/WebStorage'

class ApiActions {
    static options() {
        return {
            prefix: "http://api.shout.app/"
        }
    }
    static _send(verb, url, data, cb) {
        request[verb](ApiActions.options().prefix + url)
            .send(data || {})
            .set('Authorization', `Bearer ${WebStorage.fromStore('jwt')}`)
            .end((err, res) => {
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
