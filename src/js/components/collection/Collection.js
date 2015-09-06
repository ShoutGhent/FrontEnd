import React, { PropTypes, addons } from 'react/addons'
import cx from 'classnames'
var { PureRenderMixin } = addons

var Collection = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        noBorder: PropTypes.bool,
        noMargin: PropTypes.bool,
        noPadding: PropTypes.bool,
    },
    getDefaultProps() {
        return {
            noBorder: false,
            noMargin: false,
            noPadding: false,
        }
    },
    render() {
        let { children, noPadding, noBorder, noMargin } = this.props

        let className = cx({
            'collection': true,
            'no-padding': noPadding,
            'no-margin': noMargin,
            'no-border': noBorder
        })

        return (
            <ul {...this.props} className={className}>{children}</ul>
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
        active: PropTypes.bool,
        avatar: PropTypes.bool,
        noPadding: PropTypes.bool
    },
    getDefaultProps() {
        return {
            active: false,
            avatar: false,
            noPadding: false
        }
    },
    render() {
        let { children, active, avatar, noPadding } = this.props
        let className = cx({
            'collection-item': true,
            'active': active,
            'avatar': avatar,
            'no-padding': noPadding,
            'clearfix': true
        })

        return (
            <li className={className}>{children}</li>
        )
    }
})

export default { Collection, CollectionHeader, CollectionItem }
