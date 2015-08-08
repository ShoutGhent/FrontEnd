import React from 'react'

import GroupList from '../../group/GroupList'
import JoinInitialGroupModal from '../../partials/JoinInitialGroupModal'
import MyGroupsActions from '../../group/MyGroupsActions'
import MyGroupsStore from '../../group/MyGroupsStore'
import ShoutFeed from '../../shout/ShoutFeed'
import { Grid, Cell } from '../../grid/Grid'
import { Tab, TabPanel } from '../../tab/Tab'

var _IndexLoggedIn = React.createClass({
    getInitialState() {
        return MyGroupsStore.getState()
    },
    componentDidMount() {
        MyGroupsStore.listen(this._onChange)

        if (this.isMounted()) {
            MyGroupsActions.fetchMyGroups()
        }
    },
    componentWillUnmount() {
        MyGroupsStore.unlisten(this._onChange)
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
                {!loading && myGroups.length <= 0 ? (
                    <JoinInitialGroupModal onDone={this.refetchGroups}></JoinInitialGroupModal>
                ) : ''}
                <Grid>
                    <Cell width={3/12}>
                        <GroupList/>
                    </Cell>
                    <Cell width={9/12}>
                        <Tab>
                            <TabPanel title="Omgeving">
                                <ShoutFeed url="shouts" />
                            </TabPanel>
                            <TabPanel title="Vrienden">
                                <ShoutFeed url="shouts" />
                            </TabPanel>
                        </Tab>
                    </Cell>
                </Grid>
            </div>
        )
    }
})

export default _IndexLoggedIn
