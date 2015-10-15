import React, { PropTypes } from 'react'

import LoginActions from '../../auth/LoginActions'
import LoginStore from '../../auth/LoginStore'
import MaterialSlider from '../partials/MaterialSlider'
import MyGroupsActions from '../group/MyGroupsActions'

var MyLocation = React.createClass({
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
        this.getInitialState()
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
        let { user, radius } = this.state

        return (
            <div>
                <MaterialSlider
                    min={20}
                    max={2000}
                    step={10}
                    current={user.radius}
                    onChange={this.setRadius}
                    onDone={this.changeUserRadius}
                />

                <div className="center" style={{
                    minWidth: 240,
                    verticalAlign: 'middle'
                }}>
                    Shouts in een straal van {radius > 1000 ? (
                    <span>{(radius/1000).toFixed(2)} km</span>
                ) : (
                    <span>{radius.toFixed(2)} m</span>
                )}
                </div>
            </div>
        )
    }
})

export default MyLocation
