import alt from "../../alt"

import API from '../../services/API'
import WebStorage from '../../services/WebStorage'

class ShoutFeedActions {
    fetchShouts() {
        this.dispatch()
    }
    cacheShouts(url, shouts) {
        let key = `shouts.${url}`
        WebStorage.toStore(key, shouts)

        let cachedUrls = WebStorage.fromStore('cachedShoutUrls', [])
        if (cachedUrls.indexOf(key) == -1) {
            cachedUrls.push(key)
            WebStorage.toStore('cachedShoutUrls', cachedUrls)
        }

        this.dispatch()
    }
}

export default alt.createActions(ShoutFeedActions)
