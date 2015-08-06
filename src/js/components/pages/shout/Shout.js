import React from 'react'

import API from '../../../services/API'
import LoadingShouts from '../../loading/LoadingShouts'
import Notification from '../../notification/NotificationActions'
import Shout from '../../shout/Shout'
import WebStorage from '../../../services/WebStorage'
import { Link } from 'react-router'

let ShoutPage = React.createClass({
    getInitialState() {
        return {
            shout: null,
            loading: true
        }
    },
    componentDidMount() {
        let { shoutId } = this.props.params

        API.get(`shouts/${shoutId}`, {}, (shout, err) => {
            if ( ! err) {
                if (this.isMounted()) {
                    let loading = false
                    this.setState({ shout, loading })
                }
            }
        })
    },
    hideShout() {
        if (this.state.shout.user.id != WebStorage.fromStore('user', { user: { id: null }}).id) {
            let shout = null

            this.setState({ shout })
        }
    },
    editShout(shout) {
        API.put(`shouts/${shout.id}`, {
            shout_id: shout.id,
            user_id: shout.user_id,
            description: shout.description,
            anonymous: shout.anonymous,
            publish_until: shout.publish_until
        }, (data) => {
            Notification.success("Shout is bewerkt!")
        })
    },
    deleteShout(shout) {
        API.del(`shouts/${shout.id}`, {}, (data) => {
            this.setState({
                shout: null
            })
            Notification.success("Shout is verwijdert!")
        })
    },
    reportShout(data) {
        let payload = {
            shout_id: this.state.shout.id,
            reason: data.reason
        }
        API.post('shouts/report', payload, (response) => {
            Notification.success("Shout werd gerapporteerd!")
        })
    },
    render() {
        let { shout, loading } = this.state

        return (
            <div className="container">
            {loading ? (
                <LoadingShouts />
            ) : (
                shout ? (
                    <Shout
                        user={shout.user || WebStorage.fromStore('user')}
                        key={shout.id}
                        shout={shout}
                        onHide={this.hideShout}
                        onEdit={this.editShout}
                        onReport={this.reportShout}
                        onDelete={this.deleteShout}
                    />
                ) : (
                    <div>
                        <h3>Shout bestaat niet meer...</h3>
                        <Link to="home" className="btn btn-large">Ga Terug</Link>
                    </div>
                )
            )}
            </div>
        )
    }
})

export default ShoutPage
