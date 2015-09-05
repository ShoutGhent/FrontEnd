import React, { PropTypes } from 'react'

import { Gmaps, Marker, Circle, InfoWindow } from 'react-gmaps'

const MyPlace = React.createClass({
    propTypes: {
        coords: PropTypes.object.isRequired,
        radius: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        zoom: PropTypes.number,
    },
    getDefaultProps() {
        return {
            zoom: 17
        }
    },
    handleRadiusChanged(e) {
        const { gmaps } = this.refs
        const { circle } = gmaps.refs
        const bounds = circle.getEntity().getBounds()
        gmaps.getMap().fitBounds(bounds)
    },
    shouldComponentUpdate(next) {
        if (
            (next.coords.latitude == this.props.coords.latitude) &&
            (next.coords.longitude == this.props.coords.longitude) &&
            (next.radius == this.props.radius) &&
            (next.height == this.props.height) &&
            (next.zoom == this.props.zoom)
        ) {
            return false
        }

        return true
    },
    componentDidMount() {
        if (this.isMounted()) {
            setTimeout(() => {
                google.maps.event.trigger(this.refs.gmaps, 'resize')
            })
        }
    },
    onMapCreated() {
        google.maps.event.addDomListener(window, 'resize', this.fixingMaps)
    },
    fixingMaps() {
        const gmaps = this.refs.gmaps
        const coords = this.props.coords

        gmaps.getMap().setCenter(new google.maps.LatLng(coords.latitude, coords.longitude))
        this.handleRadiusChanged()
    },
    render() {
        const { coords, radius, height, zoom } = this.props

        return coords ? (
            <Gmaps
                ref="gmaps"
                width={'100%'}
                height={height}
                lat={coords.latitude}
                lng={coords.longitude}
                zoom={zoom}
                onMapCreated={this.onMapCreated}>

                <Marker
                    lat={coords.latitude}
                    lng={coords.longitude}
                />

                {radius &&
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
                />}
            </Gmaps>
        ) : null
    }
})

export default MyPlace
