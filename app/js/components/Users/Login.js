import React from 'react'
import UserActions from '../../actions/UserActions'
import Avatar from './Avatar'
import AuthenticatedRoute from '../../mixins/AuthenticatedRoute'
import MaterialInput from '../partials/MaterialInput'

var Login = React.createClass({
    getInitialState() {
        return {
            email: '',
            password: ''
        }
    },
    login(event) {
        event.preventDefault()

        var user = this.state

        UserActions.login(user)
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
    render() {
        return (
            <div className="container">
                <div className="section">
                    <h1>Log in</h1>
                    <form onSubmit={this.login}>
                        <MaterialInput label="E-mail" type="email" id="email" name="email" value={this.state.email} onChange={this.setEmail}/>
                        <MaterialInput label="Wachtwoord" type="password" id="password" name="password" value={this.state.password} onChange={this.setPassword}/>

                        <div className="right-align">
                            <button className="btn btn-large waves-effect waves-light" type="submit" name="action">
                                <i className="material-icons right">lock</i>Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
})

export default Login
