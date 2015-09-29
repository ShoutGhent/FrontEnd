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
import { Gmaps, Marker, Circle, InfoWindow } from 'react-gmaps'

var Map = React.createClass({
    getInitialState() {
        let loginStoreData = LoginStore.getState()
        let myGroupStoreData = MyGroupsStore.getState()

        return {
            user: loginStoreData.user,
            height: this.calcHeight(),
            groupsNearMe: myGroupStoreData.groupsNearMe
        }
    },
    calcHeight() {
        return window.innerHeight - 64
    },
    componentDidMount() {
        LoginStore.listen(this._onChange)
        MyGroupsStore.listen(this._onChange)
        window.addEventListener('resize', (e) => {
            this.setState({ height: this.calcHeight() })
        })
    },
    componentWillUnmount() {
        LoginStore.unlisten(this._onChange)
        MyGroupsStore.unlisten(this._onChange)
        window.removeEventListener('resize')
    },
    _onChange(state) {
        this.setState(state)
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
    render() {
        let { user, height, groupsNearMe } = this.state

        let coords = user.location
        let radius = user.radius

        return (
            <div style={{position: 'relative'}}>
                <div className="shoutMap" style={{
                    position: 'absolute',
                    zIndex: 2,
                    padding: 5,
                    left: 5,
                    top: 0,
                    width: 600,
                    height: this.calcHeight(),
                    overflowY: 'scroll'
                }}>
                    <ShoutFeed url="shouts/from/groups"/>
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
                <Gmaps
                    ref="gmaps"
                    width={'100%'}
                    height={height}
                    lat={coords.latitude}
                    lng={coords.longitude}
                    zoom={17}
                >
                    <Marker
                        lat={coords.latitude}
                        lng={coords.longitude}
                        title={"Jouw huidige locatie!"}
                    />
                {groupsNearMe.map(group => <Marker
                    lat={group.lat}
                    lng={group.lng}
                    title={group.name}
                />)}
                    {radius && (
                        <Circle
                            ref="circle"
                            strokeColor={'#F44336'}
                            strokeOpacity={0.8}
                            strokeWeight={1}
                            fillColor={'#F44336'}
                            fillOpacity={0.35}
                            radius={radius}
                            lat={coords.latitude}
                            lng={coords.longitude}
                            onRadiusChanged={this.handleRadiusChanged}
                        />
                    )}
                </Gmaps>
            </div>
        )
    }
})

export default Map
