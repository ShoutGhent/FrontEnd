import React from 'react'

import GroupList from '../../group/GroupList'
import InfoPanel from '../../partials/InfoPanel'
import JoinInitialGroupModal from '../../partials/JoinInitialGroupModal'
import LoginActions from '../../../auth/LoginActions'
import LoginStore from '../../../auth/LoginStore'
import MaterialSlider from '../../partials/MaterialSlider'
import MyGroupsActions from '../../group/MyGroupsActions'
import MyGroupsStore from '../../group/MyGroupsStore'
import MyPlace from '../../maps/MyPlace'
import Notification from '../../notification/NotificationActions'
import ShoutFeed from '../../shout/ShoutFeed'
import { Card, CardContent, CardTitle, CardFooter } from '../../card/Card'
import { Grid, Cell } from '../../grid/Grid'
import { Tab, TabPanel } from '../../tab/Tab'

var _IndexLoggedIn = React.createClass({
    merge(obj1, obj2) {
        var obj3 = {}
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname] }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname] }
        return obj3
    },
    getInitialState() {
        return this.merge(MyGroupsStore.getState(), {
            coords: LoginStore.getState().coords,
            radius: 20
        })
    },
    componentDidMount() {
        MyGroupsStore.listen(this._onChange)
        LoginStore.listen(this._onChange)

        if (this.isMounted()) {
            MyGroupsActions.fetchMyGroups()
        }
    },
    componentWillUnmount() {
        MyGroupsStore.unlisten(this._onChange)
        LoginStore.unlisten(this._onChange)
    },
    _onChange(state) {
        this.setState(state)
    },
    refetchGroups() {
        MyGroupsActions.fetchMyGroups()
    },
    enableGeolocation(e) {
        if (e.target.checked) {
            Notification.info('Locatie wordt opgehaald')
            LoginActions.getGeolocation()
        } else {
            LoginActions.resetLocation()
        }
    },
    setRadius(radius) {
        this.setState({ radius: parseFloat(radius) })
    },
    render() {
        let { loading, myGroups } = this.state

        return (
            <div className="container">
                {!loading && myGroups.length <= 0 ? (
                    <JoinInitialGroupModal onDone={this.refetchGroups}></JoinInitialGroupModal>
                ) : ''}
                <Tab>
                    <TabPanel title="Vrienden">
                        <Grid>
                            <Cell width={4/12}>
                                <GroupList/>
                            </Cell>
                            <Cell width={8/12}>
                                <ShoutFeed url="shouts/from/groups"/>
                            </Cell>
                        </Grid>
                    </TabPanel>
                    <TabPanel title="Omgeving">
                        <Grid>
                            <Cell width={4/12}>
                                <Card>
                                    <CardContent>
                                        <CardTitle>
                                            <span>Mijn Omgeving</span>
                                            <div className="switch right">
                                                <label>
                                                    <input checked={!! this.state.coords} type="checkbox" onChange={this.enableGeolocation}/>
                                                    <span className="lever"></span>
                                                </label>
                                            </div>
                                        </CardTitle>

                                        <div style={{position: 'relative'}}>
                                        {this.state.coords ? (
                                            <MyPlace radius={this.state.radius} height={300} coords={this.state.coords}/>
                                        ) : (
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
                                        )}
                                        </div>

                                        <br/>
                                        <div className="right">
                                        Shouts in een straal van {this.state.radius > 1000 ? (
                                            <span>{this.state.radius/1000} km</span>
                                        ) : (
                                            <span>{this.state.radius} m</span>
                                        )}
                                        </div>
                                        <br/>
                                    </CardContent>
                                    <CardFooter>
                                        <MaterialSlider
                                            min={20}
                                            max={2000}
                                            step={10}
                                            onChange={this.setRadius}
                                            onDone={this.setRadius}
                                        />
                                    </CardFooter>
                                </Card>
                            </Cell>
                            <Cell width={8/12}>
                            {this.state.coords ? (
                                <ShoutFeed url="shouts/from/groups"/>
                            ) : (
                                <InfoPanel>
                                    <h5>Zet je locatiebepaling aan om deze modus te gebruiken. Klik hier voor meer informatie en voor ons privacybeleid.</h5>
                                </InfoPanel>
                            )}
                            </Cell>
                        </Grid>
                    </TabPanel>
                </Tab>
            </div>
        )
    }
})

export default _IndexLoggedIn
