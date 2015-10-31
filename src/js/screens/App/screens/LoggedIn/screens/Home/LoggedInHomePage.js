import React from 'react'

import GroupListNearMe from 'GroupListNearMe'
import InfoPanel from 'InfoPanel'
import JoinInitialGroupModal from '../../components/JoinInitialGroupModal'
import LoginStore from 'LoginStore'
import MyGroupList from 'MyGroupList'
import MyGroupsActions from 'MyGroupsActions'
import MyGroupsStore from 'MyGroupsStore'
import ShoutFeed from 'ShoutFeed'
import { Button } from 'forms/material/Material'
import { Card, CardContent } from 'Card'
import { Grid, Cell } from 'Grid'
import { Tab, TabPanel } from 'Tab'

var LoggedInHomePage = React.createClass({
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

export default LoggedInHomePage
