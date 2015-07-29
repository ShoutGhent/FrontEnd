import React from 'react'

var Maps = React.createClass({
    render() {
        let { children } = this.props

        let css = {
            pointerEvents: 'none'
        }

        return (
            <div style={css}>{children}</div>
        )
    }
})

export default Maps
