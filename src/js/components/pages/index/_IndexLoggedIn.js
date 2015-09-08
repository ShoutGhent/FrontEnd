import React from 'react'

import MyGroupList from '../../group/MyGroupList'
import GroupListNearMe from '../../group/GroupListNearMe'
import InfoPanel from '../../partials/InfoPanel'
import JoinInitialGroupModal from '../../partials/JoinInitialGroupModal'
import LoginStore from '../../../auth/LoginStore'
import MyGroupsActions from '../../group/MyGroupsActions'
import MyGroupsStore from '../../group/MyGroupsStore'
import MyLocation from '../../users/MyLocation'
import ShoutFeed from '../../shout/ShoutFeed'
import { Grid, Cell } from '../../grid/Grid'
import { Tab, TabPanel } from '../../tab/Tab'
import { Button } from '../../button/MaterialButton'
import { Card, CardContent } from '../../card/Card'

var _IndexLoggedIn = React.createClass({
    getInitialState() {
        let myGroupsStoreState = MyGroupsStore.getState()
        let loginStoreState = LoginStore.getState()

        return {
            loading: myGroupsStoreState.loading,
            myGroups: myGroupsStoreState.myGroups,
            user: loginStoreState.user
        }
    },
    componentDidMount() {
        MyGroupsStore.listen(this._onChange)
        LoginStore.listen(this._onChange)

        if (this.isMounted()) {
            MyGroupsActions.fetchMyGroups()
            MyGroupsActions.fetchGroupsNearMe()
        }
    },
    componentWillUnmount() {
        MyGroupsStore.unlisten(this._onChange)
        LoginStore.unlisten(this._onChange)
    },
    _onChange(state) {
        this.setState(state)
    },
    refetchGroups() {
        MyGroupsActions.fetchMyGroups()
        MyGroupsActions.fetchGroupsNearMe()
    },
    render() {
        let { loading, myGroups } = this.state

        return (
            <div className="container">
                { ! loading && myGroups.length <= 0 && (
                    <JoinInitialGroupModal
                        onDone={this.refetchGroups}
                    />
                )}
                <Tab>
                    <TabPanel title="Vrienden">
                        <Grid>
                            <Cell width={4/12}>
                                <MyGroupList/>
                            </Cell>
                            <Cell width={8/12}>
                                <ShoutFeed url="shouts/from/groups"/>
                            </Cell>
                        </Grid>
                    </TabPanel>
                    <TabPanel title="Omgeving">
                        <Grid>
                            <Cell width={4/12}>
                                <MyLocation/>

                                <GroupListNearMe/>
                            </Cell>
                            <Cell width={8/12}>
                            {this.state.user.location ? (
                                <ShoutFeed url="shouts/from/groups"/>
                            ) : (
                                <InfoPanel>
                                    <h5>Zet je locatiebepaling aan om deze modus te gebruiken. Klik hier voor meer informatie en voor ons privacybeleid.</h5>
                                </InfoPanel>
                            )}
                            </Cell>
                        </Grid>
                    </TabPanel>
                </Tab>
            </div>
        )
    }
})

export default _IndexLoggedIn
