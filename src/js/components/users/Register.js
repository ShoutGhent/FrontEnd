import React from 'react'

import Auth from '../../auth/AuthService'
import Avatar from './Avatar'
import MaterialInput from '../partials/MaterialInput'

var Register = React.createClass({
    getInitialState() {
        return {
            email: '',
            name: '',
            password: '',
            passwordRepeat: '',
            error: false,
            loading: false,
            registerButton: 'Ga Verder',
            emailIsValid: false,
            nameIsValid: false,
            passwordIsValid: false,
            passwordRepeatIsValid: false
        }
    },
    register(event) {
        event.preventDefault()

        var user = this.state
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
                    name: '',
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
    setName(event) {
        this.setState({
            name: event.target.value
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
    validateName(result) {
        this.setState({
            nameIsValid: result
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
        let { loading, registerButton, emailIsValid, nameIsValid, passwordIsValid, passwordRepeatIsValid } = this.state

        let iconClass = `material-icons right ${this.state.loading ? 'icon-spin' : ''}`

        let isValid = emailIsValid && nameIsValid && passwordIsValid && passwordRepeatIsValid

        return (
            <div>
                <form onSubmit={this.register}>
                    <MaterialInput onValidate={this.validateEmail} validate rules={['required', 'email']} label="E-mail" type="email" id="email" name="email" value={this.state.email} onChange={this.setEmail}/>
                    <MaterialInput onValidate={this.validateName} validate rules={['required']} label="Naam" type="text" id="name" name="name" value={this.state.name} onChange={this.setName}/>
                    <MaterialInput onValidate={this.validatePassword} validate rules={['required']} label="Wachtwoord" type="password" id="password" name="password" value={this.state.password} onChange={this.setPassword}/>
                    <MaterialInput onValidate={this.validatePasswordRepeat} validate rules={['required']} label="Herhaal Wachtwoord" type="password" id="password_repeat" name="password_repeat" value={this.state.passwordRepeat} onChange={this.setPasswordRepeat}/>

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
