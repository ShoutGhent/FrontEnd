import request from 'superagent'
import Router from 'RouterContainer'
import WebStorage from 'WebStorage'
import { SERVER_URL } from '../config/consts'

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
            .end((err, res) => API._handler(err, res, cb))
    }

    static _handler(err, res, cb) {
        if (err) {
            if (res && res.body && res.body.error && res.body.error == "token_expired") {
                WebStorage.remove('jwt')
                WebStorage.remove('user')

                window.location.reload()
            }
        }

        if (res && res.body && res.body.token) {
            WebStorage.toStore('jwt', res.body.token)
        }

        if (typeof cb == "function") {
            if (res && res.body) {
                cb(res.body, err)
            } else {
                cb(null, err)
            }
        }
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
    static del(url, data, cb) {
        API._send("del", url, data, cb)
    }
    static postFile(url, data, cb) {
        if ( ! url.match(/https?/)) {
            url = API.options().prefix + url.replace(API.options().prefix, "").replace(/^\s+/, "")
        }

        request
            .post(url)
            .attach(data.key, data.value)
            .set('Authorization', `Bearer ${WebStorage.fromStore('jwt')}`)
            .end((err, res) => API._handler(err, res, cb))
    }

}

export default API
