import React from 'react'
import { Tab, TabPanel } from '../../tab/Tab'
import MaterialInput from '../../partials/MaterialInput'
import { Grid, Cell } from '../../grid/Grid'
import Avatar from '../../users/Avatar'
import LoginStore from '../../../auth/LoginStore'

function getStateFromStore() {
    return LoginStore.getState()
}

var Settings = React.createClass({
    getInitialState() {
        return getStateFromStore()
    },
    componentDidMount() {
        LoginStore.listen(this._onChange)
    },
    componentWillUnmount() {
        LoginStore.unlisten(this._onChange)
    },
    _onChange() {
        this.setState(getStateFromStore())
    },
    render() {
        let { user } = this.state
        return (
            <div>
                <div className="settings container">
                    <div className="section">
                        <Tab>
                            <TabPanel title="Persoonlijk">
                                <h5>Persoonlijk</h5>
                                <Avatar email={user.email}/>
                                <form>
                                    <Grid>
                                        <Cell width={1/2}>
                                            <MaterialInput label="Voornaam" id="first_name" type="text" className="validate" />
                                        </Cell>
                                        <Cell width={1/2}>
                                            <MaterialInput label="Achternaam" id="last_name" type="text" className="validate m6" />
                                        </Cell>
                                        <Cell width={1/1}>
                                            <MaterialInput label="Adres" id="address" type="text" className="validate" />
                                        </Cell>
                                        <Cell width={1/1}>
                                            <MaterialInput label="Email" id="email" type="email" className="validate" />
                                        </Cell>
                                    </Grid>
                                </form>
                            </TabPanel>
                            <TabPanel title="Account">
                                <h5>Account</h5>
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
                                <h5>Groepen</h5>
                                <ul className="collection with-header">
                                    <li className="collection-item"><div>Alvin<a href="#!" className="secondary-content"><i className="material-icons">send</i></a></div></li>
                                    <li className="collection-item"><div>Alvin<a href="#!" className="secondary-content"><i className="material-icons">send</i></a></div></li>
                                    <li className="collection-item"><div>Alvin<a href="#!" className="secondary-content"><i className="material-icons">send</i></a></div></li>
                                    <li className="collection-item"><div>Alvin<a href="#!" className="secondary-content"><i className="material-icons">send</i></a></div></li>
                                </ul>
                            </TabPanel>
                            <TabPanel title="Notificaties">
                                <h5>Notificaties</h5>
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
            </div>
        )
    }
})

export default Settings
