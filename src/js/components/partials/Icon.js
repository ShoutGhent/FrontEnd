import React from 'react'

let Icon = React.createClass({
    render() {
        return (
            <i className="material-icons">{this.props.icon}</i>
        )
    }
});

export default Icon
