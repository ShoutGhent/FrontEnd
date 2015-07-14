import alt from "../../alt"
import API from '../../services/API'

class ShoutActions {
    fetchShouts() {
        API.get('shouts', {}, (data) => {
            this.dispatch(data)
        })
    }
    removeShout(shout) {
        this.dispatch(shout)
    }
}

export default alt.createActions(ShoutActions)
