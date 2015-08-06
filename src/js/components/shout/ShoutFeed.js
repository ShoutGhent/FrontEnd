import React, { PropTypes } from 'react'

import API from '../../services/API'
import InfoPanel from '../partials/InfoPanel'
import LoadingShouts from '../loading/LoadingShouts'
import Notification from '../notification/NotificationActions'
import Shout from './Shout'
import WebStorage from '../../services/WebStorage'

let ShoutFeed = React.createClass({
    propTypes: {
        url: PropTypes.string.isRequired
    },
    getInitialState() {
        return {
            shouts: WebStorage.fromStore(`shouts.${this.props.url}`, []),
            paginationData: {},
            loading: true
        }
    },
    componentWillMount() {
        this.fetch({}, (shouts) => {
            this.setState({ shouts })
        })
    },
    componentWillUnmount() {
        this.cacheShouts()
    },
    refreshList() {
        this.fetch({}, (shouts) => {
            this.setState({ shouts })
        })
    },
    cacheShouts() {
        let key = `shouts.${this.props.url}`
        WebStorage.toStore(key, this.state.shouts)

        let cachedUrls = WebStorage.fromStore('cachedShoutUrls', [])
        if (cachedUrls.indexOf(key) == -1) {
            cachedUrls.push(key)
            WebStorage.toStore('cachedShoutUrls', cachedUrls)
        }
    },
    fetch(data, cb) {
        let { url } = this.props

        this.setState({
            loading: true
        })

        API.get(url, data, (response) => {
            this.setPaginationData(response)

            if (cb) {
                cb(response.data)
            }

            this.setState({
                loading: false
            })
        })
    },
    loadMore() {
        let currentPage = this.state.paginationData.current_page
        let nextPage = currentPage + 1
        let listShouts = this.state.shouts

        this.fetch({ page: nextPage }, (shouts) => {
            shouts.forEach((shout) => {
                listShouts.push(shout)
            })
        })

        this.setState({ shouts: listShouts })
    },
    hideShout(shout, force) {
        if (force || this.props.url == "shouts") {
            let shouts = this.state.shouts

            shouts.map((item, key) => {
                if (item.id == shout.id) {
                    shouts.splice(key, 1)
                }
            })

            this.setState({ shouts })
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
            this.hideShout(shout, true)
            Notification.success("Shout is verwijdert!")
        })
    },
    reportShout(data) {
        API.post('shouts/report', data, (response) => {
            Notification.success("Shout werd gerapporteerd!")
        })
    },
    setPaginationData(response) {
        let { total, per_page, current_page, last_page, next_page_url, prev_page_url } = response

        this.setState({
            paginationData: {
                total,
                per_page,
                current_page,
                next_page_url,
                prev_page_url,
                last_page
            }
        })
    },
    render() {
        let { loading, shouts, paginationData } = this.state

        let { next_page_url } = paginationData

        let noShouts = ! loading && shouts.length <= 0

        return (
            <div>
                {shouts.map((shout) =>
                    <Shout
                        user={shout.user || WebStorage.fromStore('user') }
                        key={shout.id}
                        shout={shout}
                        onHide={this.hideShout}
                        onEdit={this.editShout}
                        onReport={this.reportShout}
                        onDelete={this.deleteShout}
                    />
                )}
                {loading ? <LoadingShouts /> : ''}
                {noShouts ? (
                    <InfoPanel>
                        <h4>Wees de eerste om hier een shout te plaatsen!</h4>
                    </InfoPanel>
                ): ''}
                {next_page_url ? (
                    <button className="btn-large" onClick={this.loadMore}>Meer Tonen</button>
                ) : ''}
            </div>
        )
    }
})

export default ShoutFeed

