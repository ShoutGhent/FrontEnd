import alt from "../../alt"

import API from '../../services/API'

class LogActions {
    fetch() {
        API.get('users/me/notifications', {}, (res, err) => {
            console.log(res, err)
            this.dispatch(res.notifications)
        })
    }
}

export default alt.createActions(LogActions)
