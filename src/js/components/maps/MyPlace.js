import React, { PropTypes } from 'react'

import { Gmaps, Marker, Circle } from 'react-gmaps'

var MyPlace = React.createClass({
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
    render() {
        let { coords, radius, height, zoom } = this.props

        return (
            <Gmaps
                width={'100%'}
                height={height}
                lat={coords.latitude}
                lng={coords.longitude}
                zoom={zoom}>
                <Marker
                    lat={coords.latitude}
                    lng={coords.longitude}
                />
                <Circle
                    strokeColor={'#F44336'}
                    strokeOpacity={0.8}
                    strokeWeight={1}
                    fillColor={'#F44336'}
                    fillOpacity={0.35}
                    radius={radius}
                    lat={coords.latitude}
                    lng={coords.longitude}
                />
            </Gmaps>
        )
    }
})

export default MyPlace
