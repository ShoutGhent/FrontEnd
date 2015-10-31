import React, { PropTypes } from 'react'

import Cloudinary from 'Cloudinary'
import Emojify from 'Emojify'
import Loading from 'Loading'
import { Card, CardContent, CardTitle } from 'Card'
import { Collection, CollectionItem } from 'Collection'
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
                    <Emojify>{group.name}</Emojify>

                    <div className="secondary-content">
                        <Cloudinary
                            className="right"
                            style={{borderRadius: '50%'}}
                            image={group.logo_data}
                            options={{ width: 24, height: 24 }}
                            defaultElement={<span className="center-both" style={{
                                color: 'rgba(0, 0, 0, 0.4)',
                                fontWeight: 'bold',
                                margin: 0,
                                fontSize: 18
                            }}>{group.name.substr(0, 1).toUpperCase()}</span>}
                        />
                    </div>
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

                    {groups.length != 0 && (
                        <Collection>
                            {groups.map(this.renderGroups)}
                        </Collection>
                    )}

                    {loading && (
                        <Loading/>
                    )}
                </CardContent>
            </Card>
        )
    }
})

export default GroupList
