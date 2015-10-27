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
    componentWillReceiveProps() {
        this.fetch()
    },
    componentDidMount() {
        this.fetch()
    },
    fetch() {
        let { shoutId } = this.props.params

        if (this.isMounted()) {
            API.get(`shouts/${shoutId}`, {}, (shout, err) => {
                if ( ! err) {

                    let loading = false
                    this.setState({ shout, loading })

                } else {
                    this.setState({ shout: null, loading: false })
                }
            })
        }
    },
    hideShout(shout, force) {
        if (force || this.state.shout.user.id != WebStorage.fromStore('user', { id: null }).id) {
            let shout = null

            this.setState({ shout })
        }
    },
    editShout(shout) {
        API.put(`shouts/${shout.id}`, {
            anonymous: shout.anonymous,
            description: shout.description,
            publish_until: shout.publish_until,
            shout_id: shout.id,
            user_id: shout.user_id,
        }, (updatedShout) => {
            Notification.success("Shout is bewerkt!")
        })

        this.setState({ shout })
    },
    deleteShout(shout) {
        API.del(`shouts/${shout.id}`, {}, (data) => {
            this.setState({
                shout: null
            })
            Notification.success("Shout is verwijderd!")
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
    toggleFavorite(shout) {
        let url = `shouts/${shout.id}/${shout.meta.favorited_by_me ? 'unfavorite' : 'favorite'}`

        API.post(url, {}, (shout, err) => this.setState({ shout }))
    },
    updateShout(oldShout) {
        API.get(`shouts/${oldShout.id}`, {}, (shout, err) => {
            this.setState({ shout })
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
                        key={shout.id}
                        onDelete={this.deleteShout}
                        onEdit={this.editShout}
                        onHide={this.hideShout}
                        onReport={this.reportShout}
                        onToggleFavorite={this.toggleFavorite}
                        openComments={true}
                        shout={shout}
                        updateShout={this.updateShout}
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
