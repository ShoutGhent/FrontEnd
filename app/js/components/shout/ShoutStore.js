import alt from '../../alt'
import ShoutActions from './ShoutActions'

class ShoutStore {
    constructor() {
        this.shouts = []
        this.loading = true

        this.bindActions(ShoutActions)
    }
    onFetchShouts(data) {
        this.shouts = data
        this.loading = false
    }
    onRemoveShout(shout) {
        this.shouts.map((item, key) => {
            if (item.uuid == shout.uuid) {
                this.shouts.splice(key, 1)
            }
        })
    }
}

export default alt.createStore(ShoutStore)
