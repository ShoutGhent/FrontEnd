import React from 'react'
import ShoutStore from './ShoutStore'
import ShoutActions from './ShoutActions'
import Shout from './Shout'
import Loading from '../loading/Loading'

function getStateFromStore() {
    return ShoutStore.getState()
}

let ShoutList = React.createClass({
    propTypes: {
        url: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return getStateFromStore()
    },
    componentDidMount() {
        ShoutStore.listen(this._onChange)
    },
    componentWillUnmount() {
        ShoutStore.unlisten(this._onChange)
    },
    _onChange() {
        this.setState(getStateFromStore())
    },
    componentWillMount() {
        ShoutActions.cleanShouts()
        ShoutActions.fetchShouts(this.props.url)
    },
    removeShout(shout) {
        ShoutActions.removeShout(shout)
    },
    removeShout(shout) {
        ShoutActions.removeShout(shout)
    },
    loadMore() {
        let currentPage = this.state.paginationData.current_page
        let nextPage = currentPage + 1

        ShoutActions.setLoading()
        ShoutActions.loadMore(nextPage)
    },
    render() {
        let { loading, paginationData } = this.state

        let { next_page_url } = paginationData

        return (
            <div>
                {this.state.shouts.map((shout) =>
                    <Shout key={shout.uuid} shout={shout} onRemove={this.removeShout}/>
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

