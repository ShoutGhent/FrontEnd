import React, { PropTypes } from 'react'

import Cloudinary from '../partials/Cloudinary'
import Emojify from '../partials/Emojify'
import GroupDistance from '../pages/group/GroupDistance'
import Icon from '../partials/Icon'

var GroupPreviewCard = React.createClass({
    propTypes: {
        group: PropTypes.object.isRequired
    },
    render() {
        let { group } = this.props

        return (
            <div className="group__marker__preview">
                <div className="group__marker__preview__header">
                    <Cloudinary
                        image={group.header_data}
                        options={{width: 250, height: 107}}
                    />

                    <div className="__logo">
                        <Cloudinary
                            image={group.logo_data}
                            options={{width: 50, height: 50}}
                        />
                    </div>

                    <span className="__name">{group.name}</span>

                    <div className="__details">
                        <ul>
                            <li>
                                <span><Icon icon="people"/></span>
                                <span>{group.meta.member_count} {group.meta.member_count == 1 ? 'lid' : 'leden'}</span>
                            </li>
                            <li>
                                <span><Icon icon="person"/></span>
                                <span>{group.meta.in_group ? 'Ik ben lid' : 'Ik ben geen lid'}</span>
                            </li>
                            <li>
                                <span><Icon icon="location_on"/></span>
                                <span><GroupDistance group={group}/> van mij</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
})

export default GroupPreviewCard
