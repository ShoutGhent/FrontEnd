import React from 'react'
import NotificationSystem from 'react-notification-system'
import NotificationStore from './NotificationStore'
import NotificationActions from './NotificationActions'
import { addons } from 'react/addons'
var { PureRenderMixin } = addons

var Notification = React.createClass({
    mixins: [PureRenderMixin],
    componentDidMount() {
        NotificationStore.listen(this._onChange)
    },
    componentWillUnmount() {
        NotificationStore.unlisten(this._onChange)
    },
    _onChange(e) {
        this.refs.notificationSystem.addNotification(e.notification)
    },
    render() {
        return (
            <NotificationSystem ref="notificationSystem" />
        )
    }
})

export default Notification
