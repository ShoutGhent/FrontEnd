import React, { PropTypes } from 'react'

import API from '../../../services/API'
import LoginStore from '../../../auth/LoginStore'
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
            markerCoords: group_location || loginState.user.location
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
        const gmaps = this.refs.gmaps
        let coords = this.state.markerCoords

        gmaps.getMap().setCenter(new google.maps.LatLng(coords.latitude, coords.longitude))
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
