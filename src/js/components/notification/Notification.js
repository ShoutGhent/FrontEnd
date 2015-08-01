import React from 'react'
import NotificationSystem from 'react-notification-system'
import NotificationStore from './NotificationStore'
import NotificationActions from './NotificationActions'

var Notification = React.createClass({
    componentDidMount() {
        NotificationStore.listen(this._onChange)
    },
    componentWillUnmount() {
        NotificationStore.unlisten(this._onChange)
    },
    _onChange(state) {
        let { notificationSystem } = this.refs

        notificationSystem.addNotification(
            state.notification
        )
    },
    render() {
        return (
            <NotificationSystem ref="notificationSystem" />
        )
    }
})

export default Notification
