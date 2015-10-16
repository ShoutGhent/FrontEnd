import React, { PropTypes } from 'react'

import API from '../../../services/API'
import { Button } from '../../Material/Material'
import LoginStore from '../../../auth/LoginStore'
import Notification from '../../notification/NotificationActions'
import WebStorage from '../../../services/WebStorage'
import { Card, CardContent, CardTitle, CardFooter } from '../../card/Card'
import { Map, Marker, LayerGroup, Popup, TileLayer } from 'react-leaflet'
import MyLocationMarker from '../../map/MyLocationMarker'

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

        API.post(`groups/${this.props.group.id}/location`, { longitude, latitude }, (data) => {
            this.props.onChange(data)
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
            markerCoords: WebStorage.fromStore('user', {
                location: {
                    latitude: null,
                    longitude: null
                }
            }).location
        }, this.centerCurrentLocation)
    },
    centerCurrentLocation() {
        let coords = this.state.markerCoords
    },
    render() {
        let { group } = this.props

        let markerCoords = this.state.markerCoords

        let group_location = {
            latitude: group.lat,
            longitude: group.lng
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

                            { ! group_location && (
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
