import React, { PropTypes } from 'react'

import Emoji from 'emojione'

var Emojify = React.createClass({
    render() {
        let { children } = this.props

        children = Emoji.toImage(children)

        return (
            <span dangerouslySetInnerHTML={{__html: children}}/>
        )
    }
})

export default Emojify
