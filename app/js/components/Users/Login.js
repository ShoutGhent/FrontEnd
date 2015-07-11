import React from 'react'
import UserActions from '../../actions/UserActions'
import Avatar from './Avatar'
import AuthenticatedRoute from '../../mixins/AuthenticatedRoute'

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
                    <h1 className="teal-text">Log in</h1>
                    <form onSubmit={this.login}>
                        <input type="email" id="email" name="email" placeholder="E-mail" value={this.state.email} onChange={this.setEmail} />
                        <input type="password" id="password" name="password" placeholder="Wachtwoord" value={this.state.password} onChange={this.setPassword} />

                        <div className="right-align">
                            <button className="btn waves-effect waves-light" type="submit" name="action">
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
