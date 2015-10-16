import React from 'react'

import LoggedIn from './_loggedIn'
import LoggedOut from './_loggedOut'
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
        let { user } = this.state

        return LoginStore.isLoggedIn() ? (<LoggedIn user={user}/>) : (<LoggedOut/>)
    }
});

export default Index
