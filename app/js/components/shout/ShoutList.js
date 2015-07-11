import React from 'react'
import ShoutStore from './ShoutStore'
import ShoutActions from './ShoutActions'
import Shout from './Shout'

function getStateFromStore() {
    return ShoutStore.getState()
}

var ShoutList = React.createClass({
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
    render() {
        return (
            <div>
            {this.state.shouts.map((shout) =>
                <Shout key={shout.uuid} shout={shout}/>
            )}
            </div>
        )
    }
})

export default ShoutList

