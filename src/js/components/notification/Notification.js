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
    _onChange(e) {
        this.refs.notificationSystem.addNotification(
            e.notification
        )
    },
    render() {
        return (
            <NotificationSystem ref="notificationSystem" />
        )
    }
})

export default Notification
