import React, { PropTypes } from 'react'

import LoginStore from '../../auth/LoginStore'
import md5 from 'md5'
import { Marker, Popup } from 'react-leaflet'

var MyLocationMarker = React.createClass({
    getInitialState() {
        return LoginStore.getState()
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
    render() {
        let coords = this.state.user.location

        const MyLocationIcon = L.icon({
            iconUrl: `https://avatarize.me/a/${md5(this.state.user.email)}?size=24`,
            iconSize: [24, 24],
            className: 'location--myPin'
        })

        return (
            <Marker
                {...this.props}
                position={[coords.latitude, coords.longitude]}
                icon={MyLocationIcon}
            >
                <Popup>
                    <span>Jouw Locatie</span>
                </Popup>
            </Marker>
        )
    }
})

export default MyLocationMarker
