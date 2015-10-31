import alt from "ShoutAlt"

import API from 'API'
import WebStorage from 'WebStorage'

class MyGroupsActions {
    fetchMyGroups() {
        this.actions.isLoading(true)

        API.get('groups/mine', {}, (response, err) => {
            setTimeout(() => this.dispatch(response.data))
            setTimeout(() => {
                this.actions.cacheMyGroups(response.data, 'groups.myGroups')
                this.actions.isLoading(false)
            })
        })
    }
    fetchGroupsNearMe(coords = {}, cb = () => {}) {
        this.actions.isLoading(true)

        API.get('groups/near/me', coords, (response, err) => {
            setTimeout(() => this.dispatch(response.data, cb))

            setTimeout(() => {
                this.actions.cacheMyGroups(response.data, 'groups.near.me')
                this.actions.isLoading(false)
            })
        })
    }
    isLoading(bool) {
        setTimeout(() => this.dispatch(bool))
    }
    cacheMyGroups(groups, key) {
        WebStorage.toStore(key, groups)

        let cachedUrls = WebStorage.fromStore('cachedShoutUrls', [])
        if (cachedUrls.indexOf(key) == -1) {
            cachedUrls.push(key)
            WebStorage.toStore('cachedShoutUrls', cachedUrls)
        }

        setTimeout(() => this.dispatch())
    }
}

export default alt.createActions(MyGroupsActions)
