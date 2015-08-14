import React, { PropTypes } from 'react'

import AddShout from '../pages/shout/AddShout'
import API from '../../services/API'
import InfoPanel from '../partials/InfoPanel'
import LoadingShouts from '../loading/LoadingShouts'
import Notification from '../notification/NotificationActions'
import Shout from './Shout'
import WebStorage from '../../services/WebStorage'
import { Button } from '../button/MaterialButton'

let ShoutFeed = React.createClass({
    propTypes: {
        url: PropTypes.string.isRequired,
        groupId: PropTypes.string,
        canShout: PropTypes.bool,
    },
    getInitialState() {
        return {
            shouts: WebStorage.fromStore(`shouts.${this.props.url}`, []),
            paginationData: {},
            loading: true
        }
    },
    getDefaultProps() {
        return {
            canShout: false,
            groupId: ''
        }
    },
    componentWillMount() {
        this.fetch({}, (shouts) => {
            if (this.isMounted()) {
                this.setState({ shouts })
            }
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

        this.fetch({ page: nextPage }, shouts => listShouts.concat(shouts))

        this.setState({ shouts: listShouts })
    },
    hideShout(shout, force) {
        if (force || this.props.url == "shouts") {
            let shouts = this.state.shouts

            shouts.splice(shouts.indexOf(shout), 1)

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
        }, (updatedShout) => {
            var shouts = this.state.shouts
            shouts.map((item, key) => {
                if (item.id == shout.id) {
                    shouts[key] = updatedShout
                }
            })

            this.setState({ shouts })

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
    prependShout(shout) {
        let shouts = this.state.shouts
        shouts.unshift(shout)
        this.setState({ shouts })
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
    toggleFavorite(shout) {
        let url = `shouts/${shout.id}/${shout.meta.favorited_by_me ? 'unfavorite' : 'favorite'}`

        API.post(url, {}, (updatedShout, err) => {
            var shouts = this.state.shouts
            shouts[shouts.indexOf(shout)] = updatedShout
            this.setState({ shouts })
        })
    },
    render() {
        let { loading, shouts, paginationData } = this.state
        let { canShout, groupId } = this.props

        let { next_page_url } = paginationData

        let noShouts = ! loading && shouts.length <= 0

        return (
            <div>
                {canShout && <AddShout groupId={groupId} onDone={this.prependShout}/>}
                {shouts.map((shout) =>
                    <Shout
                        key={shout.id}
                        shout={shout}
                        onHide={this.hideShout}
                        onEdit={this.editShout}
                        onReport={this.reportShout}
                        onDelete={this.deleteShout}
                        onToggleFavorite={this.toggleFavorite}
                    />
                )}
                {loading ? <LoadingShouts /> : ''}
                {noShouts ? (
                    <InfoPanel>
                        <h4>Wees de eerste om hier een shout te plaatsen!</h4>
                    </InfoPanel>
                ): ''}
                {next_page_url ? (
                    <Button className="btn-large" onClick={this.loadMore}>Meer Tonen</Button>
                ) : ''}
            </div>
        )
    }
})

export default ShoutFeed

