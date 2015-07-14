import React from 'react'
import ShoutStore from './MyShoutStore'
import ShoutActions from './MyShoutActions'
import Shout from '../Shout'
import WebStorage from '../../../services/WebStorage'
import Loading from '../../loading/Loading'

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
        ShoutActions.myShouts()
    },
    removeShout(shout) {
        //ShoutActions.removeShout(shout)
    },
    render() {
        let user = WebStorage.fromStore('user')
        let { loading } = this.state

        return (
            <div>
            {loading ? <Loading /> : ''}
            {this.state.shouts.map((shout) =>
                <Shout key={shout.uuid} user={user} shout={shout} onRemove={this.removeShout}/>
            )}
            </div>
        )
    }
})

export default ShoutList

