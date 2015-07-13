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
            passwordRepeat: ''
        }
    },
    register(event) {
        event.preventDefault()

        var user = this.state

        Auth.register(user)
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
        return (
            <div className="container">
                <div className="section">
                    <h1>Registreren</h1>
                    <form onSubmit={this.register}>
                        <MaterialInput label="E-mail" type="email" id="email" name="email" value={this.state.email} onChange={this.setEmail} focus/>
                        <MaterialInput label="Naam" type="text" id="name" name="name" value={this.state.name} onChange={this.setName}/>
                        <MaterialInput label="Wachtwoord" type="password" id="password" name="password" value={this.state.password} onChange={this.setPassword}/>
                        <MaterialInput label="Herhaal Wachtwoord" type="password" id="password_repeat" name="password_repeat" value={this.state.passwordRepeat} onChange={this.setPasswordRepeat}/>

                        <div className="right-align">
                            <button className="btn btn-large waves-effect waves-light" type="submit" name="action">
                                <i className="material-icons right">send</i>Ga Verder
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
})

export default Register
