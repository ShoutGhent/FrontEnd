import React, { PropTypes } from 'react'

import LogActions from './LogActions'
import LogStore from './LogStore'
import Avatar from '../users/Avatar'

var Log = React.createClass({
    getInitialState() {
        return LogStore.getState()
    },
    componentDidMount() {
        LogActions.fetch()
        LogStore.listen(this._onChange)
    },
    componentWillUnmount() {
        LogStore.unlisten(this._onChange)
    },
    _onChange(state) {
        this.setState(state)
    },
    render() {
        console.log(this.state.notifications)

        return (
            <div style={{width: 400}}>
                {this.state.notifications.map(notification => (
                    <li key={notification.id}>
                        <a href={notification.link}>
                            <Avatar
                                email={notification.from.email}
                                size={25}
                                round={true}
                            /> <strong>{notification.from.first_name}</strong> {notification.title}
                        </a>
                    </li>
                ))}
            </div>
        )
    }
})

//<li className="divider"></li>
//<li><a href="#!">Alle logs weergeven</a></li>

export default Log
