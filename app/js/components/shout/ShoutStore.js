import alt from '../../alt'
import ShoutActions from './ShoutActions'

function getDefaultPaginationData() {
    return {
        total: null,
        per_page: null,
        current_page: null,
        last_page: null,
        next_page_url: null,
        prev_page_url: null
    }
}

class ShoutStore {
    constructor() {
        this.shouts = {}
        this.paginationData = {}
        this.loading = true

        this.bindActions(ShoutActions)
    }
    onRegister(url) {
        if ( ! this.shouts[url]) {
            this.shouts[url] = []
            this.paginationData[url] = getDefaultPaginationData()
        }
    }
    onFetchShouts(data) {
        let { response, url } = data

        this.setPaginationData(response, url)

        this.shouts[url] = response.data
    }
    onLoadMore(data) {
        let { response, url } = data

        this.setPaginationData(response, url)

        response.data.forEach((shout) => {
            this.shouts[url].push(shout)
        })
    }
    onRemoveShout(data) {
        let { shout, url } = data

        this.shouts[url].map((item, key) => {
            if (item.uuid == shout.uuid) {
                this.shouts[url].splice(key, 1)
            }
        })
    }
    onSetLoading() {
        this.loading = true
    }
    setPaginationData(response, url) {
        let { total, per_page, current_page, last_page, next_page_url, prev_page_url } = response
        this.paginationData[url] = { total, per_page, current_page, next_page_url, prev_page_url, last_page }
        this.loading = false
    }
}

export default alt.createStore(ShoutStore)
