import React, { PropTypes } from 'react'

import { Link } from 'react-router'

let LoggedOutHeader = React.createClass({
    propTypes: {
        className: PropTypes.string.isRequired,
        toggleNavigation: PropTypes.func.isRequired
    },
    render() {
        let { className } = this.props

        return (
            <ul className={className}>
                <li onClick={this.props.toggleNavigation}><Link to="login">Log In</Link></li>
                <li onClick={this.props.toggleNavigation}><Link to="register">Registreren</Link></li>
            </ul>
        )
    }
})

export default LoggedOutHeader
