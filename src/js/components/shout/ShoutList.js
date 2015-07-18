import React from 'react'
import ShoutStore from './ShoutStore'
import ShoutActions from './ShoutActions'
import Shout from './Shout'
import Loading from '../loading/Loading'
import WebStorage from '../../services/WebStorage'
import { addons } from 'react/addons'
var { PureRenderMixin } = addons

let ShoutList = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        url: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return ShoutStore.getState()
    },
    componentDidMount() {
        ShoutStore.listen(this._onChange)
    },
    componentWillUnmount() {
        ShoutStore.unlisten(this._onChange)
    },
    _onChange(state) {
        this.setState(state)
    },
    componentWillMount() {
        ShoutActions.register(this.props.url)
        ShoutActions.fetchShouts(this.props.url)
    },
    removeShout(shout) {
        let { url } = this.props

        if (url == "shouts") {
            ShoutActions.removeShout(shout, url)
        }
    },
    loadMore() {
        let { url } = this.props

        let currentPage = this.state.paginationData[url].current_page
        let nextPage = currentPage + 1

        ShoutActions.setLoading()
        ShoutActions.loadMore(nextPage, url)
    },
    render() {
        let { url } = this.props

        let { loading, shouts } = this.state
        let paginationData = this.state.paginationData[url]

        let { next_page_url } = paginationData

        return (
            <div>
                {shouts[url].map((shout) =>
                    <Shout user={shout.user || WebStorage.fromStore('user') } key={shout.uuid} shout={shout} onRemove={this.removeShout}/>
                )}
                {loading ? <Loading /> : ''}
                {next_page_url ? (
                    <button className="btn-large" onClick={this.loadMore}>Meer Tonen</button>
                ) : ''}
            </div>
        )
    }
})

export default ShoutList

