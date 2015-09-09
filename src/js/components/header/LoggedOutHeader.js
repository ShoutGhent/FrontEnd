import React, { PropTypes } from 'react'

import { Link } from 'react-router'

let LoggedOutHeader = React.createClass({
    propTypes: {
        className: PropTypes.string.isRequired,
        closeNavigation: PropTypes.func.isRequired
    },
    render() {
        let { className } = this.props

        return (
            <ul className={className}>
                <li onClick={this.props.closeNavigation}><Link to="login">Log In</Link></li>
                <li onClick={this.props.closeNavigation}><Link to="register">Registreren</Link></li>
            </ul>
        )
    }
})

export default LoggedOutHeader
