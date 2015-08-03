import React from 'react'

import Icon from './Icon'
import { addons } from 'react/addons'
var { PureRenderMixin } = addons

var InfoPanel = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        icon: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            icon: true
        }
    },
    render() {
        let { children } = this.props

        return (
            <div className="card-info">
                {this.props.icon ? <Icon icon="info_outline"/> : ''}
                <div className="contents">{children}</div>
            </div>
        )
    }
})

export default InfoPanel
