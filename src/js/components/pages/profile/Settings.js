import React from 'react'

import EditName from './EditName'
import EditPassword from './EditPassword'
import EditProfilePicture from './EditProfilePicture'
import LoginStore from '../../../auth/LoginStore'
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
    render() {
        let { user } = this.state

        return (
            <div className="container">
                <Tab>
                    <TabPanel title="Algemeen">
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
