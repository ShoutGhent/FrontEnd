import React from "react"
import { Route } from "react-router"
import App from './components/App'
import Login from './components/users/Login'
import Index from './components/pages/Index'

var routes = (
    <Route path="/" handler={App}>
        <Route name="home" path="/" handler={Index}></Route>
        <Route name="auth" path="auth">
            <Route name="login" path="login" handler={Login}/>
            <Route name="register" path="register" handler={Login}/>
        </Route>
    </Route>
);

export default routes
