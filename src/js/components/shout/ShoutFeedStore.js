import alt from '../../alt'

import ShoutFeedActions from './ShoutFeedActions'
import WebStorage from '../../services/WebStorage'

class ShoutFeedStore {
    constructor() {
        this.shouts = WebStorage.fromStore(`shouts.${this.props.url}`, [])
        this.paginationData = {}

        this.bind(ShoutFeedActions)
    }
}

export default alt.createStore(ShoutFeedStore, 'ShoutFeedStore')
