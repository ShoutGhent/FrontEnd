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
            registerButton: 'Ga Verder'
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
    render() {
        let { loading, registerButton } = this.state

        let iconClass = `material-icons right ${this.state.loading ? 'icon-spin' : ''}`

        return (
            <div className="container">
                <div className="section">
                    <h4>Registreren</h4>
                    <form onSubmit={this.register}>
                        <MaterialInput label="E-mail" type="email" id="email" name="email" value={this.state.email} onChange={this.setEmail} focus/>
                        <MaterialInput label="Naam" type="text" id="name" name="name" value={this.state.name} onChange={this.setName}/>
                        <MaterialInput label="Wachtwoord" type="password" id="password" name="password" value={this.state.password} onChange={this.setPassword}/>
                        <MaterialInput label="Herhaal Wachtwoord" type="password" id="password_repeat" name="password_repeat" value={this.state.passwordRepeat} onChange={this.setPasswordRepeat}/>

                        <div className="right-align">
                            <button className={`btn btn-large waves-effect waves-light ${this.state.error ? 'red' : ''}`} type="submit" name="action">
                                <i className={iconClass}>{loading ? 'loop' : 'send'}</i>{registerButton}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
})

export default Register
