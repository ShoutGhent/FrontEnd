import React from 'react'

import GroupListNearMe from '../../group/GroupListNearMe'
import InfoPanel from '../../partials/InfoPanel'
import JoinInitialGroupModal from '../../partials/JoinInitialGroupModal'
import LoginStore from '../../../auth/LoginStore'
import MyGroupList from '../../group/MyGroupList'
import MyGroupsActions from '../../group/MyGroupsActions'
import MyGroupsStore from '../../group/MyGroupsStore'
import ShoutFeed from '../../shout/ShoutFeed'
import { Button } from '../../Material/Material'
import { Card, CardContent } from '../../card/Card'
import { Grid, Cell } from '../../grid/Grid'
import { Tab, TabPanel } from '../../tab/Tab'

var LoggedIn = React.createClass({
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
                <Grid>
                    <Cell width={4/12}>
                        <GroupListNearMe/>
                    </Cell>
                    <Cell width={8/12}>
                        <ShoutFeed url="shouts/from/groups"/>
                    </Cell>
                </Grid>
            </div>
        )
    }
})

export default LoggedIn
