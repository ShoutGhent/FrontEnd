import React from 'react'
import Shout from '../../shout/Shout'
import API from '../../../services/API'
import { Link } from 'react-router'
import WebStorage from '../../../services/WebStorage'
import LoadingShouts from '../../loading/LoadingShouts'
import Notification from '../../notification/NotificationActions'

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
        if (this.state.shout.user.uuid != WebStorage.fromStore('user', { user: { uuid: null }}).uuid) {
            let shout = null

            this.setState({ shout })
        }
    },
    editShout(shout) {
        API.put(`shouts/${shout.uuid}`, {
            shout_id: shout.uuid,
            user_id: shout.user_id,
            description: shout.description,
            anonymous: shout.anonymous,
            publish_until: shout.publish_until
        }, (data) => {
            Notification.success("Shout is bewerkt!")
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
                        key={shout.uuid}
                        shout={shout}
                        onHide={this.hideShout}
                        onEdit={this.editShout}
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
