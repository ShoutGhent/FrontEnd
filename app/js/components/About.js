import React from 'react'
import UserActions from '../Users/UserActions'
import UserStore from '../Users/UserStore'

function getStateFromStores() {
    return UserStore.getState()
}

var About = React.createClass({
    getInitialState() {
        return getStateFromStores()
    },
    componentDidMount() {
        UserStore.listen(this._onChange)
    },
    componentWillUnmount() {
        UserStore.unlisten(this._onChange)
    },
    _onChange() {
        this.setState(getStateFromStores())
    },
    login() {
        var user = {name: 'Robin Malfait'}
        UserActions.login(user)
    },
    render() {
        return (
            <div>
                <h1>About {this.state.currentUser.name}</h1>
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
})

export default About
