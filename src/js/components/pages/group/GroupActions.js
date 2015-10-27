import alt from "../../../alt"

import API from '../../../services/API'

class GroupActions {
    fetchGroupInformation(groupId) {
        this.actions.setGroupLoading(true)

        API.get(`groups/${groupId}`, {}, (group, err) => {
            if ( ! err) {
                this.dispatch(group)
                this.actions.setGroupLoading(false)
            }
        })
    }

    setGroupLoading(value) {
        this.dispatch(value)
    }

    joinGroup(group_id) {
        this.actions.setLeavingOrJoiningGroupLoading(true)

        API.post('groups/join', { group_id }, (response, err) => {
            if ( ! err) {
                this.dispatch({
                    meta: {
                        in_group: true
                    }
                })
                this.actions.setLeavingOrJoiningGroupLoading(false)
            }
        })
    }

    leaveGroup(group_id) {
        this.actions.setLeavingOrJoiningGroupLoading(true)

        API.post('groups/leave', { group_id }, (response, err) => {
            if ( ! err) {
                this.dispatch({
                    meta: {
                        in_group: false
                    }
                })
                this.actions.setLeavingOrJoiningGroupLoading(false)
            }
        })
    }

    setLeavingOrJoiningGroupLoading(value) {
        this.dispatch(value)
    }
}

export default alt.createActions(GroupActions)
