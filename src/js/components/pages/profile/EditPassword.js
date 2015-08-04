import React from 'react'

import API from '../../../services/API'
import LoginActions from '../../../auth/LoginActions'
import MaterialInput from '../../partials/MaterialInput'
import Notification from '../../notification/NotificationActions'
import { Card, CardContent, CardTitle, CardFooter } from '../../card/Card'
import { Grid, Cell } from '../../grid/Grid'

var EditPassword = React.createClass({
    getInitialState() {
        return {
            password: '',
            password_confirmation: '',
            passwordIsValid: true,
            passwordRepeatIsValid: true
        }
    },
    changePassword(event) {
        this.setState({
            password: event.target.value
        })
    },
    changePasswordConfirmation(event) {
        this.setState({
            password_confirmation: event.target.value
        })
    },
    edit(event) {
        event.preventDefault()

        let { password, password_confirmation } = this.state

        API.post('users/me/changePassword', { password, password_confirmation }, (data) => {
            Notification.success('Je wachtwoor werd gewijzigd!')
        })
    },
    validPassword(result) {
        this.setState({
            passwordIsValid: result
        })
    },
    validPasswordConfirmation(result) {
        this.setState({
            passwordConfirmationIsValid: result
        })
    },
    render() {
        let { passwordIsValid, passwordConfirmationIsValid, password, password_confirmation } = this.state
        let passwordEquals = password == password_confirmation
        let isValid = passwordIsValid && passwordConfirmationIsValid && passwordEquals

        return (
            <div>
                <form onSubmit={this.edit}>
                    <Card>
                        <CardContent>
                            <CardTitle>Wachtwoord Wijzigen</CardTitle>
                            <Grid>
                                <Cell width={6/12}>
                                    <MaterialInput
                                        onValidate={this.validPassword}
                                        rules={['required']}
                                        label="Wachtwoord"
                                        name="password"
                                        id="password"
                                        onChange={this.changePassword}
                                        type="password"
                                    />
                                </Cell>
                                <Cell width={6/12}>
                                    <MaterialInput
                                        onValidate={this.validPasswordConfirmation}
                                        rules={['required']}
                                        label="Wachtwoord Herhalen"
                                        name="password_confirmation"
                                        id="password_confirmation"
                                        onChange={this.changePasswordConfirmation}
                                        type="password"
                                    />
                                </Cell>
                                <cell>
                                { ! passwordEquals ? (
                                    <span style={{color: "#F44336", fontSize:12}}>De wachtwoorden komen niet overeen</span>
                                ): ''}
                                </cell>
                            </Grid>
                        </CardContent>
                        <CardFooter>
                            <button style={{float: 'right', marginTop: -8}} disabled={ ! isValid} className="waves-effect waves-green btn">Wijzigen</button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        )
    }
})

export default EditPassword
