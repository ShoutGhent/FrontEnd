import alt from '../../alt'

import LogActions from './LogActions'

class LogStore {
    constructor() {
        this.notifications = []

        this.bindActions(LogActions)
    }

    onFetch(notifications) {
        this.notifications = notifications
    }
}

export default alt.createStore(LogStore, 'LogStore')
