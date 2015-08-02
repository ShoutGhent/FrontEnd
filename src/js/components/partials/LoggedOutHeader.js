import React from 'react'

import { Link } from 'react-router'

let LoggedOutHeader = React.createClass({
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
