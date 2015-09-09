import React from 'react'

import HeaderActions from './HeaderActions'
import HeaderStore from './HeaderStore'
import Icon from '../partials/Icon'
import LoggedInHeader from './LoggedInHeader'
import LoggedOutHeader from './LoggedOutHeader'
import LoginStore from '../../auth/LoginStore'
import Logo from './Logo'
import SearchBar from '../search/SearchBar'

let Header = React.createClass({
    getInitialState() {
        let { user, jwt } = LoginStore.getState()
        let { isOpen } = HeaderStore.getState()

        return { user, jwt, isOpen }
    },
    componentDidMount() {
        LoginStore.listen(this._onChange)
        HeaderStore.listen(this._onChange)

        window.addEventListener('resize', () => {
            HeaderActions.closeNavigation()
        }, true)
    },
    componentWillUnmount() {
        LoginStore.unlisten(this._onChange)
        HeaderStore.unlisten(this._onChange)

        window.removeEventListener('resize')
    },
    _onChange(state) {
        this.setState(state)
    },
    toggleNavigation(evt) {
        evt.preventDefault()

        HeaderActions.toggleNavigation()
    },
    render() {
        let { user, isOpen } = this.state

        let className = isOpen ? 'side-nav' : 'right hide-on-med-and-down'

        return (
            <div className="navbar-fixed">
                <SearchBar />
                <nav role="navigation">
                    <div className="nav-wrapper container">
                        <Logo />
                        <a href={true} className="button-collapse" onClick={this.toggleNavigation}>
                            <Icon icon="menu"/>
                        </a>

                        {LoginStore.isLoggedIn() ? (
                            <LoggedInHeader
                                className={className}
                                toggleNavigation={this.toggleNavigation}
                                user={user}
                            />
                        ) : (
                            <LoggedOutHeader
                                className={className}
                                toggleNavigation={this.toggleNavigation}
                            />
                        )}

                        {isOpen && (
                            <div id="sidenav-overlay" onClick={this.toggleNavigation}/>
                        )}
                    </div>
                </nav>
            </div>
        )
    }
})

export default Header
