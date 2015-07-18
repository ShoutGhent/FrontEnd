import React from 'react'
import { addons } from 'react/addons'
var { PureRenderMixin } = addons

var Grid = React.createClass({
    mixins: [PureRenderMixin],
    render() {
        let { children } = this.props

        return (
            <div className="row">{children}</div>
        )
    }
})

var Cell = React.createClass({
    render() {
        let { children, width } = this.props
        let size = Math.round(width * 12)
        let className = `col s12 m12 l${size} ${this.props.center ? 'center' : ''}`

        return (
            <div className={className}>{children}</div>
        )
    }
})

export default { Grid, Cell }
