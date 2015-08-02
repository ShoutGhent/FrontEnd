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
                                                        Je kan je afbeelding wijzigen op: <a href="https://avatarize.me/" target="_blank">avatarize.me</a>,
                                                        heb je nog geen account, maak dan een met het volgende email adres: <strong>{user.email}</strong>
                                                    </InfoPanel>
                                                </Cell>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Cell>
                            </Grid>
                        </TabPanel>
                        <TabPanel title="Account">
                            <form>
                                <Grid>
                                    <Cell>
                                        <MaterialInput label="Huidig wachtwoord" id="password1" type="password" className="validate" />
                                    </Cell>
                                </Grid>
                                <Grid>
                                    <Cell>
                                        <MaterialInput label="Nieuw wachtwoord" id="password2" type="password" className="validate" />
                                    </Cell>
                                </Grid>
                                <Grid>
                                    <Cell>
                                        <MaterialInput label="Wachtwoord herhalen" id="password3" type="password" className="validate" />
                                    </Cell>
                                </Grid>
                            </form>
                        </TabPanel>
                        <TabPanel title="Groepen">
                            <ul className="collection with-header">
                                <li className="collection-item"><div>Alvin<a href="#!" className="secondary-content"><i className="material-icons">send</i></a></div></li>
                                <li className="collection-item"><div>Alvin<a href="#!" className="secondary-content"><i className="material-icons">send</i></a></div></li>
                                <li className="collection-item"><div>Alvin<a href="#!" className="secondary-content"><i className="material-icons">send</i></a></div></li>
                                <li className="collection-item"><div>Alvin<a href="#!" className="secondary-content"><i className="material-icons">send</i></a></div></li>
                            </ul>
                        </TabPanel>
                        <TabPanel title="Notificaties">
                            <form action="#">
                                <div className="row">
                                    <div className="col s9" htmlFor="email">
                                        E-mails ontvangen
                                    </div>
                                    <div className="col s3 right-align">
                                        <input type="checkbox" id="email" />
                                        <label htmlFor="email"> </label>
                                    </div>
                                </div>
                            </form>
                        </TabPanel>
                    </Tab>
                </div>
            </div>
        )
    }
})

export default Settings
