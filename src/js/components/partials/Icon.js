import React, { PropTypes } from 'react'

let Icon = React.createClass({
    propTypes: {
        icon: PropTypes.string.isRequired,
        spinning: PropTypes.bool
    },
    getDefaultProps() {
        return {
            spinning: false
        }
    },
    render() {
        let { icon, className, spinning } = this.props
        className = `material-icons ${className ? className : ''} ${spinning ? 'icon-spin' : ''}`


        return (
            <i {...this.props} className={className}>{icon}</i>
        )
    }
});

export default Icon
