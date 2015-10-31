import React, { PropTypes } from 'react'

import AddShout from 'AddShout'
import API from 'API'
import assign from 'react/lib/Object.assign'
import InfoPanel from 'InfoPanel'
import LoadingShouts from 'LoadingShouts'
import Notification from 'NotificationActions'
import Shout from './Shout'
import WebStorage from 'WebStorage'
import { Button } from 'forms/material/Material'
import { Card, CardContent } from 'Card'
import { io } from 'Socket'

let ShoutFeed = React.createClass({
    propTypes: {
        url: PropTypes.string.isRequired,
        groupId: PropTypes.string,
        canShout: PropTypes.bool,
        location: PropTypes.object
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
            groupId: '',
            location: {}
        }
    },
    componentWillReceiveProps(nextProps) {
        if ((this.props.location.latitude != nextProps.location.latitude) || ((this.props.location.longitude != nextProps.location.longitude))) {
            this.fetchBasedOnLocation(nextProps.location)
        }
    },
    componentWillMount() {
        this.fetchBasedOnLocation(this.props.location)
    },
    componentDidMount() {
        let channelKey = `shoutfeed.${this.props.url}`

        io.join(channelKey, {
            BroadcastShoutWasAdded: data => this.prependShout(data.shout),
            BroadcastShoutLocationHasBeenAdded: data => API.get(`shouts/${data.id}`, {}, result => this.prependShout(result))
        })
    },
    giveShouts() {
        return this.state.shouts
    },
    fetchBasedOnLocation(location) {
        this.fetch(location, (shouts) => {
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

        let data = assign({},
            { page: nextPage },
            this.props.location
        )

        this.fetch(data, shouts => listShouts.concat(shouts))

        this.setState({ shouts: listShouts })
    },
    hideShout(shout, force) {
        if (force || this.props.url == "shouts") {
            let shouts = this.state.shouts

            shouts = shouts.filter(s => shout.id != s.id)

            this.setState({ shouts })
        }
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
                                updateShout={this.updateShout}
                            />
                        </CardContent>
                    </Card>
                )}

                {shouts.map(shout => {
                    return (
                        <Shout
                            key={shout.id}
                            onHide={this.hideShout}
                            shout={shout}
                        />
                    )
                })}

                {loading && (
                    <LoadingShouts />
                )}

                {next_page_url && (
                    <Button onClick={this.loadMore} large full>Meer Tonen</Button>
                )}
            </div>
        )
    }
})

export default ShoutFeed

