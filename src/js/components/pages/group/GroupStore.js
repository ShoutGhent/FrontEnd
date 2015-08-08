import alt from '../../../alt'

import GroupActions from './GroupActions'

class GroupStore {
    constructor() {
        this.loading = true
        this.group = null

        this.bindActions(GroupActions)
    }

    onFetchGroupInformation(group) {
        this.group = group
    }

    onSetGroupLoading(value) {
        this.loading = value
    }
}

export default alt.createStore(GroupStore, 'GroupStore')
