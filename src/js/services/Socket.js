import { SERVER_URL } from '../consts'

let url = SERVER_URL.split('')
url.pop()
url = url.join('')

let singleton = null
let singletonEnforcer = null

class Socket {
    constructor(enforce) {
        if (enforce != singletonEnforcer) throw "Cannot construct singleton"

        this.socket = window.io(`${url}:3000`, {
            secure: window.location.protocol == "https:"
        })
    }

    listen(event, cb) {
        this.socket.on(event, (data) => {
            cb(data)
        })
    }

    fire(event, data) {
        this.socket.emit(event, data)
    }

    join(channel) {
        this.fire('join', channel)
    }

    static get io() {
        if ( ! this[singleton]) {
            this[singleton] = new Socket(singletonEnforcer)
        }

        return this[singleton]
    }
}

export default Socket
