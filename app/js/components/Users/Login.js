import React from 'react'
import UserActions from '../../actions/UserActions'
import Avatar from './Avatar'

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
            <form onSubmit={this.login}>
                <Avatar email={this.state.email} />
                <input type="email" value={this.state.email} onChange={this.setEmail}/>
                <input type="password" value={this.state.password} onChange={this.setPassword}/>
                <button>Login</button>
            </form>
        )
    }
})

export default Login
