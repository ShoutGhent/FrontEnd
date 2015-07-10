import React from "react"
import { Route } from "react-router"
import App from './components/App'
import Login from './components/Users/Login'
import Index from './components/Pages/Index'

var routes = (
    <Route path="/" handler={App}>
        <Route path="/" handler={Index}></Route>
        <Route path="auth">
            <Route path="login" handler={Login}/>
        </Route>
    </Route>
);

export default routes
