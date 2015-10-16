import React from "react"

import Group from './components/pages/group/Group'
import IndexPage from './components/pages/index/Index'
import LoggedInWrapper from './components/pages/LoggedInWrapper'
import Login from './components/pages/auth/Login'
import MapPage from './components/pages/map/Map'
import Notifications from './components/pages/notifications/Notifications'
import Profile from './components/pages/profile/Profile'
import Register from './components/pages/auth/Register'
import Settings from './components/pages/profile/Settings'
import Shout from './components/pages/shout/Shout'
import Wrapper from './components/Wrapper'
import { Route, NotFoundRoute } from "react-router"

var routes = (
    <Route path="/" handler={Wrapper}>
        <NotFoundRoute handler={IndexPage} />
        <Route name="home" path="/" handler={IndexPage}></Route>
        <Route name="auth" path="auth">
            <Route name="login" path="login" handler={Login}/>
            <Route name="register" path="register" handler={Register}/>
        </Route>
        <Route handler={LoggedInWrapper}>
            <Route name="profile" path="/profile" handler={Profile}/>
            <Route name="notifications" path="/notifications" handler={Notifications}/>
            <Route name="map" path="/map" handler={MapPage}/>
            <Route name="settings" path="profile/settings/:tabId" handler={Settings}/>
            <Route name="shout" path="shouts/:shoutId" handler={Shout} />
            <Route name="group" path="groups/:groupId/:tabId" handler={Group} />
        </Route>
    </Route>
)

export default routes
