import alt from "../../../alt"
import API from '../../../services/API'

class MyShoutActions {
    myShouts() {
        API.get('shouts/mine', {}, (data) => {
            this.dispatch(data)
        })
    }
    removeShout(shout) {
        this.dispatch(shout)
    }
}

export default alt.createActions(MyShoutActions)
