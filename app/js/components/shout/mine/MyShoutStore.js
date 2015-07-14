import alt from '../../../alt'
import MyShoutActions from './MyShoutActions'

class MyShoutStore {
    constructor() {
        this.shouts = []
        this.loading = true

        this.bindActions(MyShoutActions)
    }
    onMyShouts(data) {
        this.shouts = data
        this.loading = false
    }
}

export default alt.createStore(MyShoutStore)
