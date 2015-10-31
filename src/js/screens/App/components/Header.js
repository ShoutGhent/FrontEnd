import React from 'react'

import Icon from '../shared/Icon'
import LoggedInHeader from '../screens/LoggedIn/components/LoggedInHeader'
import LoggedOutHeader from '../screens/LoggedOut/components/LoggedOutHeader'
import LoginStore from '../screens/LoggedIn/stores/LoginStore'
import Logo from './Logo'
import SearchBar from '../screens/LoggedIn/components/SearchBar'

let Header = React.createClass({
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

        return (
            <div className="navbar-fixed">
                <SearchBar />
                <nav role="navigation">
                    <div className="nav-wrapper container">
                        <Logo />

                        {LoginStore.isLoggedIn() ? (
                            <LoggedInHeader
                                className="right hide-on-med-and-down"
                                user={user}
                            />
                        ) : (
                            <LoggedOutHeader
                                className="right hide-on-med-and-down"
                            />
                        )}
                    </div>
                </nav>
            </div>
        )
    }
})

export default Header
