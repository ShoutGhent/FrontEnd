import React, { PropTypes } from 'react'

import Icon from '../../partials/Icon'
import LoginStore from '../../../auth/LoginStore'
import WebStorage from '../../../services/WebStorage'
import { Button } from '../../button/MaterialButton'
import { Gmaps, Marker, Circle, InfoWindow } from 'react-gmaps'

var Map = React.createClass({
    getInitialState() {
        let loginStoreData = LoginStore.getState()

        return {
            coords: loginStoreData.user.location,
            height: window.innerHeight
        }
    },
    componentDidMount() {
        LoginStore.listen(this._onChange)
        window.addEventListener('resize', (e) => {
            this.setState({ height: window.innerHeight })
        })
    },
    componentWillUnmount() {
        LoginStore.unlisten(this._onChange)
        window.removeEventListener('resize')
    },
    _onChange(state) {
        this.setState(state)
    },
    centerCurrentLocation() {
        const gmaps = this.refs.gmaps
        let coords = WebStorage.fromStore('user', {
            location: {
                latitude: null,
                longitude: null
            }
        }).location


        gmaps.getMap().setCenter(new google.maps.LatLng(coords.latitude, coords.longitude))
    },
    render() {
        let { coords, height } = this.state

        return (
            <div style={{position: 'relative'}}>
                <div style={{
                    position: 'absolute',
                    zIndex: 2,
                    padding: 5,
                    backgroundColor: 'white',
                    right: 5,
                    top: 35,
                    border: '1px solid rgba(0, 0, 0, 0.14902)',
                    borderRadius: 2
                }}>
                    <Button className="btn" padding="0 1rem" onClick={this.centerCurrentLocation}>
                        <Icon icon="home"/>
                    </Button>
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
                </Gmaps>
            </div>
        )
    }
})

export default Map
