import alt from '../../alt'

import MyGroupsActions from './MyGroupsActions'
import WebStorage from '../../services/WebStorage'

class MyGroupsStore {
    constructor() {
        this.loading = true
        this.myGroups = WebStorage.fromStore('groups.myGroups', [])

        this.bindActions(MyGroupsActions)
    }
    onFetchMyGroups(groups) {
        this.myGroups = groups
    }
    onIsLoading(value) {
        this.loading = value
    }
}

export default alt.createStore(MyGroupsStore, "MyGroupsStore")
