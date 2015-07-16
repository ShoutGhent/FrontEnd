import alt from "../../alt"
import API from '../../services/API'
import Notification from '../notification/NotificationActions'

class ShoutActions {
    register(url) {
        this.dispatch(url)
    }
    fetchShouts(url) {
        API.get(url, {}, (data) => {
            this.dispatch({
                response: data,
                url: url
            })
        })
    }
    editShout(shout) {
        API.put(`shouts/${shout.uuid}`, {
            shout_id: shout.uuid,
            user_id: shout.user_id,
            description: shout.description,
            anonymous: shout.anonymous,
            publish_until: shout.publish_until
        }, (data) => {
            this.dispatch(data)
            Notification.success("Shout is bewerkt!")
        })
    }
    removeShout(shout, url) {
        this.dispatch({ shout, url })
    }
    loadMore(page, url) {
        API.get(url, { page: page }, (data) => {
            this.dispatch({
                response: data,
                url: url
            })
        })
    }
    setLoading() {
        this.dispatch()
    }
}

export default alt.createActions(ShoutActions)
