import React from 'react'

var Grid = React.createClass({
    render() {
        let { children } = this.props

        return (
            <div className="row">{children}</div>
        )
    }
})

var Cell = React.createClass({
    propTypes: {
        center: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            width: 12/12,
            center: false
        }
    },
    render() {
        let { children, width, center } = this.props

        let size = Math.round(width * 12)
        let className = `col s12 m12 l${size} ${center ? 'center' : ''}`

        return (
            <div className={className}>{children}</div>
        )
    }
})

export default { Grid, Cell }
