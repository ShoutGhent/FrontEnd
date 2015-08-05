import React from 'react'

import API from '../../services/API'
import Icon from '../partials/Icon'
import { Card, CardContent, CardTitle } from '../card/Card'
import { Collection, CollectionItem } from '../collection/Collection'
import { Link } from 'react-router'
import WebStorage from '../../services/WebStorage'
import Loading from '../loading/Loading'

var GroupList = React.createClass({
    getInitialState() {
        let groups = WebStorage.fromStore(`groups.myGroups`, [])

        return {
            groups: groups,
            loading: groups.length <= 0
        }
    },
    componentDidMount() {
        API.get('groups/mine', {}, (response, err) => {
            if ( ! err) {
                this.setState({
                    groups: response.data,
                    loading: false
                })
            }
        })
    },
    componentWillUnmount() {
        this.cacheGroups()
    },
    cacheGroups() {
        let key = `groups.myGroups`
        WebStorage.toStore(key, this.state.groups)

        let cachedUrls = WebStorage.fromStore('cachedShoutUrls', [])
        if (cachedUrls.indexOf(key) == -1) {
            cachedUrls.push(key)
            WebStorage.toStore('cachedShoutUrls', cachedUrls)
        }
    },
    renderGroups(group) {
        return (
            <CollectionItem key={group.id}>
                {group.name}
                <Link to="group" params={{groupId: group.id}} className="secondary-content">
                    <Icon icon="send"></Icon>
                </Link>
            </CollectionItem>
        )
    },
    render() {
        let { groups, loading } = this.state

        return (
            <div>
                <Card>
                    <CardContent>
                        <CardTitle>Mijn Groepen</CardTitle>

                        {loading ? (
                            <Loading/>
                        ) : (
                            <Collection>
                                {groups.map(this.renderGroups)}
                            </Collection>
                        )}
                    </CardContent>
                </Card>
            </div>
        )
    }
})

export default GroupList
