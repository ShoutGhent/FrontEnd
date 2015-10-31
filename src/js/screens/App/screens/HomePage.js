import React from 'react'

import LoggedIn from './LoggedIn/screens/Home/LoggedInHomePage'
import LoggedOut from './LoggedOut/screens/Home/LoggedOutHomePage'
import LoginStore from './LoggedIn/stores/LoginStore'

var HomePage = React.createClass({
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

export default HomePage
