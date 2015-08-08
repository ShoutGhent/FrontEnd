import React, { PropTypes } from 'react'

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
                    <Icon icon="send"></Icon>
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

                        {loading ? (
                            <Loading/>
                        ) : (
                            <Collection>
                                {myGroups .map(this.renderGroups)}
                            </Collection>
                        )}
                    </CardContent>
                </Card>
            </div>
        )
    }
})

export default GroupList
