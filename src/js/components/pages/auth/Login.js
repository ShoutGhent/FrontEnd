import React from 'react'
import LoginForm from '../../users/Login'

var Login = React.createClass({
    render() {
        return (
            <div className="container">
                <div className="section">
                    <LoginForm />
                </div>
            </div>
        )
    }
})

export default Login
