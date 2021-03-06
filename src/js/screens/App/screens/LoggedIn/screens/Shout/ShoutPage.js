import React from 'react'

import API from 'API'
import LoadingShouts from 'LoadingShouts'
import Notification from 'NotificationActions'
import Shout from 'Shout'
import WebStorage from 'WebStorage'
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

    },
    deleteShout(shout) {

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
        let id = shout.id
        let type = shout.meta.favorited_by_me ? 'unfavorite' : 'favorite'

        API.post(`shouts/${id}/${type}`)
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
