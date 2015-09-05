import React, { PropTypes } from 'react'

import LoginActions from '../../auth/LoginActions'
import LoginStore from '../../auth/LoginStore'
import MaterialSlider from '../partials/MaterialSlider'
import MyGroupsActions from '../group/MyGroupsActions'
import { Card, CardContent, CardTitle } from '../card/Card'

var MyLocation = React.createClass({
    propTypes: {
        radius: PropTypes.number,
    },
    getInitialState() {
        let loginState = LoginStore.getState()

        return {
            user: loginState.user,
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
    render() {
        let { user, checked, radius } = this.state

        return (
            <Card>
                <CardContent>
                    <CardTitle>
                        Locatiebepaling ({checked ? 'aan' : 'uit'}):
                        <div className="switch right">
                            <label>
                                <input checked={checked} type="checkbox" onChange={this.enableGeolocation}/>
                                <span className="lever"></span>
                            </label>
                        </div>
                    </CardTitle>

                    <MaterialSlider
                        min={20}
                        max={2000}
                        step={10}
                        current={user.radius}
                        onChange={this.setRadius}
                        onDone={this.changeUserRadius}
                    />

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
                </CardContent>
            </Card>
        )
    }
})

export default MyLocation
