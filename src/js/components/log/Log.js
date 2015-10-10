import React, { PropTypes } from 'react'

import Avatar from '../users/Avatar'
import Loading from '../loading/Loading'
import LogActions from './LogActions'
import LogStore from './LogStore'

var Log = React.createClass({
    getInitialState() {
        return LogStore.getState()
    },
    componentDidMount() {
        LogActions.fetch((err, res) => this.scrollToTop())
        LogStore.listen(this._onChange)

        if (this.isMounted()) {
            let node = React.findDOMNode(this.refs.notifications)

            node.addEventListener('scroll', this._checkScrolling)
        }
    },
    componentWillUnmount() {
        LogStore.unlisten(this._onChange)

        let node = React.findDOMNode(this.refs.notifications)
        node.removeEventListener('scroll', this._checkScrolling)
    },
    _onChange(state) {
        this.setState(state)
    },
    scrollToTop() {
        React.findDOMNode(this.refs.notifications).scrollTop = 0
    },
    markAsSeen(event, notification) {
        LogActions.markAsSeen(notification)
    },
    _checkScrolling(e) {
        if (e.target.scrollHeight == e.target.scrollTop + e.target.offsetHeight + 10) {
            this.loadMore()
        }
    },
    loadMore() {
        LogActions.loadMore(this.state.next_page_url)
    },
    render() {
        return (
            <ul style={{width: 400}} className="notifications" ref="notifications">
                {this.state.notifications.map(notification => (
                    <li
                        onMouseOver={(e) => this.markAsSeen(e, notification)}
                        key={notification.id}
                        className={`${notification.seen ? 'seen' : 'unseen'}`}
                    >
                        <a href={notification.link}>
                            <Avatar
                                email={notification.from.email}
                                size={25}
                                round={true}
                            /> <strong>{notification.from.first_name}</strong> {notification.title}
                        </a>
                    </li>
                ))}
                {this.state.loading && (
                    <li key="loading"><Loading/></li>
                )}
            </ul>
        )
    }
})

export default Log
