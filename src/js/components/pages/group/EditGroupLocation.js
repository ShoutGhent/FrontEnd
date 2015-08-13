import React, { PropTypes } from 'react'

import API from '../../../services/API'
import LoginActions from '../../../auth/LoginActions'
import LoginStore from '../../../auth/LoginStore'
import MaterialInput from '../../partials/MaterialInput'
import { Gmaps, Marker } from 'react-gmaps'
import Notification from '../../notification/NotificationActions'
import { Button } from '../../button/MaterialButton'
import { Card, CardContent, CardTitle, CardFooter } from '../../card/Card'
import assign from 'react/lib/Object.assign'

var EditGroupLocation = React.createClass({
    propTypes: {
        group: PropTypes.object.isRequired,
        onChange: PropTypes.func
    },
    getInitialState() {
        let loginState = LoginStore.getState()

        return assign(loginState, {
            markerCoords: this.props.group.location || loginState.user.location
        })
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
    render() {
        let { group } = this.props

        let markerCoords = this.state.markerCoords

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
                                onClick={this.moveMarker}
                                zoom={17}>
                                <Marker
                                    lat={markerCoords.latitude}
                                    lng={markerCoords.longitude}
                                />
                            </Gmaps>
                            { ! group.location && <p>Vermits deze groep nog geen locatie heeft, hebben we een schatting van je huidige locatie gemaakt.</p>}
                        </CardContent>
                        <CardFooter>
                            <Button right>Wijzigen</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        )
    }
})

export default EditGroupLocation
