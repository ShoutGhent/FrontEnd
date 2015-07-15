import alt from '../../alt'
import ShoutActions from './ShoutActions'

class ShoutStore {
    constructor() {
        this.shouts = []
        this.paginationData = {
            total: null,
            per_page: null,
            current_page: null,
            last_page: null,
            next_page_url: null,
            prev_page_url: null
        }
        this.loading = true

        this.bindActions(ShoutActions)
    }
    onFetchShouts(response) {
        this.setPaginationData(response)
        this.shouts = response.data
    }
    onLoadMore(response) {
        this.setPaginationData(response)
        
        response.data.forEach((shout) => {
            this.shouts.push(shout)
        })
    }
    onRemoveShout(shout) {
        this.shouts.map((item, key) => {
            if (item.uuid == shout.uuid) {
                this.shouts.splice(key, 1)
            }
        })
    }
    onSetLoading() {
        this.loading = true
    }
    setPaginationData(response) {
        let { total, per_page, current_page, last_page, next_page_url, prev_page_url } = response
        this.paginationData = { total, per_page, current_page, next_page_url, prev_page_url, last_page }
        this.loading = false
    }
}

export default alt.createStore(ShoutStore)
