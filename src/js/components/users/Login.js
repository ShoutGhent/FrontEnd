import React from 'react'
import Auth from '../../auth/AuthService'
import Avatar from './Avatar'
import MaterialInput from '../partials/MaterialInput'
import { addons } from 'react/addons'
var { PureRenderMixin } = addons

var Login = React.createClass({
    mixins: [PureRenderMixin],
    getInitialState() {
        return {
            email: null,
            password: null,
            error: false,
            loading: false,
            loginButton: 'Log In'
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
    render() {
        let { loading, loginButton } = this.state

        let iconClass = `material-icons right ${this.state.loading ? 'icon-spin' : ''}`

        return (
            <div className="container">
                <div className="section">
                    <h1>Log in</h1>
                    <form onSubmit={this.login}>
                        <MaterialInput label="E-mail" type="email" id="email" name="email" value={this.state.email} onChange={this.setEmail} focus/>
                        <MaterialInput label="Wachtwoord" type="password" id="password" name="password" value={this.state.password} onChange={this.setPassword}/>

                        <div className="right-align">
                            <button className={`btn btn-large waves-effect waves-light ${this.state.error ? 'red' : ''}`} type="submit" name="action">
                                <i className={iconClass}>{loading ? 'loop' : 'lock'}</i>{loginButton}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
})

export default Login
