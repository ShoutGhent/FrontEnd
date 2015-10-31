import alt from 'ShoutAlt'
import NotificationActions from 'NotificationActions'

class NotificationStore {
    constructor() {
        this.notification = null
        this.bindActions(NotificationActions)
    }
    onNotify(data) {
        this.notification = data
    }
}

export default alt.createStore(NotificationStore, "NotificationStore")
