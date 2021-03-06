import React, { PropTypes } from 'react'

import API from 'API'
import { Button } from 'forms/material/Material'
import LoginStore from 'LoginStore'
import Notification from 'NotificationActions'
import WebStorage from 'WebStorage'
import { Card, CardContent, CardTitle, CardFooter } from 'Card'
import { Map, Marker, LayerGroup, Popup, TileLayer } from 'react-leaflet'
import MyLocationMarker from 'MyLocationMarker'

var EditGroupLocation = React.createClass({
    propTypes: {
        group: PropTypes.object.isRequired,
        onChange: PropTypes.func
    },
    getInitialState() {
        let loginState = LoginStore.getState()

        let group_location = {
            latitude: this.props.group.lat,
            longitude: this.props.group.lng
        }

        return {
            myLocation: loginState.user.location,
            markerCoords: group_location || loginState.user.location,
            groupAddress: ''
        }
    },
    componentDidMount() {
        LoginStore.listen(this._onChange)
    },
    componentWillUnmount() {
        LoginStore.unlisten(this._onChange)
    },
    _onChange(state) {
        this.setState(state)
    },
    getDefaultProps() {
        return {
            onChange: () => {}
        }
    },
    edit(event) {
        event.preventDefault()

        let { markerCoords } = this.state

        let { latitude, longitude } = markerCoords

        API.post(`groups/${this.props.group.id}/location`, { longitude, latitude }, () => {
            this.props.onChange({ lat: latitude, lng: longitude })
            Notification.success('Groep locatie is gewijzigd!')
        })
    },
    moveMarker(event) {
        let { markerCoords } = this.state

        markerCoords.latitude = event.latlng.lat
        markerCoords.longitude = event.latlng.lng

        this.setState({ markerCoords })
    },
    myLocation(event) {
        event.preventDefault()

        this.setState({
            markerCoords: this.userLocation()
        })
    },
    userLocation() {
        return WebStorage.fromStore('user', {
            location: {
                latitude: null,
                longitude: null
            }
        }).location
    },
    render() {
        let { group } = this.props

        let markerCoords = this.state.markerCoords

        let hasGroupLocation = markerCoords.latitude != null && markerCoords.latitude != ""

        if ( ! hasGroupLocation) {
            markerCoords = this.userLocation()
        }

        return (
            <div>
                <form onSubmit={this.edit}>
                    <Card>
                        <CardContent>
                            <CardTitle>Locatie Wijzigen</CardTitle>
                            <p>
                                Klik op de kaart om een juiste locatie te kiezen voor deze groep.
                            </p>

                            <Map
                                ref="map"
                                center={[markerCoords.latitude, markerCoords.longitude]}
                                zoom={17}
                                style={{height: 300}}
                                onClick={this.moveMarker}
                            >
                                <TileLayer
                                    url='http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />

                                <MyLocationMarker map={this.refs.map}/>

                                <Marker position={[markerCoords.latitude, markerCoords.longitude]}>
                                    <Popup>
                                        <span>{group.name}</span>
                                    </Popup>
                                </Marker>
                            </Map>

                            { ! hasGroupLocation && (
                                <p>Vermits deze groep nog geen locatie heeft, hebben we een schatting van je huidige locatie gemaakt.</p>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button onClick={this.myLocation}>Ga naar mijn Locatie</Button>
                            <Button right>Wijzig groep locatie</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        )
    }
})

export default EditGroupLocation
