import React, { PropTypes } from 'react'

import cx from 'classnames'
import TransitiveNumber from 'react-transitive-number'

var GroupDistance = React.createClass({
    propTypes: {
        group: PropTypes.object.isRequired,
        right: PropTypes.bool,
        badge: PropTypes.bool,
    },
    getDefaultProps() {
        return {
            right: false,
            badge: false
        }
    },
    render() {
        let { group, right, badge } = this.props

        let classes = cx({
            'group-badge': badge,
            'right': right
        })

        return (
            <span className={classes}>
                {group.meta.from_me != null && (group.meta.from_me > 1000 ? (
                    <span>
                        <TransitiveNumber>{Math.round(group.meta.from_me/1000)}</TransitiveNumber> kilometer
                    </span>
                ) : (
                    <span>
                        <TransitiveNumber>{Math.round(group.meta.from_me)}</TransitiveNumber> meter
                    </span>
                ))}
            </span>
        )
    }
})

export default GroupDistance
