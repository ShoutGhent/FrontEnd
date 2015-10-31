import React from 'react'

import Cloudinary from 'Cloudinary'
import EditName from './components/EditName'
import EditPassword from './components/EditPassword'
import EditProfilePicture from './components/EditProfilePicture'
import Emojify from 'Emojify'
import Loading from 'Loading'
import LoginStore from 'LoginStore'
import MyGroupsActions from 'MyGroupsActions'
import MyGroupsStore from 'MyGroupsStore'
import Redirect from 'Redirect'
import { Card, CardContent, CardTitle } from 'Card'
import { Collection, CollectionItem } from 'Collection'
import { Grid, Cell } from 'Grid'
import { Link } from 'react-router'
import { Tab, TabPanel } from 'Tab'

let SettingsPage = React.createClass({
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
            myGroups: myGroupsState.myGroups,
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
                    <Emojify>{group.name}</Emojify>
                </Link>
                <Link to="group" params={{groupId: group.id, tabId: 'shouts'}} className="secondary-content">
                    <Cloudinary
                        style={{borderRadius: '50%'}}
                        image={group.logo_data}
                        options={{ width: 24, height: 24 }}
                        defaultElement={<span className="center-both" style={{
                            color: 'rgba(0, 0, 0, 0.4)',
                            fontWeight: 'bold',
                            margin: 0,
                            fontSize: 18,
                            borderRadius: '50%'
                        }}>{group.name.substr(0, 1).toUpperCase()}</span>}
                    />
                </Link>
            </CollectionItem>
        )
    },
    renderList(title, groups) {
        let { loading, myGroups } = this.state
        let countStyles = {
            color: '#bbb',
            fontSize: 16
        }

        return (
            <Card>
                <CardContent>
                    <CardTitle>
                        <span>{title}</span> <span style={countStyles}>({groups.length})</span>
                    </CardTitle>
                    <div>
                    {loading && myGroups.length == 0 && (
                        <Loading/>
                    )}
                    </div>
                    <Collection>{groups.map(group => this.renderGroupItem(group))}</Collection>
                </CardContent>
            </Card>
        )
    },
    render() {
        let { user, myGroups } = this.state
        let { params } = this.props

        let adminGroups = []
        let memberGroups = []

        myGroups.map((group) => {
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
                                {this.renderList("Die ik beheer", adminGroups)}
                            </Cell>
                            <Cell width={6/12}>
                                {this.renderList("Waar ik lid van ben", memberGroups)}
                            </Cell>
                        </Grid>
                    </TabPanel>
                </Tab>
            </div>
        )
    }
})

export default SettingsPage
