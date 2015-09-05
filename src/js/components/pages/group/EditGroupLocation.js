import React, { PropTypes } from 'react'

import API from '../../../services/API'
import assign from 'react/lib/Object.assign'
import LoginActions from '../../../auth/LoginActions'
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
        })
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
                                width={'100%'}
                                height={300}
                                lat={markerCoords.latitude}
                                lng={markerCoords.longitude}
                                zoom={17}
                                onClick={this.moveMarker}>
                                <Marker
                                    lat={markerCoords.latitude}
                                    lng={markerCoords.longitude}
                                />
                            </Gmaps>
                            { ! group_location && <p>Vermits deze groep nog geen locatie heeft, hebben we een schatting van je huidige locatie gemaakt.</p>}
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
