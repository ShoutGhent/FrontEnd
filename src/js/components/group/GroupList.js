import React, { PropTypes } from 'react'

import Cloudinary from '../partials/Cloudinary'
import Icon from '../partials/Icon'
import Loading from '../loading/Loading'
import MyGroupsStore from './MyGroupsStore'
import WebStorage from '../../services/WebStorage'
import { Card, CardContent, CardTitle } from '../card/Card'
import { Collection, CollectionItem } from '../collection/Collection'
import { Link } from 'react-router'

var GroupList = React.createClass({
    getInitialState() {
        return MyGroupsStore.getState()
    },
    componentDidMount() {
        MyGroupsStore.listen(this._onChange)
    },
    componentWillUnmount() {
        MyGroupsStore.unlisten(this._onChange)
    },
    _onChange(state) {
        this.setState(state)
    },
    renderGroups(group) {
        return (
            <CollectionItem key={group.id}>
                {group.name}
                <Link to="group" params={{groupId: group.id, tabId: 'shouts'}} className="secondary-content">
                    <Cloudinary
                        image={group.logo_data}
                        options={{ width: 24, height: 24 }}
                        defaultElement={<span style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'rgba(0, 0, 0, 0.4)',
                            fontWeight: 'bold',
                            margin: 0,
                            fontSize: 18
                        }}>{group.name.substr(0, 1).toUpperCase()}</span>}
                    />
                </Link>
            </CollectionItem>
        )
    },
    render() {
        let { myGroups, loading } = this.state

        return (
            <div>
                <Card>
                    <CardContent>
                        <CardTitle>Mijn Groepen</CardTitle>
                        {myGroups.length != 0 &&
                            <Collection>
                                {myGroups.map(this.renderGroups)}
                            </Collection>
                        }
                        {loading && <Loading/>}
                    </CardContent>
                </Card>
            </div>
        )
    }
})

export default GroupList
