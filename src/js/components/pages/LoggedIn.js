import React from 'react'
import { RouteHandler} from 'react-router'
import LoginStore from '../../auth/LoginStore'
import { addons } from 'react/addons'
var { PureRenderMixin } = addons

var LoggedIn = React.createClass({
    mixins: [PureRenderMixin],
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
