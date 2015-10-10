import alt from '../../alt'

import LogActions from './LogActions'

class LogStore {
    constructor() {
        this.notifications = []
        this.next_page_url = null
        this.loading = false

        this.bindActions(LogActions)
    }

    onFetch(res) {
        this.notifications = res.data
        this.next_page_url = res.next_page_url
    }

    onLoadMore(res) {
        this.notifications.push(...res.data)
        this.next_page_url = res.next_page_url
    }

    onLoading(res) {
        this.loading = res
    }

    onMarkAsSeen(notification) {
        this.notifications = this.notifications.map(n => {
            if (n.id == notification.id) {
                n.seen = true
            }

            return n
        })
    }
}

export default alt.createStore(LogStore, 'LogStore')
