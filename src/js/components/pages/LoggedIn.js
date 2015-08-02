import React from 'react'

import LoginStore from '../../auth/LoginStore'
import { RouteHandler} from 'react-router'

var LoggedIn = React.createClass({
    statics: {
        willTransitionTo(transition) {
            if ( ! LoginStore.isLoggedIn()) {
                transition.redirect('/auth/login', {}, {
                    nextPath: transition.path
                })
            }
        }
    },
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
        return (<RouteHandler currentUser={this.state.user} />)
    }
})

export default LoggedIn
