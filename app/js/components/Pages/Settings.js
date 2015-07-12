import React from 'react'
import { Tab, TabPanel } from '../tab/Tab'
import MaterialInput from '../partials/MaterialInput'

var Settings = React.createClass({
    render() {
        return (
            <div>
                <div className="settings container">
                    <div className="section">
                        <Tab>
                            <TabPanel title="Persoonlijk">
                                <h5>Persoonlijk</h5>
                                <div className="row">
                                    <form className="col s12">
                                        <div className="row">
                                            <div className="input-field col m6 s12">
                                                <MaterialInput label="Voornaam" id="first_name" type="text" className="validate" />
                                            </div>
                                            <div className="input-field col m6 s12">
                                                <MaterialInput label="Achternaam" id="last_name" type="text" className="validate" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <MaterialInput label="Adres" id="address" type="text" className="validate" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <MaterialInput label="Email" id="email" type="email" className="validate" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </TabPanel>
                            <TabPanel title="Account">
                                <h5>Account</h5>
                                <div className="row">
                                    <form className="col s12">
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <MaterialInput label="Huidig wachtwoord" id="password1" type="password" className="validate" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <MaterialInput label="Nieuw wachtwoord" id="password2" type="password" className="validate" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <MaterialInput label="Wachtwoord herhalen" id="password3" type="password" className="validate" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
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
