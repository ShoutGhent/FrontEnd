import React from "react"

import Auth from './auth/AuthService'
import Router from "react-router"
import RouterContainer from './services/RouterContainer'
import routes from "./Routes"
import WebStorage from './services/WebStorage'
import analytics from 'ga-react-router'

import { io } from './services/Socket'

let router = Router.create({
    routes: routes,
    location: Router.HistoryLocation
})

RouterContainer.set(router)

let jwt = WebStorage.fromStore('jwt')

if (jwt) {
    Auth.fetchCurrentUser(jwt)
}

// Subscribe to global messages
io.listen('connect', () => {
    io.join('global')

    io.listen('global:UpdateAvailable', (data) => {
        console.log(data)
    })
})

let mountNode = document.getElementById('mount-node')
router.run((Handler, state) => {
    React.render(<Handler />, mountNode)
    analytics(state)
})
