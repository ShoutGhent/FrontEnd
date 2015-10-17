import alt from "../../alt"

import API from '../../services/API'
import WebStorage from '../../services/WebStorage'

class MyGroupsActions {
    fetchMyGroups() {
        this.actions.isLoading(true)

        API.get('groups/mine', {}, (response, err) => {
            this.dispatch(response.data)

            setTimeout(() => {
                this.actions.cacheMyGroups(response.data, 'groups.myGroups')
                this.actions.isLoading(false)
            })
        })
    }
    fetchGroupsNearMe(coords = {}) {
        this.actions.isLoading(true)

        API.get('groups/near/me', coords, (response, err) => {
            this.dispatch(response.data)

            setTimeout(() => {
                this.actions.cacheMyGroups(response.data, 'groups.near.me')
                this.actions.isLoading(false)
            })
        })
    }
    isLoading(bool) {
        this.dispatch(bool)
    }
    cacheMyGroups(groups, key) {
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
