import React from 'react'
import { addons } from 'react/addons'
var { PureRenderMixin } = addons

var Loading = React.createClass({
    mixins: [PureRenderMixin],
    render() {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        )
    }
})

export default Loading
