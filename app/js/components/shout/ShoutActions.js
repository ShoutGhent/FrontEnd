import alt from "../../alt"
import API from '../../services/API'

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
