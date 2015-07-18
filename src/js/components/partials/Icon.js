import React from 'react'
import { addons } from 'react/addons'
var { PureRenderMixin } = addons

let Icon = React.createClass({
    mixins: [PureRenderMixin],
    render() {
        return (
            <i className="material-icons">{this.props.icon}</i>
        )
    }
});

export default Icon
