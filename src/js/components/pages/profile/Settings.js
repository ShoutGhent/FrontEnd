import React from 'react'

import EditName from './EditName'
import EditPassword from './EditPassword'
import EditProfilePicture from './EditProfilePicture'
import LoginStore from '../../../auth/LoginStore'
import Redirect from '../../../services/Redirect'
import { Grid, Cell } from '../../grid/Grid'
import { Tab, TabPanel } from '../../tab/Tab'

let Settings = React.createClass({
    getInitialState() {
        return LoginStore.getState()
    },
    componentDidMount() {
        LoginStore.listen(this._onChange)
    },
    componentWillUnmount() {
        LoginStore.unlisten(this._onChange)
    },
    _onChange(state) {
        this.setState(state)
    },
    changeTab(tabId) {
        Redirect.to('settings', { tabId })
    },
    render() {
        let { user } = this.state
        let { params } = this.props

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
                </Tab>
            </div>
        )
    }
})

export default Settings
