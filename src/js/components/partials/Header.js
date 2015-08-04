import React from 'react'

import LoggedInHeader from './LoggedInHeader'
import LoggedOutHeader from './LoggedOutHeader'
import LoginStore from '../../auth/LoginStore'
import Logo from './Logo'
import SearchBar from '../search/SearchBar'
import Icon from '../partials/Icon'

let Header = React.createClass({
    getInitialState() {
        let { user, jwt } = LoginStore.getState()
        return {
            user: user,
            jwt: jwt,
            isOpen: false
        }
    },
    componentDidMount() {
        LoginStore.listen(this._onChange)
        window.addEventListener('resize', () => {
            this.setState({
                isOpen: false
            })
        }, true)
    },
    componentWillUnmount() {
        LoginStore.unlisten(this._onChange)
        window.removeEventListener('resize')
    },
    _onChange(state) {
        this.setState(state)
    },
    toggleNavigation(evt) {
        evt.preventDefault()

        this.setState({
            isOpen: ! this.state.isOpen
        })
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
                        {LoginStore.isLoggedIn() ? <LoggedInHeader className={className} user={user}/> : <LoggedOutHeader className={className}/>}
                        { isOpen ? (
                            <div id="sidenav-overlay" onClick={this.toggleNavigation}></div>
                        ) : ''}
                    </div>
                </nav>
            </div>
        )
    }
})

export default Header
