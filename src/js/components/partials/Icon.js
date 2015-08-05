import React from 'react'

let Icon = React.createClass({
    propTypes: {
        icon: React.PropTypes.string.isRequired
    },
    render() {
        let { icon, className } = this.props
        className = `material-icons ${className ? className : ''}`


        return (
            <i {...this.props} className={className}>{icon}</i>
        )
    }
});

export default Icon
