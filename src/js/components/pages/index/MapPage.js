import React, { PropTypes } from 'react'

import Icon from '../../partials/Icon'
import LoginActions from '../../../auth/LoginActions'
import LoginStore from '../../../auth/LoginStore'
import MyGroupsStore from '../../group/MyGroupsStore'
import MyLocation from '../../users/MyLocation'
import Notification from '../../notification/NotificationActions'
import ShoutFeed from '../../shout/ShoutFeed'
import WebStorage from '../../../services/WebStorage'
import { Button } from '../../button/MaterialButton'
import { Map, Marker, LayerGroup, Circle, Popup, TileLayer } from 'react-leaflet'
import AddShout from '../../pages/shout/AddShout'
import { Modal, ModalContent } from '../../modal/Modal'

var MapPage = React.createClass({
    getInitialState() {
        let loginStoreData = LoginStore.getState()
        let myGroupStoreData = MyGroupsStore.getState()

        return {
            user: loginStoreData.user,
            height: this.calcHeight(),
            groupsNearMe: myGroupStoreData.groupsNearMe,
            openAddShoutForm: false
        }
    },
    calcHeight() {
        return window.innerHeight - 64
    },
    componentDidMount() {
        LoginStore.listen(this._onChange)
        MyGroupsStore.listen(this._onChange)
        window.addEventListener('resize', this._setHeight)
    },
    componentWillUnmount() {
        LoginStore.unlisten(this._onChange)
        MyGroupsStore.unlisten(this._onChange)
        window.removeEventListener('resize', this._setHeight)
    },
    _onChange(state) {
        this.setState(state)
    },
    _setHeight(e) {
        this.setState({ height: this.calcHeight() })
    },
    centerCurrentLocation() {
        const gmaps = this.refs.gmaps
        let coords = this.state.user.location

        gmaps.getMap().setCenter(new google.maps.LatLng(coords.latitude, coords.longitude))
    },
    handleRadiusChanged(e) {
        const { gmaps } = this.refs
        const { circle } = gmaps.refs
        const bounds = circle.getEntity().getBounds()
        gmaps.getMap().fitBounds(bounds)
    },
    getLocation() {
        LoginActions.getGeolocation((location) => {
            Notification.success('Nieuwe locatie is ingesteld!')
        })
        Notification.success("Locatie wordt opgehaald!")
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
    myLocation() {
        let coords = this.state.user.location
        return (
            <Marker position={[coords.latitude, coords.longitude]}>
                <Popup>
                    <span>Jouw Locatie</span>
                </Popup>
            </Marker>
        )
    },
    render() {
        let { user, height, groupsNearMe } = this.state

        let coords = user.location
        let radius = user.radius

        return (
            <div className="shoutMap" style={{ height: this.calcHeight() }}>
                <div className="shoutMap__feed" style={{ height: this.calcHeight() }}>
                    <ShoutFeed ref="shoutFeed" url="shouts/near/me"/>
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
                        <Modal isOpen={true}>
                            <ModalContent>
                                <AddShout
                                    onDone={this.addShout}
                                    updateShout={this.updateShout}
                                />
                            </ModalContent>
                        </Modal>
                    </div>
                )}

                <div style={{
                    position: 'absolute',
                    zIndex: 2,
                    right: 24,
                    bottom: 24
                }}>
                    <Button padding="0" circle onClick={this.showAddShoutForm}>
                        <Icon icon="add"/>
                    </Button>
                </div>

                <div style={{
                    position: 'absolute',
                    zIndex: 2,
                    padding: 5,
                    right: 5,
                    top: 35
                }}>
                    <Button className="btn" padding="0 1rem" onClick={this.centerCurrentLocation}>
                        <Icon icon="home"/>
                    </Button>
                    <span>&nbsp;&nbsp;</span>
                    <Button className="btn" padding="0 1rem" onClick={this.getLocation}>
                        <Icon icon="my_location"/>
                    </Button>
                    <br/>
                    <MyLocation/>
                </div>


                <div className="shoutMap__map">
                    <Map
                        center={[coords.latitude, coords.longitude]}
                        zoom={17}
                        style={{height}}
                    >
                        <TileLayer
                            url='http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {this.myLocation()}

                        {groupsNearMe.map(group => <Marker position={[group.lat, group.lng]}>
                            <Popup>
                                <span>{group.name}</span>
                            </Popup>
                        </Marker>)}

                        <Circle
                            center={[coords.latitude, coords.longitude]}
                            radius={radius/2}
                        />

                    </Map>
                </div>
            </div>
        )
    }
})

export default MapPage
