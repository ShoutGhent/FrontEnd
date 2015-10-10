import alt from "../../alt"

import API from '../../services/API'

class LogActions {
    fetch(cb) {
        this.actions.loading(true)
        API.get('users/me/notifications', {}, (res, err) => {
            this.dispatch(res)
            this.actions.loading(false)
            if (cb) cb(err, res)
        })
    }

    loadMore(url, cb) {
        if (url) {
            this.actions.loading(true)
            url = url.replace('/?', '?')
            API.get(url, {}, (res, err) => {
                this.dispatch(res)
                this.actions.loading(false)
                if (cb) cb(err, res)
            })
        }
    }

    loading(res) {
        this.dispatch(res)
    }

    markAsSeen(notification) {
        if ( ! notification.seen) {
            API.put(`users/me/notifications`, {
                id: notification.id,
                seen: true
            }, (res, err) => this.dispatch(notification))
        }
    }
}

export default alt.createActions(LogActions)
