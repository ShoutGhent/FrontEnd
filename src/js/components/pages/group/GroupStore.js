import alt from '../../../alt'

import GroupActions from './GroupActions'

class GroupStore {
    constructor() {
        this.loading = true
        this.leavingOrJoiningGroupLoading = false
        this.group = null

        this.bindActions(GroupActions)
    }

    onSetGroup(group) {
        this.group = group
    }

    onFetchGroupInformation(group) {
        this.group = group
    }

    onJoinGroup(group) {
        this.group = group
    }

    onLeaveGroup(group) {
        this.group = group
    }

    onSetGroupLoading(value) {
        this.loading = value
    }

    onSetLeavingOrJoiningGroupLoading(value) {
        this.leavingOrJoiningGroupLoading = value
    }
}

export default alt.createStore(GroupStore, 'GroupStore')
