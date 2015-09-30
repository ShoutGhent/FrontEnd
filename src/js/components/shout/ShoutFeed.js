import React, { PropTypes } from 'react'

import AddShout from '../pages/shout/AddShout'
import API from '../../services/API'
import InfoPanel from '../partials/InfoPanel'
import LoadingShouts from '../loading/LoadingShouts'
import Notification from '../notification/NotificationActions'
import Shout from './Shout'
import WebStorage from '../../services/WebStorage'
import { Button } from '../button/MaterialButton'
import { Card, CardContent } from '../card/Card'

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

        this.setState({ loading: true })

        API.get(url, data, (response) => {
            this.setPaginationData(response)

            if (cb) {
                cb(response.data)
            }

            this.setState({ loading: false })
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
            Notification.success("Shout is bewerkt!")
        })

        var shouts = this.state.shouts
        shouts.map((item, key) => {
            if (item.id == shout.id) {
                shouts[key] = shout
            }
        })

        this.setState({ shouts })
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
    updateShout(oldShout) {
        let { shouts } = this.state

        API.get(`shouts/${oldShout.id}`, {}, (data, err) => {
            shouts = shouts.map((item, key) => {
                if (item.id == oldShout.id) {
                   return data
                } else {
                    return item
                }
            })

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
                {canShout && (
                    <Card>
                        <CardContent>
                            <AddShout
                                groupId={groupId}
                                onDone={this.prependShout}
                            />
                        </CardContent>
                    </Card>
                )}

                {shouts.map(shout => {
                    return (
                        <Shout
                            key={shout.id}
                            onDelete={this.deleteShout}
                            onEdit={this.editShout}
                            onHide={this.hideShout}
                            onReport={this.reportShout}
                            onToggleFavorite={this.toggleFavorite}
                            shout={shout}
                            updateShout={this.updateShout}
                        />
                    )
                })}

                {loading && (
                    <LoadingShouts />
                )}

                {noShouts && (
                    <InfoPanel>
                        <h4>Wees de eerste om hier een shout te plaatsen!</h4>
                    </InfoPanel>
                )}

                {next_page_url && (
                    <Button onClick={this.loadMore} large full>Meer Tonen</Button>
                )}
            </div>
        )
    }
})

export default ShoutFeed

