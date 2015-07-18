import React from 'react'
import { Link } from 'react-router'
import { addons } from 'react/addons'
var { PureRenderMixin } = addons

let LoggedOutHeader = React.createClass({
    mixins: [PureRenderMixin],
    render() {
        return (
            <ul className="right hide-on-med-and-down">
                <li>
                    <Link to="login">Log In</Link>
                </li>
                <li>
                    <Link to="register">Registreren</Link>
                </li>
            </ul>
        )
    }
})

export default LoggedOutHeader
