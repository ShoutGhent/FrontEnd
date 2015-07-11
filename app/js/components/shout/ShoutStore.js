import alt from '../../alt'
import ShoutActions from './ShoutActions'

class ShoutStore {
    constructor() {
        this.shouts = []

        this.bindActions(ShoutActions)
    }
    onFetchShouts(data) {
        this.shouts = data
    }
}

export default alt.createStore(ShoutStore)
