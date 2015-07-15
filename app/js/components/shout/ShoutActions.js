import alt from "../../alt"
import API from '../../services/API'

class ShoutActions {
    cleanShouts() {
        this.dispatch()
    }
    fetchShouts(url) {
        API.get('shouts', {}, (data) => {
            this.dispatch(data)
        })
    }
    removeShout(shout) {
        this.dispatch(shout)
    }
    loadMore(page) {
        API.get(`shouts`, { page: page }, (data) => {
            this.dispatch(data)
        })
    }
    setLoading() {
        this.dispatch()
    }
}

export default alt.createActions(ShoutActions)
