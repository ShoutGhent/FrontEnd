import alt from "../../alt"

import API from '../../services/API'
import WebStorage from '../../services/WebStorage'

class MyGroupsActions {
    fetchMyGroups() {
        this.actions.isLoading(true)

        API.get('groups/mine', {}, (response, err) => {
            this.dispatch(response.data)

            this.actions.cacheMyGroups(response.data)

            this.actions.isLoading(false)
        })
    }
    isLoading(bool) {
        this.dispatch(bool)
    }
    cacheMyGroups(groups) {
        let key = 'groups.myGroups'
        WebStorage.toStore(key, groups)

        let cachedUrls = WebStorage.fromStore('cachedShoutUrls', [])
        if (cachedUrls.indexOf(key) == -1) {
            cachedUrls.push(key)
            WebStorage.toStore('cachedShoutUrls', cachedUrls)
        }

        this.dispatch()
    }
}

export default alt.createActions(MyGroupsActions)
