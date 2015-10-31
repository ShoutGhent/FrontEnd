import React from 'react'

import API from 'API'
import LoginActions from 'LoginActions'
import Notification from 'NotificationActions'
import { Button, Input } from 'forms/material/Material'
import { Card, CardContent, CardTitle, CardFooter } from 'Card'
import { Grid, Cell } from 'Grid'

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
            Notification.success('Je wachtwoord werd gewijzigd!')
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
                                    <Input
                                        id="password"
                                        label="Wachtwoord"
                                        name="password"
                                        onChange={this.changePassword}
                                        onValidate={this.validPassword}
                                        rules={['required']}
                                        type="password"
                                        value={password}
                                    />
                                </Cell>
                                <Cell width={6/12}>
                                    <Input
                                        id="password_confirmation"
                                        label="Wachtwoord Herhalen"
                                        name="password_confirmation"
                                        onChange={this.changePasswordConfirmation}
                                        onValidate={this.validPasswordConfirmation}
                                        rules={['required']}
                                        type="password"
                                        value={password_confirmation}
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
                            <Button disabled={ ! isValid} right>Wijzigen</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        )
    }
})

export default EditPassword
