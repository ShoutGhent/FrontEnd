import React, { PropTypes } from 'react'

import Avatar from 'components/Avatar'
import Icon from 'Icon'
import Loading from 'Loading'
import LogActions from 'LogActions'
import LogStore from 'LogStore'
import Redirect from 'Redirect'
import { Button } from 'forms/material/Material'

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
    _checkScrolling(e) {
        if (e.target.scrollHeight == e.target.scrollTop + e.target.offsetHeight + 10) {
            this.loadMore()
        }
    },
    loadMore() {
        LogActions.loadMore(this.state.next_page_url)
    },
    goto(notification, evt) {
        evt.preventDefault()

        Redirect.to('shout', {
            shoutId: notification.notification_id
        })
    },
    render() {
        return (
            <ul className="notifications" ref="notifications">
                {this.state.notifications.map(notification => (
                    <li
                        key={notification.id}
                        className={`${notification.seen ? 'seen' : 'unseen'}`}
                    >
                        <a href="#" onClick={(e) => this.goto(notification, e)}>
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

//<Button padding="0" right flat>
//  <Icon icon="remove_red_eye"/>
//</Button>

export default Log
