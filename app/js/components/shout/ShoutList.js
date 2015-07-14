import React from 'react'
import ShoutStore from './ShoutStore'
import ShoutActions from './ShoutActions'
import Shout from './Shout'
import Loading from '../loading/Loading'

function getStateFromStore() {
    return ShoutStore.getState()
}

let ShoutList = React.createClass({
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
        ShoutActions.fetchShouts()
    },
    removeShout(shout) {
        ShoutActions.removeShout(shout)
    },
    removeShout(shout) {
        ShoutActions.removeShout(shout)
    },
    render() {
        let { loading } = this.state

        return (
            <div>
            {loading ? <Loading /> : ''}
            {this.state.shouts.map((shout) =>
                <Shout key={shout.uuid} shout={shout} onRemove={this.removeShout}/>
            )}
            </div>
        )
    }
})

export default ShoutList

