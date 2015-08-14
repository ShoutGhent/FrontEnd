import React, { PropTypes } from 'react'

import LoginActions from '../../auth/LoginActions'
import LoginStore from '../../auth/LoginStore'
import MaterialSlider from '../partials/MaterialSlider'
import MyGroupsActions from '../group/MyGroupsActions'
import MyPlace from '../maps/MyPlace'
import { Grid, Cell } from '../grid/Grid'
import { Modal, ModalContent, ModalFooter } from '../modal/Modal'

var MyLocation = React.createClass({
    propTypes: {
        radius: PropTypes.number,
        height: PropTypes.number,
        isOpen: PropTypes.bool,
        onClose: PropTypes.func,
    },
    getDefaultProps() {
        return {
            height: 400,
            isOpen: false,
            onClose: () => {}
        }
    },
    getInitialState() {
        let loginState = LoginStore.getState()

        return {
            user: loginState.user,
            address: null,
            checked: loginState.user.location,
            radius: loginState.user.radius || 20
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

        if(state.user) {
            this.findAdress(state.user.location)
        }
    },
    componentWillReceiveProps() {
        this.findAdress(this.state.user.location)
    },
    enableGeolocation(e) {
        if (e.target.checked) {
            LoginActions.getGeolocation()
        } else {
            LoginActions.resetLocation()
        }

        this.setState({
            checked: ! this.state.checked
        })
    },
    setRadius(radius) {
        this.setState({ radius: parseFloat(radius) })
    },
    changeUserRadius(radius) {
        LoginActions.changeRadius(radius, (radius) => {
            MyGroupsActions.fetchGroupsNearMe()
        })
    },
    findAdress(location) {
        if ( ! location) {
            return
        }

        let geocoder = new google.maps.Geocoder

        let coords = {
            lat: parseFloat(location.latitude),
            lng: parseFloat(location.longitude)
        }

        geocoder.geocode({ location: coords }, (results, status) => {
            let address = null

            if (status === google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    address = results[0].formatted_address
                } else {
                    address = 'Geen resultaten gevonden'
                }
            } else {
                address = 'Geocoder failed due to: ' + status
            }

            this.setState({ address })
        })
    },
    render() {
        let { address, user, checked, radius } = this.state
        let { height, isOpen } = this.props

        return (
            <Modal isOpen={isOpen} onClose={this.props.onClose}>
                <ModalContent>
                    <h5>
                        Locatiebepaling ({checked ? 'aan' : 'uit'}):
                        <div className="switch right">
                            <label>
                                <input checked={checked} type="checkbox" onChange={this.enableGeolocation}/>
                                <span className="lever"></span>
                            </label>
                        </div>
                    </h5>
                    {address && user.location &&
                    <MyPlace
                        radius={radius}
                        height={height}
                        coords={user.location}
                    />
                        }
                    { ! checked &&
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        height: 300,
                        background: 'rgba(0,0,0,0.04)'
                    }}>
                        <span style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}>
                            Wachten op locatie...
                        </span>
                    </div>
                        }
                </ModalContent>
                <ModalFooter>
                    <Grid>
                        <Cell width={6/12}>
                            <MaterialSlider
                                min={20}
                                max={2000}
                                step={10}
                                current={user.radius}
                                onChange={this.setRadius}
                                onDone={this.changeUserRadius}
                            />
                        </Cell>
                        <Cell width={6/12}>
                            <div className="center" style={{
                                height: 63,
                                lineHeight: '63px',
                                verticalAlign: 'middle'
                            }}>
                                Shouts in een straal van {radius > 1000 ? (
                                <span>{radius/1000} km</span>
                            ) : (
                                <span>{radius} m</span>
                            )}
                            </div>
                        </Cell>
                    </Grid>
                </ModalFooter>
            </Modal>
        )
    }
})

export default MyLocation
