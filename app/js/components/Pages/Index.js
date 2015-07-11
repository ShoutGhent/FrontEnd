import React from 'react'
import LoggedIn from './_IndexLoggedIn'
import LoggedOut from './_IndexLoggedOut'
import UserStore from '../../stores/UserStore'

function getStateFromStore() {
    return UserStore.getState()
}

var Index = React.createClass({
    getInitialState() {
        return getStateFromStore()
    },
    componentDidMount() {
        UserStore.listen(this._onChange)
    },
    componentWillUnmount() {
        UserStore.unlisten(this._onChange)
    },
    _onChange() {
        this.setState(getStateFromStore())
    },
    render() {
        var view = this.state.loggedIn ? <LoggedIn user={this.state} /> : <LoggedOut />
        return (
            <div>{view}</div>
        )
    }
});

export default Index
