import React from 'react'
import LoginStore from './LoginStore'

export default (ComposedComponent) => {
    return class AuthenticatedComponent extends React.Component {
        static willTransitionTo(transition) {
            if ( ! LoginStore.getState().loggedIn) {
                transition.redirect('/auth/login', {}, {
                    nextPath: transition.path
                })
            }
        }

        constructor() {
            super()
            this.state = this._getLoginState()
        }

        _getLoginState() {
            return LoginStore.getState()
        }

        _onChange() {
            this.setState(this._getLoginState())
        }

        componentDidMount() {
            LoginStore.listen(this._onChange)
        }

        componentWillUnmount() {
            LoginStore.unlisten(this._onChange)
        }

        render() {
            return (<ComposedComponent {...this.props} user={this.state.user} jwt={this.state.jwt} usserLoggedIn={this.state.userLoggedIn} />)
        }
    }
}
