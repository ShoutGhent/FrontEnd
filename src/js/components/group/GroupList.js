import React, { PropTypes } from 'react'

import Cloudinary from '../partials/Cloudinary'
import Icon from '../partials/Icon'
import Loading from '../loading/Loading'
import GroupDistance from '../pages/group/GroupDistance'
import { Card, CardContent, CardTitle } from '../card/Card'
import { Collection, CollectionItem } from '../collection/Collection'
import { Link } from 'react-router'

var GroupList = React.createClass({
    propTypes: {
        groups: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        loading: PropTypes.bool
    },
    getDefaultProps() {
        return {
            loading: false
        }
    },
    renderGroups(group) {
        return (
            <CollectionItem key={group.id}>
                <Link to="group" params={{groupId: group.id, tabId: 'shouts'}}>
                    {group.name}

                    <div className="secondary-content">
                        <Cloudinary
                            className="right"
                            image={group.logo_data}
                            options={{ width: 24, height: 24 }}
                            defaultElement={<span className="center" style={{
                                color: 'rgba(0, 0, 0, 0.4)',
                                fontWeight: 'bold',
                                margin: 0,
                                fontSize: 18
                            }}>{group.name.substr(0, 1).toUpperCase()}</span>}
                        />
                    </div>
                    <span className="right">
                        <GroupDistance group={group} badge/>
                    </span>
                </Link>
            </CollectionItem>
        )
    },
    render() {
        let { groups, loading, title } = this.props

        return (
            <Card>
                <CardContent>
                    <CardTitle>{title}</CardTitle>
                    {groups.length != 0 &&
                        <Collection>
                            {groups.map(this.renderGroups)}
                        </Collection>
                    }
                    {loading && <Loading/>}
                </CardContent>
            </Card>
        )
    }
})

export default GroupList
