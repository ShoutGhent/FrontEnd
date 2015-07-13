import React from 'react'
import { RouteHandler} from 'react-router'
import AuthenticatedComponent from '../auth/AuthenticatedComponent'

var LoggedIn = React.createClass({
    render() {
        return (
            <div>
                <RouteHandler />
            </div>
        )
    }
})

export default AuthenticatedComponent(LoggedIn)
