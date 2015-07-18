import React from 'react'
import { RouteHandler} from 'react-router'
import LoginStore from '../../auth/LoginStore'

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
    render() {
        return (<RouteHandler />)
    }
})

export default LoggedIn
