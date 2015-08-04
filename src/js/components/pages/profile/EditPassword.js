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
            password_repeat: '',
            passwordIsValid: true,
            passwordRepeatIsValid: true
        }
    },
    changePassword(event) {
        this.setState({
            password: event.target.value
        })
    },
    changePasswordRepeat(event) {
        this.setState({
            password_repeat: event.target.value
        })
    },
    edit(event) {
        event.preventDefault()

        let { password, password_repeat } = this.state

        API.post('users/me/changePassword', { password, password_repeat }, (data) => {
            Notification.success('Je wachtwoor werd gewijzigd!')
        })
    },
    validPassword(result) {
        this.setState({
            passwordIsValid: result
        })
    },
    validPasswordRepeat(result) {
        this.setState({
            passwordRepeatIsValid: result
        })
    },
    render() {
        let { passwordIsValid, passwordRepeatIsValid, password, password_repeat } = this.state
        let passwordEquals = password == password_repeat
        let isValid = passwordIsValid && passwordRepeatIsValid && passwordEquals

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
                                        onValidate={this.validPasswordRepeat}
                                        rules={['required']}
                                        label="Wachtwoord Herhalen"
                                        name="password_repeat"
                                        id="password_repeat"
                                        onChange={this.changePasswordRepeat}
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
