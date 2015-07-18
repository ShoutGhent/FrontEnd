import React from 'react'
import LoggedIn from './_IndexLoggedIn'
import LoggedOut from './_IndexLoggedOut'
import LoginStore from '../../../auth/LoginStore'

var Index = React.createClass({
    getInitialState() {
        return LoginStore.getState()
    },
    componentDidMount() {
        LoginStore.listen(this._onChange)
    },
    componentWillUnmount() {
        LoginStore.unlisten(this._onChange)
    },
    _onChange(state) {
        this.setState(state)
    },
    render() {
        return LoginStore.isLoggedIn() ? (
            <LoggedIn user={this.state.user} />
        ) : (
            <LoggedOut />
        )
    }
});

export default Index
