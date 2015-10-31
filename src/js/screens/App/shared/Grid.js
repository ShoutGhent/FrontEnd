import React, { PropTypes } from 'react'

var Grid = React.createClass({
    render() {
        let { children } = this.props

        return (
            <div {...this.props} className="row">{children}</div>
        )
    }
})

var Cell = React.createClass({
    propTypes: {
        center: PropTypes.bool
    },
    getDefaultProps() {
        return {
            width: 12/12,
            offset: 0/12,
            center: false
        }
    },
    render() {
        let { children, width, center, offset } = this.props

        let size = Math.round(width * 12)
        let offsetSize = Math.round(offset * 12)

        let className = `col s12 m12 l${size} ${center ? 'center' : ''} offset-l${offsetSize}`

        return (
            <div className={className}>{children}</div>
        )
    }
})

export default { Grid, Cell }
