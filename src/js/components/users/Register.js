import React from 'react'

import Auth from '../../auth/AuthService'
import Avatar from './Avatar'
import MaterialInput from '../partials/MaterialInput'
import { Grid, Cell } from '../grid/Grid'

var Register = React.createClass({
    getInitialState() {
        return {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            passwordRepeat: '',
            error: false,
            loading: false,
            registerButton: 'Ga Verder',
            emailIsValid: false,
            firstNameIsValid: false,
            lastNameIsValid: false,
            passwordIsValid: false,
            passwordRepeatIsValid: false
        }
    },
    register(event) {
        event.preventDefault()

        let { email, first_name, last_name, password, passwordRepeat } = this.state

        let user = {
            email, first_name, last_name, password, passwordRepeat
        }
        this.setState({
            registerButton: 'Bezig met registreren...',
            loading: true
        })

        Auth.register(user, (res, err) => {
            if (err) {
                this.setState({
                    registerButton: 'Uh Oh, er ging wat mis...',
                    error: true,
                    loading: false,
                    email: '',
                    first_name: '',
                    last_name: '',
                    password: '',
                    passwordRepeat: ''
                })

                setTimeout(() => {
                    this.setState({
                        registerButton: 'Ga Verder',
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
    setFirstName(event) {
        this.setState({
            first_name: event.target.value
        })
    },
    setLastName(event) {
        this.setState({
            last_name: event.target.value
        })
    },
    setPassword(event) {
        this.setState({
            password: event.target.value
        })
    },
    setPasswordRepeat(event) {
        this.setState({
            passwordRepeat: event.target.value
        })
    },
    validateEmail(result) {
        this.setState({
            emailIsValid: result
        })
    },
    validateFirstName(result) {
        this.setState({
            firstNameIsValid: result
        })
    },
    validateLastName(result) {
        this.setState({
            lastNameIsValid: result
        })
    },
    validatePassword(result) {
        this.setState({
            passwordIsValid: result
        })
    },
    validatePasswordRepeat(result) {
        this.setState({
            passwordRepeatIsValid: result
        })
    },
    render() {
        let { loading, registerButton, emailIsValid, firstNameIsValid, lastNameIsValid, passwordIsValid, passwordRepeatIsValid } = this.state

        let iconClass = `material-icons right ${this.state.loading ? 'icon-spin' : ''}`

        let isValid = emailIsValid && firstNameIsValid && lastNameIsValid && passwordIsValid && passwordRepeatIsValid

        return (
            <div>
                <form onSubmit={this.register}>
                    <Grid>
                        <Cell>
                            <MaterialInput
                                onValidate={this.validateEmail}
                                rules={['required', 'email', 'endsWith:@ugent.be:@student.hogent.be']}
                                label="E-mail"
                                type="email"
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.setEmail}
                            />
                        </Cell>
                        <Cell width={6/12}>
                            <MaterialInput
                                onValidate={this.validateFirstName}
                                rules={['required']}
                                label="Voornaam"
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={this.state.first_name}
                                onChange={this.setFirstName}
                            />
                        </Cell>
                        <Cell width={6/12}>
                            <MaterialInput
                                onValidate={this.validateLastName}
                                rules={['required']}
                                label="Achternaam"
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={this.state.last_name}
                                onChange={this.setLastName}
                            />
                        </Cell>
                        <Cell>
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
                        </Cell>
                        <Cell>
                            <MaterialInput
                                onValidate={this.validatePasswordRepeat}
                                rules={['required']}
                                label="Herhaal Wachtwoord"
                                type="password"
                                id="password_repeat"
                                name="password_repeat"
                                value={this.state.passwordRepeat}
                                onChange={this.setPasswordRepeat}
                            />

                        </Cell>
                    </Grid>

                    <div className="right-align">
                        <button disabled={ ! isValid} className={`btn btn-large waves-effect waves-light ${this.state.error ? 'red' : ''}`} type="submit" name="action">
                            <i className={iconClass}>{loading ? 'loop' : 'send'}</i>{registerButton}
                        </button>
                    </div>
                </form>
            </div>
        )
    }
})

export default Register
