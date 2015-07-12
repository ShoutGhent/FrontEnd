import React from 'react'
import { Grid } from 'rgx'

var Cell = React.createClass({
    propTypes: {
        min: React.PropTypes.number,
        max: React.PropTypes.number,
        width: React.PropTypes.number,
        padding: React.PropTypes.number,
        inlineCell: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            min: 640,
            max: null,
            width: 100,
            padding: 0,
            inlineCell: false
        }
    },
    render() {
        var props = this.props

        var style = {
            boxSizing: 'border-box',
            display: props.inlineCell ? 'inline-block' : 'block',
            width: props.inlineCell ? props.width * 100 + '%' : '100%',
            verticalAlign: 'top',
            paddingLeft: props.padding,
            paddingRight: props.padding,
            position: 'relative'
        }

        return (
            <div style={style}>
                {this.props.children}
            </div>
        )
    }
})

export default { Grid, Cell }
