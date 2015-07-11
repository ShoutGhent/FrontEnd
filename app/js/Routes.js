import React from "react"
import { Route } from "react-router"
import App from './components/App'
import Login from './components/users/Login'
import Index from './components/pages/Index'
import Settings from './components/pages/Settings'
import LoggedIn from './components/LoggedIn'

var routes = (
    <Route path="/" handler={App}>
        <Route name="home" path="/" handler={Index}></Route>
        <Route name="auth" path="auth">
            <Route name="login" path="login" handler={Login}/>
            <Route name="register" path="register" handler={Login}/>
        </Route>
        <Route handler={LoggedIn}>
            <Route name="profile" path="profile">
                <Route name="settings" path="settings" handler={Settings}/>
            </Route>
        </Route>
    </Route>
);

export default routes
