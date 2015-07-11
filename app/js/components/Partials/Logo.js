import React from 'react'
import { Link } from 'react-router'

var Logo = React.createClass({
    render() {
        return (
            <Link to="/" className="brand-logo">Shout</Link>
        )
    }
});

export default Logo
