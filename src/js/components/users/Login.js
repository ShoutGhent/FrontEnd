import React from 'react'

import Auth from '../../auth/AuthService'
import MaterialInput from '../partials/MaterialInput'
import { Button } from '../button/MaterialButton'

var Login = React.createClass({
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
                    <MaterialInput
                        onValidate={this.validateEmail}
                        rules={['required', 'email']}
                        label="E-mail"
                        type="email"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.setEmail}
                    />

                    <MaterialInput
                        onValidate={this.validatePassword}
                        rules={['required']}
                        label="Wachtwoord"
                        type="password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.setPassword}
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

export default Login
