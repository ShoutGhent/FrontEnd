import React from 'react'
import LoggedIn from './_IndexLoggedIn'
import LoggedOut from './_IndexLoggedOut'
import LoginStore from '../../../auth/LoginStore'

function getStateFromStore() {
    return LoginStore.getState()
}

var Index = React.createClass({
    getInitialState() {
        return getStateFromStore()
    },
    componentDidMount() {
        LoginStore.listen(this._onChange)
    },
    componentWillUnmount() {
        LoginStore.unlisten(this._onChange)
    },
    _onChange() {
        this.setState(getStateFromStore())
    },
    render() {
        console.log(this.state)
        return (
            <div>{this.state.loggedIn ? <LoggedIn user={this.state.user} /> : <LoggedOut />}</div>
        )
    }
});

export default Index
