import React from 'react'
import Logo from './Logo'
import UserStore from '../../stores/UserStore'
import LoggedInHeader from './LoggedInHeader'
import LoggedOutHeader from './LoggedOutHeader'

function getStateFromStore() {
    return UserStore.getState()
}

var Header = React.createClass({
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
        return (
            <div>
                <nav className="teal" role="navigation">
                    <div className="nav-wrapper container">
                        <Logo />
                        {this.state.loggedIn ? <LoggedInHeader user={this.state.user} /> : <LoggedOutHeader />}
                    </div>
                </nav>
            </div>
        )
    }
});

export default Header
