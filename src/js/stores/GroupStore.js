import alt from 'ShoutAlt'

import assign from 'react/lib/Object.assign'
import GroupActions from 'GroupActions'

class GroupStore {
    constructor() {
        this.loading = true
        this.leavingOrJoiningGroupLoading = false
        this.group = null

        this.bindActions(GroupActions)
    }

    onFetchGroupInformation(group) {
        this.group = group
    }

    onJoinGroup(data) {
        let count = this.group.meta.member_count

        this.group = assign(this.group, data, {
            meta: {
                member_count: count + 1
            }
        })
    }

    onLeaveGroup(data) {
        let count = this.group.meta.member_count

        this.group = assign(this.group, data, {
            meta: {
                member_count: count - 1
            }
        })
    }

    onSetGroupLoading(value) {
        this.loading = value
    }

    onSetLeavingOrJoiningGroupLoading(value) {
        this.leavingOrJoiningGroupLoading = value
    }
}

export default alt.createStore(GroupStore, 'GroupStore')
