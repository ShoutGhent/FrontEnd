import React from "react"

import AppHandler from '../screens/App/handler'
import GroupPage from '../screens/App/screens/LoggedIn/screens/Group/GroupPage'
import HomePage from '../screens/App/screens/HomePage'
import LoggedInHandler from '../screens/App/screens/LoggedIn/handler'
import LoggedOutHandler from '../screens/App/screens/LoggedOut/handler'
import LoginPage from '../screens/App/screens/LoggedOut/screens/Auth/screens/Login/LoginPage'
import MapPage from '../screens/App/screens/LoggedIn/screens/Map/MapPage'
import NotificationPage from '../screens/App/screens/LoggedIn/screens/Notification/NotificationPage'
import ProfilePage from '../screens/App/screens/LoggedIn/screens/Profile/ProfilePage'
import RegisterPage from '../screens/App/screens/LoggedOut/screens/Auth/screens/Register/RegisterPage'
import SettingsPage from '../screens/App/screens/LoggedIn/screens/Profile/SettingsPage'
import ShoutPage from '../screens/App/screens/LoggedIn/screens/Shout/ShoutPage'
import { Route, NotFoundRoute } from "react-router"

var routes = (
    <Route path="/" handler={AppHandler}>
        <Route name="home" path="/" handler={HomePage}></Route>

        <Route handler={LoggedInHandler}>
            <Route name="group" path="groups/:groupId/:tabId" handler={GroupPage}/>
            <Route name="map" path="/map" handler={MapPage}/>
            <Route name="notifications" path="/notifications" handler={NotificationPage}/>
            <Route name="profile" path="/profile" handler={ProfilePage}/>
            <Route name="settings" path="profile/settings/:tabId" handler={SettingsPage}/>
            <Route name="shout" path="shouts/:shoutId" handler={ShoutPage} />
        </Route>

        <Route handler={LoggedOutHandler} path="auth">
            <Route name="login" path="login" handler={LoginPage}/>
            <Route name="register" path="register" handler={RegisterPage}/>
        </Route>

        <NotFoundRoute handler={HomePage} />
    </Route>
)

export default routes
