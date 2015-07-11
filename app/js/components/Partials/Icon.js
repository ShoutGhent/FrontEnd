import React from 'react'

var Icon = React.createClass({
    render() {
        return (
            <i className="material-icons">{this.props.icon}</i>
        )
    }
});

export default Icon
