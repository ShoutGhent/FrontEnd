import React from "react"

import App from './components/App'
import Group from './components/pages/group/Group'
import Index from './components/pages/index/Index'
import LoggedIn from './components/pages/LoggedIn'
import Login from './components/pages/auth/Login'
import Profile from './components/pages/profile/Profile'
import Register from './components/pages/auth/Register'
import Settings from './components/pages/profile/Settings'
import Shout from './components/pages/shout/Shout'
import { Route, NotFoundRoute } from "react-router"

var routes = (
    <Route path="/" handler={App}>
        <NotFoundRoute handler={Index} />
        <Route name="home" path="/" handler={Index}></Route>
        <Route name="auth" path="auth">
            <Route name="login" path="login" handler={Login}/>
            <Route name="register" path="register" handler={Register}/>
        </Route>
        <Route handler={LoggedIn}>
            <Route name="profile" path="/profile" handler={Profile}/>
            <Route name="settings" path="profile/settings" handler={Settings}/>
            <Route name="shout" path="shouts/:shoutId" handler={Shout} />
            <Route name="group" path="groups/:groupId" handler={Group} />
        </Route>
    </Route>
)

export default routes
