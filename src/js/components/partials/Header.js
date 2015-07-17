import React from 'react'
import Logo from './Logo'
import LoginStore from '../../auth/LoginStore'
import SearchBar from '../search/SearchBar'
import LoggedInHeader from './LoggedInHeader'
import LoggedOutHeader from './LoggedOutHeader'

function getStateFromStore() {
    return LoginStore.getState()
}

let Header = React.createClass({
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
        return (
            <div>
                <SearchBar />
                <nav role="navigation">
                    <div className="nav-wrapper container">
                        <Logo />
                        {LoginStore.isLoggedIn() ? <LoggedInHeader user={this.state.user} /> : <LoggedOutHeader />}
                    </div>
                </nav>
            </div>
        )
    }
})

export default Header
