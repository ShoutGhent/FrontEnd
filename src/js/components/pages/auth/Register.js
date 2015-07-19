import React from 'react'
import RegisterForm from '../../users/Register'

var Register = React.createClass({
    render() {
        return (
            <div className="container">
                <div className="section">
                    <RegisterForm />
                </div>
            </div>
        )
    }
})

export default Register
