import alt from "../../alt"
import ApiActions from '../../actions/ApiActions'

class ShoutActions {
    fetchShouts() {
        ApiActions.get('shouts', {}, (data) => {
            this.dispatch(data)
        })
    }
}

export default alt.createActions(ShoutActions)
