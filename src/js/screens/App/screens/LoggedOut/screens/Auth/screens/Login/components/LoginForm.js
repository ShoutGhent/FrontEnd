import React from 'react'

import Auth from 'AuthService'
import { Button, Input } from 'forms/material/Material'

var LoginForm = React.createClass({
    getInitialState() {
        return {
            email: null,
            password: null,
            error: false,
            loading: false,
            loginButton: 'Log In',
            emailIsValid: false,
            passwordIsValid: false
        }
    },
    login(event) {
        event.preventDefault()

        var user = this.state
        this.setState({
            loginButton: 'Bezig met inloggen...',
            loading: true
        })

        Auth.login(user, (res, err) => {
            if (err) {
                this.setState({
                    loginButton: 'Uh Oh, foute gegevens...',
                    error: true,
                    loading: false,
                    password: null
                })

                setTimeout(() => {
                    this.setState({
                        loginButton: 'Log In',
                        error: false
                    })
                }, 2500)
            }
        })
    },
    setEmail(event) {
        this.setState({
            email: event.target.value
        })
    },
    setPassword(event) {
        this.setState({
            password: event.target.value
        })
    },
    validateEmail(result) {
        this.setState({ emailIsValid: result })
    },
    validatePassword(result) {
        this.setState({ passwordIsValid: result })
    },
    render() {
        let { loading, loginButton, emailIsValid, passwordIsValid } = this.state

        let iconClass = `material-icons right ${this.state.loading ? 'icon-spin' : ''}`

        let isValid = emailIsValid && passwordIsValid

        return (
            <div>
                <form onSubmit={this.login}>
                    <Input
                        id="email"
                        label="E-mail"
                        name="email"
                        onChange={this.setEmail}
                        onValidate={this.validateEmail}
                        rules={['required', 'email']}
                        type="email"
                        value={this.state.email}
                    />

                    <Input
                        id="password"
                        label="Wachtwoord"
                        name="password"
                        onChange={this.setPassword}
                        onValidate={this.validatePassword}
                        rules={['required']}
                        type="password"
                        value={this.state.password}
                    />

                    <div className="right-align">
                        <Button disabled={ ! isValid} className={this.state.error ? 'red' : ''} large>
                            <i className={iconClass}>{loading ? 'loop' : 'lock'}</i>{loginButton}
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
})

export default LoginForm
