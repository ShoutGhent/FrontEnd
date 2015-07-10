import request from 'superagent'

class ApiActions {
    static options() {
        return {
            prefix: "http://api.shout.app/"
        }
    }
    static send(verb, url, data, cb) {
        request[verb](ApiActions.options().prefix + url)
        .send(data || {})
        .end((err, res) => {
            console.log(err, res)
            if (typeof cb == "function") {
                cb(res, err)
            }
        })
    }
    get(url, data, cb) {
        ApiActions.send("get", url, data, cb)
    }
    post(url, data, cb) {
        ApiActions.send("post", url, data, cb)
    }
    put(url, data, cb) {
        ApiActions.send("put", url, data, cb)
    }
    delete(url, data, cb) {
        ApiActions.send("delete", url, data, cb)
    }

}

export default ApiActions
