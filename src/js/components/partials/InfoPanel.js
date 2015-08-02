import React from 'react'
import { addons } from 'react/addons'
var { PureRenderMixin } = addons
import Icon from './Icon'

var InfoPanel = React.createClass({
    mixins: [PureRenderMixin],
    render() {
        let { children } = this.props

        return (
            <div className="card-info">
                <Icon icon="info_outline"/>
                <div className="contents">{children}</div>
            </div>
        )
    }
})

export default InfoPanel
