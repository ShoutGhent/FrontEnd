import React, { PropTypes } from 'react'

import API from '../../../services/API'
import LoginStore from '../../../auth/LoginStore'
import MaterialInput from '../../partials/MaterialInput'
import Notification from '../../notification/NotificationActions'
import WebStorage from '../../../services/WebStorage'
import { Button } from '../../button/MaterialButton'
import { Card, CardContent, CardTitle, CardFooter } from '../../card/Card'
import { Gmaps, Marker } from 'react-gmaps'

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

        if (this.isMounted()) {
            this.map = this.refs.gmaps.getMap()
            var autocomplete = new google.maps.places.Autocomplete(React.findDOMNode(this.refs.addressField))
            console.log(this.map)
            //autocomplete.bindTo('bounds', this.map)
            //
            //google.maps.event.addListener(autocomplete, 'place_changed', (event) => {
            //
            //    //Selected place
            //    var place = autocomplete.getPlace()
            //
            //    //Adding marker to the selected location
            //    var position = new google.maps.LatLng(place.geometry.location.G, place.geometry.location.K)
            //
            //    this.setState({
            //        markerCoords: {
            //            latitude: position.lat,
            //            longitude: position.lng
            //        }
            //    }, this.centerCurrentLocation)
            //})
        }
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
    moveMarker(googleMap) {
        let { markerCoords } = this.state

        markerCoords.latitude = googleMap.latLng.G
        markerCoords.longitude = googleMap.latLng.K

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

        this.map.getMap().setCenter(new google.maps.LatLng(coords.latitude, coords.longitude))
    },
    searchAddress(event) {
        this.setState({ groupAddress: event.target.value})
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
                            <p>
                                <input
                                    type="text"
                                    ref="addressField"
                                    placeholder="Of voer hier een adres in"
                                    value={this.state.groupAddress}
                                    onChange={this.searchAddress}
                                />
                            </p>
                            <Gmaps
                                ref="gmaps"
                                height={300}
                                lat={markerCoords.latitude}
                                lng={markerCoords.longitude}
                                onClick={this.moveMarker}
                                width={'100%'}
                                zoom={17}
                            >
                                <Marker
                                    lat={markerCoords.latitude}
                                    lng={markerCoords.longitude}
                                />
                            </Gmaps>

                            { ! group_location && (
                                <p>Vermits deze groep nog geen locatie heeft, hebben we een schatting van je huidige locatie gemaakt.</p>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button onClick={this.myLocation}>Mijn Locatie</Button>
                            <Button right>Wijzigen</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        )
    }
})

export default EditGroupLocation
