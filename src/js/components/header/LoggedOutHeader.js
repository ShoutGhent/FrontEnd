import React from 'react'

import { Link } from 'react-router'

let LoggedOutHeader = React.createClass({
    propTypes: {
        className: React.PropTypes.string.isRequired
    },
    render() {
        let { className } = this.props

        return (
            <ul className={className}>
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
