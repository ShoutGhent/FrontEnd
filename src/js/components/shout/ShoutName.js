import React, { PropTypes } from 'react'

import Emojify from '../partials/Emojify'
import { Link } from 'react-router'

var ShoutName = React.createClass({
    propTypes: {
        shout: PropTypes.object.isRequired
    },
    render() {
        let { shout } = this.props
        let { anonymous } = this.props
        let name = anonymous ? 'Anonymous' : shout.user.full_name

        return (
            <span>
                <span className="shout__name">
                    <Emojify>{name}</Emojify>
                </span>
                &nbsp;
                {shout.meta.via && (
                    <span className="shout__name--from">
                        via <Link to="group" params={{ groupId: shout.meta.via.id, tabId: 'shouts' }}><Emojify>{shout.meta.via.name}</Emojify></Link>
                    </span>
                )}
            </span>
        )
    }
})

export default ShoutName
