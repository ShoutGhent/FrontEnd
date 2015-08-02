import React from 'react'
import Avatar from '../../users/Avatar'
import EditName from './EditName'
import InfoPanel from '../../partials/InfoPanel'
import LoginStore from '../../../auth/LoginStore'
import MaterialInput from '../../partials/MaterialInput'
import { Card, CardContent, CardTitle } from '../../card/Card'
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
            <div>
                <div className="settings container">
                    <Tab>
                        <TabPanel title="Persoonlijk">
                            <Grid>
                                <Cell width={6/12}>
                                    <EditName user={user}/>
                                </Cell>
                                <Cell width={6/12}>
                                    <Card>
                                        <CardContent>
                                            <CardTitle>Foto Wijzigen</CardTitle>

                                            <Grid>
                                                <Cell center>
                                                    <Avatar email={user.email} size={100} round/>
                                                </Cell>
                                                <Cell>
                                                    <InfoPanel>
                                                        Je kan je afbeelding wijzigen op: <a href={`https://avatarize.me/?email=${user.email}`} target="_blank">avatarize.me</a>,
                                                        heb je nog geen account, maak dan een met het volgende email adres: <strong>{user.email}</strong>
                                                    </InfoPanel>
                                                </Cell>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Cell>
                            </Grid>
                        </TabPanel>
                    </Tab>
                </div>
            </div>
        )
    }
})

export default Settings
