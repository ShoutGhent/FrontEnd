import React, { PropTypes } from 'react'

import AddShout from '../../pages/shout/AddShout'
import GroupPreviewCard from '../../group/GroupPreviewCard'
import Icon from '../../partials/Icon'
import LoginActions from '../../../auth/LoginActions'
import LoginStore from '../../../auth/LoginStore'
import md5 from 'md5'
import MyGroupsActions from '../../group/MyGroupsActions'
import MyGroupsStore from '../../group/MyGroupsStore'
import MyLocationMarker from '../../map/MyLocationMarker'
import Notification from '../../notification/NotificationActions'
import ShoutFeed from '../../shout/ShoutFeed'
import WebStorage from '../../../services/WebStorage'
import { Button } from '../../Material/Material'
import { Card, CardContent, CardTitle } from '../../card/Card'
import { Map, Marker, LayerGroup, Popup, TileLayer } from 'react-leaflet'
import { Modal, ModalContent } from '../../modal/Modal'

var MapPage = React.createClass({
    statics: {
        willTransitionTo(transition) {
            MyGroupsActions.fetchGroupsNearMe()
            LoginActions.getGeolocation()
        }
    },
    getInitialState() {
        let loginStoreData = LoginStore.getState()
        let myGroupStoreData = MyGroupsStore.getState()

        return {
            user: loginStoreData.user,
            height: this.calcHeight(),
            groupsNearMe: myGroupStoreData.groupsNearMe,
            openAddShoutForm: false,
            legendOpen: false,
            radiusLastChanged: null,
            shouts: []
        }
    },
    calcHeight() {
        return window.innerHeight - 64
    },
    refetchData() {
        let coords = this.getCenter()

        MyGroupsActions.fetchGroupsNearMe(coords)
        this.setShouts(this.refs.shoutFeed.giveShouts())
    },
    getCenter() {
        if (this.refs.map) {
            var center = this.refs.map.getLeafletElement().getCenter()
            return {
                latitude: center.lat,
                longitude: center.lng
            }
        }

        return this.state.user.location
    },
    componentDidMount() {
        LoginStore.listen(this._onChange)
        MyGroupsStore.listen(this._onChange)
        window.addEventListener('resize', this._handleResize)
        this.calculateRadius()
        this.setShouts(this.refs.shoutFeed.giveShouts())
    },
    componentWillUnmount() {
        LoginStore.unlisten(this._onChange)
        MyGroupsStore.unlisten(this._onChange)
        window.removeEventListener('resize', this._handleResize)
    },
    _onChange(state) {
        this.setState(state)
    },
    _handleResize(e) {
        this.calculateRadius()

        this.setState({ height: this.calcHeight() })
    },
    handleZoom() {
        this.calculateRadius()
        this.refetchData()
    },
    calculateRadius() {
        let { map } = this.refs
        map = map.getLeafletElement()

        let mapBoundNorthEast = map.getBounds().getNorthEast()
        let radius = mapBoundNorthEast.distanceTo(map.getCenter())

        let timeDiff = (+new Date() - this.state.radiusLastChanged) / 1000

        if ((this.state.user.radius != radius) && (timeDiff > 5)) {
            LoginActions.changeRadius(radius)
            this.setState({
                radiusLastChanged: +new Date()
            })
        }

        return radius
    },
    showAddShoutForm() {
        this.setState({ openAddShoutForm: true })
    },
    addShout(shout) {
        this.setState({ openAddShoutForm: false })
        this.refs.shoutFeed.prependShout(shout)
    },
    updateShout(shout) {
        this.refs.shoutFeed.updateShout(shout)
    },
    closeForm() {
        this.setState({ openAddShoutForm: false })
    },
    toggleLegend() {
        this.setState({
            legendOpen:  ! this.state.legendOpen
        })
    },
    setShouts(shouts) {
        this.setState({ shouts })
    },
    render() {
        let { user, height, groupsNearMe, shouts } = this.state

        let coords = user.location

        let shoutFeedLocation = this.getCenter()

        return (
            <div className="shoutMap" style={{ height: this.calcHeight() }}>
                <div className="shoutMap__feed" style={{ height: this.calcHeight() }}>
                    <ShoutFeed
                        ref="shoutFeed"
                        url="shouts/near/me"
                        location={shoutFeedLocation}
                    />
                </div>

                {this.state.openAddShoutForm && (
                    <div style={{
                        position: 'absolute',
                        zIndex: 2,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        top: 0
                    }}>
                        <Modal isOpen={true} onClose={this.closeForm}>
                            <ModalContent>
                                <AddShout
                                    onDone={this.addShout}
                                    updateShout={this.updateShout}
                                />
                            </ModalContent>
                        </Modal>
                    </div>
                )}


                <div className="map__action">
                    <Button padding="0" circle onClick={this.showAddShoutForm}>
                        <Icon icon="add"/>
                    </Button>
                </div>

                <div>
                    <Card className="map__legend">
                        <CardContent>
                            <div className="map__legend__items">
                                {this.state.legendOpen && (
                                    <div>
                                        <div>
                                            <input type="checkbox"/>
                                            <label className="label">Shouts van Groepen</label>
                                        </div>
                                        <div>
                                            <input type="checkbox"/>
                                            <label className="label">Shouts van vrienden</label>
                                        </div>
                                        <div>
                                            <input type="checkbox"/>
                                            <label className="label">Shouts in de buurt</label>
                                        </div>
                                    </div>
                                )}
                                <div style={{ textAlign: 'center' }} onClick={this.toggleLegend}>
                                    {this.state.legendOpen ? (
                                        <Icon icon="expand_less"/>
                                    ) : (
                                        <Icon icon="expand_more"/>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>


                <div className="shoutMap__map">
                    <Map
                        ref="map"
                        center={[coords.latitude, coords.longitude]}
                        zoom={17}
                        style={{height}}
                        onLeafletZoomend={this.handleZoom}
                        onLeafletMoveend={this.refetchData}
                    >
                        <TileLayer
                            url='http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />

                        <MyLocationMarker map={this.refs.map}/>

                        {groupsNearMe.map(group => <Marker position={[group.lat, group.lng]}>
                            <Popup className="group__marker"><GroupPreviewCard group={group}/></Popup>
                        </Marker>)}

                        {shouts.map(shout => <Marker position={[shout.lat, shout.lng]}>
                            <Popup>SHOUTJE</Popup>
                        </Marker>)}
                    </Map>
                </div>
            </div>
        )
    }
})

export default MapPage
