import React from "react"
import { Route } from "react-router"
import App from './components/App'
import LoggedIn from './components/pages/LoggedIn'
import Login from './components/users/Login'
import Register from './components/users/Register'
import Index from './components/pages/index/Index'
import Settings from './components/pages/profile/Settings'
import Shout from './components/pages/shout/Shout'

var routes = (
    <Route path="/" handler={App}>
        <Route name="home" path="/" handler={Index}></Route>
        <Route name="auth" path="auth">
            <Route name="login" path="login" handler={Login}/>
            <Route name="register" path="register" handler={Register}/>
        </Route>
        <Route handler={LoggedIn}>
            <Route name="profile" path="profile">
                <Route name="settings" path="settings" handler={Settings}/>
            </Route>
            <Route name="shout" path="shouts/:shoutId" handler={Shout} />
        </Route>
    </Route>
);

export default routes
