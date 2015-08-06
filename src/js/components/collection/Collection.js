import React, { PropTypes, addons } from 'react/addons'
var { PureRenderMixin } = addons

var Collection = React.createClass({
    mixins: [PureRenderMixin],
    render() {
        let { children } = this.props

        return (
            <ul className="collection">{children}</ul>
        )
    }
})

var CollectionHeader = React.createClass({
    mixins: [PureRenderMixin],
    render() {
        let { children } = this.props

        return (
            <li className="collection-header">{children}</li>
        )
    }
})

var CollectionItem = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        active: PropTypes.bool
    },
    getDefaultProps() {
        return {
            active: false
        }
    },
    render() {
        let { children, active } = this.props
        let className = `collection-item ${active ? 'active' : ''}`

        return (
            <li className={className}>{children}</li>
        )
    }
})

export default { Collection, CollectionHeader, CollectionItem }
