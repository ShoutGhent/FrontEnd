import React from "react"
import { Route } from "react-router"
import App from './App/App'
import About from './components/About'

var routes = (
    <Route path="/" handler={App}>
        <Route path="about" handler={About}/>
    </Route>
);

export default routes
