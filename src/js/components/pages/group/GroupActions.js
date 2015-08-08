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
}

export default alt.createActions(GroupActions)
