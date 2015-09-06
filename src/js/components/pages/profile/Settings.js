import React from 'react'

import Cloudinary from '../../partials/Cloudinary'
import EditName from './EditName'
import EditPassword from './EditPassword'
import EditProfilePicture from './EditProfilePicture'
import Loading from '../../loading/Loading'
import LoginStore from '../../../auth/LoginStore'
import MyGroupsActions from '../../group/MyGroupsActions'
import MyGroupsStore from '../../group/MyGroupsStore'
import MyLocation from '../../users/MyLocation'
import Redirect from '../../../services/Redirect'
import { Card, CardContent, CardTitle } from '../../card/Card'
import { Collection, CollectionItem } from '../../collection/Collection'
import { Grid, Cell } from '../../grid/Grid'
import { Link } from 'react-router'
import { Tab, TabPanel } from '../../tab/Tab'

let Settings = React.createClass({
    statics: {
        willTransitionTo() {
            MyGroupsActions.fetchMyGroups()
        }
    },
    getInitialState() {
        let loginState = LoginStore.getState()
        let myGroupsState = MyGroupsStore.getState()

        return {
            user: loginState.user,
            jwt: loginState.jwt,
            groups: myGroupsState.myGroups,
            loading: myGroupsState.loading
        }
    },
    componentDidMount() {
        LoginStore.listen(this._onChange)
        MyGroupsStore.listen(this._onChange)
    },
    componentWillUnmount() {
        LoginStore.unlisten(this._onChange)
        MyGroupsStore.unlisten(this._onChange)
    },
    _onChange(state) {
        this.setState(state)
    },
    changeTab(tabId) {
        Redirect.to('settings', { tabId })
    },
    renderGroupItem(group) {
        return (
            <CollectionItem key={group.id}>
                <Link to="group" params={{groupId: group.id, tabId: 'shouts'}}>
                    {group.name}
                </Link>
                <Link to="group" params={{groupId: group.id, tabId: 'shouts'}} className="secondary-content">
                    <Cloudinary
                        image={group.logo_data}
                        options={{ width: 24, height: 24 }}
                        defaultElement={<span className="center" style={{
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
        let { user, groups, loading } = this.state
        let { params } = this.props

        let countStyles = {
            color: '#bbb',
            fontSize: 16
        }

        let adminGroups = []
        let memberGroups = []

        groups.map((group) => {
            if (group.meta.my_type == "admin") {
                adminGroups.push(group)
            } else {
                memberGroups.push(group)
            }
        })

        return (
            <div className="container">
                <Tab activeTab={params.tabId} onTabChange={this.changeTab}>
                    <TabPanel title="Algemeen" tabId="general">
                        <Grid>
                            <Cell width={6/12}>
                                <EditName user={user}/>
                                <EditPassword/>
                            </Cell>
                            <Cell width={6/12}>
                                <EditProfilePicture user={user}/>
                            </Cell>
                        </Grid>
                    </TabPanel>
                    <TabPanel title="Groepen" tabId="groups">
                        <Grid>
                            <Cell width={6/12}>
                                <Card>
                                    <CardContent>
                                        <CardTitle>Die ik beheer <span style={countStyles}>({adminGroups.length})</span></CardTitle>
                                        {loading && groups.length == 0 && <Loading/>}
                                        <Collection>
                                        {adminGroups.map(group => this.renderGroupItem(group))}
                                        </Collection>
                                    </CardContent>
                                </Card>
                            </Cell>
                            <Cell width={6/12}>
                                <Card>
                                    <CardContent>
                                        <CardTitle>Waar ik lid van ben <span style={countStyles}>({memberGroups.length})</span></CardTitle>
                                        {loading && groups.length == 0 && <Loading/>}
                                        <Collection>
                                        {memberGroups.map(group => this.renderGroupItem(group))}
                                        </Collection>
                                    </CardContent>
                                </Card>
                            </Cell>
                        </Grid>
                    </TabPanel>
                </Tab>
            </div>
        )
    }
})

export default Settings
