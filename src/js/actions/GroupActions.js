import alt from "ShoutAlt"

import API from 'API'

class GroupActions {
    fetchGroupInformation(groupId) {
        this.actions.setGroupLoading(true)

        API.get(`groups/${groupId}`, {}, (group, err) => {
            if ( ! err) {
                setTimeout(() => this.dispatch(group))
                this.actions.setGroupLoading(false)
            }
        })
    }

    setGroupLoading(value) {
        setTimeout(() => this.dispatch(value))
    }

    joinGroup(group_id) {
        this.actions.setLeavingOrJoiningGroupLoading(true)

        API.post('groups/join', { group_id }, (response, err) => {
            if ( ! err) {
                setTimeout(() => this.dispatch({
                    meta: {
                        in_group: true
                    }
                }))
                this.actions.setLeavingOrJoiningGroupLoading(false)
            }
        })
    }

    leaveGroup(group_id) {
        this.actions.setLeavingOrJoiningGroupLoading(true)

        API.post('groups/leave', { group_id }, (response, err) => {
            if ( ! err) {
                setTimeout(() => this.dispatch({
                    meta: {
                        in_group: false
                    }
                }))
                this.actions.setLeavingOrJoiningGroupLoading(false)
            }
        })
    }

    setLeavingOrJoiningGroupLoading(value) {
        setTimeout(() => this.dispatch(value))
    }
}

export default alt.createActions(GroupActions)
