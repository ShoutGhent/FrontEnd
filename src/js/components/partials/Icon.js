import React from 'react'

let Icon = React.createClass({
    propTypes: {
        icon: React.PropTypes.string.isRequired
    },
    render() {
        let { icon } = this.props

        return (
            <i className="material-icons">{icon}</i>
        )
    }
});

export default Icon
