import React from 'react'

import API from '../../services/API'
import LoadingShouts from '../loading/LoadingShouts'
import Notification from '../notification/NotificationActions'
import Shout from './Shout'
import WebStorage from '../../services/WebStorage'

let ShoutFeed = React.createClass({
    propTypes: {
        url: React.PropTypes.string.isRequired
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
    hideShout(shout) {
        if (this.props.url == "shouts") {
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
                    />
                )}
                {loading ? <LoadingShouts /> : ''}
                {next_page_url ? (
                    <button className="btn-large" onClick={this.loadMore}>Meer Tonen</button>
                ) : ''}
            </div>
        )
    }
})

export default ShoutFeed

